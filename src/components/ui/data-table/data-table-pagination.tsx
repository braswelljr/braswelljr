'use client';

import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { cn } from 'lib/utils';
import { Button } from '@/components/ui/button';
import type { DataTableInstance } from './types';

const PAGE_SIZES = [10, 20, 30, 50, 100];

/**
 * Page controls for a table that registered `rowPaginationFeature`.
 *
 * Renders nothing when the feature is absent, so it can sit in a composition
 * unconditionally and simply stay quiet on an unpaginated table.
 */
export function DataTablePagination({
  table,
  className,
  pageSizes = PAGE_SIZES
}: {
  table: DataTableInstance;
  className?: string;
  pageSizes?: number[];
}) {
  const atom = table.atoms?.pagination;
  if (!atom || !table.getPageCount) return null;

  return (
    <table.Subscribe source={atom}>
      {({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => (
        <PaginationControls
          table={table}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageSizes={pageSizes}
          className={className}
        />
      )}
    </table.Subscribe>
  );
}

function PaginationControls({
  table,
  pageIndex,
  pageSize,
  pageSizes,
  className
}: {
  table: DataTableInstance;
  pageIndex: number;
  pageSize: number;
  pageSizes: number[];
  className?: string;
}) {
  const pageCount = table.getPageCount?.() ?? 0;

  return (
    <nav
      aria-label="Table pagination"
      className={cn('flex flex-wrap items-center justify-between gap-3', className)}
    >
      <label className="flex items-center gap-2 text-xs uppercase">
        <span className="text-neutral-600 dark:text-neutral-400">Rows</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize?.(Number(e.target.value))}
          className="cursor-pointer rounded-sm border border-neutral-300 bg-transparent px-2 py-1 text-xs focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          {pageSizes.map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-3">
        <p
          aria-live="polite"
          className="text-xs text-neutral-600 tabular-nums dark:text-neutral-400"
        >
          Page {pageIndex + 1} of {Math.max(pageCount, 1)}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous page"
            disabled={!table.getCanPreviousPage?.()}
            onClick={() => table.previousPage?.()}
          >
            <ArrowLeft2
              size={16}
              color="currentColor"
              variant="Linear"
            />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next page"
            disabled={!table.getCanNextPage?.()}
            onClick={() => table.nextPage?.()}
          >
            <ArrowRight2
              size={16}
              color="currentColor"
              variant="Linear"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
}
