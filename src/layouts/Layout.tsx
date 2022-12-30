import React, { ReactNode } from 'react'
import clsx from 'clsx'
import Navbar from '@/components/Navbar'
import ScrollTop from '@/components/ScrollTop'
import { XProvider } from '@/context/store'
import CommandBar from '@/components/CommandBar'

export default function Layout({
  className,
  children
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <XProvider>
      <CommandBar>
        <div className={clsx(className, 'relative')}>
          <img
            src={require('@/assets/backgrounds/beams-2.png')}
            alt="Background parttern"
            className="absolute inset-0 h-full w-full"
          />
          <Navbar className="fixed inset-x-0 top-0 z-[4]" />
          <div className="relative inset-0 z-[1] min-h-screen w-full">
            {children}
          </div>
          <ScrollTop className="fixed bottom-5 right-5 z-[3]" />
        </div>
      </CommandBar>
    </XProvider>
  )
}
