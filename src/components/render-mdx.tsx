import { ClassAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'

const mdxComponents = {
  img: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="not-prose relative my-[2em] overflow-hidden rounded-lg first:mt-0 last:mb-0">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...props} decoding="async" />
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-neutral-900/10" />
    </div>
  )
}

export default function Index({ children }: { children?: ReactNode }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}
