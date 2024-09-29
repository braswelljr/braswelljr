import '~/styles/globals.css'
import { Metadata } from 'next'
import LocalFont from 'next/font/local'
import Image from 'next/image'
import Base from '~/providers/base'
import { cn } from 'lib/utils'
import { siteConfig } from '~/config/site'
import Navbar from '~/components/navbar'
import ScrollTop from '~/components/scroll-top'

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
      url: 'https://braswelljr.vercel.app'
    }
  ],
  creator: 'braswelljr',
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/icons/icon.png?v=2',
    apple: '/icons/icon.png?v=2'
  },
  manifest: `/manifest.json`
}

const Sen = LocalFont({
  src: [
    { path: './sen.regular.otf', style: 'normal' },
    { path: './sen.bold.otf', style: 'normal' },
    { path: './sen.extrabold.otf', style: 'normal' }
  ],
  variable: '--font-sen'
})

const Lobster = LocalFont({
  src: [{ path: './lobster.ttf', style: 'normal' }],
  variable: '--font-lobster'
})

const JetbrainsMono = LocalFont({
  src: [
    { path: './jetbrainsmono.ttf', style: 'normal' },
    { path: './jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(Sen.className, Lobster.variable, JetbrainsMono.variable)}>
      <head />
      <body className="min-h-dvh bg-white text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white">
        <Base>
          <main>
            <div className={cn('relative')}>
              <div className="fixed inset-0 min-h-dvh w-full">
                <Image
                  src="/images/beams-2.png"
                  alt="Background parttern"
                  loading="eager"
                  fill
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
              <Navbar className="fixed inset-x-0 top-0 z-[4] bg-white/90 dark:bg-neutral-800/90" />
              <div className="relative inset-0 z-[1] min-h-dvh w-full">
                {children}
                <ScrollTop className="fixed bottom-5 right-5 z-10" disableOnLayouts={['/blog/']} />
              </div>
            </div>
          </main>
        </Base>
      </body>
    </html>
  )
}
