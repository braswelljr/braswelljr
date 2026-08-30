import * as React from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import { cn } from 'lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

/** Reply-context banner shown above the input while composing a reply. */
function ChatComposerReplyTo({
  author,
  excerpt,
  onCancel,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  author: string;
  excerpt: string;
  onCancel: () => void;
}) {
  return (
    <div
      data-slot="chat-composer-reply-to"
      className={cn(
        'flex items-center gap-2 border-s-2 border-neutral-400 bg-neutral-100 px-3 py-1.5 text-xs dark:border-neutral-600 dark:bg-neutral-900',
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium text-neutral-700 dark:text-neutral-300">Replying to {author}</p>
        <p className="truncate text-neutral-500 dark:text-neutral-400">{excerpt}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Cancel reply"
        onClick={onCancel}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

function ChatComposerInput({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="chat-composer-input"
      rows={1}
      className={cn('max-h-32 min-h-9 flex-1 resize-none', className)}
      {...props}
    />
  );
}

/** Attach button (display-only for now, no upload wired yet). */
function ChatComposerAttach({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Attach a file"
      title="Attachments coming soon"
      className={cn('shrink-0', className)}
      {...props}
    >
      <Paperclip className="size-4" />
    </Button>
  );
}

function ChatComposerSend({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      size="icon"
      aria-label="Send message"
      className={cn('shrink-0', className)}
      {...props}
    >
      <Send className="size-4" />
    </Button>
  );
}

/**
 * Composer bar (sits at the bottom of `ChatThreadPane`). Owns its own draft
 * text and calls `onSend(body)`; Enter sends, Shift+Enter newlines. Optional
 * reply banner via `replyTo`.
 */
function ChatComposer({
  onSend,
  onAttach,
  disabled = false,
  placeholder = 'Write a message…',
  replyTo,
  onCancelReply,
  className
}: {
  onSend: (body: string) => void;
  onAttach?: () => void;
  disabled?: boolean;
  placeholder?: string;
  replyTo?: { author: string; excerpt: string };
  onCancelReply?: () => void;
  className?: string;
}) {
  const [text, setText] = React.useState('');
  const submit = () => {
    const body = text.trim();
    if (!body) return;
    onSend(body);
    setText('');
  };

  return (
    <div
      data-slot="chat-composer"
      className={cn(
        'shrink-0 border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950',
        className
      )}
    >
      {replyTo ? (
        <ChatComposerReplyTo
          author={replyTo.author}
          excerpt={replyTo.excerpt}
          onCancel={() => onCancelReply?.()}
        />
      ) : null}
      <div className="flex items-end gap-2 p-3">
        <ChatComposerAttach
          onClick={onAttach}
          disabled={disabled}
        />
        <ChatComposerInput
          value={text}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <ChatComposerSend
          onClick={submit}
          disabled={disabled || !text.trim()}
        />
      </div>
    </div>
  );
}

export {
  ChatComposer,
  ChatComposerReplyTo,
  ChatComposerInput,
  ChatComposerAttach,
  ChatComposerSend
};
