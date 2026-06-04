'use client';

import * as React from 'react';
import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from 'lib/utils';

function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn('relative z-10 flex items-center', className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('group flex flex-1 list-none items-center gap-1', className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = () =>
  cn(
    'group inline-flex h-9 items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium',
    'bg-transparent transition-colors',
    'text-neutral-700 hover:text-primary dark:text-neutral-200 dark:hover:text-primary-400',
    'hover:bg-neutral-100/60 dark:hover:bg-white/5',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  );

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        navigationMenuTriggerStyle(),
        'group',
        'data-popup-open:bg-neutral-100/80 dark:data-popup-open:bg-white/10',
        'data-popup-open:text-primary dark:data-popup-open:text-primary-400',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-px ml-0.5 h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-popup-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        sideOffset={6}
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            'origin-(--transform-origin) rounded-xl border border-neutral-100 bg-white shadow-xl dark:border-white/10 dark:bg-secondary-800',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
          )}
        >
          <NavigationMenuPrimitive.Content
            data-slot="navigation-menu-content"
            className={cn('p-1', className)}
            {...props}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

function NavigationMenuViewport({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('absolute top-full left-0 flex', className)}
      {...props}
    >
      <NavigationMenuPrimitive.Viewport />
    </div>
  );
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'block rounded-md px-4 py-2.5 text-sm no-underline transition-colors outline-none select-none',
        'text-neutral-700 hover:bg-primary-50 hover:text-primary',
        'dark:text-neutral-200 dark:hover:bg-white/5 dark:hover:text-primary-300',
        'focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({ className, ...props }: NavigationMenuPrimitive.Arrow.Props) {
  return (
    <NavigationMenuPrimitive.Arrow
      data-slot="navigation-menu-indicator"
      className={cn('top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', className)}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white shadow-md dark:bg-secondary-800" />
    </NavigationMenuPrimitive.Arrow>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle
};
