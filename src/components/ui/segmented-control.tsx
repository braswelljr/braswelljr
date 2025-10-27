'use client';

import { forwardRef, useState } from 'react';
import { Slottable } from '@radix-ui/react-slot';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import mergeRefs from 'merge-refs';
import { cn } from 'lib/utils';
import { useTabObserver } from '~/hooks/use-tab-observer';

const SegmentedControl = TabsPrimitive.Root;
SegmentedControl.displayName = 'SegmentedControlRoot';

const SegmentedControlList = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    classNames?: { indicator?: string };
    orientation?: 'horizontal' | 'vertical';
  }
>(({ children, className, classNames, orientation = 'horizontal', ...rest }, forwardedRef) => {
  const [style, setStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const { mounted, listRef } = useTabObserver({
    onActiveTabChange: (_, activeTab) => {
      requestAnimationFrame(() => {
        if (!listRef.current) return;

        const listRect = listRef.current.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        // Use getBoundingClientRect() for accurate positioning relative to viewport
        const left = tabRect.left - listRect.left;
        const top = tabRect.top - listRect.top;

        setStyle({
          width: tabRect.width,
          height: tabRect.height,
          left,
          top
        });
      });
    }
  });

  const isVertical = orientation === 'vertical';

  return (
    <TabsPrimitive.List
      ref={mergeRefs(forwardedRef, listRef)}
      data-orientation={orientation}
      className={cn('relative isolate flex items-center justify-center gap-1 rounded p-1 *:w-auto', isVertical ? 'flex-col' : 'flex-row', className)}
      {...rest}
    >
      <Slottable>{children}</Slottable>

      {/* floating indicator */}
      <div
        data-tab-indicator
        className={cn(
          'absolute inset-0 -z-1 rounded-md bg-neutral-900 transition-all duration-300 dark:bg-neutral-200',
          !mounted && 'hidden',
          classNames?.indicator
        )}
        style={{
          transform: `translate3d(${style.left}px, ${style.top}px, 0)`,
          width: `${style.width}px`,
          height: `${style.height}px`,
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
        aria-hidden="true"
      />
    </TabsPrimitive.List>
  );
});
SegmentedControlList.displayName = 'SegmentedControlList';

const SegmentedControlTrigger = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <TabsPrimitive.Trigger
      ref={forwardedRef}
      className={cn(
        // base
        'peer',
        'relative z-10 h-8 rounded-md px-1 text-sm whitespace-nowrap outline-none',
        'flex items-center justify-center gap-1.5',
        'transition duration-300 ease-out',
        // focus
        'focus:outline-none',
        // active
        'data-[state=active]:text-neutral-950 dark:data-[state=active]:text-white',
        className
      )}
      {...rest}
    />
  );
});
SegmentedControlTrigger.displayName = 'SegmentedControlTrigger';

const SegmentedControlContent = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ ...rest }, forwardedRef) => {
  return (
    <TabsPrimitive.Content
      ref={forwardedRef}
      {...rest}
    />
  );
});
SegmentedControlContent.displayName = 'SegmentedControlContent';

export { SegmentedControl, SegmentedControlList, SegmentedControlTrigger, SegmentedControlContent };
