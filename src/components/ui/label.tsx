'use client';

import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const labelVariants = cva(
  'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export function Label({
  className,
  ...props
}: ComponentProps<'label'> & VariantProps<typeof labelVariants>) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}
