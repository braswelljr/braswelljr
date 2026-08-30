// GitHub domain types. Shapes are the ones the /api/github route handlers
// return, which are GitHub's own payloads passed through unchanged.

import type { Activity } from 'react-github-calendar';

/** A repository as the REST API returns it. */
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  url: string;
  homepage: string | null;
  languages_url: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  /** Last commit pushed. This is what "recently worked on" orders by. */
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  visibility: string;
}

/** A pinned repository as the GraphQL API returns it. */
export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  languages: { nodes: { name: string; color: string | null }[] };
  primaryLanguage: { name: string; color: string | null } | null;
  forks: { totalCount: number };
  watchers: { totalCount: number };
  stargazers: { totalCount: number };
}

/** A pull request as the search API returns it. */
export interface GithubPullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: 'open' | 'closed';
  draft: boolean;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  /** The search API reports a merged PR by populating this on `pull_request`. */
  pull_request?: { merged_at: string | null; html_url: string };
  /** `repository_url` is the API URL; the owner/name is the tail of it. */
  repository_url: string;
  comments: number;
  user: { login: string; avatar_url: string; html_url: string } | null;
}

/** An issue as the search API returns it. Same row shape as a pull request,
 *  minus the `pull_request` block that marks a row as a PR. */
export type GithubIssue = Omit<GithubPullRequest, 'pull_request' | 'draft'>;

export type PullRequestState = 'open' | 'closed' | 'merged';
export type IssueState = 'open' | 'closed';

/** Fields the issue/PR search endpoint orders by. Omitting it asks GitHub for
 *  relevance ("best match") instead. */
export type SearchSort = 'created' | 'updated' | 'comments' | 'reactions' | 'interactions';

export interface GithubContributions {
  data: Activity[];
  total: number;
}

/** One repository this account committed to during the trailing year. */
export interface ContributedRepo {
  name: string;
  nameWithOwner: string;
  url: string;
  commits: number;
}

/**
 * The trailing year's contributions, split by kind.
 *
 * `total` is the calendar total, which is not the sum of the four kinds:
 * GitHub counts a day's activity once on the calendar but each contribution
 * separately here.
 */
export interface GithubActivityOverview {
  total: number;
  commits: number;
  pullRequests: number;
  issues: number;
  codeReviews: number;
  /** How many repositories received commits, including ones not listed below. */
  repositoryCount: number;
  repositories: ContributedRepo[];
}

/** One language, totalled across every public non-fork repository. */
export interface GithubLanguage {
  name: string;
  /** GitHub's own colour for the language, or null for the few without one. */
  color: string | null;
  bytes: number;
  /** How many repositories contain it. */
  repos: number;
  /** Fraction of all bytes written, 0 to 1. */
  share: number;
}

/** The four axes of the activity chart, ordered as they are drawn: top, right,
 *  bottom, left. */
export const ACTIVITY_KINDS = [
  { key: 'codeReviews', label: 'Code review' },
  { key: 'issues', label: 'Issues' },
  { key: 'pullRequests', label: 'Pull requests' },
  { key: 'commits', label: 'Commits' }
] as const satisfies readonly { key: keyof GithubActivityOverview; label: string }[];

/**
 * Each kind as a whole-number percentage of all four.
 *
 * Rounding independently can total 99 or 101, so the largest share absorbs the
 * difference and the four always read as 100.
 */
export function activityPercentages(overview: GithubActivityOverview) {
  const counts = ACTIVITY_KINDS.map(({ key }) => Number(overview[key]) || 0);
  const sum = counts.reduce((a, b) => a + b, 0);
  if (sum < 1) return ACTIVITY_KINDS.map((kind) => ({ ...kind, count: 0, percent: 0 }));

  const percents = counts.map((count) => Math.round((count / sum) * 100));
  const largest = percents.indexOf(Math.max(...percents));
  percents[largest] += 100 - percents.reduce((a, b) => a + b, 0);

  return ACTIVITY_KINDS.map((kind, i) => ({ ...kind, count: counts[i], percent: percents[i] }));
}

/** How the repo list can be ordered. `stars` is applied client-side because the
 *  REST endpoint does not offer it for a user's repos. */
export type RepoSort = 'pushed' | 'created' | 'updated' | 'name' | 'stars';
export type SortDirection = 'asc' | 'desc';

/** Owner/name for a PR, recovered from its `repository_url`. */
export function repoFromUrl(repositoryUrl: string): string {
  return repositoryUrl.split('/repos/').at(1) ?? repositoryUrl;
}

/** Whether a search-API pull request was merged rather than just closed. */
export function isMerged(pr: GithubPullRequest): boolean {
  return Boolean(pr.pull_request?.merged_at);
}

/** open / merged / closed, collapsing the two fields GitHub splits it across. */
export function pullRequestState(pr: GithubPullRequest): PullRequestState {
  if (pr.state === 'open') return 'open';
  return isMerged(pr) ? 'merged' : 'closed';
}
