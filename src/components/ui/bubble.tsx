import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

function BubbleGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="bubble-group"
      className={cn('flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
  );
}

const bubbleVariants = cva(
  'group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
  {
    variants: {
      variant: {
        default:
          '*:data-[slot=bubble-content]:bg-neutral-900 *:data-[slot=bubble-content]:text-neutral-50 dark:*:data-[slot=bubble-content]:bg-neutral-50 dark:*:data-[slot=bubble-content]:text-neutral-900 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-900/80 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-50/80',
        secondary:
          '*:data-[slot=bubble-content]:bg-neutral-100 *:data-[slot=bubble-content]:text-neutral-900 dark:*:data-[slot=bubble-content]:bg-neutral-800 dark:*:data-[slot=bubble-content]:text-neutral-50 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-200 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-700',
        muted:
          '*:data-[slot=bubble-content]:bg-neutral-100 dark:*:data-[slot=bubble-content]:bg-neutral-800 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-200 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-700',
        tinted:
          '*:data-[slot=bubble-content]:bg-neutral-100 *:data-[slot=bubble-content]:text-neutral-950 dark:*:data-[slot=bubble-content]:bg-neutral-800 dark:*:data-[slot=bubble-content]:text-neutral-50 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-200 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-700',
        outline:
          '*:data-[slot=bubble-content]:border-neutral-200 *:data-[slot=bubble-content]:bg-white dark:*:data-[slot=bubble-content]:border-neutral-800 dark:*:data-[slot=bubble-content]:bg-neutral-950 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-100 [&>[data-slot=bubble-content]:is(button,a):hover]:text-neutral-950 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-800/30 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:text-neutral-50',
        ghost:
          'border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-100 [&>[data-slot=bubble-content]:is(button,a):hover]:text-neutral-950 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-neutral-800/50 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:text-neutral-50',
        info: '*:data-[slot=bubble-content]:bg-blue-600/10 *:data-[slot=bubble-content]:text-blue-700 dark:*:data-[slot=bubble-content]:bg-blue-600/20 dark:*:data-[slot=bubble-content]:text-blue-300 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-blue-600/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-blue-600/30',
        warning:
          '*:data-[slot=bubble-content]:bg-amber-600/10 *:data-[slot=bubble-content]:text-amber-800 dark:*:data-[slot=bubble-content]:bg-amber-600/20 dark:*:data-[slot=bubble-content]:text-amber-200 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-amber-600/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-amber-600/30',
        success:
          '*:data-[slot=bubble-content]:bg-emerald-600/10 *:data-[slot=bubble-content]:text-emerald-700 dark:*:data-[slot=bubble-content]:bg-emerald-600/20 dark:*:data-[slot=bubble-content]:text-emerald-300 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-emerald-600/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-emerald-600/30',
        destructive:
          '*:data-[slot=bubble-content]:bg-red-600/10 *:data-[slot=bubble-content]:text-red-700 dark:*:data-[slot=bubble-content]:bg-red-600/20 dark:*:data-[slot=bubble-content]:text-red-300 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-red-600/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-red-600/30'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Bubble({
  variant = 'default',
  align = 'start',
  className,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof bubbleVariants> & {
    align?: 'start' | 'end';
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

function BubbleContent({ className, render, ...props }: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-transparent px-3 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-neutral-950 [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-neutral-950/30 dark:[button,a]:focus-visible:border-neutral-300 dark:[button,a]:focus-visible:ring-neutral-300/30',
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: 'bubble-content'
    }
  });
}

const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-neutral-100 px-1.5 py-0.5 text-sm ring-3 ring-white has-[button]:p-0 dark:bg-neutral-800 dark:ring-neutral-950',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4'
      },
      align: {
        start: 'left-3',
        end: 'right-3'
      }
    },
    defaultVariants: {
      side: 'bottom',
      align: 'end'
    }
  }
);

function BubbleReactions({
  side = 'bottom',
  align = 'end',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  align?: 'start' | 'end';
  side?: 'top' | 'bottom';
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions };
