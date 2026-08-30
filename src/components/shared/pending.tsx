import { cn } from 'lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Placeholder cards for a list that has not arrived yet.
 *
 * A single centred "Loading ..." was the previous answer everywhere, which
 * collapses a three-column grid to one line of text: the section visibly
 * empties, the page jumps when the data lands, and a slow request is
 * indistinguishable from an empty result. Holding the real shape and naming
 * what is loading fixes both readings at once.
 *
 * The label is announced as well as shown: `aria-live="polite"` means a screen
 * reader hears the section change state rather than finding it silently
 * repopulated.
 */
export function PendingList({
  count = 6,
  label = 'Loading',
  className,
  gridClassName,
  itemClassName
}: {
  /** How many placeholders to draw. Match the collapsed row count. */
  count?: number;
  /** Named in the visible line and to assistive technology: "Loading issues". */
  label?: string;
  className?: string;
  /** Column setup, so the placeholder matches the grid it stands in for. */
  gridClassName?: string;
  /** Placeholder size, so it matches the card it stands in for. */
  itemClassName?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('space-y-3', className)}
    >
      <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', gridClassName)}>
        {Array.from({ length: count }, (_, i) => (
          <Skeleton
            key={i}
            className={cn('h-40 rounded-sm', itemClassName)}
          />
        ))}
      </div>

      <p
        aria-hidden
        className="animate-pulse text-center text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        {label} &hellip;
      </p>
    </div>
  );
}
