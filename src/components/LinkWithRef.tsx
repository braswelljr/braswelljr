import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

type hrefType = string | { pathname: string; query?: { slug: string } }

interface LinkWithRefType {
  children: ReactNode
  className?: string
  href?: hrefType
}

const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefType & LinkProps>(
  ({ children, className, href }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
)

export default LinkWithRef
