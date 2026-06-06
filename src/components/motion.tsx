'use client';

/**
 * Motion primitives
 * -----------------
 * Wraps UI components that genuinely benefit from Framer Motion props
 * (whileHover, whileTap, variants, layout animations).
 *
 * NOT included: overlay portals (Dialog, Sheet, Drawer, Popover),
 * complex dropdowns (Select, Combobox), or components that already
 * own their animation system (Carousel, FloatingDock, AnimatedBackground).
 *
 * Usage:
 *   import { MotionButton, MotionCard, MotionBadge } from '@/components/motion'
 *   import { containerVariants, itemVariants, tapScale } from '@/components/motion'
 */
import Link from 'next/link';
import { motion } from 'motion/react';
// ─── UI components ────────────────────────────────────────────────────────────
import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ActionBar, ActionBarGroup, ActionBarItem } from '@/components/ui/action-bar';
import { Alert, AlertContent, AlertMedia, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/ui/callout';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle
} from '@/components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty';
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle
} from '@/components/ui/frame';
import { Input } from '@/components/ui/input';
import { Kbd } from '@/components/ui/kbd';
import { Label } from '@/components/ui/label';
import { Marquee } from '@/components/ui/marquee';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatTrend,
  StatValue
} from '@/components/ui/stat';
import { Textarea } from '@/components/ui/textarea';
import { TextureOverlay } from '@/components/ui/texture-overlay';
import { Toggle } from '@/components/ui/toggle';

// =============================================================================
// MOTION-WRAPPED PRIMITIVES
// =============================================================================

// ─── Routing ──────────────────────────────────────────────────────────────────
/** motion Next.js <Link> — use whileHover / whileTap freely */
export const MotionLink = motion.create(Link);

// ─── Interactive controls ─────────────────────────────────────────────────────
/** motion <Button> — standard: whileTap={{ scale: 0.97 }} */
export const MotionButton = motion.create(Button);
/** motion <Input> — focus glow, shake on error */
export const MotionInput = motion.create(Input);
/** motion <Textarea> — focus glow, height animation */
export const MotionTextarea = motion.create(Textarea);
/** motion <Label> — stagger with sibling fields */
export const MotionLabel = motion.create(Label);
/** motion <Toggle> — press scale feedback */
export const MotionToggle = motion.create(Toggle);

// ─── Layout containers ────────────────────────────────────────────────────────
/** motion <Frame> shell */
export const MotionFrame = motion.create(Frame);
export const MotionFramePanel = motion.create(FramePanel);
export const MotionFrameHeader = motion.create(FrameHeader);
export const MotionFrameTitle = motion.create(FrameTitle);
export const MotionFrameDescription = motion.create(FrameDescription);
export const MotionFrameFooter = motion.create(FrameFooter);

/** motion <Card> and every sub-part */
export const MotionCard = motion.create(Card);
export const MotionCardHeader = motion.create(CardHeader);
export const MotionCardTitle = motion.create(CardTitle);
export const MotionCardDescription = motion.create(CardDescription);
export const MotionCardPanel = motion.create(CardPanel);
export const MotionCardContent = MotionCardPanel; // alias
export const MotionCardFooter = motion.create(CardFooter);
export const MotionCardAction = motion.create(CardAction);

/** motion <ScrollArea> — wrap scrollable lists for entrance */
export const MotionScrollArea = motion.create(ScrollArea);
/** motion <Separator> — width/opacity reveal */
export const MotionSeparator = motion.create(Separator);
/** motion <TextureOverlay> — fade in over containers */
export const MotionTextureOverlay = motion.create(TextureOverlay);

// ─── Data display ─────────────────────────────────────────────────────────────
/** motion <Badge> — pop in with scale spring */
export const MotionBadge = motion.create(Badge);
/** motion <Avatar> family — scale entrance, image crossfade */
export const MotionAvatar = motion.create(Avatar);
export const MotionAvatarImage = motion.create(AvatarImage);
export const MotionAvatarFallback = motion.create(AvatarFallback);
/** motion <Skeleton> — fade out when content loads */
export const MotionSkeleton = motion.create(Skeleton);
/** motion <Spinner> — fade in/out around async actions */
export const MotionSpinner = motion.create(Spinner);
/** motion <Kbd> — pop in when shortcut appears */
export const MotionKbd = motion.create(Kbd);
/** motion <Marquee> — container entrance */
export const MotionMarquee = motion.create(Marquee);

/** motion <Progress> family — slide / fill animations */
export const MotionProgress = motion.create(Progress);
export const MotionProgressTrack = motion.create(ProgressTrack);
export const MotionProgressIndicator = motion.create(ProgressIndicator);

/** motion <Stat> family — counter stagger */
export const MotionStat = motion.create(Stat);
export const MotionStatLabel = motion.create(StatLabel);
export const MotionStatValue = motion.create(StatValue);
export const MotionStatTrend = motion.create(StatTrend);
export const MotionStatDescription = motion.create(StatDescription);
export const MotionStatIndicator = motion.create(StatIndicator);

