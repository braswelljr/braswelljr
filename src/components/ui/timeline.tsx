import * as React from 'react';
import { cn } from 'lib/utils';

function Timeline({
  defaultValue,
  className,
  ...props
}: React.ComponentProps<'div'> & { defaultValue?: number }) {
  return (
    <div
      data-slot="timeline"
      data-orientation="vertical"
      data-default-value={defaultValue}
      className={cn('group/timeline flex flex-col gap-4', className)}
      {...props}
    />
  );
}

function TimelineItem({
  step,
  className,
  ...props
}: React.ComponentProps<'div'> & { step: number }) {
  return (
    <div
      data-slot="timeline-item"
      data-step={step}
      className={cn('group/timeline-item relative flex flex-col', className)}
      {...props}
    />
  );
}

function TimelineHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="timeline-header"
      className={cn('flex items-center gap-3', className)}
      {...props}
    />
  );
}

function TimelineSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="timeline-separator"
      className={cn(
        'bg-neutral-200 dark:bg-neutral-800',
        'absolute top-7 left-3 h-[calc(100%-1.5rem-0.25rem)] w-px -translate-y-7',
        'group-last/timeline-item:hidden',
        className
      )}
      {...props}
    />
  );
}

function TimelineIndicator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cn(
        'relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-neutral-200 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
        className
      )}
      {...props}
    />
  );
}

function TimelineTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="timeline-title"
      className={cn('text-sm font-medium text-neutral-900 dark:text-white', className)}
      {...props}
    />
  );
}

function TimelineContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="timeline-content"
      className={cn('mt-1.5 pl-9', className)}
      {...props}
    />
  );
}

function TimelineDate({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="timeline-date"
      className={cn('mt-1 block text-xs text-neutral-500 dark:text-neutral-400', className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineSeparator,
  TimelineIndicator,
  TimelineTitle,
  TimelineContent,
  TimelineDate
};
