'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'lib/utils';
import { SidebarNavItem } from 'types/nav';

export interface BlogSidebarNavProps {
  items: SidebarNavItem[];
}

export function BlogSidebarNav({ items }: BlogSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn('pb-6')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{item.title}</h4>
          {item?.items?.length && <BlogSidebarNavItems items={item.items} pathname={pathname} />}
        </div>
      ))}
    </div>
  ) : null;
}

interface BlogSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function BlogSidebarNavItems({ items, pathname }: BlogSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-md px-2 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href && 'bg-neutral-100 dark:bg-neutral-800'
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-neutral-900">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60 hover:underline"
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null;
}
