import Image from 'next/image';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card } from 'fumadocs-ui/components/card';
import * as CodeBlock from 'fumadocs-ui/components/codeblock';
import * as FilesComponents from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as icons from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import { cn } from 'lib/utils';
import { snippets } from '~/components/snippets';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { ComponentExample } from './component-example';
import { Icons } from './icons';
import { Mermaid } from './mermaid';

const components = {
  h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h1
      className={cn(
        'text-primary dark:text-secondary mt-2 scroll-m-20 text-2xl leading-tight font-bold tracking-tight uppercase sm:text-3xl md:text-4xl',
        className
      )}
      {...props}
    >
      <span className="text-sm">#</span> {props.children}
    </h1>
  ),
  h2: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h2
      className={cn(
        'text-primary dark:text-secondary mt-16 scroll-m-20 border-b border-b-neutral-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0 dark:border-b-neutral-800',
        className
      )}
      {...props}
    >
      <span className="text-sm">##</span> {props.children}
    </h2>
  ),
  h3: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h3
      className={cn('text-primary dark:text-secondary mt-12 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    >
      <span className="text-sm">###</span> {props.children}
    </h3>
  ),
  h4: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h4
      className={cn('text-primary dark:text-secondary mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    >
      <span className="text-sm">####</span> {props.children}
    </h4>
  ),
  h5: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h5
      className={cn('text-primary dark:text-secondary mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    >
      <span className="text-sm">#####</span> {props.children}
    </h5>
  ),
  h6: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h6
      className={cn('text-primary dark:text-secondary mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    >
      <span className="text-sm">######</span> {props.children}
    </h6>
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font text-primary! dark:text-secondary! prose-a:text-primary! dark:prose-a:text-secondary! underline decoration-current! underline-offset-4',
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('border-primary-200 dark:border-secondary-200 mt-6 border-l-2 pl-6 text-neutral-800 italic *:text-neutral-600', className)}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="border-primary dark:border-secondary my-4 md:my-8"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn('text-primary dark:text-secondary font-cascadia relative rounded px-[0.3rem] py-[0.2rem] decoration-current!', className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.ComponentProps<'pre'>) => {
    return (
      <CodeBlock.CodeBlock
        className={cn('prose font-cascadia', className)}
        date-code-block="true"
        {...props}
      >
        <CodeBlock.Pre>{props.children}</CodeBlock.Pre>
      </CodeBlock.CodeBlock>
    );
  },
  Image,
  Mermaid,
  Callout,
  Card,
  ComponentExample,
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step fd-steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  // ...CodeBlock,
  // select
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  ...snippets
};

export function getMDXComponents(comps?: MDXComponents): MDXComponents {
  return {
    ...({ ...Icons, ...icons } as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    ...Twoslash,
    Accordion,
    Accordions,
    ...components,
    ...comps
  };
}
