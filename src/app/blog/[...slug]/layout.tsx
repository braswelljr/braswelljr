import { ReactNode } from 'react'
import clsx from 'clsx'
import { BlogSidebarNav } from '~/components/BlogSidebarNav'
import { ScrollArea } from '~/components/ScrollArea'
import { blogConfig } from '~/config/blog'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        'flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'
      )}
    >
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-neutral-100 dark:border-r-neutral-700 md:sticky md:block">
        <ScrollArea className="pr-6 lg:py-10">
          <BlogSidebarNav items={blogConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  )
}
