import type * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from 'lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/** Thread header bar (sits at the top of `ChatThreadPane`). */
function ChatHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="chat-header"
      className={cn(
        'flex shrink-0 items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  );
}

/** Back button, shown on mobile to return to the list. */
function ChatHeaderBack({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="chat-header-back"
      variant="ghost"
      size="icon-sm"
      aria-label="Back to conversations"
      className={cn('lg:hidden', className)}
      {...props}
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
}

function ChatHeaderTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-header-title"
      className={cn('min-w-0 flex-1', className)}
      {...props}
    />
  );
}

/** Context chip (e.g. the application/flag the thread is about). */
function ChatHeaderContext({ className, ...props }: React.ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="chat-header-context"
      variant="outline"
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}

export { ChatHeader, ChatHeaderBack, ChatHeaderTitle, ChatHeaderContext };
