'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { AuthenticationProvider } from '~/context/use-authentication';
import { RepoProvider } from '~/context/use-repos';
import { ThemeProvider } from './theme';

export default function Base({ children }: { children?: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <RootProvider>
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <RepoProvider>{children}</RepoProvider>
          </AuthenticationProvider>
        </QueryClientProvider>
      </RootProvider>
    </ThemeProvider>
  );
}
