'use client'

import { useTheme } from 'next-themes'
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi'
import { cn } from 'lib/utils'
import { motion } from 'motion/react'

export default function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      {[
        {
          key: 'system',
          icon: <HiDesktopComputer className="size-4" />
        },
        { key: 'dark', icon: <HiMoon className="size-4" /> },
        { key: 'light', icon: <HiSun className="size-4" /> }
      ].map(({ key, icon }, i, self) => (
        <button
          key={key}
          className={cn('relative block cursor-pointer p-1.5')}
          onClick={() => setTheme(key)}
          suppressHydrationWarning
        >
          {key === theme && (
            <motion.div
              layoutId="theme-bubble"
              className={cn(
                'absolute inset-0 bg-neutral-800 dark:bg-neutral-500',
                i === 0 && 'rounded-l-sm',
                i === self.length - 1 && 'rounded-r-sm'
              )}
            />
          )}
          <div className={cn('relative z-[1]', key === theme && 'text-white')}>{icon}</div>
        </button>
      ))}
    </div>
  )
}
