import * as React from 'react'
import Image from 'next/image'
import { LiaFileInvoiceSolid } from 'react-icons/lia'
import { cn } from 'lib/utils'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { TerminalCommands } from 'types/unist'
import { Callout } from '~/components/callout'
import { Card } from '~/components/card'
import { CodeBlockWrapper } from '~/components/CodeBlockWrapper'
import { ComponentExample } from '~/components/ComponentExample'
import { ComponentSource } from '~/components/ComponentSource'
import { CopyButton, CopyNpmCommandButton } from '~/components/CopyButton'
import { snippets } from '~/components/snippets'
import TerminalIcon from '~/components/TerminalIcon'

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-4 scroll-m-20 border-b border-b-neutral-200 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text pb-2 text-3xl font-semibold tracking-tight text-transparent first:mt-0 dark:border-b-neutral-800 dark:to-[#ff7056]',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-semibold tracking-tight text-transparent dark:to-[#ff7056]',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-50',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-neutral-300 pl-6 italic text-neutral-800 [&>*]:text-neutral-600',
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border border-neutral-200', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 border-neutral-200 dark:border-neutral-800 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t border-neutral-300 p-0 even:bg-neutral-100', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border border-neutral-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border border-neutral-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __filename__,
    __npmCommand__,
    __pnpmCommand__,
    __yarnCommand__,
    __withMeta__,
    __src__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string
    __withMeta__?: boolean
    __filename__?: string
    __src__?: string
  } & TerminalCommands) => {
    return (
      <div className="my-4 rounded border border-neutral-900 dark:border-neutral-800">
        {/* header */}
        <div className="flex items-center justify-between bg-neutral-900 px-4 py-2 dark:bg-neutral-800">
          {/* title */}
          <h2 className="flex max-w-[80%] items-center space-x-2">
            {/* meta */}
            {/* icon */}
            {__withMeta__ && __filename__ ? (
              <>
                <LiaFileInvoiceSolid className="h-4 w-auto text-white" aria-hidden />
                <span className="text-neutral-400">{__filename__}</span>
              </>
            ) : (
              <>
                <TerminalIcon className="h-4 w-auto text-white" aria-hidden />
                <span className="text-neutral-400">Terminal</span>
              </>
            )}
          </h2>
          {/* copy button */}
          {__rawString__ && !__npmCommand__ && (
            <CopyButton
              value={__rawString__}
              src={__src__}
              className={cn(
                'border-none text-neutral-300 opacity-50 hover:bg-transparent hover:opacity-100'
              )}
            />
          )}
          {__rawString__ && __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && (
            <CopyNpmCommandButton
              commands={{
                __npmCommand__,
                __pnpmCommand__,
                __yarnCommand__
              }}
              className={cn(
                'border-none text-neutral-300 opacity-50 hover:bg-transparent hover:opacity-100'
              )}
            />
          )}
        </div>
        {/* code */}
        <pre
          className={cn(
            'overflow-x-auto bg-neutral-900 px-2 py-4 !font-mono dark:bg-black sm:px-4',
            className
          )}
          {...props}
        />
      </div>
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-neutral-100 px-[0.3rem] py-[0.2rem] !font-mono text-sm text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400',
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card,
  ComponentExample,
  ComponentSource,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border border-neutral-100" {...props} />
  ),
  Steps: ({ ...props }) => (
    <div className="[&>h3]:step mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...props} />
  ),
  ...snippets
}

interface MdxProps {
  code: string
  className?: string
}

export function Mdx({ code, className }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className={cn('mdx', className)}>
      <Component components={components as never} />
    </div>
  )
}
