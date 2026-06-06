'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { isAfter, subDays } from 'date-fns';
import { Callout } from 'fumadocs-ui/components/callout';
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'motion/react';
import { FaGithub } from 'react-icons/fa6';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { cn } from 'lib/utils';
import { cardVariants, containerVariants, EASE_OUT, safeVariants } from '@/components/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type BlogPostContentProps = {
  title: string;
  description: string;
  date: string; // ISO string
  tags?: string[];
  readingTime: string;
  path: string;

  MDX: React.ComponentType<any>;

  mdxComponents: Record<string, any>;
};

export function BlogPostContent({
  title,
  description,
  date,
  tags,
  readingTime,
  path,
  MDX,
  mdxComponents
}: BlogPostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const dateObj = new Date(date);
  const isNew = isAfter(dateObj, subDays(new Date(), 150));

  useGSAP(
    () => {
      if (isReduced) return;

      // ── Header entrance ──────────────────────────────────────────────────
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

      // ── Body ScrollTrigger — paragraphs and headings ──────────────────────
      if (bodyRef.current) {
        const elements = bodyRef.current.querySelectorAll(
          'h1, h2, h3, h4, p, pre, blockquote, ul, ol, table, .fd-callout'
        );

        elements.forEach((el) => {
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

      // ── Footer meta + callout ─────────────────────────────────────────────
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: metaRef.current,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      if (calloutRef.current) {
        gsap.fromTo(
          calloutRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: calloutRef.current,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative pt-[calc(var(--fd-nav-height)+15px)] lg:pt-[calc(var(--fd-nav-height)+5px)]"
    >
      {/* Header */}
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

      {/* Body */}
      <DocsBody>
        <div ref={bodyRef}>
          <MDX components={mdxComponents} />
        </div>

        <div
          ref={metaRef}
          className="space-y-1"
        >
          <p>
            Published on {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(dateObj)}
          </p>
          <p>{readingTime}</p>
        </div>

        <div ref={calloutRef}>
          <Callout
            type="warn"
            title="Found an Issue!"
          >
            <p>
              Find an issue with this post? Think you could clarify, update or add something? All my
              posts are available to edit on Github. Any fix, little or small, is appreciated!
            </p>
            <Link
              href={`https://github.com/braswelljr/braswelljr/blob/main/content/blog/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex w-auto items-center gap-2 pb-1 text-base no-underline"
            >
              <FaGithub className="size-4" />
              Edit on GitHub
            </Link>
          </Callout>
        </div>
      </DocsBody>
    </div>
  );
}
