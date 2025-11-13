'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSpotify } from 'react-icons/fa6';
import { HiCode, HiHome } from 'react-icons/hi';
import { IoIosPerson } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';
import { useMedia } from 'react-use';
import { cn } from 'lib/utils';
import Search from '~/components/search';
import { ThemeSwitch } from '~/components/theme-switch';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Kbd } from '~/components/ui/kbd';
import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger } from '~/components/ui/segmented-control';
import { useIsMac } from '~/hooks/use-is-mac';

export const nav = [
  {
    name: 'Me',
    path: '/',
    icon: HiHome
  },
  {
    name: 'About',
    path: '/about',
    icon: IoIosPerson
  },
  {
    name: 'Listen With Me (Spotify)',
    path: '/listen-with-me',
    icon: FaSpotify
  },
  {
    name: 'Projects/Technical Skills',
    path: '/projects',
    icon: HiCode
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: MdArticle
  }
];

export default function Navbar({
  className,
  disableOnRoutes = [],
  disableOnLayouts = []
}: {
  className?: string;
  disableOnRoutes?: string[];
  disableOnLayouts?: string[];
}) {
  const [tab, setTab] = useState(nav[0].path);
  const [open, onOpenChange] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const lg = useMedia('(width >= 1024px', true);
  const isMac = useIsMac();

  useEffect(() => {
    const routerTab = pathname.split('/')[1] ? pathname.split('/')[1] : '/';
    if (routerTab) {
      nav.forEach(({ path: href }) => {
        const hrefTab = href.split('/')[1] ? href.split('/')[1] : '/';
        if (hrefTab === routerTab) {
          setTab(href);
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/') {
        //(e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
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
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-4 flex min-h-max items-center justify-between px-4 py-2 font-bold shadow backdrop-blur max-lg:flex-wrap',
        className,
        disableOnRoutes && disableOnRoutes.includes(pathname) && 'hidden',
        disableOnLayouts && disableOnLayouts.some((layout) => pathname.startsWith(layout)) && 'hidden'
      )}
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

      <SegmentedControl
        value={tab}
        className="flex min-h-max shrink-0 items-center justify-center gap-4 max-lg:order-last max-lg:mt-4 max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto max-lg:pb-2"
      >
        <SegmentedControlList
          orientation="horizontal"
          className="max-xsm:text-sm min-h-max gap-4 font-semibold whitespace-nowrap max-lg:pb-2"
          classNames={{ indicator: 'h-2! bottom-0! inset-x-0! inset-auto bg-primary rounded-none rounded-t-xl! dark:bg-secondary' }}
        >
          {nav.map((item, idx) => (
            <SegmentedControlTrigger
              key={idx}
              value={item.path}
              asChild
            >
              <Link
                href={item.path}
                className=""
              >
                {item.name}
              </Link>
            </SegmentedControlTrigger>
          ))}
        </SegmentedControlList>
      </SegmentedControl>

      <Layout
        isViewport={lg}
        className="flex min-h-max items-center gap-2"
      >
        <button
          id="search-button"
          className="border-primary dark:border-secondary dark:text-secondary flex h-8 w-full max-w-1/2 items-center justify-between gap-4 rounded-sm border px-3 text-sm focus:outline-none lg:max-w-3xs"
          aria-label="Search"
          onClick={() => onOpenChange(!open)}
        >
          <span>Search ...</span>
          <span className="flex items-center gap-0.5">
            <Kbd className="hidden rounded border px-1 py-0.5 font-sans text-xs">{isMac ? '⌘' : 'Ctrl'} K</Kbd>
            <Kbd className="border-primary text-primary dark:border-secondary dark:text-secondary rounded border px-1 py-0.5 font-sans text-xs">
              /
            </Kbd>
          </span>
        </button>

        <ThemeSwitch />
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
  if (!isViewport) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <div
      {...props}
      className={cn('', className)}
    >
      {children}
    </div>
  );
}
