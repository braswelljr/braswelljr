import type * as React from 'react';
import { cn } from 'lib/utils';
import { Frame, FramePanel } from '@/components/ui/frame';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Master-detail chat shell. On desktop it renders a resizable two-pane split
 * (list ⇆ thread); on mobile it shows a single pane, driven by `open` (a thread
 * is selected). `list` and `thread` are the two panes (compose them with
 * `ChatListPane` / `ChatThreadPane`).
 */
function ChatLayout({
  open = false,
  list,
  thread,
  className,
  defaultListSize = 320,
  minListSize = 275,
  maxListSize = 375
}: {
  open?: boolean;
  list: React.ReactNode;
  thread: React.ReactNode;
  className?: string;
  defaultListSize?: number;
  minListSize?: number;
  maxListSize?: number;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        data-slot="chat-layout"
        data-open={open}
        className={cn('h-full min-h-0 w-full', className)}
      >
        {open ? thread : list}
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      data-slot="chat-layout"
      className={cn('h-full min-h-0 w-full gap-1', className)}
    >
      <ResizablePanel
        defaultSize={defaultListSize}
        minSize={minListSize}
        maxSize={maxListSize}
        collapsible
        className="w-full max-w-sm overflow-hidden"
      >
        {list}
      </ResizablePanel>
      <ChatResizeHandle withHandle />
      <ResizablePanel className="overflow-hidden">{thread}</ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ChatResizeHandle({ className, ...props }: React.ComponentProps<typeof ResizableHandle>) {
  return (
    <ResizableHandle
      data-slot="chat-resize-handle"
      className={cn('bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800', className)}
      {...props}
    />
  );
}

/** Left column, the thread/subject list. A `Frame` filling its pane. */
function ChatListPane({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <Frame
      data-slot="chat-list-pane"
      className={cn('h-full min-h-0 overflow-hidden', className)}
      {...props}
    >
      <FramePanel className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        {children}
      </FramePanel>
    </Frame>
  );
}

/** Right column, the active thread (header + body + composer), or `ChatEmpty`. */
function ChatThreadPane({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <Frame
      data-slot="chat-thread-pane"
      className={cn('h-full min-h-0 overflow-hidden', className)}
      {...props}
    >
      <FramePanel className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        {children}
      </FramePanel>
    </Frame>
  );
}

export { ChatLayout, ChatListPane, ChatThreadPane, ChatResizeHandle };
