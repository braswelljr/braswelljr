'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSpotify } from 'react-icons/fa6'
import { HiCode, HiHome, HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'
import { MdArticle } from 'react-icons/md'
import { TbCommand } from 'react-icons/tb'
import { useStore } from '~/store/store'
import { cn } from 'lib/utils'
import { motion } from 'motion/react'
import Search from '~/components/search'

const ThemeSwitch = dynamic(() => import('~/components/theme-switch'), { ssr: false })

export const nav = [
  {
    name: 'Me',
    path: '/',
    icon: HiHome
  },
  {
    name: 'About',
    path: '/about',
    icon: IoIosPerson
  },
  {
    name: 'Listen With Me (Spotify)',
    path: '/listen-with-me',
    icon: FaSpotify
  },
  {
    name: 'Projects / Technical Skills',
    path: '/projects',
    icon: HiCode
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: MdArticle
  }
]

export default function Navbar({ className }: { className?: string }) {
  const [tab, setTab] = useState(nav[0].path)
  const [open, onOpenChange] = useState(false)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { toggle, onToggle } = useStore(s => s)

  useEffect(() => {
    const routerTab = pathname.split('/')[1] ? pathname.split('/')[1] : '/'
    if (routerTab) {
      nav.forEach(({ path: href }) => {
        const hrefTab = href.split('/')[1] ? href.split('/')[1] : '/'
        if (hrefTab === routerTab) {
          setTab(href)
        }
      })
    }
  }, [pathname])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-[4] flex items-center justify-between overflow-hidden bg-inherit px-4 py-2 shadow backdrop-blur-[2px] max-lg:flex-wrap',
        className
      )}
    >
      {/* blog page menu */}
      {pathname.startsWith('/blog/') && (
        <button
          type="button"
          className={cn(
            'flex size-7 items-center justify-center rounded-sm bg-neutral-900 text-white focus:outline-none dark:bg-neutral-500 md:hidden'
          )}
          onClick={() => onToggle(!toggle)}
        >
          <HiOutlineMenuAlt2 className="h-4 w-auto" />
        </button>
      )}
      {/* Search Button */}
      <button
        id="search-button"
        className={cn(
          'flex h-7 items-center rounded-sm bg-neutral-900 text-white focus:outline-none dark:bg-neutral-500',
          pathname.startsWith('/blog/') ? 'w-2/5 xsm:w-1/2 md:w-7 md:justify-center' : 'w-7 justify-center'
        )}
        aria-label="Search"
        onClick={() => onOpenChange(!open)}
      >
        <TbCommand className={cn('h-4 w-auto', pathname.startsWith('/blog/') ? 'hidden md:inline' : 'inline')} />
        {pathname.startsWith('/blog/') && (
          <span className={cn('ml-3 text-xs font-normal uppercase md:hidden')}>Search ...</span>
        )}
      </button>

      <Search open={open} setOpen={onOpenChange} searchButtonRef={searchButtonRef} />

      {/* menu items */}
      <div className="flex w-full items-center justify-center space-x-4 whitespace-nowrap max-lg:order-2 max-lg:mt-4 max-lg:grow max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto max-xsm:text-sm">
        {nav.map((item, idx) => (
          <Link key={idx} href={item.path} className={cn('relative pb-2')}>
            {tab === item.path && (
              <motion.span
                layoutId="menu-bubble"
                className={cn(
                  'absolute inset-x-0 bottom-0 h-1 bg-neutral-900 dark:bg-white',
                  idx === 0 && 'rounded-l-sm',
                  idx === nav.length - 1 && 'rounded-r-sm'
                )}
              />
            )}
            <span className={cn('flex items-center space-x-2 font-light uppercase')}>{item.name}</span>
          </Link>
        ))}
      </div>

      <ThemeSwitch className="max-lg:order-1" />
    </nav>
  )
}
