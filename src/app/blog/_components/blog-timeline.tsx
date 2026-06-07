'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { isAfter, subDays } from 'date-fns';
import { gsap } from 'gsap';
import { motion, useReducedMotion } from 'motion/react';
import { HiChevronRight } from 'react-icons/hi';
import { IoAlbums } from 'react-icons/io5';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  EASE_OUT,
  headingVariants,
  MotionLink,
  safeVariants
} from '@/components/motion';
import { formatDate } from '@/utils/formatDate';

gsap.registerPlugin(useGSAP);

export type BlogPost = {
  title: string;
  description: string;
  date: string; // ISO string — serialized from server
  tags?: string[];
  slug: string;
  published: boolean;
  readingTime: string;
};

export function BlogTimeline({ posts }: { posts: BlogPost[] }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced || !headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' }
    );
  });

  return (
    <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
      <motion.h2
        ref={headingRef}
        variants={safeVariants(headingVariants, isReduced)}
        initial="hidden"
        animate="visible"
        className="text-2xl leading-tight font-bold tracking-tight text-primary! uppercase sm:text-3xl md:text-4xl"
      >
        Blog
      </motion.h2>

      <div className="relative ml-4 pt-5 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
        {/* Animated vertical line */}
        <motion.div
          className={cn(
            'absolute top-3 right-full -bottom-10 w-px bg-primary!',
            'mr-7 ml-5 md:mr-13'
          )}
          initial={isReduced ? undefined : { scaleY: 0 }}
          animate={isReduced ? undefined : { scaleY: 1 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          style={{ transformOrigin: 'top' }}
        />

        <motion.div
          className="space-y-16"
          variants={safeVariants(containerVariants, isReduced)}
          initial="hidden"
          animate="visible"
        >
          {posts.map(({ title, description, date, tags, slug, published, readingTime }, i) => {
            const dateObj = new Date(date);
            const isNew = isAfter(dateObj, subDays(new Date(), 150));

            return (
              <motion.article
                key={i}
                variants={safeVariants(cardVariants, isReduced)}
                className="group relative"
              >
                <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />

                {/* Timeline dot */}
                <motion.svg
                  viewBox="0 0 9 9"
                  className={cn(
                    'absolute top-2 right-full size-[calc(0.5rem+1px)] overflow-visible text-primary!',
                    'mr-6 ml-5 md:mr-12'
                  )}
                  initial={isReduced ? undefined : { scale: 0, opacity: 0 }}
                  whileInView={isReduced ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                    delay: i * 0.05
                  }}
                >
                  <circle
                    cx="4.5"
                    cy="4.5"
                    r="4.5"
                    stroke="currentColor"
                    className="fill-white dark:fill-neutral-900"
                    strokeWidth={2}
                  />
                </motion.svg>

                <div className="relative">
                  {(isNew || !published) && (
                    <motion.div
                      className="relative flex flex-wrap gap-2 pt-8 lg:pt-0 lg:pb-3"
                      initial={isReduced ? undefined : { opacity: 0, y: -6 }}
                      whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
                    >
                      {isNew && (
                        <div className="inline-flex h-6 w-auto items-center gap-1 rounded-sm bg-primary-300 px-1.5 py-1 pr-2 text-xsm font-bold text-neutral-950 uppercase dark:bg-primary dark:text-white">
                          <MdOutlineWorkspacePremium className="size-3.5" />
                          New
                        </div>
                      )}
                      {!published && (
                        <div className="inline-flex h-6 w-auto items-center gap-1 rounded-sm bg-secondary-300 px-2.5 py-0.5 text-xs font-medium text-neutral-950 uppercase dark:bg-stone-950 dark:text-secondary">
                          <IoAlbums className="size-3.5" />
                          <span>
                            Draft / Unpublished<span className="sr-only">, {title}</span>
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <motion.h3
                    className={cn(
                      'text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-200',
                      isNew || !published ? 'pt-3 lg:pt-0' : 'pt-8 lg:pt-0'
                    )}
                    initial={isReduced ? undefined : { opacity: 0, y: -6, x: -6 }}
                    whileInView={isReduced ? undefined : { opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
                  >
                    {title}
                  </motion.h3>

                  <motion.div
                    className="mt-2 mb-4 line-clamp-2 font-medium text-neutral-900 dark:text-neutral-400"
                    initial={isReduced ? undefined : { opacity: 0, y: -6, x: -6 }}
                    whileInView={isReduced ? undefined : { opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
                  >
                    {description}
                  </motion.div>

                  {Array.isArray(tags) && tags.length > 0 && (
                    <motion.div
                      className="my-2 mb-4 flex flex-wrap gap-2"
                      variants={safeVariants(containerVariants, isReduced)}
                    >
                      {tags.map((tag, j) => (
                        <motion.span
                          key={j}
                          variants={safeVariants(cardVariants, isReduced)}
                          className="inline-flex items-center rounded-sm bg-primary-200 px-2 py-1 text-xsm font-medium text-neutral-950 dark:bg-primary dark:text-white"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  <div className="text-sm text-neutral-700 dark:text-neutral-400">
                    {readingTime}
                  </div>

                  {/* Date — slides in from left */}
                  <motion.dl
                    className="absolute top-0 left-0 lg:right-full lg:left-auto lg:mr-[calc(6.5rem+1px)]"
                    initial={isReduced ? undefined : { opacity: 0, x: -12 }}
                    whileInView={isReduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 + i * 0.04 }}
                  >
                    <dt className="sr-only">Date</dt>
                    <dd className="leading-6 font-bold whitespace-nowrap text-primary">
                      <time dateTime={date}>
                        {date ? formatDate(dateObj, '{MMMM} {DD}, {YYYY}') : 'unknown'}
                      </time>
                    </dd>
                  </motion.dl>
                </div>

                {/* Read more link — fades up last */}
                <MotionLink
                  href={slug}
                  className="link-underline group/link relative mt-5 inline-flex items-center justify-start gap-1 pb-1 text-sm font-semibold text-primary! uppercase hover:bg-size-[95%_3px]"
                  initial={isReduced ? undefined : { opacity: 0, x: -8 }}
                  whileInView={isReduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.25, ease: EASE_OUT, delay: 0.18 + i * 0.04 }}
                  whileHover={{ gap: '8px', transition: { duration: 0.15 } }}
                >
                  <span>
                    Read more<span className="sr-only">, {title}</span>
                  </span>
                  <HiChevronRight className="h-5 w-auto overflow-visible" />
                </MotionLink>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
