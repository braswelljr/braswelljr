'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { HiArrowDown } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { EASE_OUT } from '@/components/shared/motion';
import { Spinner } from '@/components/ui/spinner';
import { useAsRef } from '@/hooks/use-as-ref';

/** How far the marker must travel before letting go refreshes. */
const THRESHOLD = 80;
/** Where the marker stops, however far the finger keeps going. */
const MAX_PULL = 128;
/** The marker moves this fraction of the finger's distance, so the pull has
 *  weight and a refresh takes a deliberate, long drag. */
const RESISTANCE = 0.5;

type Phase = 'idle' | 'pulling' | 'armed' | 'refreshing';

type PullToRefreshProps = {
  /** Called when a pull is released past the threshold. The marker spins until
   *  the promise settles. */
  onRefresh: () => Promise<unknown>;
  className?: string;
};

/**
 * Pull down from the top of the page to refresh, the way a phone app does.
 *
 * Touch only: it starts when the page is already scrolled to the top and one
 * finger drags down. It renders a marker and nothing else, so it can sit
 * anywhere in a page without wrapping its content.
 */
export function PullToRefresh({ onRefresh, className }: PullToRefreshProps) {
  const isReduced = useReducedMotion();
  const pull = useMotionValue(0);
  const [phase, setPhase] = useState<Phase>('idle');

  const phaseRef = useRef<Phase>('idle');
  const startY = useRef<number | null>(null);
  const onRefreshRef = useAsRef(onRefresh);
  const reducedRef = useAsRef(isReduced);

  // Starts just above its resting place and fades in over the first stretch.
  const y = useTransform(pull, (value) => value - 24);
  const opacity = useTransform(pull, [0, 24, THRESHOLD], [0, 0.6, 1]);
  const rotate = useTransform(pull, [0, THRESHOLD], [0, 180]);

  useEffect(() => {
    const root = document.documentElement;
    // Stops the browser's own pull-to-refresh, which would reload the page
    // underneath this one.
    root.classList.add('overscroll-y-contain');

    const move = (next: Phase) => {
      phaseRef.current = next;
      setPhase(next);
    };

    const settle = () => {
      startY.current = null;
      animate(pull, 0, { duration: reducedRef.current ? 0 : 0.25, ease: EASE_OUT });
      move('idle');
    };

    const onTouchStart = (event: TouchEvent) => {
      if (phaseRef.current === 'refreshing') return;
      if (event.touches.length !== 1 || window.scrollY > 0) return;
      startY.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (startY.current === null) return;
      // A second finger is a pinch, and a page that has scrolled is a scroll.
      if (event.touches.length !== 1 || window.scrollY > 0) return settle();

      const distance = event.touches[0].clientY - startY.current;
      if (distance <= 0) {
        pull.set(0);
        if (phaseRef.current !== 'idle') move('idle');
        return;
      }

      const travelled = Math.min(MAX_PULL, distance * RESISTANCE);
      pull.set(travelled);

      const next = travelled >= THRESHOLD ? 'armed' : 'pulling';
      if (phaseRef.current !== next) move(next);
    };

    const onTouchEnd = () => {
      if (startY.current === null) return;
      if (phaseRef.current !== 'armed') return settle();

      startY.current = null;
      move('refreshing');
      animate(pull, THRESHOLD, { duration: reducedRef.current ? 0 : 0.2, ease: EASE_OUT });
      // Settle whether the refresh worked or not: a failed request must not
      // leave the marker spinning.
      void onRefreshRef.current().then(settle, settle);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', settle);

    return () => {
      root.classList.remove('overscroll-y-contain');
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', settle);
    };
  }, [pull, onRefreshRef, reducedRef]);

  return (
    <motion.div
      role="status"
      // Positions that follow the finger, so they are motion values, not classes.
      style={{ y, opacity }}
      className={cn(
        'pointer-events-none fixed top-28 left-1/2 z-20 -ml-5 flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-primary shadow-lg lg:top-16 dark:border-neutral-800 dark:bg-neutral-950',
        className
      )}
    >
      {phase === 'refreshing' ? (
        <Spinner className="size-5" />
      ) : (
        <motion.span
          style={{ rotate }}
          className="inline-flex"
        >
          <HiArrowDown
            aria-hidden
            className="size-5"
          />
        </motion.span>
      )}
      <span className="sr-only">
        {phase === 'refreshing' && 'Refreshing'}
        {phase === 'armed' && 'Release to refresh'}
      </span>
    </motion.div>
  );
}
