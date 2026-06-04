'use client';

import * as React from 'react';
import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { cn } from 'lib/utils';
import { Label } from './label';

export const NumberFieldContext: React.Context<{
  fieldId: string;
} | null> = React.createContext<{
  fieldId: string;
} | null>(null);

export function NumberField({
  id,
  className,
  size = 'default',
  radius = 'default',
  ...props
}: NumberFieldPrimitive.Root.Props & {
  size?: 'xs' | 'sm' | 'default' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'default' | 'lg' | 'full';
}): React.ReactElement {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <NumberFieldContext.Provider value={{ fieldId }}>
      <NumberFieldPrimitive.Root
        className={cn('flex w-full flex-col items-start gap-2', className)}
        data-size={size}
        data-radius={radius}
        data-slot="number-field"
        id={fieldId}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

export function NumberFieldGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Group
      className={cn(
        'relative flex w-full justify-between border border-neutral-300 bg-neutral-50 text-sm text-neutral-950 shadow-xs/5 transition-shadow not-dark:bg-clip-padding',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)]',
        'focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-400/30',
        'has-autofill:bg-neutral-950/4 has-aria-invalid:border-red-500/60 focus-within:has-aria-invalid:border-red-500/64 focus-within:has-aria-invalid:ring-red-500/30',
        'data-disabled:pointer-events-none data-disabled:opacity-60',
        '[[data-disabled],:focus-within,[aria-invalid]]:shadow-none',
        'dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
        'dark:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        'dark:focus-within:border-neutral-500 dark:has-autofill:bg-neutral-950/8 dark:has-aria-invalid:border-red-400/60 dark:focus-within:has-aria-invalid:ring-red-400/30',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "in-data-[size=xs]:[&_svg:not([class*='size-'])]:size-3",
        "in-data-[size=sm]:[&_svg:not([class*='size-'])]:size-3.5",
        "in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-5",
        'in-data-[radius=none]:rounded-none',
        'in-data-[radius=sm]:rounded-sm',
        'in-data-[radius=default]:rounded-md',
        'in-data-[radius=lg]:rounded-lg',
        'in-data-[radius=full]:rounded-full',
        className
      )}
      data-slot="number-field-group"
      {...props}
    />
  );
}

export function NumberFieldDecrement({
  className,
  ...props
}: NumberFieldPrimitive.Decrement.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(
        'relative flex shrink-0 cursor-pointer items-center justify-center transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11',
        'px-[calc(--spacing(3)-1px)]',
        'in-data-[size=xs]:px-[calc(--spacing(2)-1px)]',
        'in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)]',
        'in-data-[size=lg]:px-[calc(--spacing(3.5)-1px)]',
        'in-data-[radius=none]:rounded-s-none',
        'in-data-[radius=sm]:rounded-s-[calc(var(--radius-sm)-1px)]',
        'in-data-[radius=default]:rounded-s-[calc(var(--radius-md)-1px)]',
        'in-data-[radius=lg]:rounded-s-[calc(var(--radius-lg)-1px)]',
        'in-data-[radius=full]:rounded-s-full',
        className
      )}
      data-slot="number-field-decrement"
      {...props}
    >
      <MinusIcon />
    </NumberFieldPrimitive.Decrement>
  );
}

export function NumberFieldIncrement({
  className,
  ...props
}: NumberFieldPrimitive.Increment.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Increment
      className={cn(
        'relative flex shrink-0 cursor-pointer items-center justify-center transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11',
        'px-[calc(--spacing(3)-1px)]',
        'in-data-[size=xs]:px-[calc(--spacing(2)-1px)]',
        'in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)]',
        'in-data-[size=lg]:px-[calc(--spacing(3.5)-1px)]',
        'in-data-[radius=none]:rounded-e-none',
        'in-data-[radius=sm]:rounded-e-[calc(var(--radius-sm)-1px)]',
        'in-data-[radius=default]:rounded-e-[calc(var(--radius-md)-1px)]',
        'in-data-[radius=lg]:rounded-e-[calc(var(--radius-lg)-1px)]',
        'in-data-[radius=full]:rounded-e-full',
        className
      )}
      data-slot="number-field-increment"
      {...props}
    >
      <PlusIcon />
    </NumberFieldPrimitive.Increment>
  );
}

export function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Input
      className={cn(
        'w-full min-w-0 grow bg-transparent px-[calc(--spacing(3)-1px)] text-center text-sm tabular-nums outline-none [transition:background-color_5000000s_ease-in-out_0s]',
        // default — h-10
        'h-10 leading-10',
        // xs — h-7
        'in-data-[size=xs]:h-7 in-data-[size=xs]:px-[calc(--spacing(2)-1px)] in-data-[size=xs]:text-[0.6875rem] in-data-[size=xs]:leading-7',
        // sm — h-8.5
        'in-data-[size=sm]:h-8.5 in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] in-data-[size=sm]:text-xs in-data-[size=sm]:leading-8.5',
        // md — h-12
        'in-data-[size=md]:h-12 in-data-[size=md]:text-base in-data-[size=md]:leading-12',
        // lg — h-14
        'in-data-[size=lg]:h-14 in-data-[size=lg]:text-lg in-data-[size=lg]:leading-14',
        className
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

export function NumberFieldScrubArea({
  className,
  label,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props & {
  label: string;
}): React.ReactElement {
  const context = React.useContext(NumberFieldContext);

  if (!context) {
    throw new Error(
      'NumberFieldScrubArea must be used within a NumberField component for accessibility.'
    );
  }

  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn('flex cursor-ew-resize', className)}
      data-slot="number-field-scrub-area"
      {...props}
    >
      <Label
        className="cursor-ew-resize"
        htmlFor={context.fieldId}
      >
        {label}
      </Label>
      <NumberFieldPrimitive.ScrubAreaCursor className="drop-shadow-[0_1px_1px_#0008] filter">
        <CursorGrowIcon />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
}

export function CursorGrowIcon(props: React.ComponentProps<'svg'>): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="black"
      height="14"
      stroke="white"
      viewBox="0 24 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

export { NumberFieldPrimitive };
