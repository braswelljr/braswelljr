'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

type AuthProps = {
  token?: string;
};

export const AuthContext = createContext<AuthProps>({
  token: undefined
});

type AuthProviderProps = {
  children: React.ReactNode;
};

type DataI = {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer' | 'Basic';
  expires_in: number;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { data, error, refetch } = useQuery<{ message: string; data: DataI }>({
    queryKey: ['token'],
    queryFn: () => fetch(`/api/spotify/access-token`, { method: 'GET', mode: 'cors' }).then(r => r.json()),
    staleTime: 3600,
    retry: true
  });

  useEffect(() => {
    if (error) {
      refetch();
    }
  }, [error]);

  // Memoize context value only if the access_token exists
  const memoizedValue = useMemo<AuthProps>(
    () => ({
      token: data?.data?.access_token
    }),
    [data?.data?.access_token]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a <AuthProvider />');
  }

  return context;
}
