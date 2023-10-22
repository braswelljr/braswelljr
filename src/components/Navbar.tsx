'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { HiCode, HiDesktopComputer, HiHome, HiMoon, HiOutlineArchive, HiOutlineMenuAlt2, HiSun } from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'
import { MdArticle } from 'react-icons/md'
import { TbCommand } from 'react-icons/tb'
import useStore from '~/store/store'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useKBar } from 'kbar'
import { cn } from 'lib/utils'
import { useTheme } from 'next-themes'
import LinkWithRef from '~/components/LinkWithRef'

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
    name: 'Projects',
    path: '/projects',
    icon: HiOutlineArchive
  },
  {
    name: 'Technical Skills',
    path: '/technical-skills',
    icon: HiCode
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: MdArticle
  }
]

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [tab, setTab] = useState(nav[0].path)
  const pathname = usePathname()
  const { query } = useKBar()
  const [blogpagemenutoogle, setBlogpagemenutoogle] = useStore(state => [
    state.blogpagemenutoogle,
    state.setBlogpagemenutoogle
  ])

  useEffect(() => {
    const routerTab = pathname.split('/')[1] ? pathname.split('/')[1] : '/'
    if (routerTab) {
      nav.forEach(({ path: href }) => {
        let hrefTab = href.split('/')[1] ? href.split('/')[1] : '/'
        if (hrefTab === routerTab) {
          setTab(href)
        }
      })
    }
  }, [pathname])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-[4] flex items-center justify-between bg-inherit px-4 py-2 shadow backdrop-blur-[2px] max-lg:flex-wrap',
        className
      )}
    >
      {/* blog page menu */}
      {pathname.startsWith('/blog/') && (
        <button
          type="button"
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-sm bg-neutral-900 text-neutral-100 hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500 dark:text-white md:hidden'
          )}
          onClick={() => setBlogpagemenutoogle(!blogpagemenutoogle)}
        >
          <HiOutlineMenuAlt2 className="h-4 w-auto" />
        </button>
      )}
      {/* Search Button */}
      <button
        id="search-button"
        className={cn(
          'flex h-7 items-center rounded-sm bg-neutral-900 text-neutral-100 hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500 dark:text-white md:justify-center',
          pathname.startsWith('/blog/') ? 'w-[40%] xsm:w-1/2 md:w-7' : 'w-7'
        )}
        onClick={query.toggle}
        aria-label="Search"
        aria-controls="kbar"
      >
        <TbCommand className={cn('h-4 w-auto', pathname.startsWith('/blog/') ? 'hidden md:inline' : 'inline')} />
        {pathname.startsWith('/blog/') && (
          <span className={cn('ml-3 text-xs font-normal uppercase md:hidden')}>Search ...</span>
        )}
      </button>

      {/* menu items */}
      <LayoutGroup>
        <ul className="flex w-full items-center justify-center space-x-4 whitespace-nowrap max-lg:order-2 max-lg:mt-4 max-lg:grow max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto max-xsm:text-sm">
          {nav.map((item, idx) => (
            <LinkWithRef key={idx} href={item.path} className={cn('relative pb-2')}>
              <AnimatePresence>
                {tab === item.path && (
                  <motion.div
                    layoutId="menuLayoutIdPointer"
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-1 bg-neutral-900 dark:bg-white',
                      idx === 0 && 'rounded-l-sm',
                      idx === nav.length - 1 && 'rounded-r-sm'
                    )}
                  />
                )}
              </AnimatePresence>
              <div className={cn('flex items-center space-x-2 font-light uppercase')}>
                {/* <item.icon className="h-4 w-auto" /> */}
                <span>{item.name}</span>
              </div>
            </LinkWithRef>
          ))}
        </ul>
      </LayoutGroup>

      <LayoutGroup>
        <ul className={cn('flex items-center justify-center space-x-2 max-lg:order-1')}>
          {Object.entries({
            system: <HiDesktopComputer className={cn('h-4 w-auto')} />,
            dark: <HiMoon className={cn('h-4 w-auto')} />,
            light: <HiSun className={cn('h-4 w-auto')} />
          }).map(([key, value], i, self) => (
            <li key={key} className={cn('relative block cursor-pointer p-1.5')} onClick={() => setTheme(key)}>
              <AnimatePresence>
                {key === theme && (
                  <motion.div
                    layoutId="themeIdPointer"
                    initial={false}
                    className={cn(
                      'absolute inset-0 bg-neutral-800 dark:bg-neutral-500',
                      i === 0 && 'rounded-l-sm',
                      i === self.length - 1 && 'rounded-r-sm'
                    )}
                  />
                )}
              </AnimatePresence>
              <span
                className={cn('relative z-[1] block h-full w-full', {
                  'text-white': key === theme
                })}
              >
                {value}
              </span>
            </li>
          ))}
        </ul>
      </LayoutGroup>
    </nav>
  )
}
