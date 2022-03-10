import { ReactChild, ReactChildren, useState } from 'react'
import clsx from 'clsx'
import {
  HiSun,
  HiMoon,
  HiDesktopComputer,
  HiHome,
  HiCode,
  HiArchive
} from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'
import useTheme from '@/hooks/useTheme'
import Tabs from '@/components/Tabs'
import { useRouter } from 'next/router'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'

const AppLayout = ({ children }: { children: ReactChild | ReactChildren }) => {
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

        <section className="fixed inset-x-4 bottom-4 z-[9] flex justify-center">
          <Tabs
            tabs={{
              '/': <HiHome className={clsx('h-6 w-auto')} />,
              '/about': <IoIosPerson className={clsx('h-6 w-auto')} />,
              '/technical-skills': <HiCode className={clsx('h-6 w-auto')} />,
              '/projects': <HiArchive className={clsx('h-6 w-auto')} />
            }}
            className={clsx('flex items-center gap-6')}
            selected={page}
            onChange={setPage}
            addFunction={() => router.push(page)}
            direction="column"
            itemClassName={{
              container: 'bg-neutral-900 dark:bg-neutral-500/60 rounded-full',
              item: 'p-2',
              notSelected: ''
            }}
          />
        </section>
        <section className={clsx('')}>{children}</section>
      </div>
    </main>
  )
}

export default AppLayout
