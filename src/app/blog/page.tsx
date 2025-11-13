import Link from 'next/link';
import { compareAsc, isAfter, subDays } from 'date-fns';
import { HiChevronRight } from 'react-icons/hi';
import { IoAlbums } from 'react-icons/io5';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import readingTime from 'reading-time';
import { blog } from 'lib/source';
import { cn } from 'lib/utils';
import { formatDate } from '~/utils/formatDate';

export default async function Page() {
  // get all blog pages
  const pages = blog.getPages();

  // sort by date (latest first)
  const sorted = pages.sort((a, b) => compareAsc(new Date(b.data.date), new Date(a.data.date)));

  const posts = await Promise.all(
    sorted.map(async (d) => {
      const text = await d.data.getText('processed');
      const time = readingTime(text).text;

      return {
        ...d.data,
        slug: d.url,
        readingTime: time
      };
    })
  );

  return (
    <div className="px-4 py-10 pt-[calc(var(--fd-nav-height)+10px)]">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
        <h2 className="text-primary dark:text-secondary text-2xl leading-tight font-bold tracking-tight uppercase sm:text-3xl md:text-4xl">Blog</h2>

        <div className="relative ml-4 pt-5 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
          <div className={cn('bg-primary dark:bg-secondary absolute top-3 right-full -bottom-10 w-px', 'mr-7 ml-5 md:mr-13')} />
          <div className="space-y-16">
            {posts.map(({ title, description, date, tags, slug, published, readingTime }, i) => {
              const after = isAfter(date, subDays(new Date(), 150));

              return (
                <article
                  key={i}
                  className="group relative"
                >
                  <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                  <svg
                    viewBox="0 0 9 9"
                    className={cn(
                      'text-primary dark:text-secondary absolute top-2 right-full size-[calc(0.5rem+1px)] overflow-visible',

                      'mr-6 ml-5 md:mr-12'
                    )}
                  >
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      stroke="currentColor"
                      className="fill-white dark:fill-neutral-900"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="relative">
                    {(after || !published) && (
                      <div className="relative flex flex-wrap gap-2 pt-8 lg:pt-0 lg:pb-3">
                        {after && (
                          <div className="bg-primary-300 text-xsm dark:bg-secondary inline-flex h-6 w-auto items-center gap-1 rounded-sm px-1.5 py-1 pr-2 font-bold text-neutral-950 uppercase">
                            <MdOutlineWorkspacePremium className="size-3.5" />
                            New
                          </div>
                        )}

                        {!published && (
                          <div className="bg-secondary-300 dark:text-secondary inline-flex h-6 w-auto items-center gap-1 rounded-sm px-2.5 py-0.5 text-xs font-medium text-neutral-950 uppercase dark:bg-stone-950">
                            <IoAlbums className="size-3.5" />
                            <span className="">
                              Draft / Unpublished<span className="sr-only">, {title}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <h3
                      className={cn(
                        'text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-200',
                        after || !published ? 'pt-3 lg:pt-0' : 'pt-8 lg:pt-0'
                      )}
                    >
                      {title}
                    </h3>
                    <div className="mt-2 mb-4 line-clamp-2 font-medium text-neutral-900 dark:text-neutral-400">{description}</div>
                    {/* tags */}
                    {Array.isArray(tags) && tags.length && (
                      <div className="my-2 mb-4 flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-primary-200 text-xsm dark:bg-secondary inline-flex items-center rounded-sm px-2 py-1 font-medium text-neutral-950"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-sm text-neutral-700 dark:text-neutral-400">{readingTime}</div>

                    <dl className="absolute top-0 left-0 lg:right-full lg:left-auto lg:mr-[calc(6.5rem+1px)]">
                      <dt className="sr-only">Date</dt>
                      <dd className={cn('text-primary leading-6 font-bold whitespace-nowrap dark:text-orange-400')}>
                        <time dateTime="">{date ? formatDate(date, '{MMMM} {DD}, {YYYY}') : 'unknown'}</time>
                      </dd>
                    </dl>
                  </div>
                  <Link
                    href={slug}
                    className="link-underline group/link text-primary dark:text-secondary relative mt-5 inline-flex items-center justify-start gap-1 pb-1 pl-1.5 text-sm font-semibold uppercase hover:bg-size-[95%_3px]"
                  >
                    <span className="">
                      Read more<span className="sr-only">, {title}</span>
                    </span>
                    <HiChevronRight className="h-5 w-auto overflow-visible" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
