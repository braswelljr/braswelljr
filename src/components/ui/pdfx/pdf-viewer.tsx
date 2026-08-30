'use client';

import { useState } from 'react';
import { cn } from 'lib/utils';
import { PdfPage } from './pdf-page';
import { PdfToolbar } from './pdf-toolbar';
import { usePdfDocument, type PdfSource } from './use-pdf-document';

/**
 * A complete PDF reader: toolbar, page canvas, and the loading and error states.
 *
 * Composed from `usePdfDocument`, `PdfToolbar` and `PdfPage`, each usable on its
 * own when a screen wants a different arrangement (a thumbnail rail, or every
 * page in one scroll rather than one at a time).
 */
export function PdfViewer({
  src,
  className,
  initialScale = 1
}: {
  src: PdfSource;
  className?: string;
  initialScale?: number;
}) {
  const { document: pdf, pageCount, loading, error } = usePdfDocument(src);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(initialScale);

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      {pdf && pageCount > 0 && (
        <PdfToolbar
          page={page}
          pageCount={pageCount}
          scale={scale}
          onPageChange={setPage}
          onScaleChange={setScale}
        />
      )}

      <div className="max-h-[70dvh] overflow-auto p-4">
        {loading && (
          <p
            role="status"
            className="py-16 text-center text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span className="animate-pulse">Opening document ...</span>
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="py-16 text-center text-sm text-red-600 dark:text-red-400"
          >
            {error.message}
          </p>
        )}

        {pdf && !loading && !error && (
          <PdfPage
            document={pdf}
            pageNumber={page}
            scale={scale}
          />
        )}
      </div>
    </figure>
  );
}
