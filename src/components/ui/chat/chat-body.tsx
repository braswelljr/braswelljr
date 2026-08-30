import type * as React from 'react';
import { cn } from 'lib/utils';
import { Marker, MarkerContent } from '@/components/ui/marker';
import { ScrollArea } from '@/components/ui/scroll-area';

/** Scrollable message stream (the middle of `ChatThreadPane`). */
function ChatBody({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-body"
      className="min-h-0 flex-1"
    >
      <ScrollArea className="h-full">
        <div
          className={cn('flex flex-col gap-3 p-4', className)}
          {...props}
        >
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}

/** Day / section divider inside the stream. */
function ChatDivider({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <Marker
      variant="separator"
      data-slot="chat-divider"
      className={cn('my-1', className)}
      {...props}
    >
      <MarkerContent className="text-xs text-neutral-500 dark:text-neutral-400">
        {children}
      </MarkerContent>
    </Marker>
  );
}

/** "… is typing" indicator. */
function ChatTyping({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <Marker
      role="status"
      data-slot="chat-typing"
      className={cn('px-1', className)}
      {...props}
    >
      <MarkerContent className="shimmer">{children}</MarkerContent>
    </Marker>
  );
}

export { ChatBody, ChatDivider, ChatTyping };
