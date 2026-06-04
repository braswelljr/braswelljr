import { Loader2Icon, LoaderIcon } from 'lucide-react';
import { cn } from 'lib/utils';

type SpinnerProps = React.ComponentProps<'svg'> & {
  variant?: 'default' | 'classic';
};

function Spinner({ className, variant = 'default', ...props }: SpinnerProps) {
  const Icon = variant === 'classic' ? LoaderIcon : Loader2Icon;

  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
