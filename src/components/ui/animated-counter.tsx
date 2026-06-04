'use client';

import { useRef } from 'react';
import {
  animate,
  KeyframeOptions,
  useInView,
  UseInViewOptions,
  useIsomorphicLayoutEffect,
  useMotionValue,
  useSpring
} from 'motion/react';
import { cn } from 'lib/utils';

/**
 *
 * @param root0
 * @param root0.value
 */

type AnimatedCounterProps = {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  options?: UseInViewOptions;
};

export function AnimatedCounter({
  value,
  direction = 'up',
  className,
  options
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100
  });
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-100px',
    ...options
  });

  useIsomorphicLayoutEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value);
    }
  }, [motionValue, isInView]);

  useIsomorphicLayoutEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(Number(latest));
        }
      }),
    [springValue]
  );

  return (
    <span
      className={className}
      ref={ref}
    />
  );
}

type AnimatedCounterFromProps = {
  from?: number;
  to: number;
  options?: KeyframeOptions;
  once?: boolean;
  className?: string;
};

export function AnimatedCounterFrom({
  from = 0,
  to,
  options,
  className
}: AnimatedCounterFromProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const controls = animate(from, to, {
      duration: 1.5,
      ease: 'easeOut',
      ...options,
      onUpdate(latest) {
        element.textContent = latest.toFixed(0);
      }
    });

    return () => {
      controls.stop();
    };
  }, [ref, to, from]);

  return (
    <span
      ref={ref}
      className={cn(className)}
    />
  );
}
