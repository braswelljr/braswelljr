import { MdInfo } from 'react-icons/md';
import { cn } from 'lib/utils';

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger' | 'info';
}

export function Callout({ children, icon, type = 'default', ...props }: CalloutProps) {
  return (
    <div
      className={cn('my-6 flex items-start rounded-md border border-l-12 border-neutral-900 p-4', {
        'border-neutral-900 dark:border-neutral-800': type === 'default',
        'border-red-600': type === 'danger',
        'border-yellow-500': type === 'warning',
        'border-blue-500': type === 'info'
      })}
      {...props}
    >
      <div
        className={cn('mr-4 text-2xl', {
          'text-red-600': type === 'danger',
          'text-yellow-500': type === 'warning',
          'text-blue-500': type === 'info'
        })}
      >
        {icon ? icon : <MdInfo />}
      </div>
      <div>{children}</div>
    </div>
  );
}
