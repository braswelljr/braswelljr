import type * as React from 'react';
import { cn } from 'lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder for the thread list. */
function ChatListSkeleton({
  count = 6,
  className,
  ...props
}: React.ComponentProps<'div'> & { count?: number }) {
  return (
    <div
      data-slot="chat-list-skeleton"
      className={cn('flex flex-col gap-1 p-2', className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-2"
        >
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Loading placeholder for the message stream. */
function ChatMessageSkeleton({
  count = 5,
  className,
  ...props
}: React.ComponentProps<'div'> & { count?: number }) {
  return (
    <div
      data-slot="chat-message-skeleton"
      className={cn('flex flex-col gap-3 p-4', className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => {
        const mine = i % 3 === 0;
        return (
          <div
            key={i}
            className={cn('flex', mine && 'justify-end')}
          >
            <Skeleton className={cn('h-10 rounded-3xl', mine ? 'w-40' : 'w-56')} />
          </div>
        );
      })}
    </div>
  );
}

export { ChatListSkeleton, ChatMessageSkeleton };
