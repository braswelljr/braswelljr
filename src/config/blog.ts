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
    },
    {
      title: 'Linkedin',
      href: 'https://www.linkedin.com/in/braswell-kenneth-870827192',
      tags: ['linkedin'],
      external: true
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/braswell_jr/',
      tags: ['instagram'],
      external: true
    }
  ],
  sidebarNav: [],
  mainNav: []
}
