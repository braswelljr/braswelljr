import { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { IoIosPerson } from 'react-icons/io'
import {
  HiSun,
  HiMoon,
  HiDesktopComputer,
  HiHome,
  HiCode,
  HiOutlineArchive
} from 'react-icons/hi'
import useTheme from '@/hooks/useTheme'
import Tabs from '@/components/Tabs'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'

const AppLayout = ({ children }: { children: JSX.Element }) => {
  const [setting, setSetting] = useTheme()
  const [page, setPage] = useState('/')
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('load', () => {
      if (router.pathname.split('/')[1] !== 'blog') {
        setPage(router.pathname)
      }
    })
  }, [router.pathname, page])

  return (
    <>
      <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
        {/* background */}
        <div className="stars-one" />
        <div className="stars-two" />
        <div className="stars-three" />
        <div className="stars-four" />
        <div className={clsx('relative z-[1]')}>
          <Tabs
            tabs={{
              system: <HiDesktopComputer className={clsx('h-5 w-auto')} />,
              dark: <HiMoon className={clsx('h-5 w-auto')} />,
              light: <HiSun className={clsx('h-5 w-auto')} />
            }}
            className={clsx('fixed top-4 right-4 z-10')}
            selected={setting}
            onChange={setSetting}
            layoutId={'theme-settings'}
            itemClassName={{
              container: 'bg-neutral-900 dark:bg-neutral-500/60 rounded-full',
              item: 'p-2',
              notSelected: ''
            }}
          />
          <motion.ul
            layoutId="nav"
            className={clsx(
              'fixed right-0 bottom-1/2 z-10 flex translate-y-1/2 flex-col items-center space-y-2 overflow-hidden md:right-4'
            )}
          >
            {[
              {
                name: 'Home',
                path: '/',
                icon: <HiHome className={clsx('h-5 w-auto')} />
              },
              {
                name: 'About',
                path: '/about',
                icon: <IoIosPerson className={clsx('h-5 w-auto')} />
              },
              {
                name: 'Technical Skills',
                path: '/technical-skills',
                icon: <HiCode className={clsx('h-5 w-auto')} />
              },
              {
                name: 'Projects',
                path: '/projects',
                icon: <HiOutlineArchive className={clsx('h-5 w-auto')} />
              }
            ].map(({ path, icon }) => (
              <motion.li
                key={path}
                className={clsx('relative rounded-3xl p-2')}
              >
                {page === path && (
                  <motion.div
                    layoutId="pageHighlight"
                    className={clsx(
                      'absolute inset-0 rounded-xl bg-neutral-900 dark:bg-neutral-500/60'
                    )}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPage(path)
                    router.push(path)
                  }}
                  className={clsx(
                    `relative z-10 flex w-full items-center space-x-2 transition-colors duration-300 focus:outline-none`,
                    { 'text-white': page === path }
                  )}
                >
                  {icon}
                </button>
              </motion.li>
            ))}
          </motion.ul>
          <motion.section className="pr-2">{children}</motion.section>
        </div>
      </main>
    </>
  )
}

export default AppLayout
