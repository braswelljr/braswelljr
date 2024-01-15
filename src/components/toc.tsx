'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { useStore } from '~/store/store'
import { TableOfContents } from 'lib/toc'
import { cn } from 'lib/utils'
import useMounted from '~/hooks/useMounted'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import { ScrollToTopWithBlog } from './scroll-top'

interface TocProps {
  toc: TableOfContents
  className?: string
}

export function BlogTableOfContents({ toc, className }: TocProps) {
  const [blogpagemenutoogle, setBlogpagemenutoogle] = useStore(state => [
    state.blogpagemenutoogle,
    state.setBlogpagemenutoogle
  ])

  return (
    <Fragment>
      <Sheet open={blogpagemenutoogle} onOpenChange={setBlogpagemenutoogle}>
        <SheetContent side="left">
          <Content toc={toc} className={className} />
        </SheetContent>
      </Sheet>
      <aside className="max-md:hidden">
        <Content toc={toc} className={className} />
      </aside>
    </Fragment>
  )
}

function Content({ toc, className }: TocProps) {
  const mounted = useMounted()

  const itemIds = useMemo(() => {
    if (toc && toc.items) {
      return toc.items
        .flatMap(item => [item.url, item?.items?.map(item => item.url)])
        .flat()
        .filter(Boolean)
        .map(id => id?.split('#')[1])
    }

    return []
  }, [toc])
  const activeHeading = useActiveItem(itemIds as string[])

  if (!toc?.items || !mounted) {
    return null
  }
  return (
    <div
      className={cn(
        'space-y-2 text-xs md:sticky md:top-16 md:-mt-10 md:max-h-[calc(var(--vh)-4rem)] md:overflow-y-auto md:pr-2 md:pt-16 xl:text-sm',
        className
      )}
    >
      {/* Table of content */}
      <div className="text-sm font-medium uppercase">On This Page</div>
      <div className="mb-4 inline-flex flex-col space-y-2 child:w-auto">
        {/* blogs */}
        <Link
          href="/blog"
          className="group/link relative inline-flex items-center space-x-2 pb-1.5 uppercase text-neutral-600 dark:text-neutral-400"
        >
          <HiOutlineExternalLink className="h-3.5 w-auto" />
          <span>Back to blog</span>
          <span
            className="absolute inset-x-0 bottom-1 h-0.5 w-0 bg-current transition-width group-hover/link:w-full"
            aria-hidden="true"
          />
        </Link>
        {/* scroll to top */}
        <ScrollToTopWithBlog />
      </div>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id || '')
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      itemIds?.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  const [setBlogpagemenutoogle] = useStore(state => [state.setBlogpagemenutoogle])

  return tree?.items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-2': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn('mt-0 pt-2')}>
            <a
              href={item.url}
              className={cn(
                'inline-block text-sm no-underline',
                item.url === `#${activeItem}`
                  ? 'font-medium text-rose-600 dark:text-orange-300'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400'
              )}
              onClick={() => setBlogpagemenutoogle(false)}
            >
              {item.title}
            </a>
            {item.items?.length ? <Tree tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
