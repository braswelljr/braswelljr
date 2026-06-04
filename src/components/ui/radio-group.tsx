'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cn } from 'lib/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-2', className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border transition-all outline-none',
        'after:absolute after:-inset-x-3 after:-inset-y-2',
        'border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950',
        'focus-visible:border-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950/20 dark:focus-visible:border-white dark:focus-visible:ring-white/20',
        'data-checked:border-neutral-900 data-checked:bg-neutral-900 dark:data-checked:border-neutral-50 dark:data-checked:bg-neutral-50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20',
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center"
      >
        {/* The Dot: High contrast relative to the background */}
        <span className="size-1.5 rounded-full bg-white dark:bg-neutral-950" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
