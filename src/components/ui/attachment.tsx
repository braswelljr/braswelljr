import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';
import { Button } from '@/components/ui/button';

const attachmentVariants = cva(
  'group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-2xl text-neutral-950 transition-colors focus-within:ring-1 focus-within:ring-neutral-950/30 data-[state=error]:border-red-600/30 data-[state=idle]:border-dashed dark:text-neutral-50 dark:focus-within:ring-neutral-300/30',
  {
    variants: {
      variant: {
        default:
          'border bg-white has-[>a,>button]:hover:bg-neutral-100/50 dark:bg-neutral-950 dark:has-[>a,>button]:hover:bg-neutral-800/50',
        outline:
          'border-2 bg-transparent has-[>a,>button]:hover:bg-neutral-100/50 dark:has-[>a,>button]:hover:bg-neutral-800/50',
        muted:
          'border border-transparent bg-neutral-100 has-[>a,>button]:hover:bg-neutral-200/70 dark:bg-neutral-800/60 dark:has-[>a,>button]:hover:bg-neutral-800',
        info: 'border border-blue-600/30 bg-blue-50 has-[>a,>button]:hover:bg-blue-100/60 dark:border-blue-400/30 dark:bg-blue-950/40 dark:has-[>a,>button]:hover:bg-blue-950/60',
        warning:
          'border border-amber-600/30 bg-amber-50 has-[>a,>button]:hover:bg-amber-100/60 dark:border-amber-400/30 dark:bg-amber-950/40 dark:has-[>a,>button]:hover:bg-amber-950/60',
        success:
          'border border-emerald-600/30 bg-emerald-50 has-[>a,>button]:hover:bg-emerald-100/60 dark:border-emerald-400/30 dark:bg-emerald-950/40 dark:has-[>a,>button]:hover:bg-emerald-950/60',
        error:
          'border border-red-600/30 bg-red-50 has-[>a,>button]:hover:bg-red-100/60 dark:border-red-400/30 dark:bg-red-950/40 dark:has-[>a,>button]:hover:bg-red-950/60'
      },
      size: {
        default:
          'gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2',
        sm: 'gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5',
        xs: 'gap-1.5 rounded-xl text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1',
        lg: 'gap-3 text-base has-data-[slot=attachment-content]:px-3 has-data-[slot=attachment-content]:py-2.5 has-data-[slot=attachment-media]:p-2.5',
        xl: 'gap-3.5 rounded-3xl text-base has-data-[slot=attachment-content]:px-3.5 has-data-[slot=attachment-content]:py-3 has-data-[slot=attachment-media]:p-3'
      },
      orientation: {
        horizontal: 'min-w-40 items-center',
        vertical: 'w-24 flex-col has-data-[slot=attachment-content]:w-30'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Attachment({
  className,
  state = 'done',
  variant = 'default',
  size = 'default',
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof attachmentVariants> & {
    state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done';
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ variant, size, orientation }), className)}
      {...props}
    />
  );
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 text-neutral-950 group-data-[orientation=vertical]/attachment:w-full group-data-[size=lg]/attachment:w-12 group-data-[size=sm]/attachment:w-8 group-data-[size=xl]/attachment:w-14 group-data-[size=xl]/attachment:rounded-xl group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-red-600/10 group-data-[state=error]/attachment:text-red-600 group-data-[variant=error]/attachment:bg-red-600/10 group-data-[variant=error]/attachment:text-red-600 group-data-[variant=info]/attachment:bg-blue-600/10 group-data-[variant=info]/attachment:text-blue-600 group-data-[variant=success]/attachment:bg-emerald-600/10 group-data-[variant=success]/attachment:text-emerald-600 group-data-[variant=warning]/attachment:bg-amber-600/10 group-data-[variant=warning]/attachment:text-amber-600 group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! dark:bg-neutral-800 dark:text-neutral-50 dark:group-data-[state=error]/attachment:text-red-400 dark:group-data-[variant=error]/attachment:text-red-400 dark:group-data-[variant=info]/attachment:text-blue-400 dark:group-data-[variant=success]/attachment:text-emerald-400 dark:group-data-[variant=warning]/attachment:text-amber-400 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=lg]/attachment:[&_svg:not([class*='size-'])]:size-5 group-data-[size=xl]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: '',
        image:
          'opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover'
      }
    },
    defaultVariants: {
      variant: 'icon'
    }
  }
);

function AttachmentMedia({
  className,
  variant = 'icon',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function AttachmentContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
        className
      )}
      {...props}
    />
  );
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        'block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer',
        className
      )}
      {...props}
    />
  );
}

function AttachmentDescription({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        'mt-0.5 block min-w-0 truncate text-xs text-neutral-600 group-data-[state=error]/attachment:text-red-600/80 group-data-[variant=error]/attachment:text-red-600/80 group-data-[variant=info]/attachment:text-blue-700/80 group-data-[variant=success]/attachment:text-emerald-700/80 group-data-[variant=warning]/attachment:text-amber-700/80 dark:text-neutral-400 dark:group-data-[state=error]/attachment:text-red-400/80 dark:group-data-[variant=error]/attachment:text-red-400/80 dark:group-data-[variant=info]/attachment:text-blue-300/80 dark:group-data-[variant=success]/attachment:text-emerald-300/80 dark:group-data-[variant=warning]/attachment:text-amber-300/80',
        'max-w-full',
        className
      )}
      {...props}
    />
  );
}

function AttachmentActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1',
        className
      )}
      {...props}
    />
  );
}

function AttachmentAction({
  className,
  variant,
  size = 'icon-xs',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? 'ghost'}
      size={size}
      className={cn(className)}
      {...props}
    />
  );
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: render ? type : (type ?? 'button'),
        className: cn('absolute inset-0 z-10 outline-none', className)
      },
      props
    ),
    render,
    state: {
      slot: 'attachment-trigger'
    }
  });
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        'scrollbar-none flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
        className
      )}
      {...props}
    />
  );
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger
};
