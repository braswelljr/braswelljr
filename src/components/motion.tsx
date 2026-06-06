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
export const MotionLink = motion(Link);

// ─── Interactive controls ─────────────────────────────────────────────────────
/** motion <Button> — standard: whileTap={{ scale: 0.97 }} */
export const MotionButton = motion(Button);
/** motion <Input> — focus glow, shake on error */
export const MotionInput = motion(Input);
/** motion <Textarea> — focus glow, height animation */
export const MotionTextarea = motion(Textarea);
/** motion <Label> — stagger with sibling fields */
export const MotionLabel = motion(Label);
/** motion <Toggle> — press scale feedback */
export const MotionToggle = motion(Toggle);

// ─── Layout containers ────────────────────────────────────────────────────────
/** motion <Frame> shell */
export const MotionFrame = motion(Frame);
export const MotionFramePanel = motion(FramePanel);
export const MotionFrameHeader = motion(FrameHeader);
export const MotionFrameTitle = motion(FrameTitle);
export const MotionFrameDescription = motion(FrameDescription);
export const MotionFrameFooter = motion(FrameFooter);

/** motion <Card> and every sub-part */
export const MotionCard = motion(Card);
export const MotionCardHeader = motion(CardHeader);
export const MotionCardTitle = motion(CardTitle);
export const MotionCardDescription = motion(CardDescription);
export const MotionCardPanel = motion(CardPanel);
export const MotionCardContent = MotionCardPanel; // alias
export const MotionCardFooter = motion(CardFooter);
export const MotionCardAction = motion(CardAction);

/** motion <ScrollArea> — wrap scrollable lists for entrance */
export const MotionScrollArea = motion(ScrollArea);
/** motion <Separator> — width/opacity reveal */
export const MotionSeparator = motion(Separator);
/** motion <TextureOverlay> — fade in over containers */
export const MotionTextureOverlay = motion(TextureOverlay);

// ─── Data display ─────────────────────────────────────────────────────────────
/** motion <Badge> — pop in with scale spring */
export const MotionBadge = motion(Badge);
/** motion <Avatar> family — scale entrance, image crossfade */
export const MotionAvatar = motion(Avatar);
export const MotionAvatarImage = motion(AvatarImage);
export const MotionAvatarFallback = motion(AvatarFallback);
/** motion <Skeleton> — fade out when content loads */
export const MotionSkeleton = motion(Skeleton);
/** motion <Spinner> — fade in/out around async actions */
export const MotionSpinner = motion(Spinner);
/** motion <Kbd> — pop in when shortcut appears */
export const MotionKbd = motion(Kbd);
/** motion <Marquee> — container entrance */
export const MotionMarquee = motion(Marquee);

/** motion <Progress> family — slide / fill animations */
export const MotionProgress = motion(Progress);
export const MotionProgressTrack = motion(ProgressTrack);
export const MotionProgressIndicator = motion(ProgressIndicator);

/** motion <Stat> family — counter stagger */
export const MotionStat = motion(Stat);
export const MotionStatLabel = motion(StatLabel);
export const MotionStatValue = motion(StatValue);
export const MotionStatTrend = motion(StatTrend);
export const MotionStatDescription = motion(StatDescription);
export const MotionStatIndicator = motion(StatIndicator);

// ─── Feedback / messaging ─────────────────────────────────────────────────────
/** motion <Alert> family — slide-in banners */
export const MotionAlert = motion(Alert);
export const MotionAlertTitle = motion(AlertTitle);
export const MotionAlertContent = motion(AlertContent);
export const MotionAlertMedia = motion(AlertMedia);
/** motion <Callout> — slide-in from left */
export const MotionCallout = motion(Callout);
/** motion <Empty> state family — stagger illustration + text */
export const MotionEmpty = motion(Empty);
export const MotionEmptyHeader = motion(EmptyHeader);
export const MotionEmptyMedia = motion(EmptyMedia);
export const MotionEmptyTitle = motion(EmptyTitle);
export const MotionEmptyDescription = motion(EmptyDescription);
export const MotionEmptyContent = motion(EmptyContent);

// ─── Navigation ───────────────────────────────────────────────────────────────
/** motion <Breadcrumb> family — stagger crumbs on mount */
export const MotionBreadcrumb = motion(Breadcrumb);
export const MotionBreadcrumbList = motion(BreadcrumbList);
export const MotionBreadcrumbItem = motion(BreadcrumbItem);
export const MotionBreadcrumbLink = motion(BreadcrumbLink);
export const MotionBreadcrumbPage = motion(BreadcrumbPage);

/** motion pagination — stagger page links */
export const MotionPaginationContent = motion(PaginationContent);
export const MotionPaginationItem = motion(PaginationItem);
export const MotionPaginationLink = motion(PaginationLink);
export const MotionPaginationPrevious = motion(PaginationPrevious);
export const MotionPaginationNext = motion(PaginationNext);

// ─── Accordion (item stagger + trigger press) ─────────────────────────────────
// AccordionContent is excluded — it owns its CSS height animation already
export const MotionAccordionItem = motion(AccordionItem);
export const MotionAccordionTrigger = motion(AccordionTrigger);

// ─── Action bar ───────────────────────────────────────────────────────────────
/** motion <ActionBar> — slide up from bottom */
export const MotionActionBar = motion(ActionBar);
export const MotionActionBarGroup = motion(ActionBarGroup);
export const MotionActionBarItem = motion(ActionBarItem);

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
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } }
} as const;

/** Stagger container — pair with itemVariants / cardVariants children */
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
} as const;

/** Individual stagger item — slide-up + fade */
export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } }
} as const;

/** Card grid item — subtle scale + fade */
export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: EASE_OUT } }
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
