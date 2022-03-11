import { ReactChild, ReactChildren, useState } from 'react'
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
  HiArchive,
  HiX,
  HiMenu
} from 'react-icons/hi'
import useTheme from '@/hooks/useTheme'
import Tabs from '@/components/Tabs'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'

const AppLayout = ({ children }: { children: ReactChild | ReactChildren }) => {
  const [setting, setSetting] = useTheme()
  const [page, setPage] = useState('/')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('load', () => {
      if (router.pathname.split('/')[1] !== 'blog') {
        setPage(router.pathname)
      }
    })
  }, [router.pathname, page])

  return (
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
          itemClassName={{
            container: 'bg-neutral-900 dark:bg-neutral-500/60 rounded-full',
            item: 'p-2',
            notSelected: ''
          }}
        />

        <nav
          className={clsx(
            'fixed bottom-7 right-7 z-[8] flex flex-col items-center space-y-1'
          )}
        >
          <motion.ul
            className={clsx(
              'flex flex-col items-center space-y-2 rounded-full'
            )}
            layoutId="nav"
            variants={{
              hidden: {
                type: 'spring',
                display: 'none',
                transition: {
                  delay: 0.8,
                  // delayChildren: 1,
                  staggerChildren: 1
                }
              },
              visible: {
                type: 'spring',
                transition: {
                  // delayChildren: 1,
                  staggerChildren: 1
                }
              }
            }}
            animate={open ? 'visible' : 'hidden'}
          >
            {[
              {
                name: 'Home',
                path: '/',
                icon: <HiHome className={clsx('h-6 w-auto')} />
              },
              {
                name: 'About',
                path: '/about',
                icon: <IoIosPerson className={clsx('h-6 w-auto')} />
              },
              {
                name: 'Technical Skills',
                path: '/technical-skills',
                icon: <HiCode className={clsx('h-6 w-auto')} />
              },
              {
                name: 'Projects',
                path: '/projects',
                icon: <HiArchive className={clsx('h-6 w-auto')} />
              }
            ].map(({ path, icon }, i) => (
              <motion.li
                key={path}
                className={clsx('relative rounded-3xl p-2')}
                variants={{
                  hidden: {
                    y: 15 * (5 - i),
                    opacity: 0,
                    transition: {
                      delay: (1 + i) * 0.1
                    }
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: (5 - i) * 0.05
                    }
                  }
                }}
                animate={open ? 'visible' : 'hidden'}
              >
                {page === path && (
                  <motion.div
                    layoutId="highlight"
                    className={clsx(
                      'absolute inset-0 rounded-3xl bg-neutral-900 dark:bg-neutral-500/60'
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
                  {/* {page === path && (
                  <span className={clsx('text-xs')}>{name}</span>
                )} */}
                  {icon}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <button
            type="button"
            tabIndex={-1}
            className={clsx(
              'relative h-10 w-10 overflow-hidden rounded-full border-0 bg-neutral-900 p-2 text-white shadow-xl focus:outline-none dark:bg-neutral-500/60'
            )}
            onClick={() => setOpen(!open)}
          >
            <HiMenu
              className={clsx(
                'absolute top-1/2 left-1/2 h-auto w-7 -translate-x-1/2 transform transition-all',
                { 'translate-y-1/2 scale-50': open, '-translate-y-1/2': !open }
              )}
            />
            <HiX
              className={clsx(
                'absolute top-1/2 left-1/2 h-auto w-7 -translate-x-1/2 transform transition-all',
                { '-translate-y-1/2': open, 'translate-y-1/2 scale-50': !open }
              )}
            />
          </button>
        </nav>
        <motion.section className={clsx('')}>{children}</motion.section>
      </div>
    </main>
  )
}

export default AppLayout
