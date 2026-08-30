import * as React from 'react';
import { Copy, MoreVertical, Pencil, Reply, Trash2 } from 'lucide-react';
import { cn } from 'lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Message, MessageAvatar, MessageContent, MessageFooter } from '@/components/ui/message';
import { Textarea } from '@/components/ui/textarea';

// Shares `mine` down the row so the bubble variant, avatar and menu alignment
// stay consistent without threading the prop through every part.
const ChatMessageContext = React.createContext<{ mine?: boolean }>({});
const useChatMessage = () => React.useContext(ChatMessageContext);

function initialsFrom(name?: string) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

/** One message row. `mine` right-aligns it and switches the bubble to the dark variant. */
function ChatMessage({
  mine = false,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Message> & { mine?: boolean }) {
  const value = React.useMemo(() => ({ mine }), [mine]);
  return (
    <ChatMessageContext.Provider value={value}>
      <Message
        data-slot="chat-message"
        align={mine ? 'end' : 'start'}
        className={className}
        {...props}
      >
        {children}
      </Message>
    </ChatMessageContext.Provider>
  );
}

/** Column holding the bubble + footer (wraps `MessageContent`). */
function ChatMessageContent({ className, ...props }: React.ComponentProps<typeof MessageContent>) {
  return (
    <MessageContent
      data-slot="chat-message-content"
      className={className}
      {...props}
    />
  );
}

function ChatMessageAvatar({
  src,
  name,
  className,
  ...props
}: React.ComponentProps<typeof MessageAvatar> & { src?: string; name?: string }) {
  return (
    <MessageAvatar
      data-slot="chat-message-avatar"
      className={className}
      {...props}
    >
      <Avatar className="size-8">
        {src ? (
          <AvatarImage
            src={src}
            alt={name ?? ''}
          />
        ) : null}
        <AvatarFallback className="text-xs">{initialsFrom(name)}</AvatarFallback>
      </Avatar>
    </MessageAvatar>
  );
}

/** The bubble row: the message body plus an optional hover-revealed `actions` slot. */
function ChatMessageBubble({
  variant,
  actions,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Bubble> & { actions?: React.ReactNode }) {
  const { mine } = useChatMessage();
  return (
    <div className="group/bubble-row flex items-center gap-1 group-data-[align=end]/message:flex-row-reverse">
      <Bubble
        data-slot="chat-message-bubble"
        variant={variant ?? (mine ? 'default' : 'muted')}
        className={className}
        {...props}
      >
        <BubbleContent>{children}</BubbleContent>
      </Bubble>
      {actions ? (
        <div className="shrink-0 opacity-0 transition-opacity group-hover/message:opacity-100 focus-within:opacity-100 max-sm:opacity-100">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

function ChatMessageFooter({ className, ...props }: React.ComponentProps<typeof MessageFooter>) {
  return (
    <MessageFooter
      data-slot="chat-message-footer"
      className={cn('gap-1.5', className)}
      {...props}
    />
  );
}

/** ⋮ actions menu, Copy · Reply always; Edit · Delete when `canModify`. */
function ChatMessageActions({
  canModify = false,
  onCopy,
  onReply,
  onEdit,
  onDelete
}: {
  canModify?: boolean;
  onCopy: () => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Message actions"
            data-slot="chat-message-actions"
          >
            <MoreVertical className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent
        align="end"
        className="w-36"
      >
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onCopy}
        >
          <Copy className="size-4" /> Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onReply}
        >
          <Reply className="size-4" /> Reply
        </DropdownMenuItem>
        {canModify ? (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onEdit}
            >
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 className="size-4" /> Delete
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Inline editor shown in place of the bubble body while editing. */
function ChatMessageEdit({
  defaultValue,
  onSave,
  onCancel,
  className
}: {
  defaultValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  className?: string;
}) {
  const [value, setValue] = React.useState(defaultValue);
  const save = () => {
    const next = value.trim();
    if (next) onSave(next);
  };
  return (
    <div
      data-slot="chat-message-edit"
      className={cn('flex w-72 max-w-full flex-col gap-2', className)}
    >
      <Textarea
        autoFocus
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            save();
          }
          if (e.key === 'Escape') onCancel();
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={save}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export {
  ChatMessage,
  ChatMessageContent,
  ChatMessageAvatar,
  ChatMessageBubble,
  ChatMessageFooter,
  ChatMessageActions,
  ChatMessageEdit
};
