import Link from 'next/link'
import clsx from 'clsx'
import { Blog } from 'contentlayer/generated'
import { buttonVariants } from '~/components/button'
import { Icons } from '~/components/Icons'

interface BlogPaginationProps {
  blogs: Blog[]
  activeBlog: Blog
}

export function BlogPaginate({ blogs, activeBlog }: BlogPaginationProps) {
  const pager = getPagerForBlog(blogs, activeBlog)

  return (
    <div className="relative flex flex-row items-center justify-between pt-5">
      {pager && pager.prev?.slug && (
        <Link
          href={pager.prev.slug}
          className={clsx(buttonVariants({ variant: 'outline' }), 'absolute left-0')}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager && pager.next?.slug && (
        <Link
          href={pager.next.slug}
          className={clsx(buttonVariants({ variant: 'outline' }), 'absolute right-0')}
        >
          {pager.next.title}
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
