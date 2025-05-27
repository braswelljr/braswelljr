import { ReactNode } from 'react';
import { cn } from 'lib/utils';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning className={cn('max-w-8xl mx-auto flex-1 items-start')}>
      {children}
    </div>
  );
}
