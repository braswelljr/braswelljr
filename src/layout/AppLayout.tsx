import { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import useTheme from '@/hooks/useTheme'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'
import { nav } from '@/components/Nav'
import BubblesBackground from '@/components/backgrounds/bubbles'
import LinkWithRef from '@/components/LinkWithRef'

const AppLayout = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useTheme()
  const [page, setPage] = useState('/')
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    const routerTab = router.pathname.split('/')[1]
      ? router.pathname.split('/')[1]
      : '/'

    if (routerTab) {
      nav.forEach(({ path }) => {
        let pathTab = path.split('/')[1] ? path.split('/')[1] : '/'
        if (pathTab === routerTab) {
          setPage(path)
        }
      })
    }
  }, [router.pathname, page])

  return (
    <>
      <main className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white">
        {/* background */}
        <BubblesBackground />
        <div className={clsx('relative z-[1]')}>
          {/* theme */}
          <div className="fixed right-2 top-2 z-10 flex items-center space-x-10">
            {router.pathname !== '/blog' && (
              <LinkWithRef
                href={'/blog'}
                className={clsx(
                  'rounded-sm bg-neutral-800 px-2 py-1 text-xs font-bold uppercase text-neutral-100 dark:bg-cyan-600 md:text-sm'
                )}
              >
                Blog
              </LinkWithRef>
            )}
            <motion.ul
              className={clsx('flex items-center overflow-hidden md:right-4')}
            >
              {Object.entries({
                system: <HiDesktopComputer className={clsx('h-5 w-auto')} />,
                dark: <HiMoon className={clsx('h-5 w-auto')} />,
                light: <HiSun className={clsx('h-5 w-auto')} />
              }).map(([key, value]) => (
                <motion.li
                  key={key}
                  className={clsx('relative rounded-3xl p-2')}
                >
                  {theme === key && (
                    <motion.div
                      layoutId={'theme-settings'}
                      className={clsx(
                        'absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-500/60'
                      )}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setTheme(key)}
                    className={clsx(
                      `relative z-10 flex w-full items-center space-x-2 transition-colors duration-300 focus:outline-none`,
                      { 'text-white': theme === key }
                    )}
                  >
                    {value}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          {/* menu */}
          <motion.ul
            className={clsx(
              'fixed right-2 bottom-1/2 z-10 flex translate-y-1/2 flex-col items-center overflow-hidden md:right-4'
            )}
          >
            {nav.map(navItem => (
              <motion.li
                key={navItem.path}
                className={clsx('relative rounded-3xl p-2')}
              >
                {page === navItem.path && (
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
                    setPage(navItem.path)
                    router.push(navItem.path)
                  }}
                  className={clsx(
                    `relative z-10 flex w-full items-center space-x-2 transition-colors duration-300 focus:outline-none`,
                    { 'text-white': page === navItem.path }
                  )}
                >
                  {navItem.icon}
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
