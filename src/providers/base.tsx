'use client';

import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { queryClient } from '@/api';
import Loading from '@/components/shared/loading';
import { ThemeProvider } from '@/providers/theme';

export default function Base({ children }: { children?: React.ReactNode }) {
  return (
    /*
      The boundary sits outside every provider, not just around `children`.
      Providers are Client Components that may themselves read URL state, and
      `useSearchParams`, which every nuqs hook goes through, makes Next refuse
      to prerender a route unless the call is inside a Suspense boundary. That
      failure is a hard build error, not a warning, so the net is cast wide
      enough to cover the provider tree as well as the page under it.

      Pages that care about their static HTML should still wrap the specific
      subtree that reads URL state (as /projects does): React bails out to
      client rendering at the *nearest* boundary, so a closer one keeps the rest
      of the page in the prerendered output, while falling through to this one
      would drop the whole document.
    */
    <Suspense fallback={<Loading label="Loading" />}>
      <ThemeProvider>
        <RootProvider>
          <NuqsAdapter>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </NuqsAdapter>
        </RootProvider>
      </ThemeProvider>
    </Suspense>
  );
}
