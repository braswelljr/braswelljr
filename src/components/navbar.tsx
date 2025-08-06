'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSpotify } from 'react-icons/fa6';
import { HiCode, HiHome, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoIosPerson } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';
import { useStore } from '~/store/store';
import { cn } from 'lib/utils';
import { useMedia } from 'react-use';
import { useIsMac } from '~/hooks/use-is-mac';
import Search from '~/components/search';
import ThemeSwitch from '~/components/shared/theme-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger } from '~/components/ui/segmented-control';

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

export default function Navbar({ className }: { className?: string }) {
  const [tab, setTab] = useState(nav[0].path);
  const [open, onOpenChange] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const { toggle, onToggle } = useStore((s) => s);
  const lg = useMedia('(width >= 1024px', false);
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

  return (
    <nav
      className={cn(
        'z-4 fixed inset-x-0 top-0 flex items-center justify-between px-4 py-2 font-bold shadow backdrop-blur max-lg:flex-wrap',
        className
      )}
    >
      <div className="max-w-40 lg:w-full">
        {pathname.startsWith('/blog/') ? (
          <button
            type="button"
            className={cn(
              'flex size-8 items-center justify-center rounded-sm bg-neutral-900 text-white focus:outline-none md:hidden dark:bg-neutral-500'
            )}
            onClick={() => onToggle(!toggle)}
          >
            <HiOutlineMenuAlt2 className="size-4" />
          </button>
        ) : (
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
        )}
      </div>

      <SegmentedControl
        value={tab}
        className="flex shrink-0 items-center justify-center gap-4 max-lg:order-last max-lg:mt-4 max-lg:basis-full max-lg:justify-start max-lg:overflow-x-auto"
      >
        <SegmentedControlList
          className="max-xsm:text-sm flex w-full items-center gap-4 whitespace-nowrap font-semibold lg:justify-center"
          classNames={{ indicator: 'bottom-0 h-2 !rounded-t-xl !top-auto bg-primary rounded-none dark:bg-secondary' }}
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
        className="flex items-center gap-2"
      >
        <button
          id="search-button"
          className="max-w-2/3 lg:max-w-3xs flex h-8 w-full items-center justify-between gap-4 rounded-sm border border-neutral-300 px-3 text-sm focus:outline-none dark:border-neutral-700"
          aria-label="Search"
          onClick={() => onOpenChange(!open)}
        >
          <span>Search ...</span>
          <span className="flex items-center gap-0.5">
            <kbd className="hidden rounded border px-1 py-0.5 font-sans text-xs">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            <kbd className="w-4 rounded border px-1 py-0.5 font-sans text-xs">/</kbd>
          </span>
        </button>

        <ThemeSwitch className="" />
      </Layout>

      <Search
        open={open}
        setOpen={onOpenChange}
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
