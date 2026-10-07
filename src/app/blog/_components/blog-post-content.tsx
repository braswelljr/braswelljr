'use client';

import { useEffect, useRef } from 'react';
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { motion, useReducedMotion } from 'motion/react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  itemVariants,
  safeVariants
} from '@/components/shared/motion';
import { isNewDate } from './post';

export type BlogPostHeaderProps = {
  title: string;
  description: string;
  date: string; // ISO string
  tags?: string[];
  /** Rendered MDX body + footer -passed as children from the server component */
  children: React.ReactNode;
};

/** How long a revealed block keeps its transition before the hook is removed. */
const REVEAL_SETTLE_MS = 400;

export function BlogPostContent({ title, description, date, tags, children }: BlogPostHeaderProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const isNew = isNewDate(date);

  // Each top-level block of the post rises in the first time it enters the
  // viewport, and then stays.
  //
  // Three things here are deliberate, because each one used to cut content off:
  //
  //   - Only blocks that start below the fold are hidden. What is already on
  //     screen is never made to disappear and come back.
  //   - A block is revealed the moment any part of it is visible. The trigger
  //     has no inset, so the last blocks of a post, which can never scroll far
  //     up the screen, still appear.
  //   - Only top-level blocks are touched. A tab group is one block, so the
  //     code inside a tab that is not selected is never left invisible.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || isReduced) return;

    const timers = new Set<number>();
    const reveal = (block: HTMLElement) => {
      block.dataset.reveal = 'shown';
      // Drop the hook once the transition is done, so the block is left
      // exactly as the stylesheet styles it.
      const timer = window.setTimeout(() => {
        delete block.dataset.reveal;
        timers.delete(timer);
      }, REVEAL_SETTLE_MS);
      timers.add(timer);
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }
    });

    const blocks = Array.from(body.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );

    for (const block of blocks) {
      if (block.getBoundingClientRect().top < window.innerHeight) continue;
      block.dataset.reveal = 'pending';
      observer.observe(block);
    }

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      // Nothing may be left hidden if the effect is torn down early.
      blocks.forEach((block) => delete block.dataset.reveal);
    };
  }, [isReduced]);

  return (
    <div className="relative pt-[calc(var(--fd-nav-height)+15px)] lg:pt-[calc(var(--fd-nav-height)+5px)]">
      {/* Header: badge, title, description, then tags, one after another. */}
      <motion.div
        className="space-y-4"
        variants={safeVariants(containerVariants, isReduced)}
        initial="hidden"
        animate="visible"
      >
        {isNew && (
          <motion.div
            variants={safeVariants(itemVariants, isReduced)}
            className="inline-flex h-8 w-auto items-center gap-1 rounded-sm bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-neutral-700 uppercase dark:bg-neutral-800 dark:text-primary-400"
          >
            <MdOutlineWorkspacePremium
              aria-hidden
              className="h-3 w-auto"
            />
            <span>New</span>
          </motion.div>
        )}
        <motion.div variants={safeVariants(itemVariants, isReduced)}>
          <DocsTitle className="text-primary!">{title}</DocsTitle>
        </motion.div>
        <motion.div variants={safeVariants(itemVariants, isReduced)}>
          <DocsDescription>{description}</DocsDescription>
        </motion.div>
        {tags && tags.length > 0 && (
          <motion.ul
            aria-label="Tags"
            className="my-2 flex list-none flex-wrap gap-2 py-6 pl-0"
            variants={safeVariants(containerVariants, isReduced)}
          >
            {tags.map((tag) => (
              <motion.li
                key={tag}
                variants={safeVariants(cardVariants, isReduced)}
                className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary dark:bg-neutral-800 dark:text-secondary"
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      {/* MDX body + footer -rendered by server, passed as children */}
      <DocsBody>
        <div
          ref={bodyRef}
          className={cn(
            // Transform and opacity only, under 300ms, on the shared ease-out
            // curve. A pending block sits slightly low and transparent.
            '*:data-reveal:transition-[opacity,translate] *:data-reveal:duration-300 *:data-reveal:ease-[cubic-bezier(0.23,1,0.32,1)]',
            '*:data-[reveal=pending]:translate-y-5 *:data-[reveal=pending]:opacity-0'
          )}
        >
          {children}
        </div>
      </DocsBody>
    </div>
  );
}
