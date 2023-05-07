'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { HiCode, HiDesktopComputer, HiHome, HiMoon, HiOutlineArchive, HiSun } from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'
import { MdArticle } from 'react-icons/md'
import { TbCommand } from 'react-icons/tb'
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useKBar } from 'kbar'
import useTheme from '~/hooks/useTheme'
import LinkWithRef from '~/components/LinkWithRef'

export const nav = [
  {
    name: 'Home',
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

  useEffect(() => {
    const routerTab = pathname?.split('/')[1] ? pathname?.split('/')[1] : '/'
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
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-[4] flex items-center justify-between bg-inherit px-4 py-2 shadow backdrop-blur-sm max-lg:flex-wrap'
      )}
    >
      {/* Search Button */}
      <button
        id="search-button"
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-900 text-neutral-100 hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500 dark:text-white'
        )}
        onClick={query.toggle}
        aria-label="Search"
        aria-controls="kbar"
      >
        <TbCommand className="h-4 w-auto" />
      </button>

      {/* menu items */}
      <LayoutGroup>
        <ul className="flex w-full items-center justify-center space-x-4 whitespace-nowrap max-lg:order-2 max-lg:mt-4 max-lg:grow max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto max-xsm:text-sm">
          {nav.map((item, idx) => (
            <LinkWithRef key={idx} href={item.path} className={clsx('relative pb-2')}>
              <AnimatePresence>
                {tab === item.path && (
                  <motion.div
                    layoutId="menuLayoutIdPointer"
                    className={clsx(
                      'absolute inset-x-0 bottom-0 h-1 bg-neutral-900 dark:bg-white',
                      idx === 0 && 'rounded-l-sm',
                      idx === nav.length - 1 && 'rounded-r-sm'
                    )}
                  />
                )}
              </AnimatePresence>
              <div className={clsx('flex items-center space-x-2 font-light uppercase')}>
                {/* <item.icon className="h-4 w-auto" /> */}
                <span>{item.name}</span>
              </div>
            </LinkWithRef>
          ))}
        </ul>
      </LayoutGroup>

      <LayoutGroup>
        <ul className={clsx('flex items-center justify-center space-x-2 max-lg:order-1')}>
          {Object.entries({
            system: <HiDesktopComputer className={clsx('h-5 w-auto')} />,
            dark: <HiMoon className={clsx('h-5 w-auto')} />,
            light: <HiSun className={clsx('h-5 w-auto')} />
          }).map(([key, value], i, self) => (
            <li
              key={key}
              className={clsx('relative block cursor-pointer p-1.5')}
              onClick={() => setTheme(key)}
            >
              <AnimatePresence>
                {key === theme && (
                  <motion.div
                    layoutId="themeIdPointer"
                    initial={false}
                    className={clsx(
                      'absolute inset-0 bg-neutral-800 dark:bg-neutral-500',
                      i === 0 && 'rounded-l-sm',
                      i === self.length - 1 && 'rounded-r-sm'
                    )}
                  />
                )}
              </AnimatePresence>
              <span
                className={clsx('relative z-[1] block h-full w-full', {
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
