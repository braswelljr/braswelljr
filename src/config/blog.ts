import { MainNavItem, SidebarNavItem } from 'types/nav'

interface BlogConfig {
  socials: MainNavItem[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const blogConfig: BlogConfig = {
  socials: [
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
  sidebarNav: [],
  mainNav: []
}
