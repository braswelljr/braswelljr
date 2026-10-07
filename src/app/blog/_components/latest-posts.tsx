'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { IoAlbums } from 'react-icons/io5';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import type { Swiper as SwiperInstance } from 'swiper';
import { A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  hoverLift,
  safeVariants
} from '@/components/shared/motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { isNewPost, type BlogPost } from './post';

type LatestPostsProps = {
  posts: BlogPost[];
  className?: string;
};

/**
 * The newest posts as a row of cards a visitor can drag through.
 *
 * It is one row tall however many posts there are, which is the point: the
 * newest writing leads the page without pushing everything else down it.
 */
export function LatestPosts({ posts, className }: LatestPostsProps) {
  const isReduced = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [position, setPosition] = useState({ index: 0, isBeginning: true, isEnd: false, stops: 1 });

  const sync = (instance: SwiperInstance) =>
    setPosition({
      index: instance.snapIndex,
      isBeginning: instance.isBeginning,
      isEnd: instance.isEnd,
      stops: instance.snapGrid.length
    });

  if (posts.length < 1) return null;

  return (
    <section
      aria-labelledby="latest-posts-heading"
      className={cn('space-y-4', className)}
    >
      <header className="flex items-end justify-between gap-4">
        <h2
          id="latest-posts-heading"
          className="text-sm font-semibold tracking-widest text-neutral-600 uppercase dark:text-neutral-400"
        >
          Fresh off the press
        </h2>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous posts"
            disabled={position.isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <HiArrowLeft
              aria-hidden
              className="size-4"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next posts"
            disabled={position.isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <HiArrowRight
              aria-hidden
              className="size-4"
            />
          </Button>
        </div>
      </header>

      <motion.div
        variants={safeVariants(containerVariants, isReduced)}
        initial="hidden"
        animate="visible"
      >
        <Swiper
          modules={[A11y, Mousewheel]}
          wrapperTag="ul"
          slidesPerView={1.08}
          spaceBetween={16}
          breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.2 } }}
          mousewheel={{ forceToAxis: true }}
          speed={isReduced ? 0 : 300}
          grabCursor
          a11y={{ slideLabelMessage: 'Post {{index}} of {{slidesLength}}' }}
          onSwiper={(instance) => {
            setSwiper(instance);
            sync(instance);
          }}
          onSlideChange={sync}
          onBreakpoint={sync}
          // Room for the cards to lift on hover without being clipped.
          className="-mx-4 px-4 py-2"
        >
          {posts.map((post, i) => (
            <SwiperSlide
              key={post.slug}
              tag="li"
              // Stretch to the tallest card in the row, and pass that height on.
              className="flex h-auto"
            >
              <LatestPostCard
                post={post}
                order={i + 1}
                isReduced={isReduced}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {position.stops > 1 && (
        <ol
          aria-label="Choose a post"
          className="flex justify-center gap-1.5"
        >
          {Array.from({ length: position.stops }, (_, stop) => stop).map((stop) => (
            <li key={stop}>
              <button
                type="button"
                aria-label={`Go to post ${stop + 1}`}
                aria-current={stop === position.index}
                onClick={() => swiper?.slideTo(stop)}
                className={cn(
                  'block h-1.5 w-4 rounded-full bg-neutral-300 transition-colors duration-200 ease-out dark:bg-neutral-700',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  stop === position.index && 'bg-primary dark:bg-primary'
                )}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function LatestPostCard({
  post,
  order,
  isReduced
}: {
  post: BlogPost;
  order: number;
  isReduced: boolean | null;
}) {
  const isNew = isNewPost(post);

  return (
    <motion.article
      variants={safeVariants(cardVariants, isReduced)}
      {...(isReduced ? {} : hoverLift)}
      className="group relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 backdrop-blur sm:p-6 dark:border-neutral-800 dark:bg-neutral-950/80"
    >
      {/* The running order, oversized and faint. Decoration only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-3 bg-linear-to-l from-secondary to-primary bg-clip-text text-8xl font-black text-transparent opacity-15 select-none dark:to-primary"
      >
        {String(order).padStart(2, '0')}
      </span>

      <div className="relative flex flex-wrap items-center gap-2">
        {isNew && (
          <Badge className="justify-center gap-1 bg-primary leading-none text-neutral-950 uppercase dark:bg-primary dark:text-neutral-950">
            <MdOutlineWorkspacePremium
              aria-hidden
              className="size-3.5"
            />
            New
          </Badge>
        )}
        {!post.published && (
          <Badge
            variant="secondary"
            className="justify-center gap-1 leading-none uppercase"
          >
            <IoAlbums
              aria-hidden
              className="size-3.5"
            />
            Draft
          </Badge>
        )}
        <time
          dateTime={post.date}
          className="text-sm font-semibold text-primary"
        >
          {formatDate(post.date, '{MMMM} {DD}, {YYYY}')}
        </time>
      </div>

      <div className="relative space-y-2">
        <h3 className="text-xl leading-snug font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {/* The link stretches over the card, so the whole card is one target
              with one name. */}
          <Link
            href={post.slug}
            className="after:absolute after:-inset-6 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
          {post.description}
        </p>
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-4">
        <ul
          aria-label="Tags"
          className="flex flex-wrap items-center gap-1.5"
        >
          {post.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="inline-flex h-5 items-center justify-center rounded-sm bg-primary-100 px-2 text-xsm leading-none font-medium text-neutral-900 dark:bg-primary-900 dark:text-neutral-100"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
          {post.readingTime}
          <HiArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </span>
      </div>

      {/* Focus ring for the stretched link, drawn on the card it covers. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-primary group-focus-within:ring-2"
      />
    </motion.article>
  );
}
