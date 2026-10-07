'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EmberBars, EmberField } from '@/components/shared/ember';
import { EASE_OUT } from '@/components/shared/motion';
import useEventListener from '@/hooks/use-event-listener';

/** Up, up, down, down, left, right, left, right, B, A. */
const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a'
];

/** How long the embers stay lit. */
const BURN_MS = 4_500;

/**
 * The easter egg: the Konami code washes the page in the status-screen embers
 * for a few seconds.
 *
 * It only ever fades, and the field's own motion is switched off under
 * `prefers-reduced-motion` by its `data-ember` hook, so it is a still wash of
 * colour there. Clicks pass straight through it.
 */
export function EmberMode() {
  const [lit, setLit] = useState(false);
  const progress = useRef(0);

  useEventListener('keydown', (event) => {
    // Typing in a field is typing, not a cheat code.
    if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) {
      return;
    }

    const key = event.key.toLowerCase();
    if (key === KONAMI[progress.current]) progress.current += 1;
    else progress.current = key === KONAMI[0] ? 1 : 0;

    if (progress.current === KONAMI.length) {
      progress.current = 0;
      setLit(true);
    }
  });

  useEffect(() => {
    if (!lit) return;
    const timer = window.setTimeout(() => setLit(false), BURN_MS);
    return () => window.clearTimeout(timer);
  }, [lit]);

  return (
    <AnimatePresence>
      {lit && (
        <motion.div
          role="status"
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          <EmberField />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <EmberBars />
            <p className="bg-linear-to-l from-secondary to-primary bg-clip-text text-3xl font-black text-transparent uppercase sm:text-5xl dark:to-primary">
              Embers lit
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You know the code. Nice.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
