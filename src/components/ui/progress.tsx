'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cn } from 'lib/utils';

function Progress({
  className,
  indicatorClassName,
  trackClassName,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props & {
  indicatorClassName?: string;
  trackClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn('flex flex-wrap gap-3', className)}
      {...props}
    >
      {children}
      <ProgressTrack className={trackClassName}>
        <ProgressIndicator className={indicatorClassName} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        'relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full',
        // Zinc Palette for the track
        'bg-neutral-100 dark:bg-neutral-800',
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        'h-full rounded-full transition-all duration-500 ease-in-out',
        // Zinc Palette for the indicator
        'bg-neutral-900 dark:bg-neutral-50',
        className
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn('text-sm font-medium text-neutral-900 dark:text-neutral-50', className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        'ml-auto text-sm text-neutral-500 tabular-nums dark:text-neutral-400',
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
