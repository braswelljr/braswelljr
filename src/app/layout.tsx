'use client'

import '~/styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import clsx from 'clsx'
import useTheme from '~/hooks/useTheme'
import { XProvider } from '~/context/store'
import Navbar from '~/components/Navbar'
import ScrollTop from '~/components/ScrollTop'

const progress = new ProgressBar({
  size: 3,
  color: '#ffbf00',
  className: 'bar-of-progress',
  delay: 100
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // theme to get user's preferred theme
  const _ = useTheme()

  return (
    <html className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <head />
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
        <main className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
          <XProvider>
            <div className={clsx('relative')}>
              <img
                src={require('~/assets/backgrounds/beams-2.png')}
                alt="Background parttern"
                className="absolute inset-0 h-full w-full"
              />
              <Navbar className="fixed inset-x-0 top-0 z-[4]" />
              <div className="relative inset-0 z-[1] min-h-screen w-full">{children}</div>
              <ScrollTop className="fixed bottom-5 right-5 z-10" />
            </div>
          </XProvider>
        </main>
      </body>
    </html>
  )
}
