'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { isAfter, subDays } from 'date-fns';
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'motion/react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { cardVariants, containerVariants, safeVariants } from '@/components/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type BlogPostHeaderProps = {
  title: string;
  description: string;
  date: string; // ISO string
  tags?: string[];
  /** Rendered MDX body + footer — passed as children from the server component */
  children: React.ReactNode;
};

export function BlogPostContent({ title, description, date, tags, children }: BlogPostHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const dateObj = new Date(date);
  const isNew = isAfter(dateObj, subDays(new Date(), 150));

  useGSAP(
    () => {
      if (isReduced) return;

      // Header entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (isNew && badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -10, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, clearProps: 'all' }
        );
      }

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' },
        isNew ? '-=0.1' : '0'
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, clearProps: 'all' },
          '-=0.25'
        )
        .fromTo(
          tagsRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, clearProps: 'all' },
          '-=0.2'
        );

      // Body ScrollTrigger — every h1-h4, p, pre, blockquote, list, table
      if (bodyRef.current) {
        bodyRef.current
          .querySelectorAll('h1, h2, h3, h4, p, pre, blockquote, ul, ol, table')
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out',
                clearProps: 'all',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 92%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative pt-[calc(var(--fd-nav-height)+15px)] lg:pt-[calc(var(--fd-nav-height)+5px)]"
    >
      {/* Animated header */}
      <div className="space-y-4">
        {isNew && (
          <div
            ref={badgeRef}
            className="inline-flex h-8 w-auto items-center gap-1 rounded-sm bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-neutral-700 uppercase dark:bg-neutral-800 dark:text-primary-400"
          >
            <MdOutlineWorkspacePremium className="h-3 w-auto" />
            <span>New</span>
          </div>
        )}
        <div ref={titleRef}>
          <DocsTitle className="text-primary!">{title}</DocsTitle>
        </div>
        <div ref={descRef}>
          <DocsDescription>{description}</DocsDescription>
        </div>
        {tags && tags.length > 0 && (
          <motion.div
            ref={tagsRef}
            className="my-2 flex flex-wrap gap-2 py-6"
            variants={safeVariants(containerVariants, isReduced)}
            initial="hidden"
            animate="visible"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                variants={safeVariants(cardVariants, isReduced)}
                className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary dark:bg-neutral-800 dark:text-secondary"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* MDX body + footer — rendered by server, passed as children */}
      <DocsBody>
        <div ref={bodyRef}>{children}</div>
      </DocsBody>
    </div>
  );
}
