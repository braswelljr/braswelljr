'use client';

import * as React from 'react';
import { cn } from 'lib/utils';
import { CopyButton, CopyWithClassNames } from '~/components/copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

type ComponentExampleProps = React.HTMLAttributes<HTMLDivElement> & {
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: 'center' | 'start' | 'end';
};

export function ComponentExample({ children, className, extractedClassNames, align = 'center', ...props }: ComponentExampleProps) {
  // const [Example, Code, ...Children] = React.Children.toArray(children) as React.ReactElement[];
  const childrenArray = React.Children.toArray(children);

  const Example = childrenArray[0] as React.ReactElement | undefined;
  const Code = childrenArray[1] as React.ReactElement | undefined;
  const Children = childrenArray.slice(2) as React.ReactElement[];

  const codeString = React.useMemo(() => {
    if (Code && typeof Code === 'object' && Code.props && typeof (Code.props as any)['data-rehype-pretty-code-fragment'] !== 'undefined') {
      const codeChildren = React.Children.toArray((Code.props as any).children);
      const Button = codeChildren[1] as React.ReactElement | undefined;

      if (Button && typeof Button === 'object' && 'props' in Button) {
        return (Button.props as any)?.value || null;
      }
    }
    return null;
  }, [Code]);

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
      {...props}
    >
      <Tabs
        defaultValue="preview"
        className="mr-auto w-full"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          {extractedClassNames ? (
            <CopyWithClassNames
              value={codeString}
              classNames={extractedClassNames}
              className="border-none"
            />
          ) : (
            codeString && <CopyButton value={codeString} />
          )}
        </div>
        <TabsContent
          value="preview"
          className="p-0"
        >
          <div
            className={cn('flex min-h-[350px] justify-center p-10', {
              'items-center': align === 'center',
              'items-start': align === 'start',
              'items-end': align === 'end'
            })}
          >
            {Example}
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          className="border-none p-0"
        >
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">{Code}</div>
            {Children && <div className="rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">{Children}</div>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
