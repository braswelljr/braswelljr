'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdfjs-dist';

export type PdfSource = string | ArrayBuffer | Uint8Array;

export interface PdfDocumentState {
  document: PDFDocumentProxy | null;
  pageCount: number;
  loading: boolean;
  error: Error | null;
}

const EMPTY: PdfDocumentState = { document: null, pageCount: 0, loading: false, error: null };

/**
 * Load a PDF and keep the resulting document proxy.
 *
 * pdf.js is imported lazily inside the effect for two reasons: the library is
 * large and should not sit in the initial bundle, and it touches DOM globals at
 * module scope, so importing it during a server render throws.
 *
 * The worker is resolved with `new URL(..., import.meta.url)`, which the bundler
 * rewrites to an emitted asset. Pointing `workerSrc` at a bare specifier works
 * in development and then fails once the file is hashed for production.
 */
export function usePdfDocument(source: PdfSource | null | undefined): PdfDocumentState {
  const [state, setState] = useState<PdfDocumentState>(EMPTY);

  // Guards against a slow load resolving after the source changed again.
  const requestRef = useRef(0);

  useEffect(() => {
    if (!source) return;

    const request = ++requestRef.current;
    let task: PDFDocumentLoadingTask | null = null;

    void (async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const pdfjs = await import('pdfjs-dist');

        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();

        task = pdfjs.getDocument(typeof source === 'string' ? { url: source } : { data: source });
        const proxy = await task.promise;

        if (request !== requestRef.current) {
          void task.destroy();
          return;
        }
        setState({ document: proxy, pageCount: proxy.numPages, loading: false, error: null });
      } catch (error) {
        if (request !== requestRef.current) return;
        setState({
          document: null,
          pageCount: 0,
          loading: false,
          error: error instanceof Error ? error : new Error('Could not open the document')
        });
      }
    })();

    return () => {
      // Bump the token so an in-flight load discards its own result. `destroy`
      // lives on the loading task in pdf.js v6, not on the document proxy.
      requestRef.current++;
      void task?.destroy();
    };
  }, [source]);

  return source ? state : EMPTY;
}
