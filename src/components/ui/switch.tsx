'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from 'lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default' | 'lg';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        // Base Layout & Transitions
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        // Focus & Validation States (Zinc-based)
        'focus-visible:ring-3 focus-visible:ring-neutral-950/20 dark:focus-visible:ring-neutral-300/40',
        'aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-900/50',
        // Sizing
        'data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=lg]:h-6 data-[size=lg]:w-10 data-[size=sm]:h-3.5 data-[size=sm]:w-6',
        // Background Colors (Zinc)
        'data-checked:bg-neutral-900 dark:data-checked:bg-neutral-50',
        'data-unchecked:bg-neutral-200 dark:data-unchecked:bg-neutral-800',
        // Disabled State
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full shadow-sm ring-0 transition-transform',
          // Thumb Colors
          'bg-white dark:bg-neutral-950',
          // Thumb Sizing
          'group-data-[size=default]/switch:size-4 group-data-[size=lg]/switch:size-5 group-data-[size=sm]/switch:size-3',
          // Translation Logic
          'group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]',
          'group-data-[size=lg]/switch:data-checked:translate-x-[calc(100%-2px)]',
          'group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0.5',
          'group-data-[size=lg]/switch:data-unchecked:translate-x-0.5',
          'group-data-[size=sm]/switch:data-unchecked:translate-x-0.5'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
