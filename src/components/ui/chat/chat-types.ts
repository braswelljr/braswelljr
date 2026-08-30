// Workflow roles (see docs/workflows/clet-accreditation-lifecycle.md Part 2).
// lead_assessor = the assignment's team lead / Lead Inspector; inspector = a team member.
export type ChatRole =
  'institution' | 'officer' | 'lead_assessor' | 'inspector' | 'gtec' | 'director' | 'dg' | 'board';

export type ChatAuthor = {
  id: string;
  name: string;
  avatarUrl?: string;
  /** Display label, e.g. "Lead Inspector". */
  role?: string;
  /** Semantic role for badges / logic. */
  roleKind?: ChatRole;
};

/** A conversation's place in the accreditation workflow. */
export type ChatThreadKind = 'case' | 'domain' | 'review' | 'dm';

/** Per-domain inspection work status (inspection-workflow §8). */
export type DomainWorkStatus = 'in_progress' | 'completed' | 'returned' | 'submitted';

/** Per-domain / per-criterion rating (Workflow 8). */
export type DomainRating = 'meets' | 'partially' | 'does_not_meet' | 'not_applicable';

// Note: the payload types for a message and an attachment are suffixed `Data`
// so they don't collide with the `ChatMessage` / `ChatAttachment` components.
export type ChatAttachmentData = {
  id: string;
  name: string;
  kind: 'file' | 'image';
  url?: string;
  sizeLabel?: string;
};

export type ChatMessageStatus = 'sent' | 'delivered' | 'read';

export type ChatMessageData = {
  id: string;
  author: ChatAuthor;
  mine?: boolean;
  body: string;
  sentAt: string;
  editedAt?: string;
  status?: ChatMessageStatus;
  /** A `minute` is a formally logged entry (Lead sign-off, domain minutes). */
  kind?: 'message' | 'minute';
  attachments?: ChatAttachmentData[];
  /** Parent message id, replies render in that message's `ChatReplies` timeline. */
  replyToId?: string;
  /** Convenience: pre-grouped reply chain (else derive from `replyToId`). */
  replies?: ChatMessageData[];
};

export type ChatThread = {
  id: string;
  subject: string;
  context?: string;
  participants: ChatAuthor[];
  messages: ChatMessageData[];
  updatedAt: string;
  unreadCount?: number;
  /** The application this conversation is tied to (APP-YYYY-NNNNN). */
  applicationId?: string;
  /** Where this thread sits in the workflow. */
  kind?: ChatThreadKind;
  /** For a `domain` thread, the standards domain code (e.g. "SAR-GOV"). */
  domainCode?: string;
  /** For a `domain` thread, the inspector who owns it (may own several). */
  assignee?: ChatAuthor;
  /** For a `domain` thread, inspection work status. */
  workStatus?: DomainWorkStatus;
  /** For a `domain` thread, the domain's summary rating. */
  rating?: DomainRating;
  /** This thread is a sub-chat of another (e.g. a domain/review under a case). */
  parentThreadId?: string;
  /** Convenience: nested sub-chats shown under the list item. */
  subThreads?: ChatThread[];
};
