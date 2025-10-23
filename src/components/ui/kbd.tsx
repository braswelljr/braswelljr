import { cn } from 'lib/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-neutral-100 px-1 font-sans text-xs font-medium text-neutral-500 select-none dark:bg-neutral-800 dark:text-neutral-400',
        "[&_svg:not([class*='size-'])]:size-3",
        'in-data-[slot=tooltip-content]:bg-white/20 in-data-[slot=tooltip-content]:text-white dark:dark:in-data-[slot=tooltip-content]:bg-neutral-950/10 dark:in-data-[slot=tooltip-content]:bg-neutral-950/20 dark:in-data-[slot=tooltip-content]:text-neutral-950',
        className
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
