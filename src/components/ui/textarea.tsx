import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const textareaVariants = cva(
  `flex w-full border border-neutral-300 bg-white px-3 py-2 text-neutral-950 shadow-xs shadow-black/5 transition-[color,box-shadow] placeholder:text-neutral-500/80 focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500/60 aria-invalid:ring-red-500/10 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-400/80 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/20 [[readonly]]:cursor-not-allowed dark:[[readonly]]:bg-neutral-800/80`,
  {
    variants: {
      size: {
        sm: 'min-h-16 text-xs',
        default: 'min-h-24 text-sm',
        lg: 'min-h-36 text-base'
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-lg'
      }
    },
    defaultVariants: {
      size: 'default',
      radius: 'default'
    }
  }
);

type TextareaProps = React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>;

function Textarea({ className, size, radius, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, radius }), className)}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
