'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from 'lib/utils';
import { activityPercentages, useActivityOverviewQuery, type GithubActivityOverview } from '@/api';
import {
  containerVariants,
  EASE_OUT,
  fadeVariants,
  headingVariants,
  itemVariants,
  MotionFrame,
  MotionFrameHeader,
  MotionFramePanel,
  MotionFrameTitle,
  safeVariants
} from '@/components/shared/motion';
import { Skeleton } from '@/components/ui/skeleton';
import { GITHUB_USERNAME } from '@/config/github';

/**
 * The calendar renders off `window`, so it cannot be server-rendered. Its
 * placeholder matches the grid's height to keep the frame from resizing when
 * it lands.
 */
const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((m) => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-800" />
    )
  }
);

/**
 * The calendar's five activity levels, as steps of the primary scale.
 *
 * The dark row is the light row's mirror: 50 pairs with 950, 200 with 800,
 * 400 with 600, so a day of the same intensity sits the same distance from
 * its surface in either theme, and the scale reads as one decision made twice.
 */
const LIGHT_STEPS = [50, 200, 400, 600, 800] as const;
const DARK_STEPS = [950, 800, 600, 400, 200] as const;

/**
 * Resolve those steps to the values the tokens currently hold.
 *
 * The calendar validates its palette with `CSS.supports('color', ...)`, which
 * rejects `var(...)`, so the tokens cannot be handed over by name. Reading
 * their computed values keeps main.css the one place the scale is defined
 * rather than copying ten hex literals into this file. It runs on the client
 * only; the calendar itself never server-renders.
 */
function primaryScale() {
  if (typeof document === 'undefined') return undefined;

  const styles = getComputedStyle(document.documentElement);
  const read = (step: number) => styles.getPropertyValue(`--color-primary-${step}`).trim();

  return { light: LIGHT_STEPS.map(read), dark: DARK_STEPS.map(read) };
}

/** Half the width of the plot, in viewBox units. A 100% axis reaches this far. */
const MAX = 88;
/** Radius a 0% axis still draws at, so the shape never collapses to a point. */
const MIN = 7;
const CX = 160;
const CY = 150;

/** Where each axis points, in draw order: top, right, bottom, left. */
const AXES = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
] as const;

/**
 * The trailing year of work, read three ways: the headline total, the day-level
 * calendar, and a four-axis plot splitting the year into commits, pull
 * requests, issues and code review.
 *
 * The calendar answers "when", the plot answers "at what", so they belong in
 * one frame. Each axis is drawn out from the centre in proportion to its share,
 * which means a shape leaning hard to one side is the point: it says what the
 * year was actually spent on.
 */
