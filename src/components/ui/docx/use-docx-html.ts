'use client';

import { useEffect, useRef, useState } from 'react';

export interface DocxHtmlState {
  html: string;
  /** Conversion notes from mammoth, such as an unsupported style it dropped. */
  messages: string[];
  loading: boolean;
  error: Error | null;
}

const EMPTY: DocxHtmlState = { html: '', messages: [], loading: false, error: null };

/**
 * Convert a .docx file to HTML with mammoth.
 *
 * The conversion is semantic rather than visual: mammoth maps Word's styles onto
 * headings, lists, tables and emphasis, and discards absolute layout. A document
 * that depends on its page geometry will not survive, which is the trade for not
 * shipping a rendering engine to the browser.
 *
 * mammoth is imported lazily so it stays out of the initial bundle.
 */
export function useDocxHtml(source: ArrayBuffer | null | undefined): DocxHtmlState {
  const [state, setState] = useState<DocxHtmlState>(EMPTY);
  const requestRef = useRef(0);

  useEffect(() => {
    if (!source) return;

    const request = ++requestRef.current;

    void (async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const mammoth = await import('mammoth');
        const result = await mammoth.convertToHtml({ arrayBuffer: source });

        if (request !== requestRef.current) return;
        setState({
          html: result.value,
          messages: result.messages.map((m) => m.message),
          loading: false,
          error: null
        });
      } catch (error) {
        if (request !== requestRef.current) return;
        // mammoth unzips the file first, so a non-docx surfaces as a raw jszip
        // complaint about a missing central directory. Say what actually went
        // wrong and keep the original as the cause.
        setState({
          html: '',
          messages: [],
          loading: false,
          error: new Error('This file is not a readable .docx document.', { cause: error })
        });
      }
    })();

    return () => {
      requestRef.current++;
    };
  }, [source]);

  return source ? state : EMPTY;
}
