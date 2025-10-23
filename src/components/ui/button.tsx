import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:ring-2 focus:ring-neutral-400/20 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:pointer-events-none disabled:bg-neutral-900/50 data-[state=open]:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus:ring-offset-neutral-900 dark:data-[state=open]:bg-neutral-800',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100',
        subtle: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100',
        ghost:
          'bg-transparent hover:bg-neutral-100 data-[state=open]:bg-transparent dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent text-neutral-900 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-neutral-100 dark:hover:bg-transparent'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-2',
        lg: 'h-11 rounded-md px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
