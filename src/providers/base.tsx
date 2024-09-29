'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RepoProvider } from '~/context/useRepos'
import { ThemeProvider } from './theme'

export default function Base({ children }: { children?: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RepoProvider>{children}</RepoProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
