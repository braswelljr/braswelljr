'use client'

import '~/styles/globals.css'
import clsx from 'clsx'
import useTheme from '~/hooks/useTheme'
import { XProvider } from '~/context/store'
import Navbar from '~/components/Navbar'
import ScrollTop from '~/components/ScrollTop'
import { siteConfig } from '~/config/site'

export default function Layout({ children }: { children: React.ReactNode }) {
  const url = process.env.NODE_ENV === 'production' ? new URL(siteConfig.url) : `localhost:3000`
  // theme to get user's preferred theme
  const _ = useTheme()

  return (
    <html className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <head>
        <title>{`${siteConfig.name} - ${siteConfig.description}`}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" type="image/png" sizes="116x113" href="/icons/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={url?.toString()} />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
        <main className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
          <XProvider>
            <div className={clsx('relative')}>
              <img
                src={require('~/assets/backgrounds/beams-2.png')}
                alt="Background parttern"
                className="absolute inset-0 h-full w-full"
              />
              <Navbar className="fixed inset-x-0 top-0 z-[4] bg-white/90 dark:bg-neutral-800/70" />
              <div className="relative inset-0 z-[1] min-h-screen w-full">{children}</div>
              <ScrollTop className="fixed bottom-5 right-5 z-10" />
            </div>
          </XProvider>
        </main>
      </body>
    </html>
  )
}
