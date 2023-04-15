import Link from 'next/link'

import clsx from 'clsx'
import { allBlogs } from 'contentlayer/generated'
import { HiChevronRight } from 'react-icons/hi'

import { formatDate } from '~/utils/formatDate'

export default function Page() {
  const blogs = allBlogs.sort((a, b) => {
    // check if the date is valid (or value is not null/undefined)
    if (!a.date || !b.date) return 0
    // Sort by date descending
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1

    return 0
  })

  return (
    <div className="px-4 pb-10 pt-10 max-lg:pt-28">
      <div className="mx-auto max-w-3xl px-4 text-gray-800 child:space-y-6 dark:text-neutral-100 sm:mt-14 sm:child:space-y-10">
        {/* Header */}
        <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
          Blog
        </h1>
        {/* Body */}
        <div className="relative sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="absolute bottom-0 right-full top-3 mr-7 hidden w-px bg-orange-300 sm:block md:mr-[3.25rem]" />
          <div className="space-y-16">
            {blogs.map(({ title, description, date, tags, slugAsParams }, i) => (
              <article key={i} className="group relative">
                <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                {/* group-hover:bg-neutral-50/70 dark:group-hover:bg-neutral-800/50 */}
                <svg
                  viewBox="0 0 9 9"
                  className="absolute right-full top-2 mr-6 hidden h-[calc(0.5rem+1px)] w-[calc(0.5rem+1px)] overflow-visible text-orange-300 sm:block md:mr-12"
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
                  {/* header */}
                  <h3 className="pt-8 font-semibold uppercase tracking-tight text-neutral-900 dark:text-neutral-200 lg:pt-0">
                    {title}
                  </h3>
                  {/* description */}
                  <div className="mb-4 mt-2 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-400">
                    {description}
                  </div>
                  {/* tags */}
                  {tags && (
                    <div className="my-2 flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-sm bg-orange-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-orange-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                    <dt className="sr-only">Date</dt>
                    <dd
                      className={clsx('whitespace-nowrap text-sm leading-6 dark:text-orange-400')}
                    >
                      <time dateTime={date}>
                        {date ? formatDate(date, '{MMMM} {DD}, {YYYY}') : 'unknown'}
                      </time>
                    </dd>
                  </dl>
                </div>
                {/* Link */}
                <Link
                  href={`/blog/${slugAsParams}`}
                  className="group/link relative mt-6 inline pb-2 text-sm font-medium uppercase text-[#ff2600] dark:text-[#ff7056]"
                >
                  <span className="inline-flex items-center justify-start space-x-2">
                    <span className="">
                      Read more<span className="sr-only">, {title}</span>
                    </span>
                    <HiChevronRight className="h-5 w-auto overflow-visible" />
                  </span>
                  <span
                    className="absolute inset-x-0 bottom-1 h-1 w-0 bg-current transition-width group-hover/link:w-full"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
