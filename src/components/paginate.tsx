'use client'

import Link from 'next/link'
import { Blog } from 'contentlayer/generated'
import { cn } from 'lib/utils'
import useMedia from '~/hooks/useMedia'
import { Icons } from '~/components/icons'
import { buttonVariants } from '~/components/ui/button'

interface BlogPaginationProps {
  blogs: Blog[]
  activeBlog: Blog
}

export function BlogPaginate({ blogs, activeBlog }: BlogPaginationProps) {
  const sortedBlogs = blogs.sort((a, b) => {
    // check if the date is valid (or value is not null/undefined)
    if (!a.date || !b.date) return 0
    // Sort by date ascending
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1

    return 0
  })
  const pager = getPagerForBlog(sortedBlogs, activeBlog)
  const xsm = useMedia('(max-width: 425px)')

  return (
    <div className="relative flex flex-row items-center justify-between py-5">
      {pager && pager.prev?.slug && (
        <Link href={pager.prev.slug} className={cn(buttonVariants({ variant: 'outline' }), 'absolute left-0')}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap max-lg:max-w-[10rem] max-sm:text-xsm">
            {xsm ? 'Previous' : pager.prev.title}
          </span>
        </Link>
      )}
      {pager && pager.next?.slug && (
        <Link href={pager.next.slug} className={cn(buttonVariants({ variant: 'outline' }), 'absolute right-0')}>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap max-lg:max-w-[10rem] max-md:text-xsm">
            {xsm ? 'Next' : pager.next.title}
          </span>
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForBlog(blogs: Blog[], activeBlog: Blog) {
  const flattenedLinks = [null, ...blogs, null]
  const activeIndex = flattenedLinks.findIndex(link => activeBlog.slug === link?.slug)
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null
  return {
    prev,
    next
  }
}
