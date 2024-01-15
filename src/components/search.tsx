'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import { cn } from 'lib/utils'
import { createPortal } from 'react-dom'

export default function Search({
  open,
  setOpen,
  searchButtonRef
}: {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  searchButtonRef: RefObject<HTMLButtonElement>
}) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const { push } = useRouter()

  const onOpen = useCallback(() => setOpen?.(true), [setOpen])

  const onClose = useCallback(() => setOpen?.(false), [setOpen])

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setOpen?.(true)
      setSearchQuery(e.key)
    },
    [setOpen]
  )

  useEffect(() => {
    function onKeyClose(e: KeyboardEvent) {
      if (e.key !== 'Escape') return

      e.preventDefault()
      setSearchQuery(undefined)
      onClose()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => window.removeEventListener('keydown', onKeyClose)
  }, [onClose])

  useDocSearchKeyboardEvents({
    isOpen: open,
    onOpen,
    onClose,
    onInput,
    searchButtonRef: searchButtonRef
  })

  return (
    <div
      id="search-body"
      className={cn('fixed inset-0 z-[11] h-full w-full bg-neutral-500/80', {
        hidden: !open
      })}
    >
      {open &&
        createPortal(
          <DocSearchModal
            initialQuery={searchQuery}
            initialScrollY={window.scrollY}
            placeholder="Search..."
            onClose={onClose}
            appId="QKSUPW3S6U"
            apiKey="c7fe5c895331a45ebd59889d32de1165"
            indexName="braswelljr"
            navigator={{
              navigate({ itemUrl }) {
                setOpen?.(false)
                push(itemUrl)
              }
            }}
            transformItems={items => {
              return items.map((item, index) => {
                // We transform the absolute URL into a relative URL to
                // leverage Next's preloading.
                const a = document.createElement('a')
                a.href = item.url

                const hash = a.hash === '#content-wrapper' ? '' : a.hash

                if (item.hierarchy?.lvl0) {
                  item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&')
                }

                if (item._highlightResult?.hierarchy?.lvl0?.value) {
                  item._highlightResult.hierarchy.lvl0.value = item._highlightResult.hierarchy.lvl0.value.replace(
                    /&amp;/g,
                    '&'
                  )
                }

                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                  __is_result: () => true,
                  __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
                  __is_child: () => item.type !== 'lvl1' && items.length > 1 && items[0].type === 'lvl1' && index !== 0,
                  __is_first: () => index === 1,
                  __is_last: () => index === items.length - 1 && index !== 0
                }
              })
            }}
            hitComponent={({ hit, children }) => {
              return <Link href={hit.url}>{children}</Link>
            }}
          />,
          document.body
        )}
    </div>
  )
}
