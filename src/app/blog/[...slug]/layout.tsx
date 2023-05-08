import { ReactNode } from 'react'
import clsx from 'clsx'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={clsx('mx-auto max-w-7xl flex-1 items-start 2xl:max-w-8xl 4xl:max-w-10xl')}>
      {children}
    </div>
  )
}
