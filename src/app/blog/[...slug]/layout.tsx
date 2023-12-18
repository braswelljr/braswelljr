import { ReactNode } from 'react'
import { cn } from 'lib/utils'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning className={cn('mx-auto max-w-7xl flex-1 items-start 2xl:max-w-8xl 4xl:max-w-10xl')}>
      {children}
    </div>
  )
}
