'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

type AuthenticationProps = {
  token?: string;
};

export const AuthenticationContext = createContext<AuthenticationProps>({
  token: undefined
});

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

type DataI = {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer' | 'Basic';
  expires_in: number;
};

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const { data, error, refetch } = useQuery<{ message: string; data: DataI }>({
    queryKey: ['token'],
    queryFn: () => fetch(`/api/spotify/access-token`, { method: 'GET', mode: 'cors' }).then((r) => r.json()),
    staleTime: 3600,
    retry: true
  });

  useEffect(() => {
    if (error) {
      refetch();
    }
  }, [error]);

  // Memoize context value only if the access_token exists
  const memoizedValue = useMemo<AuthenticationProps>(
    () => ({
      token: data?.data?.access_token
    }),
    [data?.data?.access_token]
  );

  return <AuthenticationContext.Provider value={memoizedValue}>{children}</AuthenticationContext.Provider>;
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('useAuthentication must be used within a <AuthenticationProvider />');
  }

  return context;
}
