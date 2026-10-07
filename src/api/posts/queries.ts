// Posts domain, TanStack Query hooks.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryOptions } from '../query-client';
import { queryKeys } from '../query-keys';
import { STALE } from '../refresh';
import { getPostStats, recordPostStat } from './services';
import type { PostStats, PostStatsAction } from './types';

export function usePostStatsQuery(slug: string, options?: QueryOptions<PostStats>) {
  return useQuery({
    queryKey: queryKeys.posts.stats(slug),
    queryFn: () => getPostStats(slug),
    staleTime: STALE.session,
    // The store is optional. When it is not configured the answer will not
    // change by asking again, so fail once and let the caller hide itself.
    retry: false,
    ...options
  });
}

/** Records a view or a like, then writes the returned counters into the cache
 *  so the numbers on screen are the store's, not a guess. */
export function useRecordPostStatMutation(slug: string) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (action: PostStatsAction) => recordPostStat(slug, action),
    onSuccess: (stats) => client.setQueryData(queryKeys.posts.stats(slug), stats)
  });
}
