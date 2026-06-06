'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { motion, useReducedMotion } from 'motion/react';
import { FaSpotify } from 'react-icons/fa6';
import { HiCode, HiHome } from 'react-icons/hi';
import { IoIosPerson } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';
import { useMedia } from 'react-use';
import { cn } from 'lib/utils';
import Search from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Kbd } from '@/components/ui/kbd';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMac } from '@/hooks/use-is-mac';

gsap.registerPlugin(useGSAP);

export const nav = [
  { name: 'Me', path: '/', icon: HiHome },
  { name: 'About', path: '/about', icon: IoIosPerson },
  { name: 'Listen With Me (Spotify)', path: '/listen-with-me', icon: FaSpotify },
  { name: 'Projects/Technical Skills', path: '/projects', icon: HiCode },
  { name: 'Blog', path: '/blog', icon: MdArticle }
];

export default function Navbar({
  className,
  disableOnRoutes = [],
  disableOnLayouts = []
}: Partial<{
  className?: string;
  disableOnRoutes?: string[];
  disableOnLayouts?: string[];
}>) {
  const [tab, setTab] = useState(nav[0].path);
  const [open, onOpenChange] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const lg = useMedia('(width >= 1024px', true);
  const isMac = useIsMac();
  const isReduced = useReducedMotion();

  useEffect(() => {
    const routerTab = pathname.split('/')[1] ? pathname.split('/')[1] : '/';
    if (routerTab) {
      nav.forEach(({ path: href }) => {
        const hrefTab = href.split('/')[1] ? href.split('/')[1] : '/';
        if (hrefTab === routerTab) setTab(href);
      });
    }
  }, [pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        onOpenChange((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const height = `${navRef.current.offsetHeight ?? 60}px`;
        document.documentElement.style.setProperty('--fd-nav-height', height, 'important');
        document.documentElement.style.setProperty('--fd-header-height', height, 'important');
        document.documentElement.style.setProperty('--fd-toc-popover-height', height);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // GSAP entrance: slide down from -100%
  useGSAP(
    () => {
      if (isReduced) return;
      gsap.fromTo(
        navRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
      );
    },
    { scope: navRef }
  );

  const isHidden =
    (disableOnRoutes && disableOnRoutes.includes(pathname)) ||
    (disableOnLayouts && disableOnLayouts.some((l) => pathname.startsWith(l)));

  if (isHidden) return null;

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-4 flex min-h-max items-center justify-between px-4 py-2 font-bold shadow backdrop-blur max-lg:flex-wrap',
        className
      )}
    >
      {/* Logo */}
      <motion.div
        initial={isReduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
      >
        <Avatar className="size-8 rounded-none">
          <AvatarImage
            src="/icons/b.png"
            alt="B"
            className="hidden dark:block"
          />
          <AvatarImage
            src="/icons/black-b.png"
            alt="B"
            className="dark:hidden"
          />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Nav tabs */}
      <Tabs
        value={tab}
        orientation="horizontal"
        className="flex min-h-max shrink-0 items-center justify-center gap-4 max-lg:order-last max-lg:mt-4 max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto"
      >
        <TabsList
          indicatorClassName="h-1.5! bg-primary! rounded-t-xl!"
          variant="underline"
          className="min-h-max gap-4 font-semibold whitespace-nowrap *:data-active:text-primary! max-xsm:text-sm max-lg:pb-2"
        >
          {nav.map((item, idx) => (
            <motion.div
              key={idx}
              initial={isReduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.2 + idx * 0.06
              }}
            >
              <TabsTrigger
                value={item.path}
                nativeButton={false}
                render={(p) => (
                  <Link
                    {...p}
                    href={item.path}
                    className=""
                  >
                    {item.name}
                  </Link>
                )}
              />
            </motion.div>
          ))}
        </TabsList>
      </Tabs>

      {/* Right controls */}
      <Layout
        isViewport={lg}
        className="flex min-h-max items-center gap-2"
      >
        <motion.div
          initial={isReduced ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.45 }}
          className="flex items-center gap-2"
        >
          <button
            id="search-button"
            className="flex h-8 w-full max-w-1/2 items-center justify-between gap-4 rounded-sm border border-primary! px-3 text-sm transition-colors focus:outline-none lg:max-w-3xs hocus:bg-primary/5"
            aria-label="Search"
            onClick={() => onOpenChange(!open)}
          >
            <span>Search ...</span>
            <span className="flex items-center gap-0.5">
              <Kbd className="hidden rounded border px-1 py-0.5 font-sans text-xs">
                {isMac ? '⌘' : 'Ctrl'} K
              </Kbd>
              <Kbd className="rounded border border-primary! px-1 py-0.5 font-sans text-xs text-primary!">
                /
              </Kbd>
            </span>
          </button>

          <ThemeSwitch />
        </motion.div>
      </Layout>

      <Search
        open={open}
        onOpenChange={onOpenChange}
        searchButtonRef={searchButtonRef}
      />
    </nav>
  );
}

type LayoutType = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  isViewport?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
};

function Layout({ children, className, isViewport, ...props }: LayoutType) {
  if (!isViewport) return <Fragment>{children}</Fragment>;
  return (
    <div
      {...props}
      className={cn('', className)}
    >
      {children}
    </div>
  );
}
