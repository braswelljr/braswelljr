'use client';

import { ArrowLeft2, ArrowRight2, SearchZoomIn, SearchZoomOut } from 'iconsax-react';
import { cn } from 'lib/utils';
import { Button } from '@/components/ui/button';

export const ZOOM_MIN = 0.5;
export const ZOOM_MAX = 3;
export const ZOOM_STEP = 0.25;

/** Page navigation and zoom. Fully controlled by the viewer above it. */
export function PdfToolbar({
  page,
  pageCount,
  scale,
  onPageChange,
  onScaleChange,
  className
}: {
  page: number;
  pageCount: number;
  scale: number;
  onPageChange: (page: number) => void;
  onScaleChange: (scale: number) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Document controls"
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-3 py-2 dark:border-neutral-800',
        className
      )}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ArrowLeft2
            size={16}
            color="currentColor"
            variant="Linear"
          />
        </Button>
        <p
          aria-live="polite"
          className="px-2 text-xs text-neutral-600 tabular-nums dark:text-neutral-400"
        >
          Page {page} of {pageCount}
        </p>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ArrowRight2
            size={16}
            color="currentColor"
            variant="Linear"
          />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Zoom out"
          disabled={scale <= ZOOM_MIN}
          onClick={() => onScaleChange(Math.max(ZOOM_MIN, scale - ZOOM_STEP))}
        >
          <SearchZoomOut
            size={16}
            color="currentColor"
            variant="Linear"
          />
        </Button>
        <p className="w-12 text-center text-xs text-neutral-600 tabular-nums dark:text-neutral-400">
          {Math.round(scale * 100)}%
        </p>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Zoom in"
          disabled={scale >= ZOOM_MAX}
          onClick={() => onScaleChange(Math.min(ZOOM_MAX, scale + ZOOM_STEP))}
        >
          <SearchZoomIn
            size={16}
            color="currentColor"
            variant="Linear"
          />
        </Button>
      </div>
    </nav>
  );
}
