import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { compareDesc } from 'date-fns';
import { HiRss } from 'react-icons/hi';
import readingTime from 'reading-time';
import { getPublishedPosts } from 'lib/source';
import { PendingList } from '@/components/shared/pending';
import { LatestPosts } from './_components/latest-posts';
import { type BlogPost } from './_components/post';
import { PostArchive } from './_components/post-archive';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on React, TypeScript, Go and the web platform, written while building things.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/rss.xml' }
  }
};

/** How many posts lead the page as cards. The list below holds every post. */
const LATEST_COUNT = 4;

/** Frontmatter spells one topic several ways ("API", "api", "Communication.").
 *  Folding them here keeps the filter to one chip per topic. */
function normaliseTags(tags: string[] = []): string[] {
  return [...new Set(tags.map((tag) => tag.trim().replace(/\.$/, '').toLowerCase()))];
}

export default async function Page() {
  const sorted = getPublishedPosts().sort((a, b) =>
    compareDesc(new Date(a.data.date), new Date(b.data.date))
  );

  const posts: BlogPost[] = await Promise.all(
    sorted.map(async (page) => ({
      title: page.data.title,
      description: page.data.description ?? '',
      date: new Date(page.data.date).toISOString(),
      tags: normaliseTags(page.data.tags),
      slug: page.url,
      published: page.data.published ?? true,
      readingTime: readingTime(await page.data.getText('processed')).text
    }))
  );

  const latest = posts.slice(0, LATEST_COUNT);

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 pt-[calc(var(--fd-nav-height)+10px)] sm:mt-14 sm:space-y-12">
      <header className="space-y-3">
        <h1 className="bg-linear-to-l from-secondary to-primary bg-clip-text text-3xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-4xl md:text-5xl dark:to-primary">
          Blog
        </h1>
        <p className="max-w-prose text-neutral-600 dark:text-neutral-400">
          Notes on React, TypeScript, Go and the web platform, written while building things.
        </p>
        <Link
          href="/rss.xml"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          <HiRss
            aria-hidden
            className="size-4"
          />
          Subscribe by RSS
        </Link>
      </header>

      <LatestPosts posts={latest} />

      {/* The archive reads its topic and page from the URL. Wrapping only this
          subtree keeps the heading and the latest row in the static HTML. */}
      <Suspense
        fallback={
          <PendingList
            label="Loading the archive"
            count={3}
            gridClassName="sm:grid-cols-1 lg:grid-cols-1"
            itemClassName="h-14"
          />
        }
      >
        <PostArchive posts={posts} />
      </Suspense>
    </main>
  );
}
