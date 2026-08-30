import { cn } from 'lib/utils';
import { EmberBars, EmberField } from '@/components/shared/ember';

/**
 * Centred loading state, used by `app/loading.tsx` and as the Suspense fallback
 * in the provider tree.
 *
 * A Server Component on purpose: this is the first thing rendered while a route
 * resolves, so it should not depend on client JavaScript having arrived.
 */
export default function Loading({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'relative grid h-full min-h-[70dvh] w-full flex-1 place-items-center overflow-hidden px-6 py-24',
        className
      )}
    >
      <EmberField />

      <div className="relative flex flex-col items-center gap-6">
        <EmberBars />
        <p className="ember-text text-xs font-semibold tracking-[0.35em] uppercase">
          {label ?? 'Loading'}
        </p>
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
}
