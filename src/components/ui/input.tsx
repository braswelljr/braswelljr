import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const inputVariants = cva(
  `flex w-full border border-neutral-300 bg-white text-neutral-950 shadow-xs shadow-black/5 transition-[color,box-shadow] file:h-full file:border-0 file:border-e file:border-solid file:border-neutral-300 file:bg-transparent file:p-0 file:font-medium file:text-neutral-900 file:not-italic placeholder:text-neutral-500/80 focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500/60 aria-invalid:ring-red-500/10 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:file:border-neutral-700 dark:file:text-neutral-100 dark:placeholder:text-neutral-400/80 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/20 [[readonly]]:cursor-not-allowed dark:[[readonly]]:bg-neutral-800/80 [[type=file]]:py-0`,
  {
    variants: {
      variant: {
        lg: 'h-14 px-4 text-lg file:me-4 file:pe-4',
        md: 'h-12 px-3 text-base',
        default: 'h-10 px-3 text-sm',
        sm: 'h-8.5 px-2.5 text-xs leading-(--text-sm--line-height) file:me-3 file:pe-3',
        xs: 'h-7 px-2 text-[0.6875rem] file:me-2.5 file:pe-2.5'
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      radius: 'default'
    }
  }
);

type InputProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>;

function Input({ className, type, variant, radius, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, radius }), className)}
      {...props}
    />
  );
}

export { Input, type InputProps };
