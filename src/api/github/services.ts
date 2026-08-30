// GitHub domain, raw API service functions. Each names a concrete route handler
// under /api/github (which is where the token lives), and unwraps the response
// envelope. These are the only place GitHub endpoints are referenced; hooks
// (queries) and non-React callers build on them.

import {
  buildApiUrl,
  fetcher,
  handleResponse,
  toQuery,
  type Envelope,
  type ListEnvelope
} from '../client';
import type {
  GithubActivityOverview,
  GithubContributions,
  GithubIssue,
  GithubLanguage,
  GithubPullRequest,
  GithubRepo,
  IssueState,
  PinnedRepo,
  PullRequestState,
  SearchSort,
  SortDirection
} from './types';

/** Which field the REST endpoint itself can order by. `name` and `stars` are
 *  sorted client-side, so they are requested as `pushed` and re-ordered. */
const SERVER_SORTS: Record<string, string> = {
  pushed: 'pushed',
  created: 'created',
  updated: 'updated',
  name: 'full_name'
};

export type ListReposParams = {
  sort?: string;
  direction?: SortDirection;
};

/** Every public repo for the account, across all pages. */
export async function listRepos(params?: ListReposParams): Promise<GithubRepo[]> {
  const query = toQuery({
    sort: SERVER_SORTS[params?.sort ?? 'pushed'] ?? 'pushed',
    direction: params?.direction ?? 'desc'
  });
  const res = await fetcher(buildApiUrl(`/github/repos${query}`), { method: 'GET' });
  return (await handleResponse<Envelope<GithubRepo[]>>(res)).data;
}

/** The account's pinned repositories. */
export async function listPinnedRepos(): Promise<PinnedRepo[]> {
  const res = await fetcher(buildApiUrl('/github/pinned'), { method: 'GET' });
  return (await handleResponse<Envelope<PinnedRepo[]>>(res)).data;
}

/** Params shared by the issue and pull-request listings, which are the same
 *  GitHub search endpoint behind different `type:` qualifiers. */
export type SearchListParams = {
  limit?: number;
  page?: number;
  /** Order by a field; omit for GitHub's relevance ranking. */
  sort?: SearchSort;
  order?: SortDirection;
  /** Restrict to one repository, as `owner/name`. */
  repo?: string;
  /** Extra raw search qualifiers appended to the query. */
  q?: string;
};

export type ListPullRequestsParams = SearchListParams & { state?: PullRequestState };
export type ListIssuesParams = SearchListParams & { state?: IssueState };

/** Pull requests authored by the account. */
export async function listPullRequests(
  params?: ListPullRequestsParams
): Promise<ListEnvelope<GithubPullRequest>> {
  const res = await fetcher(buildApiUrl(`/github/pull-requests${toQuery(params)}`), {
    method: 'GET'
  });
  return handleResponse<ListEnvelope<GithubPullRequest>>(res);
}

/** Issues authored by the account. */
export async function listIssues(params?: ListIssuesParams): Promise<ListEnvelope<GithubIssue>> {
  const res = await fetcher(buildApiUrl(`/github/issues${toQuery(params)}`), { method: 'GET' });
  return handleResponse<ListEnvelope<GithubIssue>>(res);
}

/** The contribution calendar for a year (omit for the trailing year). */
export async function getContributions(year?: number): Promise<GithubContributions> {
  const res = await fetcher(buildApiUrl(`/github/contributions${toQuery({ year })}`), {
    method: 'GET'
  });
  return (await handleResponse<Envelope<GithubContributions>>(res)).data;
}

/** The trailing year's contributions split by kind, for the activity chart. */
export async function getActivityOverview(): Promise<GithubActivityOverview> {
  const res = await fetcher(buildApiUrl('/github/activity'), { method: 'GET' });
  return (await handleResponse<Envelope<GithubActivityOverview>>(res)).data;
}

/** Language usage across every public non-fork repository, largest first. */
export async function listLanguages(): Promise<GithubLanguage[]> {
  const res = await fetcher(buildApiUrl('/github/languages'), { method: 'GET' });
  return (await handleResponse<Envelope<GithubLanguage[]>>(res)).data;
}
