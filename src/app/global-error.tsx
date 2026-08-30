'use client';

// Error boundaries must be Client Components
import { EmberField } from '@/components/shared/ember';
import '@/styles/main.css';

/**
 * Boundary of last resort: catches errors thrown by the root layout itself.
 *
 * This file *replaces* the root layout when it renders, so it ships its own
 * `<html>` and `<body>`, and Next does not hand it the app's global stylesheet
 * That is why the stylesheet is imported explicitly above, which is what lets
 * resolve at all.
 *
 * The theme is the other casualty: next-themes never mounts here, and the dark
 * variant in this project is class-based (`&:is(.dark *)`), so without help
 * every `dark:` class below would be inert. THEME_SCRIPT restores the same
 * decision next-themes makes (stored preference first, OS setting second)
 * before first paint.
 *
 * `metadata` is unavailable in a Client Component, so the tab title is set with
 * React's own `<title>`.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}`;

export default function GlobalError({
  error,
  retry
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid min-h-dvh place-items-center overflow-hidden bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-900 dark:text-neutral-100">
        <title>Something went wrong</title>

        <section className="relative grid min-h-dvh w-full place-items-center overflow-hidden px-6 py-24">
          <EmberField />

          <div className="relative flex max-w-xl flex-col items-center text-center">
            <p className="text-[0.7rem] font-semibold tracking-[0.4em] text-ember-coral uppercase dark:text-ember-amber">
              Total signal loss
            </p>

            <h1 className="mt-4 ember-text text-[clamp(5rem,22vw,11rem)] leading-[0.82] font-black tracking-tighter tabular-nums">
              500
            </h1>

            <span
              aria-hidden
              className="mt-8 h-px w-32 ember-rule"
            />

            <h2 className="mt-8 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-100">
              The application could not start.
            </h2>

            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              {error?.message || 'An unexpected error occurred in the root layout.'}
            </p>

            {error?.digest && (
              <p className="mt-5 rounded-sm border border-neutral-300/70 bg-white/60 px-3 py-1.5 font-mono text-[0.7rem] text-neutral-600 backdrop-blur-sm dark:border-neutral-700/70 dark:bg-neutral-900/60 dark:text-neutral-400">
                <span className="text-neutral-400 dark:text-neutral-500">digest </span>
                {error.digest}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => retry()}
                className="inline-flex ember-action cursor-pointer items-center justify-center rounded-sm px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase shadow-lg shadow-ember-coral/35 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-neutral-300 px-4 py-2 text-xs font-semibold tracking-widest text-neutral-800 uppercase transition-colors hover:border-ember-coral hover:text-ember-coral focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:border-neutral-700 dark:text-neutral-200 dark:focus-visible:ring-offset-neutral-900"
              >
                Go home
              </a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
