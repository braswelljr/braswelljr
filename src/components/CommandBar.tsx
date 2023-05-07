'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { HiArchive, HiDesktopComputer, HiLink, HiMoon, HiSun } from 'react-icons/hi'
import { ImBlog } from 'react-icons/im'
import { MdSource } from 'react-icons/md'
import { RiUser4Fill } from 'react-icons/ri'
import { TbHome2 } from 'react-icons/tb'
import { KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'
import useTheme from '~/hooks/useTheme'
import CommandRenderResults from '~/components/CommandRenderResults'

export default function CommandBar({ children }: { children?: ReactNode }) {
  const router = useRouter()

  // theme
  const { setTheme } = useTheme()

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <HiLink className="h-5 w-auto" />
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view source',
      section: 'General',
      perform: () => window.open('https://github.com/braswelljr/braswelljr', '_blank'),
      icon: <MdSource className="h-5 w-auto" />
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: <TbHome2 className="h-5 w-auto" />
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go about',
      section: 'Go To',
      perform: () => {},
      icon: <RiUser4Fill className="h-5 w-auto" />
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: <HiArchive className="h-5 w-auto" />
    },
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['g', 'b'],
      keywords: 'go blog',
      section: 'Go To',
      perform: () => router.push('/blog'),
      icon: <ImBlog className="h-5 w-auto" />
    },
    {
      id: 'system',
      name: 'System',
      shortcut: ['t', 's'],
      keywords: 'system theme',
      section: 'Theme',
      perform: () => setTheme('system'),
      icon: <HiDesktopComputer className="h-5 w-auto" />
    },
    {
      id: 'dark',
      name: 'Dark',
      shortcut: ['t', 'd'],
      keywords: 'dark theme',
      section: 'Theme',
      perform: () => setTheme('dark'),
      icon: <HiMoon className="h-5 w-auto" />
    },
    {
      id: 'light',
      name: 'Light',
      shortcut: ['t', 'l'],
      keywords: 'light theme',
      section: 'Theme',
      perform: () => setTheme('light'),
      icon: <HiSun className="h-5 w-auto" />
    }
  ]

  return (
    <KBarProvider actions={actions} options={{ enableHistory: true }}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-[5] flex bg-neutral-900/80 !px-0 !pt-0 md:justify-center md:!px-16 md:!pt-16">
          <KBarAnimator className="relative min-h-[450px] w-full max-w-7xl overflow-hidden rounded bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white max-md:inset-x-0 max-md:top-0 md:w-5/6 lg:w-[850px] [&_>_div_>_div::-webkit-scrollbar]:hidden [&_>_div_>_div]:[-ms-overflow-style:none] [&_>_div_>_div]:[scrollbar-width:none]">
            <KBarSearch
              placeholder="Type a command or search…"
              className="m-0 w-full border-0 border-b border-none bg-neutral-200 px-5 py-6 text-neutral-900 outline-none placeholder:text-xs placeholder:text-neutral-600 dark:bg-neutral-900 dark:text-white md:placeholder:text-sm"
              autoFocus
            />
            <CommandRenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}
