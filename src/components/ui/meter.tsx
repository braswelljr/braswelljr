'use client';

import type React from 'react';
import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { cn } from 'lib/utils';

export function Meter({
  className,
  children,
  ...props
}: MeterPrimitive.Root.Props): React.ReactElement {
  return (
    <MeterPrimitive.Root
      className={cn('flex w-full flex-col gap-2', className)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      )}
    </MeterPrimitive.Root>
  );
}

export function MeterLabel({
  className,
  ...props
}: MeterPrimitive.Label.Props): React.ReactElement {
  return (
    <MeterPrimitive.Label
      className={cn('text-zin-950 text-sm font-medium dark:text-neutral-50', className)}
      data-slot="meter-label"
      {...props}
    />
  );
}

export function MeterTrack({
  className,
  ...props
}: MeterPrimitive.Track.Props): React.ReactElement {
  return (
    <MeterPrimitive.Track
      className={cn(
        'block h-2 w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900',
        className
      )}
      data-slot="meter-track"
      {...props}
    />
  );
}

export function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props): React.ReactElement {
  return (
    <MeterPrimitive.Indicator
      className={cn('bg-neutral-950 transition-all duration-500 dark:bg-neutral-50', className)}
      data-slot="meter-indicator"
      {...props}
    />
  );
}

export function MeterValue({
  className,
  ...props
}: MeterPrimitive.Value.Props): React.ReactElement {
  return (
    <MeterPrimitive.Value
      className={cn('text-zin-950 text-sm tabular-nums dark:text-neutral-50', className)}
      data-slot="meter-value"
      {...props}
    />
  );
}

export { MeterPrimitive };
