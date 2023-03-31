'use client'

import { useEffect, useMemo, useState } from 'react'
import useMounted from '~/hooks/useMounted'

import { TableOfContents } from 'lib/toc'
import clsx from 'clsx'

interface TocProps {
  toc: TableOfContents
}

export function BlogTableOfContents({ toc }: TocProps) {
  const itemIds = useMemo(
    () =>
      toc && toc.items
        ? toc.items
          .flatMap(item => [item.url, item?.items?.map(item => item.url)])
          .flat()
          .filter(Boolean)
          .map(id => id?.split('#')[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds as string[])
  const mounted = useMounted()

  if (!toc?.items || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium uppercase">On This Page</p>
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
  return tree?.items?.length && level < 3 ? (
    <ul className={clsx('m-0 list-none', { 'pl-2': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={clsx('mt-0 pt-2')}>
            <a
              href={item.url}
              className={clsx(
                'inline-block text-sm no-underline',
                item.url === `#${activeItem}`
                  ? 'font-medium text-rose-600 dark:text-orange-300'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400'
              )}
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
