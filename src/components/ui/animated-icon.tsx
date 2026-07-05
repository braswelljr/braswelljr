'use client';

import { useState } from 'react';
import type { Icon, IconProps } from 'iconsax-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from 'lib/utils';

export type AnimatedIconProps = Omit<IconProps, 'variant' | 'size' | 'color' | 'ref'> & {
  /** The Iconsax icon component to render, e.g. `Home2`. */
  icon: Icon;
  /** Force the active (bold) state — e.g. the current nav tab. */
  active?: boolean;
  /** External hover signal, e.g. from a parent tab/button surface. */
  hovered?: boolean;
  size?: number | string;
  color?: string;
  className?: string;
  /** Variant shown at rest. */
  idleVariant?: IconProps['variant'];
  /** Variant morphed to when active/hovered. */
  activeVariant?: IconProps['variant'];
};

/**
 * Iconsax icon that morphs between its line and bold weights and springs on
 * activation. Fully controlled via `active`/`hovered`, and also reacts to its
 * own hover, so it works standalone or driven by a parent surface. Honors
 * `prefers-reduced-motion` by swapping the variant instantly with no motion.
 */
export function AnimatedIcon({
  icon: IconComponent,
  active = false,
  hovered,
  size = 20,
  color = 'currentColor',
  className,
  idleVariant = 'Linear',
  activeVariant = 'Bold',
  ...rest
}: AnimatedIconProps) {
  const reduced = useReducedMotion();
  const [selfHover, setSelfHover] = useState(false);
  const isActive = active || hovered || selfHover;
  const variant = isActive ? activeVariant : idleVariant;
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <motion.span
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: dimension, height: dimension }}
      onHoverStart={() => setSelfHover(true)}
      onHoverEnd={() => setSelfHover(false)}
      animate={reduced ? undefined : { scale: isActive ? 1.12 : 1 }}
      whileTap={reduced ? undefined : { scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {reduced ? (
        <IconComponent
          variant={variant}
          size={size}
          color={color}
          {...rest}
        />
      ) : (
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.span
            key={variant}
            className="inline-flex"
            initial={{ opacity: 0, rotate: -25, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 25, scale: 0.7 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <IconComponent
              variant={variant}
              size={size}
              color={color}
              {...rest}
            />
          </motion.span>
        </AnimatePresence>
      )}
    </motion.span>
  );
}
