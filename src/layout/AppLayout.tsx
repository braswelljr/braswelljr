import { ReactChild, ReactChildren } from 'react'
import clsx from 'clsx'
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import useTheme from '@/hooks/useTheme'

const AppLayout = ({ children }: { children: ReactChild | ReactChildren }) => {
  const [setting, setSetting] = useTheme()

  const theme = [
    {
      icon: <HiDesktopComputer className={clsx('h-6 w-6')} />,
      settings: 'system'
    },
    {
      icon: <HiMoon className={clsx('h-6 w-6')} />,
      settings: 'dark'
    },
    {
      icon: <HiSun className={clsx('h-6 w-6')} />,
      settings: 'light'
    }
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      {/* background */}
      <div className="stars-one" />
      <div className="stars-two" />
      <div className="stars-three" />
      <div className="stars-four" />
      <div className={clsx('relative z-[1]')}>
        <div className="fixed top-4 right-4 flex items-center space-x-2">
          {theme.map(({ icon, settings }, i) => {
            return (
              <button
                key={i}
                type="button"
                className={clsx('')}
                onClick={() => setSetting(settings)}
              >
                <span className="sr-only">Toggle {settings} mode</span>
                {icon}
              </button>
            )
          })}
        </div>
        {children}
      </div>
    </main>
  )
}

export default AppLayout
