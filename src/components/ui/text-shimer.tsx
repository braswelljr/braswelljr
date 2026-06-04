'use client';

import React, { useMemo, type JSX } from 'react';
import { motion } from 'motion/react';
import { cn } from 'lib/utils';

interface TextShimmerProps {
  /** The HTML element type to render as (e.g., 'p', 'span', etc.) */
  as?: React.ElementType;
  /** The text to apply the shimmer effect to */
  children: string;
  /** Additional class names for styling */
  className?: string;
  /** Duration of the shimmer effect animation in seconds */
  duration?: number;
  /** Spread factor to adjust the width of the shimmer gradient */
  spread?: number;
  style?: React.CSSProperties;
}

/**
 * TextShimmer component applies a shimmer effect to text with customizable duration and spread.
 *
 * CSS Variables:
 * - `--base-color`: Base color of the text when the shimmer effect is applied.
 * - `--base-gradient-color`: Color of the gradient within the shimmer effect.
 * - `--bg`: Linear gradient background used for the shimmer animation.
 * - `--spread`: Controls the width of the gradient’s animated shimmer area based on the text length.
 *
 * Usage example:
 * ```tsx
 * <TextShimmer className="text-lg" duration={2.5} spread={3}>Shimmer Text</TextShimmer>
 * ```
 */
export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
  ...props
}: TextShimmerProps) {
  const MotionComponent = motion.create(Component as keyof JSX.IntrinsicElements);

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    // eslint-disable-next-line react-hooks/static-components
    <MotionComponent
      className={cn(
        'relative inline-block bg-size-[250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
        '[background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear'
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
          ...props.style
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