// ─── Feedback / messaging ─────────────────────────────────────────────────────
/** motion <Alert> family — slide-in banners */
export const MotionAlert = motion.create(Alert);
export const MotionAlertTitle = motion.create(AlertTitle);
export const MotionAlertContent = motion.create(AlertContent);
export const MotionAlertMedia = motion.create(AlertMedia);
/** motion <Callout> — slide-in from left */
export const MotionCallout = motion.create(Callout);
/** motion <Empty> state family — stagger illustration + text */
export const MotionEmpty = motion.create(Empty);
export const MotionEmptyHeader = motion.create(EmptyHeader);
export const MotionEmptyMedia = motion.create(EmptyMedia);
export const MotionEmptyTitle = motion.create(EmptyTitle);
export const MotionEmptyDescription = motion.create(EmptyDescription);
export const MotionEmptyContent = motion.create(EmptyContent);

// ─── Navigation ───────────────────────────────────────────────────────────────
/** motion <Breadcrumb> family — stagger crumbs on mount */
export const MotionBreadcrumb = motion.create(Breadcrumb);
export const MotionBreadcrumbList = motion.create(BreadcrumbList);
export const MotionBreadcrumbItem = motion.create(BreadcrumbItem);
export const MotionBreadcrumbLink = motion.create(BreadcrumbLink);
export const MotionBreadcrumbPage = motion.create(BreadcrumbPage);

/** motion pagination — stagger page links */
export const MotionPaginationContent = motion.create(PaginationContent);
export const MotionPaginationItem = motion.create(PaginationItem);
export const MotionPaginationLink = motion.create(PaginationLink);
export const MotionPaginationPrevious = motion.create(PaginationPrevious);
export const MotionPaginationNext = motion.create(PaginationNext);

// ─── Accordion (item stagger + trigger press) ─────────────────────────────────
// AccordionContent is excluded — it owns its CSS height animation already
export const MotionAccordionItem = motion.create(AccordionItem);
export const MotionAccordionTrigger = motion.create(AccordionTrigger);

// ─── Action bar ───────────────────────────────────────────────────────────────
/** motion <ActionBar> — slide up from bottom */
export const MotionActionBar = motion.create(ActionBar);
export const MotionActionBarGroup = motion.create(ActionBarGroup);
export const MotionActionBarItem = motion.create(ActionBarItem);

// =============================================================================
// EASING CURVES  (Emil Kowalski)
// =============================================================================

/** Strong ease-out — default for entrances and UI interactions */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
/** Ease-in-out — moving between two visible positions */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
/** iOS drawer/sheet feel */
export const EASE_IOS = [0.32, 0.72, 0, 1] as const;

// =============================================================================
// SPRING CONFIGS
// =============================================================================

export const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
export const SPRING_GENTLE = { type: 'spring', stiffness: 260, damping: 20 } as const;
export const SPRING_BOUNCE = { type: 'spring', stiffness: 300, damping: 15 } as const;

// =============================================================================
// VARIANT SETS
// =============================================================================

/** Page-level entrance — fade + rise */
export const pageVariants = {
  hidden: { opacity: 0, y: 18, x: 18 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.35, ease: EASE_OUT } }
} as const;

/** Stagger container — pair with itemVariants / cardVariants children */
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
} as const;

/** Individual stagger item — slide-up + fade */
export const itemVariants = {
  hidden: { opacity: 0, y: 16, x: 16 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.28, ease: EASE_OUT } }
} as const;

/** Card grid item — subtle scale + fade */
export const cardVariants = {
  hidden: { opacity: 0, y: 20, x: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.3, ease: EASE_OUT } }
} as const;

/** Section heading — slide in from left */
export const headingVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } }
} as const;

/** Fade only — decorative / background elements */
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } }
} as const;

/** Slide in from right */
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } }
} as const;

/** Scale pop — badges, chips, status indicators */
export const popVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING_BOUNCE } }
} as const;

/** Slide up from bottom — action bars, toasts, CTAs */
export const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_IOS } },
  exit: { opacity: 0, y: 24, transition: { duration: 0.2, ease: EASE_IN_OUT } }
} as const;

// =============================================================================
// INTERACTION PROP SETS  (spread onto motion elements)
// =============================================================================

/** Subtle lift — cards, panels */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: EASE_OUT } }
} as const;

/** Press scale 0.97 — buttons, links */
export const tapScale = {
  whileTap: { scale: 0.97, transition: { duration: 0.1 } }
} as const;

/** Interactive card — hover lift + press compress */
export const interactiveCard = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2, ease: EASE_OUT } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } }
} as const;

/** Icon button — scale pulse */
export const iconHover = {
  whileHover: { scale: 1.12, transition: { duration: 0.15, ease: EASE_OUT } },
  whileTap: { scale: 0.9, transition: { duration: 0.1 } }
} as const;

/** Link — slight forward nudge + press */
export const linkHover = {
  whileHover: { x: 2, transition: { duration: 0.15, ease: EASE_OUT } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } }
} as const;

// =============================================================================
// REDUCED-MOTION UTILITY
// =============================================================================

/**
 * Strips motion from variants when `prefers-reduced-motion` is set.
 * Pass the result of `useReducedMotion()` as `isReduced`.
 *
 * @example
 * const isReduced = useReducedMotion()
 * <motion.div variants={safeVariants(cardVariants, isReduced)} initial="hidden" animate="visible" />
 */
export function safeVariants<T extends object>(variants: T, isReduced: boolean | null): T {
  if (!isReduced) return variants;
  return Object.fromEntries(
    Object.keys(variants).map((key) => [
      key,
      { opacity: key === 'hidden' ? 0 : 1, transition: { duration: 0.01 } }
    ])
  ) as T;
}
