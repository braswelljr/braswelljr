import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

type AlertPosition = 'left' | 'right' | 'top';

const alertVariants = cva(
  'relative flex w-full gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800',
  {
    variants: {
      variant: {
        default: 'bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50',
        destructive:
          'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950 dark:text-red-400',
        info: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950 dark:text-blue-400',
        warning:
          'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950 dark:text-yellow-400'
      },
      mediaPosition: {
        // 2. Use 'flex-row-reverse' for right alignment instead of absolute positioning
        left: 'flex-row',
        right: 'flex-row-reverse'
      }
    },
    defaultVariants: {
      variant: 'default',
      mediaPosition: 'left'
    }
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, mediaPosition, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, mediaPosition }), className)}
      {...props}
    >
      {children}
    </div>
  );
});
Alert.displayName = 'Alert';

const AlertContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
);
AlertContent.displayName = 'AlertContent';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 leading-none font-medium tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

const alertMediaVariants = cva(
  'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: 'flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50 [&_svg:not([class*="size-"])]:size-6',
        destructive:
          'flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 [&_svg:not([class*="size-"])]:size-6',
        info: 'flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 [&_svg:not([class*="size-"])]:size-6',
        warning:
          'flex size-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400 [&_svg:not([class*="size-"])]:size-6'
      },
      position: {
        left: '',
        right: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      position: 'left'
    }
  }
);

const AlertMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertMediaVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-media"
    data-variant={variant}
    className={cn(alertMediaVariants({ variant }), className)}
    {...props}
  />
));
AlertMedia.displayName = 'AlertMedia';

export { Alert, AlertTitle, AlertDescription, AlertMedia, AlertContent };

export type { AlertPosition };
