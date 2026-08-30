'use client';

// Error boundaries must be Client Components
import { useEffect } from 'react';
import { StatusScreen } from '@/components/shared/status-screen';

/**
 * Route error boundary for everything under the root layout.
 *
 * Next 16 names the recovery prop `retry` (it was `reset` in earlier versions);
 * calling it re-fetches and re-renders this boundary's children.
 */
export default function Error({
  error,
  retry
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      code="500"
      kicker="Something broke"
      title="That did not go to plan."
      // In production the message from a Server Component is deliberately
      // generic, so the digest below is the useful half.
      description={error?.message || 'An unexpected error occurred while rendering this page.'}
      digest={error?.digest}
      actions={[
        { label: 'Try again', onClick: retry },
        { label: 'Go home', href: '/' }
      ]}
      className="min-h-dvh"
    />
  );
}
