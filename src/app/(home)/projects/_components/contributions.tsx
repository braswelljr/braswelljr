'use client';

import { useDeferredValue, useMemo } from 'react';
import { ArrowDown2, CloseCircle, SearchNormal1 } from 'iconsax-react';
import { motion, useReducedMotion } from 'motion/react';
import { parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { BiGitMerge, BiGitPullRequest } from 'react-icons/bi';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { cn } from 'lib/utils';
import {
  isMerged,
  pullRequestState,
  repoFromUrl,
  useIssuesQuery,
  usePullRequestsQuery,
  type GithubIssue,
  type GithubPullRequest,
  type SearchSort
} from '@/api';
import {
  cardVariants,
  containerVariants,
  EASE_OUT,
  headingVariants,
  interactiveCard,
  MotionFrame,
  MotionFramePanel,
  MotionLink,
  safeVariants,
  useRevealOnce
} from '@/components/shared/motion';
import { PendingList } from '@/components/shared/pending';
import { InView } from '@/components/ui/in-view';
import useMedia from '@/hooks/use-media';

const KINDS = ['pull-requests', 'issues'] as const;

const PR_STATES = ['all', 'open', 'merged', 'closed'] as const;
const ISSUE_STATES = ['all', 'open', 'closed'] as const;

const SORTS = [
  { value: 'created', label: 'Newest' },
  { value: 'updated', label: 'Updated' },
  { value: 'comments', label: 'Comments' }
] as const satisfies readonly { value: SearchSort; label: string }[];
const SORT_VALUES: readonly SearchSort[] = SORTS.map((s) => s.value);

/** How many rows a collapsed section shows. */
const COLLAPSED_LG = 6;
const COLLAPSED_SM = 4;
/** Rows requested per page. Search caps at 100. */
const LIMIT = 50;

/**
 * Pull requests and issues authored across every repository, not just the ones
 * owned here, which is the part of the work the repo grid cannot show.
 *
 * State lives in the URL, so a filtered view ("my open PRs, most commented") is
 * a link.
 */
export function Contributions({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  const lg = useMedia('(min-width: 1024px)');
  // Switching tab replaces every row while the grid is already on screen.
  const reveal = useRevealOnce();

  const [kind, setKind] = useQueryState(
    'kind',
    parseAsStringLiteral(KINDS).withDefault('pull-requests').withOptions({ clearOnDefault: true })
  );
  const [state, setState] = useQueryState(
    'state',
    parseAsStringLiteral(['all', 'open', 'merged', 'closed'] as const)
      .withDefault('all')
      .withOptions({ clearOnDefault: true })
  );
  const [sort, setSort] = useQueryState(
    'csort',
    parseAsStringLiteral(SORT_VALUES).withDefault('created').withOptions({ clearOnDefault: true })
  );
  const [expanded, setExpanded] = useQueryState(
    'contrib',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [search, setSearch] = useQueryState(
    'cq',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true, throttleMs: 400 })
  );

  // Matched by GitHub rather than here: the list is one page of a much larger
  // result set, so filtering the page client-side would only search what
  // happened to be fetched.
  const deferredSearch = useDeferredValue(search);
  const q = deferredSearch.trim() || undefined;

  const isPrs = kind === 'pull-requests';
  // `merged` is meaningless for issues, so a stale ?state=merged from the PR
  // tab must not be sent along when the tab flips.
  const effectiveState = isPrs || state !== 'merged' ? state : 'all';
  const stateParam = effectiveState === 'all' ? undefined : effectiveState;

  // Both tabs load, rather than gating the inactive one behind `enabled`.
  // Switching tabs swaps to a different query, and a query that has never run
  // has no previous data to keep, so gating made the first switch collapse the
  // section to a spinner. One extra request on mount buys an instant tab.
  const prs = usePullRequestsQuery({
    limit: LIMIT,
    sort,
    order: 'desc',
    state: stateParam as 'open' | 'closed' | 'merged',
    q
  });
  const issues = useIssuesQuery({
    limit: LIMIT,
    sort,
    order: 'desc',
    state: stateParam as 'open' | 'closed',
    q
  });

  const active = isPrs ? prs : issues;
  const rows = useMemo(() => active.data?.data ?? [], [active.data]);
  const total = active.data?.meta?.total ?? 0;
  // True while a filter change is loading over rows that are already on screen.
  const refreshing = active.isFetching && !active.isPending;

  const collapsed = lg ? COLLAPSED_LG : COLLAPSED_SM;
  const visible = expanded ? rows : rows.slice(0, collapsed);
  const canExpand = rows.length > collapsed;

  const states = isPrs ? PR_STATES : ISSUE_STATES;

  return (
    <div className={cn('space-y-6', className)}>
      <InView
        variants={safeVariants(headingVariants, isReduced)}
        viewOptions={{ once: false, margin: '-40px' }}
        className="flex items-end justify-between"
      >
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
          Contributions
        </h2>
        <span className="text-lg tabular-nums">
          ({active.isPending ? <span aria-label="loading">&hellip;</span> : total})
        </span>
      </InView>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-sm border border-neutral-300 p-0.5 text-xs uppercase dark:border-neutral-700">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => void setKind(k)}
              aria-pressed={kind === k}
              className={cn(
                'cursor-pointer rounded-xs px-2 py-1 transition-colors',
                kind === k
                  ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-700'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              )}
            >
              {k === 'pull-requests' ? 'Pull Requests' : 'Issues'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
            <span className="sr-only">Search contributions</span>
            <SearchNormal1
              size={16}
              color="currentColor"
              variant="Linear"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => void setSearch(e.target.value)}
              placeholder="Search titles"
              className="w-full rounded-sm border border-neutral-300 bg-transparent py-1.5 pr-9 pl-9 text-sm placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-400"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => void setSearch('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <CloseCircle
                  size={16}
                  color="currentColor"
                  variant="Linear"
                />
              </button>
            )}
          </label>

          <label className="flex items-center gap-2 text-xs uppercase">
            <span className="text-neutral-600 dark:text-neutral-400">State</span>
            <select
              value={effectiveState}
              onChange={(e) => void setState(e.target.value as (typeof PR_STATES)[number])}
              className="cursor-pointer rounded-sm border border-neutral-300 bg-transparent px-2 py-1.5 text-xs uppercase focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {states.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs uppercase">
            <span className="text-neutral-600 dark:text-neutral-400">Sort</span>
            <select
              value={sort}
              onChange={(e) => void setSort(e.target.value as SearchSort)}
              className="cursor-pointer rounded-sm border border-neutral-300 bg-transparent px-2 py-1.5 text-xs uppercase focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {SORTS.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                >
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {active.isPending ? (
        <PendingList
          count={collapsed}
          label={`Loading ${isPrs ? 'pull requests' : 'issues'}`}
          gridClassName="gap-3 sm:grid-cols-1 lg:grid-cols-2"
          itemClassName="h-[4.5rem]"
        />
      ) : visible.length > 0 ? (
        <>
          <motion.div
            aria-busy={refreshing}
            className={cn(
              'grid gap-3 transition-opacity duration-200 lg:grid-cols-2',
              refreshing && 'opacity-60'
            )}
            variants={safeVariants(containerVariants, isReduced)}
            initial="hidden"
            {...reveal}
          >
            {visible.map((row) => (
              <ContributionCard
                key={row.id}
                row={row}
                isPr={isPrs}
                isReduced={isReduced}
              />
            ))}
          </motion.div>

          {canExpand && (
            <div className="flex justify-end">
              <motion.button
                type="button"
                onClick={() => void setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs text-neutral-100 uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:bg-neutral-500/50 dark:text-white"
                whileHover={isReduced ? undefined : { scale: 1.04 }}
                whileTap={isReduced ? undefined : { scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                <span>{expanded ? 'View Less' : `View More (${rows.length - collapsed})`}</span>
                <motion.span
                  className="inline-flex"
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={isReduced ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }}
                >
                  <ArrowDown2
                    size={16}
                    color="currentColor"
                    variant="Linear"
                  />
                </motion.span>
              </motion.button>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[20vh] flex-col items-center justify-center gap-2 text-center uppercase">
          {active.isError ? (
            <span className="text-red-600 dark:text-red-400">Could not load from GitHub.</span>
          ) : (
            <span className="text-neutral-600 dark:text-neutral-400">
              {q
                ? `No ${isPrs ? 'pull requests' : 'issues'} match “${q}”.`
                : `No ${isPrs ? 'pull requests' : 'issues'} to show.`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Colour and icon for the row's state. Merged is a third state GitHub splits
 *  across two fields, so it is resolved rather than read directly. */
function statusOf(row: GithubPullRequest | GithubIssue, isPr: boolean) {
  if (isPr) {
    const state = pullRequestState(row as GithubPullRequest);
    if (state === 'merged')
      return {
        Icon: BiGitMerge,
        className: 'text-purple-600 dark:text-purple-400',
        label: 'merged'
      };
    if (state === 'open')
      return {
        Icon: BiGitPullRequest,
        className: 'text-green-600 dark:text-green-400',
        label: 'open'
      };
    return { Icon: BiGitPullRequest, className: 'text-red-600 dark:text-red-400', label: 'closed' };
  }
  return row.state === 'open'
    ? { Icon: GoIssueOpened, className: 'text-green-600 dark:text-green-400', label: 'open' }
    : { Icon: GoIssueClosed, className: 'text-purple-600 dark:text-purple-400', label: 'closed' };
}

function ContributionCard({
  row,
  isPr,
  isReduced
}: {
  row: GithubPullRequest | GithubIssue;
  isPr: boolean;
  isReduced: boolean | null;
}) {
  const { Icon, className, label } = statusOf(row, isPr);
  const repo = repoFromUrl(row.repository_url);
  const merged = isPr && isMerged(row as GithubPullRequest);
  const date = new Date(
    merged ? ((row as GithubPullRequest).pull_request?.merged_at ?? row.created_at) : row.created_at
  );

  return (
    <MotionLink
      href={row.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={safeVariants(cardVariants, isReduced)}
      {...(isReduced ? {} : interactiveCard)}
      className="block"
    >
      <MotionFrame className="h-full gap-0 p-1">
        <MotionFramePanel className="flex flex-col gap-2 p-3">
          <div className="flex items-start gap-2">
            <Icon className={cn('mt-0.5 size-4 shrink-0', className)} />
            <h3 className="line-clamp-2 flex-1 text-sm font-medium">{row.title}</h3>
            <span className="shrink-0 text-xs text-neutral-500">#{row.number}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="line-clamp-1 font-medium">{repo}</span>
            <span className={cn('uppercase', className)}>{label}</span>
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            {row.comments > 0 && <span>{row.comments} comments</span>}
          </div>
        </MotionFramePanel>
      </MotionFrame>
    </MotionLink>
  );
}
