import type * as React from 'react';
import { ChevronDown, Search, SquarePen, X } from 'lucide-react';
import { cn } from 'lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemMedia,
  ItemTitle
} from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';

/** Search box for the conversation list. Controlled, filter the threads yourself. */
function ChatSearch({
  value,
  onValueChange,
  placeholder = 'Search conversations…',
  className
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      data-slot="chat-search"
      className={cn('relative shrink-0 px-2 pt-2', className)}
    >
      <Search className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-neutral-400 dark:text-neutral-500" />
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search conversations"
        className="h-9 ps-9 pe-8"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Clear search"
          onClick={() => onValueChange('')}
          className="absolute inset-y-0 right-3 my-auto"
        >
          <X className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

/** Header bar at the top of the list pane (title + `ChatNewButton`). */
function ChatListHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="chat-list-header"
      className={cn(
        'flex shrink-0 items-center gap-2 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  );
}

/** "New chat" affordance, pair with a `Dialog` to start a conversation. */
function ChatNewButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="New chat"
      className={cn('ml-auto', className)}
      {...props}
    >
      {children ?? <SquarePen className="size-4" />}
    </Button>
  );
}

/** Scrollable list body. */
function ChatList({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-list"
      className="min-h-0 flex-1"
    >
      <ScrollArea className="h-full">
        <div
          role="list"
          className={cn('flex flex-col gap-0.5 p-2', className)}
          {...props}
        >
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}

/** Collapsible, labelled group of threads (e.g. "Applications"). */
function ChatListGroup({
  label,
  defaultOpen = true,
  className,
  children
}: {
  label: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      data-slot="chat-list-group"
      className={cn('flex flex-col', className)}
    >
      <CollapsibleTrigger
        render={
          <button
            type="button"
            className="group flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
          />
        }
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/** A thread row. Prop-driven for the common case; sub-chats go in `children`. */
function ChatListItem({
  active = false,
  onClick,
  avatar,
  title,
  time,
  preview,
  unread,
  className,
  children
}: {
  active?: boolean;
  onClick?: () => void;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  time?: React.ReactNode;
  preview?: React.ReactNode;
  unread?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Item
        data-slot="chat-list-item"
        data-active={active}
        size="sm"
        render={<button type="button" />}
        onClick={onClick}
        className={cn(
          'cursor-pointer items-start text-left hover:bg-neutral-100 data-[active=true]:bg-neutral-100 dark:hover:bg-neutral-800/60 dark:data-[active=true]:bg-neutral-800',
          className
        )}
      >
        {avatar ? <ItemMedia className="self-start">{avatar}</ItemMedia> : null}
        <ItemContent>
          <ItemHeader>
            <ChatListItemTitle>{title}</ChatListItemTitle>
            {time ? (
              <span className="shrink-0 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                {time}
              </span>
            ) : null}
          </ItemHeader>
          {preview ? <ChatListItemPreview>{preview}</ChatListItemPreview> : null}
        </ItemContent>
        {unread ? (
          <ChatListItemMeta>
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5 tabular-nums">
              {unread}
            </Badge>
          </ChatListItemMeta>
        ) : null}
      </Item>
      {children}
    </div>
  );
}

function ChatListItemTitle({ className, ...props }: React.ComponentProps<typeof ItemTitle>) {
  return (
    <ItemTitle
      data-slot="chat-list-item-title"
      className={cn('flex-1', className)}
      {...props}
    />
  );
}

function ChatListItemPreview({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="chat-list-item-preview"
      className={cn('line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400', className)}
      {...props}
    />
  );
}

function ChatListItemMeta({ className, ...props }: React.ComponentProps<typeof ItemActions>) {
  return (
    <ItemActions
      data-slot="chat-list-item-meta"
      className={cn('self-start', className)}
      {...props}
    />
  );
}

/** Nested sub-chats under a thread (flag / review threads), connected by a rail. */
function ChatSubList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="chat-sub-list"
      className={cn(
        'ms-6 mt-0.5 flex flex-col gap-0.5 border-s border-neutral-200 ps-2 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  );
}

function ChatSubListItem({
  active = false,
  onClick,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & { active?: boolean; onClick?: () => void }) {
  return (
    <li>
      <button
        type="button"
        data-slot="chat-sub-list-item"
        data-active={active}
        onClick={onClick}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-xs text-neutral-600 hover:bg-neutral-100 data-[active=true]:bg-neutral-100 data-[active=true]:font-medium dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:data-[active=true]:bg-neutral-800',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export {
  ChatList,
  ChatListHeader,
  ChatSearch,
  ChatNewButton,
  ChatListGroup,
  ChatListItem,
  ChatListItemTitle,
  ChatListItemPreview,
  ChatListItemMeta,
  ChatSubList,
  ChatSubListItem
};
