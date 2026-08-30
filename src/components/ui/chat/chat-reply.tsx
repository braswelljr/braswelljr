import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from 'lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineSeparator,
  TimelineTitle
} from '@/components/ui/timeline';

/** Reply chain under a message, a `Timeline` whose line connects each reply. */
function ChatReplies({ className, children, ...props }: React.ComponentProps<typeof Timeline>) {
  // Auto-number replies so the timeline connectors render in order.
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <Timeline
      data-slot="chat-replies"
      className={cn('mt-2 ml-2 pl-2', className)}
      {...props}
    >
      {items.map((child, i) =>
        React.isValidElement<{ step?: number }>(child) && child.props.step === undefined
          ? React.cloneElement(child, { step: i + 1 })
          : child
      )}
    </Timeline>
  );
}

/** One reply, a `TimelineItem` with a connector, its author, and the reply body. */
function ChatReply({
  step = 1,
  author,
  timeLabel,
  className,
  children,
  ...props
}: React.ComponentProps<typeof TimelineHeader> & {
  step?: number;
  author?: string;
  timeLabel?: string;
}) {
  return (
    <div
      data-slot="chat-reply"
      data-step={step}
      className={cn('group/timeline-item relative flex flex-col', className)}
      {...props}
    >
      <TimelineHeader>
        <ChatReplyConnector />
        {author ? <TimelineTitle>{author}</TimelineTitle> : null}
        {timeLabel ? (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{timeLabel}</span>
        ) : null}
      </TimelineHeader>
      <TimelineContent className="mt-1.5 pl-9">{children}</TimelineContent>
    </div>
  );
}

/** The dot + connecting line for a reply (reusable outside `ChatReply`). */
function ChatReplyConnector({
  className,
  ...props
}: React.ComponentProps<typeof TimelineIndicator>) {
  return (
    <>
      <TimelineIndicator
        data-slot="chat-reply-connector"
        className={cn('size-6', className)}
        {...props}
      >
        <span className="size-1.5 rounded-full bg-current" />
      </TimelineIndicator>
      <TimelineSeparator />
    </>
  );
}

/** Collapsible "N replies" toggle that wraps a `ChatReplies` block. */
function ChatReplyToggle({
  count,
  defaultOpen = false,
  className,
  children
}: {
  count: number;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      data-slot="chat-reply-toggle"
      className={cn('ml-11', className)}
    >
      <CollapsibleTrigger
        render={
          <button
            type="button"
            className="group flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          />
        }
      >
        <ChevronRight className="size-3.5 transition-transform group-data-panel-open:rotate-90" />
        {count} {count === 1 ? 'reply' : 'replies'}
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

export { ChatReplies, ChatReply, ChatReplyConnector, ChatReplyToggle };
