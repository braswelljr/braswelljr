'use client';

import { Suspense, useDeferredValue, useMemo } from 'react';
import { ArrowDown2, CloseCircle, SearchNormal1 } from 'iconsax-react';
import { motion, useReducedMotion } from 'motion/react';
import { parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { BiGitRepoForked } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';
import { HiFolderOpen, HiOutlineExternalLink } from 'react-icons/hi';
import { usePinnedReposQuery, useReposQuery, type GithubRepo, type RepoSort } from '@/api';
import {
  cardVariants,
  containerVariants,
  EASE_OUT,
  headingVariants,
  interactiveCard,
  MotionFrame,
  MotionFrameFooter,
  MotionFramePanel,
  MotionLink,
  safeVariants,
  tapScale,
  useRevealOnce
} from '@/components/shared/motion';
import { PendingList } from '@/components/shared/pending';
import { InView } from '@/components/ui/in-view';
import useMedia from '@/hooks/use-media';
import { ActivityOverview } from './_components/activity-overview';
import { Contributions } from './_components/contributions';
import { OtherProjects } from './_components/other-projects';
import { TechStack } from './_components/tech-stack';

/**
 * The repo sections read their filter/sort/expanded state from the URL via
 * nuqs, which reads `useSearchParams`. That has to sit inside a Suspense
 * boundary or Next cannot prerender this route at all. Keeping the boundary
 * around just these sections leaves the heading, the write-up and the
 * contribution graph in the static HTML.
 */
export default function Projects() {
  const isReduced = useReducedMotion();
  const safeHeading = safeVariants(headingVariants, isReduced);

  return (
    <div className="py-12 max-lg:pt-36">
      <div className="mx-auto max-w-[calc(var(--container-4xl)+5px)] space-y-8 px-4 text-gray-800 sm:mt-14 sm:space-y-10 dark:text-neutral-100">
        {/* Page heading */}
        <InView
          variants={safeHeading}
          viewOptions={{ once: false }}
          as="h1"
          className="bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl dark:to-primary"
        >
          Work, Hobby and Open Source
        </InView>

        {/* Write up */}
        <motion.div
          className="space-y-6 text-neutral-600 dark:text-neutral-400"
          variants={safeVariants(containerVariants, isReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
        >
          <motion.p variants={safeVariants(cardVariants, isReduced)}>
            I&rsquo;m obsessed with building things that are useful and fun to use. I am an{' '}
            <span className="bg-linear-to-l from-secondary to-primary bg-clip-text px-3 text-transparent uppercase dark:to-primary">
              enthusiast
            </span>{' '}
            and I love to contribute to open source. I am also a hobbyist and I love to build things
            that are fun to use.
          </motion.p>
          <motion.div variants={safeVariants(cardVariants, isReduced)}>
            <TechStack />
          </motion.div>
        </motion.div>

        <ActivityOverview />

        <Suspense fallback={<RepoSectionsFallback />}>
          <RepoSections />
          <Contributions />
        </Suspense>

        <OtherProjects />
      </div>
    </div>
  );
}

/** Placeholder matching the two repo sections' shape while the URL state and
 *  the GitHub queries resolve. */
function RepoSectionsFallback() {
  return (
    <>
      {['Starred Projects', 'All Projects'].map((title) => (
        <div
          key={title}
          className="space-y-6"
        >
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
            {title}
          </h2>
          <div className="flex min-h-[25vh] flex-col items-center justify-center uppercase">
            <span className="animate-pulse">Loading ...</span>
          </div>
        </div>
      ))}
    </>
  );
}

function RepoSections() {
  // Sorting, searching and "View More" all replace cards while the grid is
  // already on screen, where `whileInView` would never fire again.
  const reveal = useRevealOnce();

  // Held in the URL rather than component state, so a filtered, sorted,
  // expanded view is a link someone can share or come back to. Each parser
  // clears its own param at the default, keeping a pristine page at bare
  // `/projects` instead of `?q=&sort=pushed&pins=false&all=false`.
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORT_VALUES).withDefault('pushed').withOptions({ clearOnDefault: true })
  );
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true, throttleMs: 300 })
  );
  const [viewMorePins, setViewMorePins] = useQueryState(
    'pins',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [viewMoreProjects, setViewMoreProjects] = useQueryState(
    'all',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const lg = useMedia('(min-width: 1024px)');
  const isReduced = useReducedMotion();

  // Keeps typing responsive: the input updates every keystroke while the grid
  // re-filters against the settled value.
  const deferredSearch = useDeferredValue(search);

  // Deliberately unparameterised. Every sort field is already on the repo
  // object, so ordering is done below instead of refetching: putting `sort` in
  // the query key made each change a fresh cache entry, which emptied the grid
  // to a spinner for a second every time. Two of the five options are not even
  // server sortable, so those refetches returned identical data.
  const {
    data: allProjects = [],
    isPending: projectsLoader,
    isError: projectsError
  } = useReposQuery();
  const {
    data: pinnedProjects = [],
    isPending: pinnedProjectsLoader,
    isError: pinnedProjectsError
  } = usePinnedReposQuery();

  // How many cards a collapsed section shows: one full grid row per breakpoint.
  const collapsedPins = lg ? 3 : 2;
  const collapsedProjects = lg ? 6 : 4;

  const PINNED_PROJECTS = useMemo(
    () => (viewMorePins ? pinnedProjects : pinnedProjects.slice(0, collapsedPins)),
    [pinnedProjects, viewMorePins, collapsedPins]
  );

  // Pinned repos are shown in their own section, so drop them here. Uses a Set
  // keyed by name instead of a nested `find` so this stays O(n) as the repo
  // list grows past the 30 the old unpaginated fetch was capped at.
  const filteredProjects = useMemo(() => {
    const pinnedNames = new Set(pinnedProjects.map((p) => p.name));
    const withoutPinned = allProjects.filter((project) => !pinnedNames.has(project.name));
    const matching = matchRepos(withoutPinned, deferredSearch);

    return [...matching].sort(compareBy(sort));
  }, [allProjects, pinnedProjects, deferredSearch, sort]);

  const ALL_PROJECTS = useMemo(
    () => (viewMoreProjects ? filteredProjects : filteredProjects.slice(0, collapsedProjects)),
    [filteredProjects, viewMoreProjects, collapsedProjects]
  );

  // Only offer the toggle when it would actually reveal something. Recomputed
  // from the current list, so narrowing a search hides a toggle that would now
  // reveal nothing.
  const canExpandPins = pinnedProjects.length > collapsedPins;
  const canExpandProjects = filteredProjects.length > collapsedProjects;
  const searching = deferredSearch.trim().length > 0;

  const safeContainer = safeVariants(containerVariants, isReduced);
  const safeCard = safeVariants(cardVariants, isReduced);
  const safeHeading = safeVariants(headingVariants, isReduced);

  return (
    <>
      {/* Starred Projects */}
      <div className="space-y-6">
        <InView
          variants={safeHeading}
          viewOptions={{ once: false, margin: '-40px' }}
          className="flex items-end justify-between"
        >
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
            Starred Projects
          </h2>
          <span className="text-lg tabular-nums">
            (
            {pinnedProjectsLoader ? (
              <span aria-label="loading">&hellip;</span>
            ) : (
              pinnedProjects.length
            )}
            )
          </span>
        </InView>

        <div>
          {PINNED_PROJECTS.length > 0 ? (
            <>
              <motion.div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                variants={safeContainer}
                initial="hidden"
                {...reveal}
              >
                {PINNED_PROJECTS.map((project) => (
                  <MotionFrame
                    key={project.name}
                    variants={safeCard}
                    {...(isReduced ? {} : interactiveCard)}
                    className="justify-between gap-0 p-1"
                  >
                    <MotionFramePanel className="flex flex-1 flex-col gap-3 p-3">
                      <div className="flex items-start justify-between">
                        <h2 className="flex items-center gap-2 font-medium">
                          <HiFolderOpen className="h-5 w-auto shrink-0 text-primary" />
                          <span className="line-clamp-1">{project.name}</span>
                        </h2>
                        <div className="flex items-center gap-3 text-sm *:flex *:items-center *:gap-1">
                          <div>
                            <BsStar className="h-4 w-auto" />
                            <span>{project.stargazers.totalCount}</span>
                          </div>
                          <div>
                            <BiGitRepoForked className="h-4 w-auto" />
                            <span>{project.forks.totalCount}</span>
                          </div>
                        </div>
                      </div>
                      <p className="line-clamp-3 min-h-14 text-sm text-neutral-600 dark:text-neutral-400">
                        {project.description}
                      </p>
                    </MotionFramePanel>

                    <MotionFrameFooter className="flex items-center justify-between px-3 py-2">
                      <span className="flex items-center gap-2 text-sm">
                        <span
                          className="size-3 rounded-full"
                          style={{ backgroundColor: project.primaryLanguage?.color ?? '#ef5453' }}
                        />
                        <span>{project.primaryLanguage?.name ?? 'Unknown'}</span>
                      </span>
                      <MotionLink
                        href={project.homepageUrl ? project.homepageUrl : project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-neutral-900 px-2 py-1 text-xs text-neutral-100 uppercase focus:outline-none dark:bg-neutral-700/60 dark:text-white"
                        {...tapScale}
                        whileHover={{ gap: '10px', transition: { duration: 0.15 } }}
                      >
                        <HiOutlineExternalLink className="h-4 w-auto" />
                        <span>Visit</span>
                      </MotionLink>
                    </MotionFrameFooter>
                  </MotionFrame>
                ))}
              </motion.div>
              {canExpandPins && (
                <ViewMore
                  expanded={viewMorePins}
                  onToggle={() => void setViewMorePins((v) => !v)}
                  remaining={pinnedProjects.length - collapsedPins}
                  isReduced={isReduced}
                />
              )}
            </>
          ) : (
            <SectionState
              loading={pinnedProjectsLoader}
              error={pinnedProjectsError}
              label="Loading starred projects"
              empty="No starred projects yet."
            />
          )}
        </div>
      </div>

      {/* All Projects */}
      <div className="space-y-6">
        <InView
          variants={safeHeading}
          viewOptions={{ once: false, margin: '-40px' }}
          className="flex items-end justify-between"
        >
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
            All Projects
          </h2>
          <span className="text-lg tabular-nums">
            ({projectsLoader ? <span aria-label="loading">&hellip;</span> : filteredProjects.length}
            )
          </span>
        </InView>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex-1 sm:max-w-xs">
            <span className="sr-only">Search projects</span>
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
              placeholder="Search by name, description or topic"
              className="w-full rounded-sm border border-neutral-300 bg-transparent py-1.5 pr-9 pl-9 text-sm placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-400"
            />
            {search && (
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
            <span className="text-neutral-600 dark:text-neutral-400">Sort</span>
            <select
              value={sort}
              onChange={(e) => void setSort(e.target.value as RepoSort)}
              className="cursor-pointer rounded-sm border border-neutral-300 bg-transparent px-2 py-1.5 text-xs uppercase focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {SORT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          {ALL_PROJECTS.length > 0 ? (
            <>
              <motion.div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                variants={safeContainer}
                initial="hidden"
                {...reveal}
              >
                {ALL_PROJECTS.map((project) => (
                  <MotionFrame
                    key={project.id}
                    variants={safeCard}
                    {...(isReduced ? {} : interactiveCard)}
                    className="justify-between gap-0 p-1"
                  >
                    <MotionFramePanel className="flex flex-1 flex-col gap-3 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="line-clamp-1 font-semibold text-neutral-900 dark:text-neutral-100">
                          {project.name}
                        </h2>
                        <div className="flex shrink-0 items-center gap-3 text-sm *:flex *:items-center *:gap-1">
                          <div>
                            <BsStar className="h-4 w-auto" />
                            <span>{project.stargazers_count}</span>
                          </div>
                          <div>
                            <BiGitRepoForked className="h-4 w-auto" />
                            <span>{project.forks_count}</span>
                          </div>
                        </div>
                      </div>
                      <p className="line-clamp-2 min-h-10 text-sm text-neutral-600 dark:text-neutral-400">
                        {project.description || 'No description provided.'}
                      </p>
                    </MotionFramePanel>

                    <MotionFrameFooter className="flex items-center justify-end px-3 py-2">
                      <MotionLink
                        href={project.html_url ? project.html_url : project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-neutral-900 px-2 py-1 text-xs text-neutral-100 uppercase focus:outline-none dark:bg-neutral-700/60 dark:text-white"
                        {...tapScale}
                        whileHover={{ gap: '10px', transition: { duration: 0.15 } }}
                      >
                        <HiOutlineExternalLink className="h-4 w-auto" />
                        <span>Visit</span>
                      </MotionLink>
                    </MotionFrameFooter>
                  </MotionFrame>
                ))}
              </motion.div>
              {canExpandProjects && (
                <ViewMore
                  expanded={viewMoreProjects}
                  onToggle={() => void setViewMoreProjects((v) => !v)}
                  remaining={filteredProjects.length - collapsedProjects}
                  isReduced={isReduced}
                />
              )}
            </>
          ) : (
            <SectionState
              loading={projectsLoader}
              error={projectsError}
              label="Loading projects"
              empty={
                searching ? `No projects match “${deferredSearch.trim()}”.` : 'No projects to show.'
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Expand/collapse toggle for a card section. Rendered only when there is
 * actually more to reveal, and labelled with how many rows are still hidden so
 * the control says what it will do.
 */
function ViewMore({
  expanded,
  onToggle,
  remaining,
  isReduced
}: {
  expanded: boolean;
  onToggle: () => void;
  remaining: number;
  isReduced: boolean | null;
}) {
  return (
    <div className="mt-4 flex justify-end">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs text-neutral-100 uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:bg-neutral-500/50 dark:text-white"
        whileHover={isReduced ? undefined : { scale: 1.04 }}
        whileTap={isReduced ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        <span>{expanded ? 'View Less' : `View More (${remaining})`}</span>
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
  );
}

/**
 * Placeholder for a section with no cards. The old markup said "Loading ..."
 * for every one of these cases, so a failed or empty fetch looked like a
 * request that never finished.
 */
function SectionState({
  loading,
  error,
  empty,
  label
}: {
  loading: boolean;
  error: boolean;
  empty: string;
  /** What is being fetched, so a slow request does not read as an empty one. */
  label: string;
}) {
  if (loading) return <PendingList label={label} />;

  return (
    <div className="flex min-h-[25vh] flex-col items-center justify-center gap-2 text-center uppercase">
      {error ? (
        <span className="text-red-600 dark:text-red-400">Could not load from GitHub.</span>
      ) : (
        <span className="text-neutral-600 dark:text-neutral-400">{empty}</span>
      )}
    </div>
  );
}

/** The orders the All Projects list can be shown in. `pushed` is the default:
 *  most recently worked on first. */
const SORT_OPTIONS = [
  { value: 'pushed', label: 'Last push' },
  { value: 'created', label: 'Newest' },
  { value: 'updated', label: 'Updated' },
  { value: 'stars', label: 'Stars' },
  { value: 'name', label: 'Name' }
] as const satisfies readonly { value: RepoSort; label: string }[];

/** The accepted `?sort=` values. Anything else in the URL falls back to the
 *  default rather than rendering an unsorted list. */
const SORT_VALUES: readonly RepoSort[] = SORT_OPTIONS.map((o) => o.value);

/**
 * Narrow repos to those matching a free-text query.
 *
 * Every whitespace-separated term has to match somewhere, so "go cli" finds a
 * Go CLI rather than everything written in Go. Matching runs over the name,
 * description, language and topics, the four things visible on a card.
 */
function matchRepos(repos: GithubRepo[], query: string): GithubRepo[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return repos;

  return repos.filter((repo) => {
    const haystack = [repo.name, repo.description, repo.language, ...(repo.topics ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}

/** Newest first for the date fields, largest first for stars, A to Z for names. */
function compareBy(sort: RepoSort): (a: GithubRepo, b: GithubRepo) => number {
  switch (sort) {
    case 'name':
      return (a, b) => a.name.localeCompare(b.name);
    case 'stars':
      return (a, b) => b.stargazers_count - a.stargazers_count;
    case 'created':
      return (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at);
    case 'updated':
      return (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at);
    case 'pushed':
    default:
      return (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
  }
}
