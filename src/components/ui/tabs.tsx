'use client';

import type React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cn } from 'lib/utils';

export type TabsVariant = 'default' | 'underline';

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-2 data-[orientation=vertical]:flex-row', className)}
      data-slot="tabs"
      {...props}
    />
  );
}

export function TabsList({
  variant = 'default',
  className,
  indicatorClassName,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
  indicatorClassName?: string;
}): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(
        'relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-neutral-950 dark:text-neutral-50',
        'data-[orientation=vertical]:flex-col',
        variant === 'default'
          ? 'rounded-lg bg-white p-0.5 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
          : 'data-[orientation=horizontal]:py-1 data-[orientation=vertical]:px-1 *:data-[slot=tabs-tab]:hover:bg-neutral-50 dark:*:data-[slot=tabs-tab]:hover:bg-neutral-800',
        className
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          'absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,height,translate] duration-200 ease-in-out',
          variant === 'underline'
            ? 'z-10 bg-neutral-950 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px dark:bg-neutral-50'
            : '-z-1 rounded-md bg-neutral-800 shadow-sm/5 dark:bg-neutral-200',
          indicatorClassName
        )}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props): React.ReactElement {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative flex h-9 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 rounded-md px-[calc(--spacing(2.5)-1px)] text-base font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start sm:h-8 sm:text-sm [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  keepMounted = true,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      keepMounted={keepMounted}
      className={cn(
        'flex-1 outline-none',
        'transition-[opacity,transform] duration-200 ease-in-out',
        'data-starting-style:translate-y-1 data-starting-style:opacity-0',
        'data-ending-style:translate-y-1 data-ending-style:opacity-0',
        className
      )}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { TabsPrimitive, TabsTab as TabsTrigger, TabsPanel as TabsContent };
