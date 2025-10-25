import '~/styles/main.css';
import { Metadata } from 'next';
import LocalFont from 'next/font/local';
import Image from 'next/image';
import Base from '~/providers/base';
import { cn } from 'lib/utils';
import { siteConfig } from '~/config/site';
import Navbar from '~/components/navbar';
import ScrollTop from '~/components/scroll-top';

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

const Satoshi = LocalFont({
  src: './_fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi'
});
const Inter = LocalFont({
  src: './_fonts/Inter[slnt,wght].ttf',
  variable: '--font-inter'
});
const JetbrainsMono = LocalFont({
  src: [
    { path: './_fonts/jetbrainsmono.ttf', style: 'normal' },
    { path: './_fonts/jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
});

const abyssinicaSIL = LocalFont({
  src: './_fonts/AbyssinicaSIL-Regular.ttf',
  variable: '--font-abyssinca'
});
const Cascadia = LocalFont({
  src: './_fonts/Cascadia.ttf',
  variable: '--font-cascadia'
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          'min-h-dvh scroll-smooth bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white',
          Satoshi.className,
          Inter.variable,
          JetbrainsMono.variable,
          abyssinicaSIL.variable,
          Cascadia.variable
        )}
      >
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
              <Navbar className="fixed inset-x-0 top-0 z-4 bg-white/90 dark:bg-neutral-800/90" />
              <div className="relative inset-0 z-1 min-h-dvh w-full">
                {children}
                <ScrollTop
                  className="fixed right-5 bottom-5 z-10 bg-primary! dark:bg-secondary! dark:text-neutral-950!"
                  disableOnLayouts={['/blog/']}
                />
              </div>
            </div>
          </main>
        </Base>
      </body>
    </html>
  );
}