export function ActivityOverview({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  const { data, isPending, isError } = useActivityOverviewQuery();

  const slices = useMemo(() => (data ? activityPercentages(data) : null), [data]);
  // Token values do not change between themes, because the scale is declared
  // once at :root, so one read is enough for both rows.
  const scale = useMemo(() => primaryScale(), []);
  // The calendar picks its row off `prefers-color-scheme`, but this site's
  // theme is a class on <html>. Left alone, choosing Dark on a light OS puts a
  // light calendar inside a dark card.
  const { resolvedTheme } = useTheme();

  return (
    <MotionFrame
      className={cn('gap-0 p-1', className)}
      variants={safeVariants(fadeVariants, isReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
    >
      <MotionFrameHeader>
        <MotionFrameTitle
          className="bg-linear-to-l from-secondary to-primary bg-clip-text text-sm font-semibold tracking-tight text-transparent uppercase dark:to-primary"
          variants={safeVariants(headingVariants, isReduced)}
        >
          Activity Overview
        </MotionFrameTitle>
      </MotionFrameHeader>

      <MotionFramePanel className="p-3">
        {isPending ? (
          <ActivitySkeleton />
        ) : isError || !data || !slices ? (
          <p className="py-10 text-center text-sm text-neutral-500 uppercase dark:text-neutral-400">
            Activity could not be loaded
          </p>
        ) : (
          <motion.div
            className="space-y-6"
            variants={safeVariants(containerVariants, isReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
          >
            <ActivitySummary data={data} />

            <motion.div
              className="overflow-x-auto"
              variants={itemVariants}
            >
              <GitHubCalendar
                username={GITHUB_USERNAME}
                // The headline above already states the year's total, from
                // GraphQL. The calendar's own count comes from a different
                // source and lands a few short, so printing both invites the
                // question of which one is wrong.
                showTotalCount={false}
                colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                theme={scale}
              />
            </motion.div>

            <div className="grid items-center gap-6 border-t border-neutral-200 pt-6 lg:grid-cols-[1fr_auto] dark:border-neutral-800">
              <ActivityCounts slices={slices} />
              <ActivityChart
                slices={slices}
                isReduced={Boolean(isReduced)}
              />
            </div>
          </motion.div>
        )}
      </MotionFramePanel>
    </MotionFrame>
  );
}

type Slice = ReturnType<typeof activityPercentages>[number];

/** The four totals the plot turns into percentages, largest first. Percentages
 *  say what the year's shape was; these say how much of it there was. */
function ActivityCounts({ slices }: { slices: Slice[] }) {
  return (
    <motion.dl
      className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2"
      variants={itemVariants}
    >
      {[...slices]
        .sort((a, b) => b.count - a.count)
        .map(({ key, label, count }) => (
          <div
            key={key}
            className="rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <dt className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              {label}
            </dt>
            <dd className="text-lg font-bold tracking-tight text-neutral-900 tabular-nums dark:text-neutral-100">
              {count.toLocaleString()}
            </dd>
          </div>
        ))}
    </motion.dl>
  );
}

/** The prose half: the year's total, and where the commits went. */
function ActivitySummary({ data }: { data: GithubActivityOverview }) {
  const named = data.repositories.slice(0, 3);
  const rest = Math.max(data.repositoryCount - named.length, 0);

  return (
    <motion.div
      className="space-y-4"
      variants={itemVariants}
    >
      <p className="text-balance">
        <span className="bg-linear-to-l from-secondary to-primary bg-clip-text text-4xl leading-none font-bold tracking-tight text-transparent tabular-nums sm:text-5xl">
          {data.total.toLocaleString()}
        </span>{' '}
        <span className="text-sm font-medium tracking-tight text-neutral-600 uppercase dark:text-neutral-400">
          contributions in the last year
        </span>
      </p>

      {named.length > 0 && (
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Contributed to{' '}
          {named.map((repo, i) => (
            <span key={repo.nameWithOwner}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-neutral-900 underline decoration-primary/40 underline-offset-4 transition-colors dark:text-neutral-100 hocus:text-primary hocus:decoration-primary dark:hocus:text-secondary"
              >
                {repo.nameWithOwner}
              </a>
              {i < named.length - 1 && ', '}
            </span>
          ))}
          {rest > 0 && (
            <>
              {' '}
              and {rest} other {rest === 1 ? 'repository' : 'repositories'}
            </>
          )}
          .
        </p>
      )}
    </motion.div>
  );
}

/** The plot itself: two axes, a blob reaching along each, and four labels. */
function ActivityChart({ slices, isReduced }: { slices: Slice[]; isReduced: boolean }) {
  // A 0% axis still needs a visible radius, otherwise a lopsided year (which is
  // the usual case) draws a degenerate line instead of a shape.
  const points = slices
    .map(({ percent }, i) => {
      const r = MIN + (percent / 100) * (MAX - MIN);
      return `${CX + AXES[i].x * r},${CY + AXES[i].y * r}`;
    })
    .join(' ');

  return (
    <motion.figure
      className="mx-auto w-full max-w-[20rem]"
      variants={itemVariants}
    >
      <svg
        viewBox="0 0 320 300"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={slices.map(({ label, percent }) => `${label} ${percent}%`).join(', ')}
      >
        <defs>
          <linearGradient
            id="activity-blob"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              className="[stop-color:var(--color-primary)]"
            />
            <stop
              offset="50%"
              className="[stop-color:var(--color-ember-magenta)]"
            />
            <stop
              offset="100%"
              className="[stop-color:var(--color-secondary)]"
            />
          </linearGradient>
        </defs>

        {/* Axes, drawn first so the blob sits over them. */}
        <line
          x1={CX - MAX}
          y1={CY}
          x2={CX + MAX}
          y2={CY}
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-neutral-300 dark:stroke-neutral-700"
        />
        <line
          x1={CX}
          y1={CY - MAX}
          x2={CX}
          y2={CY + MAX}
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-neutral-300 dark:stroke-neutral-700"
        />

        <motion.polygon
          points={points}
          strokeWidth="6"
          strokeLinejoin="round"
          fill="url(#activity-blob)"
          stroke="url(#activity-blob)"
          className="origin-center opacity-60 transform-fill"
          initial={isReduced ? false : { scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        />

        {slices.map(({ key, label, percent }, i) => {
          const r = MIN + (percent / 100) * (MAX - MIN);
          const vertical = AXES[i].x === 0;
          const anchor = vertical ? 'middle' : AXES[i].x > 0 ? 'start' : 'end';
          const labelX = vertical ? CX : CX + AXES[i].x * (MAX + 12);
          const percentY = vertical ? CY + AXES[i].y * (MAX + (AXES[i].y < 0 ? 34 : 26)) : CY - 6;
          const labelY = vertical ? percentY + (AXES[i].y < 0 ? 16 : 16) : CY + 12;

          return (
            <g key={key}>
              <circle
                cx={CX + AXES[i].x * r}
                cy={CY + AXES[i].y * r}
                r="4"
                strokeWidth="2"
                className="fill-white stroke-primary dark:fill-neutral-900 dark:stroke-secondary"
              />
              <text
                x={labelX}
                y={percentY}
                textAnchor={anchor}
                className="fill-neutral-900 text-[1rem] font-bold tabular-nums dark:fill-neutral-100"
              >
                {percent}%
              </text>
              <text
                x={labelX}
                y={labelY}
                textAnchor={anchor}
                className="fill-neutral-500 text-[0.6875rem] font-medium tracking-wide uppercase dark:fill-neutral-400"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.figure>
  );
}

/** Mirrors the loaded layout so nothing reflows when the data arrives. */
function ActivitySkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading activity overview"
      className="space-y-6"
    >
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3 rounded-sm" />
        <Skeleton className="h-4 w-full rounded-sm" />
      </div>
      <Skeleton className="h-32 rounded-sm" />
      <div className="grid items-center gap-6 border-t border-neutral-200 pt-6 lg:grid-cols-[1fr_auto] dark:border-neutral-800">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton
              key={i}
              className="h-14 rounded-sm"
            />
          ))}
        </div>
        <Skeleton className="mx-auto aspect-320/300 w-full max-w-[20rem] rounded-sm" />
      </div>
      <p
        aria-hidden
        className="animate-pulse text-center text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        Loading activity &hellip;
      </p>
    </div>
  );
}
