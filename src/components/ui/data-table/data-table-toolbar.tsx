'use client';

import type { ReactNode } from 'react';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { cn } from 'lib/utils';

/**
 * The row above a table: a search field on the left, caller-supplied filters on
 * the right.
 *
 * Controlled. The parent owns the value, which is what lets it live in the URL
 * through nuqs rather than in component state.
 */
export function DataTableToolbar({
  value,
  onValueChange,
  placeholder = 'Search',
  label = 'Search table',
  className,
  children
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <label className="relative flex-1 sm:max-w-xs">
        <span className="sr-only">{label}</span>
        <SearchNormal1
          size={16}
          color="currentColor"
          variant="Linear"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-sm border border-neutral-300 bg-transparent py-1.5 pr-9 pl-9 text-sm placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-400"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onValueChange('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <CloseCircle
              size={16}
              color="currentColor"
              variant="Linear"
            />
          </button>
        )}
      </label>

      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}
