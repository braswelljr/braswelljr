// GitHub domain, TanStack Query read hooks. Every hook accepts an optional
// `options` argument spread into `useQuery`, so callers can add dependencies
// (`enabled`), `select`, `staleTime`, etc. without a bespoke hook.

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { ListEnvelope } from '../client';
import type { QueryOptions } from '../query-client';
import { queryKeys } from '../query-keys';
import { REFRESH, STALE } from '../refresh';
import {
  getActivityOverview,
  getContributions,
  listIssues,
  listLanguages,
  listPinnedRepos,
  listPullRequests,
  listRepos,
  type ListIssuesParams,
  type ListPullRequestsParams,
  type ListReposParams
} from './services';
import type {
  GithubActivityOverview,
  GithubContributions,
  GithubIssue,
  GithubLanguage,
  GithubPullRequest,
  GithubRepo,
  PinnedRepo
} from './types';

export function useReposQuery(params?: ListReposParams, options?: QueryOptions<GithubRepo[]>) {
  return useQuery({
    queryKey: queryKeys.github.repos(params),
    queryFn: () => listRepos(params),
    staleTime: STALE.slow,
    refetchInterval: REFRESH.slow,
    ...options
  });
}

export function usePinnedReposQuery(options?: QueryOptions<PinnedRepo[]>) {
  return useQuery({
    queryKey: queryKeys.github.pinned(),
    queryFn: listPinnedRepos,
    staleTime: STALE.static,
    ...options
  });
}

export function usePullRequestsQuery(
  params?: ListPullRequestsParams,
  options?: QueryOptions<ListEnvelope<GithubPullRequest>>
) {
  return useQuery({
    queryKey: queryKeys.github.pullRequests(params),
    queryFn: () => listPullRequests(params),
    staleTime: STALE.slow,
    // Filtering and sorting happen on GitHub's side, so every change is a new
    // cache entry. Without this the list empties to a spinner on each one, and
    // the section visibly collapses and reflows before the new rows land.
    placeholderData: keepPreviousData,
    ...options
  });
}

export function useIssuesQuery(
  params?: ListIssuesParams,
  options?: QueryOptions<ListEnvelope<GithubIssue>>
) {
  return useQuery({
    queryKey: queryKeys.github.issues(params),
    queryFn: () => listIssues(params),
    staleTime: STALE.slow,
    placeholderData: keepPreviousData,
    ...options
  });
}

export function useContributionsQuery(year?: number, options?: QueryOptions<GithubContributions>) {
  return useQuery({
    queryKey: queryKeys.github.contributions(year),
    queryFn: () => getContributions(year),
    staleTime: STALE.slow,
    ...options
  });
}

export function useActivityOverviewQuery(options?: QueryOptions<GithubActivityOverview>) {
  return useQuery({
    queryKey: queryKeys.github.activity(),
    queryFn: getActivityOverview,
    staleTime: STALE.slow,
    ...options
  });
}

export function useLanguagesQuery(options?: QueryOptions<GithubLanguage[]>) {
  return useQuery({
    queryKey: queryKeys.github.languages(),
    queryFn: listLanguages,
    staleTime: STALE.slow,
    ...options
  });
}
