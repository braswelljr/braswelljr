'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { HiArrowLeft, HiArrowRight, HiChevronRight, HiX } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { containerVariants, itemVariants, safeVariants } from '@/components/shared/motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { formatDate } from '@/utils/formatDate';
import { isNewPost, type BlogPost } from './post';

/** Rows per page. Short on purpose: the list must not grow with the blog. */
const PAGE_SIZE = 6;

type PostArchiveProps = {
  /** Every post, newest first. */
  posts: BlogPost[];
  className?: string;
};

/**
 * Every post as a compact, paged list that can be narrowed by topic.
 *
 * There are never more than `PAGE_SIZE` rows, so the page is the same height
 * at twenty posts as at two hundred. Any number of topics can be chosen at
 * once, and a post is listed when it carries at least one of them. The topics
 * and the page live in the URL so a view can be linked.
 */
export function PostArchive({ posts, className }: PostArchiveProps) {
  const isReduced = useReducedMotion();
  const [tagsParam, setTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({ clearOnDefault: true })
  );
  const [pageParam, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })
  );

  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
  // A topic no post carries is a stale or mistyped link, not a filter, and a
  // topic named twice is still one topic.
  const selected = [...new Set(tagsParam)].filter((tag) => tags.includes(tag));

  // Chosen topics lead the strip, so what is filtering the list is always in
  // view and not scrolled off to the right.
  const chips = [...selected, ...tags.filter((tag) => !selected.includes(tag))];

  const matching =
    selected.length < 1
      ? posts
      : posts.filter((post) => selected.some((tag) => post.tags.includes(tag)));

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const page = Math.min(Math.max(pageParam, 1), pageCount);
  const visible = matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleTag = (tag: string) => {
    setTags(selected.includes(tag) ? selected.filter((name) => name !== tag) : [...selected, tag]);
    setPage(1);
  };

  const clearTags = () => {
    setTags([]);
    setPage(1);
  };

  return (
    <section
      aria-labelledby="post-archive-heading"
      className={cn('space-y-5', className)}
    >
      <header className="space-y-3">
        <h2
          id="post-archive-heading"
          className="text-sm font-semibold tracking-widest text-neutral-600 uppercase dark:text-neutral-400"
        >
          {selected.length > 0 ? `Posts on ${selected.join(', ')}` : 'All posts'}
        </h2>

        <ul
          aria-label="Filter by topic. Choose as many as you like."
          className="-mx-4 scrollbar-none flex items-center gap-2 overflow-x-auto px-4 pb-1"
        >
          {selected.length > 0 && (
            <li className="shrink-0">
              <Button
                variant="ghost"
                size="xs"
                onClick={clearTags}
                className="rounded-full"
              >
                <HiX
                  aria-hidden
                  className="size-3"
                />
                Clear
              </Button>
            </li>
          )}
          {chips.map((name) => {
            const isSelected = selected.includes(name);

            return (
              <li
                key={name}
                className="shrink-0"
              >
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleTag(name)}
                  className={cn(
                    'flex items-center justify-center rounded-full border border-neutral-200 px-3 py-1 text-xs leading-none font-medium text-neutral-600 transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.97] dark:border-neutral-800 dark:text-neutral-400',
                    'hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    isSelected &&
                      'border-primary bg-primary text-neutral-950 hover:text-neutral-950 dark:border-primary dark:bg-primary dark:text-neutral-950 dark:hover:text-neutral-950'
                  )}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </header>

      {visible.length < 1 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No posts yet</EmptyTitle>
            <EmptyDescription>Nothing has been published here so far.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        // Keyed by the view and driven directly: rows revealed by a click are
        // not "in view" events, and must not wait for a scroll to appear.
        <motion.ol
          key={`${selected.join(',')}:${page}`}
          variants={safeVariants(containerVariants, isReduced)}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {visible.map((post) => (
            <motion.li
              key={post.slug}
              variants={safeVariants(itemVariants, isReduced)}
            >
              <ArchiveRow post={post} />
            </motion.li>
          ))}
        </motion.ol>
      )}

      {pageCount > 1 && (
        <nav
          aria-label="Post pages"
          className="flex items-center justify-between gap-4"
        >
          <Button
            variant="ghost"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <HiArrowLeft
              aria-hidden
              className="size-4"
            />
            Newer
          </Button>
          <p
            aria-live="polite"
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            Page {page} of {pageCount}
          </p>
          <Button
            variant="ghost"
            disabled={page >= pageCount}
            onClick={() => setPage(page + 1)}
          >
            Older
            <HiArrowRight
              aria-hidden
              className="size-4"
            />
          </Button>
        </nav>
      )}
    </section>
  );
}

function ArchiveRow({ post }: { post: BlogPost }) {
  return (
    // The whole row answers a hover or a focus with a faint wash, so it is
    // clear which post a click will open without underlining anything.
    <article className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-xl px-3 py-3.5 transition-colors duration-150 ease-out focus-within:bg-neutral-100 hover:bg-neutral-100 sm:grid-cols-[7rem_1fr_auto] dark:focus-within:bg-neutral-900 dark:hover:bg-neutral-900">
      <time
        dateTime={post.date}
        className="self-start text-xs font-semibold text-primary max-sm:col-span-2 sm:pt-0.5 sm:text-sm"
      >
        {formatDate(post.date, '{MM} {DD}, {YYYY}')}
      </time>

      <div className="min-w-0 space-y-1">
        <h3 className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-100">
          {/* Stretched over the row, so the row is one target with one name. */}
          <Link
            href={post.slug}
            className="truncate after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
          {isNewPost(post) && (
            <Badge className="h-5 shrink-0 justify-center bg-primary px-1.5 leading-none text-neutral-950 uppercase dark:bg-primary dark:text-neutral-950">
              New
            </Badge>
          )}
          {!post.published && (
            <Badge
              variant="secondary"
              className="h-5 shrink-0 justify-center px-1.5 leading-none uppercase"
            >
              Draft
            </Badge>
          )}
        </h3>
        {post.description && (
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {post.description}
          </p>
        )}
        <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">
          {post.readingTime}
          {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
        </p>
      </div>

      <HiChevronRight
        aria-hidden
        className="size-5 text-neutral-400 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-primary dark:text-neutral-600 dark:group-hover:text-primary"
      />
    </article>
  );
}
