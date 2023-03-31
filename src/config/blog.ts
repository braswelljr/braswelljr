import { MainNavItem, SidebarNavItem } from 'types/nav'

interface BlogConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      title: 'Blogs',
      href: '/blog',
      tags: ['blog']
    },
    {
      title: 'GitHub',
      href: 'https://github.com/braswelljr/braswelljr',
      tags: ['github'],
      external: true
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/braswell_jnr',
      tags: ['twitter'],
      external: true
    }
  ],
  sidebarNav: []
}
