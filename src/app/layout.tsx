import '~/styles/globals.css'
import { Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'
import { siteConfig } from '~/config/site'
import Navbar from '~/components/Navbar'
import ScrollTop from '~/components/ScrollTop'
import { StoreProvider } from '~/context/store'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['braswelljr', 'braswell', 'braswelljr.engineer', 'portfolio', 'blog', 'resume'],
  authors: [
    {
      name: 'braswelljr',
      url: 'https://braswelljr.engineer'
    }
  ],
  creator: 'braswelljr',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icons/icon.png',
    apple: '/icons/icon.png'
  },
  manifest: `/manifest.json`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: []
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <head />
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
        <main className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
          <StoreProvider>
            <div className={clsx('relative')}>
              <Image
                src="/images/beams-2.png"
                alt="Background parttern"
                loading="eager"
                fill
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
              <Navbar className="fixed inset-x-0 top-0 z-[4] bg-white/90 dark:bg-neutral-800/70" />
              <div className="relative inset-0 z-[1] min-h-screen w-full">{children}</div>
              <ScrollTop className="fixed bottom-5 right-5 z-10" />
            </div>
          </StoreProvider>
        </main>
      </body>
    </html>
  )
}
