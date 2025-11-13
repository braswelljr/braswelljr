'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { HiArrowUp } from 'react-icons/hi';
import { cn } from 'lib/utils';
import useTop from '~/hooks/useTop';

type ScrollToTopProps = React.ComponentProps<'button'> & {
  offset?: number;
  disableOnRoutes?: string[];
  disableOnLayouts?: string[];
};

export default function ScrollTop({ className, offset = 100, disableOnRoutes = [], disableOnLayouts = [], ...props }: ScrollToTopProps) {
  const scrollRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll event handler
    function scroll() {
      // Check if ref exists
      if (scrollRef.current) {
        // Check if scroll position is greater than offset
        if (window.scrollY > offset) {
          scrollRef.current.classList.remove('translate-y-20');
        } else {
          scrollRef.current.classList.add('translate-y-20');
        }
      }
    }

    // Add event listener
    window.addEventListener('scroll', scroll);

    return () => {
      // Remove event listener
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <button
      ref={scrollRef}
      type="button"
      {...props}
      className={cn(
        className,
        'flex size-10 translate-y-20 items-center justify-center rounded-sm bg-neutral-900 text-white transition-transform dark:bg-neutral-500 dark:text-white',
        disableOnRoutes && disableOnRoutes.includes(pathname) && 'hidden',
        disableOnLayouts && disableOnLayouts.some((layout) => pathname.startsWith(layout)) && 'hidden'
      )}
      onClick={(e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof props.onClick === 'function') {
          props.onClick(e);
        }
      }}
    >
      <HiArrowUp className="h-5 w-auto" />
    </button>
  );
}

export function ScrollToTopWithBlog({ className, offset = 100, disableOnRoutes, disableOnLayouts, ...props }: ScrollToTopProps) {
  const pathname = usePathname();
  const top = useTop();

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'relative inline-flex items-center gap-1 pb-1.5 pl-0.5 uppercase',
        disableOnRoutes && disableOnRoutes.includes(pathname) && 'hidden',
        disableOnLayouts && disableOnLayouts.some((layout) => pathname.startsWith(layout)) && 'hidden',
        top < offset && 'hidden',
        className
      )}
      onClick={(e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof props.onClick === 'function') {
          props.onClick(e);
        }
      }}
    >
      <HiArrowUp className="size-3" />
      <span>Scroll to top</span>
    </button>
  );
}
