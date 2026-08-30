import { cn } from 'lib/utils';

/**
 * The shared atmosphere behind every status screen.
 *
 * Five ember pools across the spectrum: yellow, amber, coral, magenta, and a
 * single cold teal that keeps the composition from reading as one orange wash
 * all under a rotating conic sweep and a film-grain overlay. The gradients live
 * as `@utility` rules in main.css so this stays pure Tailwind.
 *
 * Purely decorative: `aria-hidden`, and every animation is switched off under
 * `prefers-reduced-motion` via the `data-ember` hook in main.css.
 */
export function EmberField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-ember
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Rotating sweep, anchored well outside the frame so only its edge shows. */}
      <div className="absolute top-1/2 left-1/2 aspect-square w-[170vmax] -translate-x-1/2 -translate-y-1/2 animate-ember-drift ember-sweep opacity-45 dark:opacity-40" />

      {/* Overlapping pools. Offsets are deliberately uneven so the colours mix
          into new hues where they cross instead of sitting in tidy rows. */}
      <div className="absolute top-[22%] left-1/2 size-104 translate-x-[-105%] -translate-y-1/2 animate-ember-breathe rounded-full blur-[80px] [animation-delay:-1s] ember-pool-yellow" />
      <div className="absolute top-[38%] left-1/2 size-136 translate-x-[-62%] -translate-y-1/2 animate-ember-breathe rounded-full blur-[90px] ember-pool-amber" />
      <div className="absolute top-[54%] left-1/2 size-128 translate-x-[-28%] -translate-y-1/2 animate-ember-breathe rounded-full blur-[90px] [animation-delay:-3s] ember-pool-coral" />
      <div className="absolute top-[30%] left-1/2 size-112 translate-x-[5%] -translate-y-1/2 animate-ember-breathe rounded-full blur-[95px] [animation-delay:-4.5s] ember-pool-magenta" />
      <div className="absolute top-[70%] left-1/2 size-96 translate-x-[-85%] -translate-y-1/2 animate-ember-breathe rounded-full blur-[85px] [animation-delay:-2s] ember-pool-teal" />

      {/* Grain, then a light vignette, kept thin so the colour still reads. */}
      <div className="absolute inset-0 bg-grain opacity-[0.18] mix-blend-overlay dark:opacity-[0.25]" />
      <div className="absolute inset-0 bg-linear-to-b from-white/55 via-white/15 to-white/65 dark:from-neutral-900/60 dark:via-neutral-900/10 dark:to-neutral-900/75" />
    </div>
  );
}

/** Per-bar offset and colour, written out so both are real Tailwind classes
 *  rather than computed style attributes. */
const BARS = [
  { delay: '[animation-delay:0s]', tone: 'from-ember-magenta to-ember-coral' },
  { delay: '[animation-delay:0.12s]', tone: 'from-ember-coral to-ember-amber' },
  { delay: '[animation-delay:0.24s]', tone: 'from-ember-amber to-ember-yellow' },
  { delay: '[animation-delay:0.36s]', tone: 'from-ember-coral to-ember-amber' },
  { delay: '[animation-delay:0.48s]', tone: 'from-ember-magenta to-ember-coral' }
];

/**
 * Five ember bars rising and falling out of phase: the loading mark.
 *
 * CSS-only, so it can render from a Server Component (`app/loading.tsx`)
 * without pulling the motion runtime into the first thing a visitor waits on.
 */
export function EmberBars({ className }: { className?: string }) {
  return (
    <div
      data-ember
      className={cn('flex items-end gap-1.5', className)}
    >
      {BARS.map(({ delay, tone }) => (
        <span
          key={delay}
          className={cn(
            'h-10 w-1.5 origin-bottom animate-ember-bar rounded-full bg-linear-to-t',
            tone,
            delay
          )}
        />
      ))}
    </div>
  );
}
