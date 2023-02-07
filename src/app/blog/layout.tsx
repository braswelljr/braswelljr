'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/blog') return children

  return <div className="">{children}</div>
}
