import { ReactChild, ReactChildren } from 'react'
import clsx from 'clsx'
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import useTheme from '@/hooks/useTheme'
import Tabs from '@/components/Tabs'

const AppLayout = ({ children }: { children: ReactChild | ReactChildren }) => {
  const [setting, setSetting] = useTheme()

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
        {children}
      </div>
    </main>
  )
}

export default AppLayout
