import type * as React from 'react';
import { FileText, ImageIcon } from 'lucide-react';
import { cn } from 'lib/utils';
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment';
import type { ChatAttachmentData } from '@/components/ui/chat/chat-types';

/**
 * Wrapper that opens the file when the chip is clicked.
 *
 * Accreditation passes its `DocumentViewerDialog` here. This project ships its
 * own viewers (`ui/pdfx`, `ui/docx`) rather than that one, so the viewer is an
 * injection point instead of a hard import, and the chip falls back to a plain
 * link. An attachment is then always reachable, whatever the host wires in.
 */
type ChatAttachmentViewer = React.ComponentType<{
  url: string;
  filename: string;
  children: React.ReactNode;
}>;

/** Horizontal, scroll-snapping row of attachment chips inside a bubble. */
function ChatAttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-attachment-group"
      className={cn('mt-1 flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
  );
}

/** A single attachment chip that opens the document/image viewer on click. */
function ChatAttachment({
  attachment,
  className,
  viewer: Viewer
}: {
  attachment: ChatAttachmentData;
  className?: string;
  viewer?: ChatAttachmentViewer;
}) {
  const isImage = attachment.kind === 'image';
  const chip = (
    <Attachment
      data-slot="chat-attachment"
      size="sm"
      className={cn(
        'w-60 max-w-full cursor-pointer bg-white/60 transition-colors hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-900',
        className
      )}
    >
      <AttachmentMedia variant={isImage ? 'image' : 'icon'}>
        {isImage && attachment.url ? (
          <img
            src={attachment.url}
            alt={attachment.name}
          />
        ) : isImage ? (
          <ImageIcon />
        ) : (
          <FileText />
        )}
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{attachment.name}</AttachmentTitle>
        {attachment.sizeLabel ? (
          <AttachmentDescription>{attachment.sizeLabel}</AttachmentDescription>
        ) : null}
      </AttachmentContent>
    </Attachment>
  );

  if (!attachment.url) return chip;

  if (Viewer) {
    return (
      <Viewer
        url={attachment.url}
        filename={attachment.name}
      >
        {chip}
      </Viewer>
    );
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer noopener"
      className="w-fit max-w-full rounded-2xl outline-none focus-visible:ring-1 focus-visible:ring-neutral-950/30 dark:focus-visible:ring-neutral-300/30"
    >
      {chip}
    </a>
  );
}

export { ChatAttachmentGroup, ChatAttachment, type ChatAttachmentViewer };
