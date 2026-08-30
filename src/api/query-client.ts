import { QueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { isApiError } from './errors';
import { STALE } from './refresh';

/**
 * Options a caller may pass to a domain query hook: everything `useQuery`
 * accepts except the parts the hook owns (`queryKey`/`queryFn`). This is how
 * callers add dependencies: `enabled`, `select`, `staleTime`, `placeholderData`,
 * etc.
 */
export type QueryOptions<T> = Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE.slow,
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error: unknown) => {
        // Retrying an exhausted GitHub rate limit or a missing resource only
        // spends more of the same budget that just ran out.
        if (isApiError(error)) {
          const { status } = error;
          if (status === 401 || status === 403 || status === 404 || status === 429) return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true
    },
    mutations: {
      retry: false
    }
  }
});

/** Clear the whole cache. */
export const clearQueryCache = () => queryClient.clear();
