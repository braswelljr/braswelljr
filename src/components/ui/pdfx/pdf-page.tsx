'use client';

import { useEffect, useRef } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { cn } from 'lib/utils';

/**
 * One rendered page.
 *
 * pdf.js draws to a canvas, so the page is painted rather than laid out. The
 * canvas is sized in device pixels and scaled back down in CSS, which is what
 * keeps the text crisp on a high-density display.
 */
export function PdfPage({
  document: pdf,
  pageNumber,
  scale = 1,
  className
}: {
  document: PDFDocumentProxy;
  pageNumber: number;
  scale?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taskRef = useRef<RenderTask | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;

      const ratio = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: scale * ratio });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / ratio}px`;
      canvas.style.height = `${viewport.height / ratio}px`;

      // A page can only have one render in flight; cancel the previous one so a
      // fast zoom does not paint two viewports onto the same canvas.
      taskRef.current?.cancel();
      const task = page.render({ canvas, canvasContext: context, viewport });
      taskRef.current = task;

      try {
        await task.promise;
      } catch {
        // A cancelled render rejects. That is the expected path here.
      }
    })();

    return () => {
      cancelled = true;
      taskRef.current?.cancel();
    };
  }, [pdf, pageNumber, scale]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={`Page ${pageNumber}`}
      className={cn(
        'mx-auto block max-w-full rounded-sm bg-white shadow-sm dark:shadow-neutral-950',
        className
      )}
    />
  );
}
