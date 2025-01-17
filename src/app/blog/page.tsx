import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'
import { IoAlbums } from 'react-icons/io5'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import { allBlogs } from 'contentlayer/generated'
import { subDays } from 'date-fns'
import { cn } from 'lib/utils'
import moment from 'moment'
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
    <div className="px-4 py-10 max-lg:pt-28">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 child:space-y-6 dark:text-neutral-100 sm:mt-14 sm:child:space-y-10">
        {/* Header */}
        <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
          Blog
        </h1>
        {/* Body */}
        <div className="relative sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="absolute bottom-0 right-full top-3 mr-7 hidden w-px bg-orange-300 sm:block md:mr-[3.25rem]" />
          <div className="space-y-16">
            {blogs.map(({ title, description, date, tags, slug, published }, i) => (
              <article key={i} className="group relative">
                <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                {/* group-hover:bg-neutral-50/70 dark:group-hover:bg-neutral-800/50 */}
                <svg
                  viewBox="0 0 9 9"
                  className="absolute right-full top-2 mr-6 hidden size-[calc(0.5rem+1px)] overflow-visible text-orange-300 sm:block md:mr-12"
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
                  {(moment(date).isAfter(subDays(new Date(), 150)) || !published) && (
                    <div className="relative flex flex-wrap gap-2 max-lg:pt-8">
                      {/* check if the date is less than 30 days old */}
                      {moment(date).isAfter(subDays(new Date(), 150)) && (
                        <div className="inline-flex h-6 w-auto items-center space-x-2 rounded-sm bg-orange-200 px-2.5 py-0.5 text-xs font-medium uppercase text-neutral-700 dark:bg-neutral-800 dark:text-orange-400">
                          <MdOutlineWorkspacePremium className="h-3 w-auto" />
                          <span>New</span>
                        </div>
                      )}

                      {/* published */}
                      {!published && (
                        <div className="inline-flex h-6 w-auto items-center space-x-2 rounded-sm bg-orange-200 px-2.5 py-0.5 text-xs font-medium uppercase text-neutral-700 dark:bg-neutral-800 dark:text-orange-400">
                          <IoAlbums className="h-3.5 w-auto" />
                          <span className="">
                            Draft / Unpublished<span className="sr-only">, {title}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {/* header */}
                  <h3 className="pt-6 font-semibold uppercase tracking-tight text-neutral-900 dark:text-neutral-200 lg:pt-2">
                    {title}
                  </h3>
                  {/* description */}
                  <div className="mb-4 mt-2 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-400">
                    {description}
                  </div>
                  {/* tags */}
                  {tags && (
                    <div className="my-2 mb-4 flex flex-wrap gap-2">
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
                    <dd className={cn('whitespace-nowrap text-sm leading-6 dark:text-orange-400')}>
                      <time dateTime={date}>{date ? formatDate(date, '{MMMM} {DD}, {YYYY}') : 'unknown'}</time>
                    </dd>
                  </dl>
                </div>
                {/* Link */}
                <Link
                  href={slug}
                  className="link-underline relative mt-5 inline-flex items-center justify-start space-x-2 pb-1.5 text-sm font-medium uppercase text-[#ff2600] hover:[background-size:95%_3px] dark:text-[#ff7056]"
                >
                  <span className="">
                    Read more<span className="sr-only">, {title}</span>
                  </span>
                  <HiChevronRight className="h-5 w-auto overflow-visible" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
