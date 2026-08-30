import type * as React from 'react';
import { MessagesSquare } from 'lucide-react';
import { cn } from 'lib/utils';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty';

/**
 * "No conversation selected" placeholder for the thread pane. Assembles the
 * `Empty*` parts internally, pass `title` / `description` / `icon`, or drop in
 * custom `children` to override the default body.
 */
function ChatEmpty({
  title = 'No conversation selected',
  description = 'Pick a conversation from the list to read it, or start a new one.',
  icon,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Empty>, 'title'> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Empty
      data-slot="chat-empty"
      className={cn('h-full', className)}
      {...props}
    >
      {children ?? (
        <EmptyHeader>
          <EmptyMedia variant="icon">{icon ?? <MessagesSquare />}</EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      )}
    </Empty>
  );
}

export { ChatEmpty };
