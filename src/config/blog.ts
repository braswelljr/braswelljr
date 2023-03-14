import { MainNavItem, SidebarNavItem } from 'types/nav'

interface BlogConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      title: 'Blogs',
      href: '/blog'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/braswelljr/braswelljr',
      external: true
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/braswell_jnr',
      external: true
    }
  ],
  sidebarNav: []
}
