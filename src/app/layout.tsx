import { type Metadata } from 'next';
import { Maven_Pro } from 'next/font/google';
import LocalFont from 'next/font/local';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/next';
import { cn } from 'lib/utils';
import Navbar from '@/components/shared/navbar';
import ScrollTop from '@/components/shared/scroll-top';
import { siteConfig } from '@/config/site';
import Base from '@/providers/base';
import '@/styles/main.css';

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
};

/**
 * Only the faces something actually renders in. Satoshi, Inter and Abyssinica
 * were loaded here and referenced by nothing, so every route preloaded three
 * fonts it never drew with.
 *
 * Maven Pro is the body text, so it earns its preload on every route. Cascadia
 * and JetBrains Mono belong to particular pages and to code blocks; preloading
 * those everywhere is what the browser's "preloaded but not used" warning is
 * reporting, so they load on demand and `swap` covers the gap.
 */
const MavenPro = Maven_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maven-pro'
});
const Cascadia = LocalFont({
  src: './_fonts/Cascadia.ttf',
  display: 'swap',
  preload: false,
  variable: '--font-cascadia-face'
});
const JetbrainsMono = LocalFont({
  src: [
    { path: './_fonts/jetbrainsmono.ttf', style: 'normal' },
    { path: './_fonts/jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  display: 'swap',
  preload: false,
  variable: '--font-mono-face'
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(MavenPro.variable, JetbrainsMono.variable, Cascadia.variable)}
    >
      <head />
      <body
        className={cn(
          'min-h-dvh scroll-smooth bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white'
        )}
      >
        <Base>
          <main>
            <div className={cn('relative')}>
              <div className="fixed inset-0 min-h-dvh w-full">
                <Image
                  src="/images/beams-2.png"
                  alt="Background pattern"
                  loading="eager"
                  fill
                  className="absolute inset-0 size-full"
                />
              </div>
              <Navbar
                className="fixed inset-x-0 top-0 z-4 bg-white/50 dark:bg-neutral-800/60"
                disableOnLayouts={['/blog/']}
              />
              <div className="relative inset-0 z-1 min-h-dvh w-full">
                {children}
                <ScrollTop
                  className="fixed right-5 bottom-5 z-10 bg-primary! dark:text-neutral-950!"
                  disableOnLayouts={['/blog/']}
                />
              </div>
            </div>
          </main>
        </Base>
        <Analytics />
      </body>
    </html>
  );
}
