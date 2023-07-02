'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BsArrowUpRight } from 'react-icons/bs'
import { HiX } from 'react-icons/hi'
import useStore from '~/store/store'
import clsx from 'clsx'
import { TableOfContents } from 'lib/toc'
import { cn } from 'lib/utils'
import { createPortal } from 'react-dom'
import { shallow } from 'zustand/shallow'
import useMedia from '~/hooks/useMedia'
import useMounted from '~/hooks/useMounted'
import { ScrollToTopWithBlog } from './ScrollTop'

interface TocProps {
  toc: TableOfContents
  className?: string
}

export function BlogTableOfContents({ toc, className }: TocProps) {
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
  const mounted = useMounted()
  const [blogpagemenutoogle, setBlogpagemenutoogle] = useStore(
    state => [state.blogpagemenutoogle, state.setBlogpagemenutoogle],
    shallow
  )
  const md = useMedia('(min-width: 768px)')

  useEffect(() => {
    if (md) setBlogpagemenutoogle(false)
  }, [md, setBlogpagemenutoogle])

  if (!toc?.items || !mounted) {
    return null
  }

  const content = (
    <>
      <aside
        className={cn(
          'text-xs transition-transform xl:text-sm',
          {
            'fixed inset-y-0 left-0 z-[21] w-4/5 translate-x-0 bg-white/90 text-neutral-900 backdrop-blur-[2px] dark:bg-neutral-900/90 dark:text-white sm:w-2/3':
              blogpagemenutoogle && !md
          },
          className
        )}
      >
        {/* close button */}
        {blogpagemenutoogle && !md && (
          <button
            type="button"
            className={cn(
              'absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-sm border border-neutral-800/40 dark:border-neutral-200/50'
            )}
            onClick={() => setBlogpagemenutoogle(false)}
          >
            <HiX className="h-4 w-auto" />
          </button>
        )}
        {/* Table of content */}
        <div
          className={cn('space-y-2', {
            'sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pr-2 pt-16': md,
            'mt-14 px-4': !md
          })}
        >
          <p className="text-sm font-medium uppercase">On This Page</p>
          <span className="mb-4 inline-flex flex-col space-y-2 child:w-auto">
            {/* blogs */}
            <Link
              href="/blog"
              className="group/link relative inline-flex items-center space-x-2 pb-1.5 uppercase text-neutral-600 dark:text-neutral-400"
            >
              <BsArrowUpRight className="h-3 w-auto" />
              <span>Back to blog</span>
              <span
                className="absolute inset-x-0 bottom-1 h-0.5 w-0 bg-current transition-width group-hover/link:w-full"
                aria-hidden="true"
              />
            </Link>
            {/* scroll to top */}
            <ScrollToTopWithBlog />
          </span>
          <Tree tree={toc} activeItem={activeHeading} />
        </div>
      </aside>
      {blogpagemenutoogle && !md && (
        <button
          type="button"
          onClick={() => setBlogpagemenutoogle(false)}
          className={cn('fixed inset-0 z-20 h-full w-full bg-neutral-800/50 md:hidden')}
        />
      )}
    </>
  )

  return <>{blogpagemenutoogle && !md ? createPortal(content, document.body) : content}</>
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id || '')
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
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
  const [blogpagemenutoogle, setBlogpagemenutoogle] = useStore(
    state => [state.blogpagemenutoogle, state.setBlogpagemenutoogle],
    shallow
  )

  return tree?.items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-2': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={clsx('mt-0 pt-2')}>
            <a
              href={item.url}
              className={cn(
                'inline-block text-sm no-underline',
                item.url === `#${activeItem}`
                  ? 'font-medium text-rose-600 dark:text-orange-300'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400'
              )}
              onClick={() => setBlogpagemenutoogle(!blogpagemenutoogle)}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
