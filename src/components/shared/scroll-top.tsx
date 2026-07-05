'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HiArrowUp } from 'react-icons/hi';
import { cn } from 'lib/utils';
import useTop from '@/hooks/use-top';

type ScrollToTopProps = {
  className?: string;
  offset?: number;
  disableOnRoutes?: string[];
  disableOnLayouts?: string[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
};

export default function ScrollTop({
  className,
  offset = 100,
  disableOnRoutes = [],
  disableOnLayouts = [],
  ...props
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isReduced = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > offset);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  const isHidden =
    (disableOnRoutes && disableOnRoutes.includes(pathname)) ||
    (disableOnLayouts && disableOnLayouts.some((l) => pathname.startsWith(l)));

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={isReduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          {...props}
          className={cn(
            'flex size-10 items-center justify-center rounded-sm bg-neutral-900 text-white dark:bg-neutral-500 dark:text-white',
            className
          )}
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (typeof props.onClick === 'function') props.onClick(e);
          }}
          aria-label="Scroll to top"
        >
          <HiArrowUp className="h-5 w-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function ScrollToTopWithBlog({
  className,
  offset = 100,
  disableOnRoutes,
  disableOnLayouts,
  ...props
}: ScrollToTopProps) {
  const pathname = usePathname();
  const top = useTop();
  const isReduced = useReducedMotion();

  const isHidden =
    (disableOnRoutes && disableOnRoutes.includes(pathname)) ||
    (disableOnLayouts && disableOnLayouts.some((l) => pathname.startsWith(l)));

  return (
    <AnimatePresence>
      {!isHidden && top >= offset && (
        <motion.button
          key="scroll-top-blog"
          type="button"
          initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          whileTap={{ scale: 0.95 }}
          {...props}
          className={cn(
            'relative inline-flex items-center gap-1 pb-1.5 pl-0.5 uppercase',
            className
          )}
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (typeof props.onClick === 'function') props.onClick(e);
          }}
          aria-label="Scroll to top"
        >
          <HiArrowUp className="size-3" />
          <span>Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
