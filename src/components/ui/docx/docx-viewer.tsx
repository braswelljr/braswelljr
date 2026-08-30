'use client';

import { cn } from 'lib/utils';
import { useDocxHtml } from './use-docx-html';

/**
 * Render a .docx file as HTML.
 *
 * The converted markup is Word's own structure, so it is styled through the
 * shared prose classes rather than by this component. That keeps a document
 * looking like the rest of the site instead of like a word processor.
 *
 * `dangerouslySetInnerHTML` is unavoidable here: the whole job is rendering
 * generated markup. mammoth emits a fixed, semantic subset (headings, lists,
 * tables, emphasis, links) and carries no script through, so the risk is bounded
 * by the converter rather than by arbitrary input. Only render files the site
 * itself trusts.
 */
export function DocxViewer({
  src,
  className,
  showMessages = false
}: {
  src: ArrayBuffer;
  className?: string;
  /** Surface mammoth's conversion notes, useful while authoring. */
  showMessages?: boolean;
}) {
  const { html, messages, loading, error } = useDocxHtml(src);

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-sm border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div className="max-h-[70dvh] overflow-auto p-6">
        {loading && (
          <p
            role="status"
            className="py-16 text-center text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span className="animate-pulse">Reading document ...</span>
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

        {!loading && !error && html.length > 0 && (
          <article
            className="prose-neutral dark:prose-invert prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {!loading && !error && html.length < 1 && (
          <p className="py-16 text-center text-sm text-neutral-600 dark:text-neutral-400">
            This document is empty.
          </p>
        )}
      </div>

      {showMessages && messages.length > 0 && (
        <figcaption className="border-t border-neutral-200 px-4 py-2 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <ul className="list-inside list-disc space-y-0.5">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
