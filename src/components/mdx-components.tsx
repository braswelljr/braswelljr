'use client';

import Image from 'next/image';
import { MDXContent } from '@content-collections/mdx/react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card } from 'fumadocs-ui/components/card';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import * as FilesComponents from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { cn } from 'lib/utils';
import * as icons from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import { snippets } from '~/components/snippets';
import { ComponentExample } from './component-example';
import { Mermaid } from './mermaid';

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">#</span> {props.children}
    </h1>
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-16 scroll-m-20 border-b border-b-neutral-200 bg-linear-to-l from-secondary to-primary bg-clip-text pb-2 text-3xl font-semibold tracking-tight text-transparent first:mt-0 dark:border-b-neutral-800 dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">##</span> {props.children}
    </h2>
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-12 scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl font-semibold tracking-tight text-transparent dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">###</span> {props.children}
    </h3>
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">####</span> {props.children}
    </h4>
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-lg font-semibold tracking-tight text-transparent dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">#####</span> {props.children}
    </h5>
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 bg-linear-to-l from-secondary to-primary bg-clip-text text-base font-semibold tracking-tight text-transparent dark:to-primary',
        className
      )}
      {...props}
    >
      <span className="text-sm">######</span> {props.children}
    </h6>
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-50', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 not-first:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('my-6 ml-6 list-disc', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('my-6 ml-6 list-decimal', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li
      className={cn('mt-2', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('mt-6 border-l-2 border-neutral-300 pl-6 text-neutral-800 italic *:text-neutral-600', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn('rounded-md border border-neutral-200', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-4 border-neutral-200 md:my-8 dark:border-neutral-600"
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-auto">
      <table
        className={cn('w-full rounded-2xl', className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t border-neutral-500/50 p-0', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn('border border-neutral-500/50 px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn('border border-neutral-500/50 px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right', className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn('relative rounded bg-linear-to-l from-secondary to-primary bg-clip-text px-[0.3rem] py-[0.2rem] font-cascadia', className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
      <CodeBlock
        className={cn('prose font-cascadia', className)}
        {...props}
      >
        <Pre>{props.children}</Pre>
      </CodeBlock>
    );
  },
  Image,
  Mermaid,
  Callout,
  Card,
  ComponentExample,
  CodeBlock,
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  ...snippets
};

export function getMDXComponents(comps?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    ...comps
  };
}
interface MdxProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MdxProps) {
  const comps = getMDXComponents(components);
  return (
    <div className={cn('mdx', className)}>
      <MDXContent
        code={code}
        components={comps}
      />
    </div>
  );
}
