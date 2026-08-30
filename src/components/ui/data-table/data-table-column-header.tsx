'use client';

import { ArrowDown2, ArrowSwapVertical, ArrowUp2 } from 'iconsax-react';
import { cn } from 'lib/utils';

export type SortDirection = 'asc' | 'desc' | false;

/**
 * A sortable column heading.
 *
 * Rendered inside the `<th>` the header part already emits, so this is a button
 * rather than another cell. `aria-sort` goes on the `<th>`, which the caller
 * owns, so the current direction is also announced through the button label.
 */
export function DataTableColumnHeader({
  title,
  sorted,
  onToggle,
  className
}: {
  title: string;
  /** Current direction, or `false` when the column is unsorted. */
  sorted: SortDirection;
  onToggle: () => void;
  className?: string;
}) {
  const Icon = sorted === 'asc' ? ArrowUp2 : sorted === 'desc' ? ArrowDown2 : ArrowSwapVertical;
  const next = sorted === 'asc' ? 'descending' : 'ascending';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${title}, sort ${next}`}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-xs text-left font-medium transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:hover:text-secondary',
        className
      )}
    >
      <span>{title}</span>
      <Icon
        size={14}
        color="currentColor"
        variant="Linear"
        aria-hidden
        className={cn('shrink-0', !sorted && 'opacity-40')}
      />
    </button>
  );
}
