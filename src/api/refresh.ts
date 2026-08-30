/**
 * How often a screen re-reads what it is showing.
 *
 * Named tiers rather than a number per call site, so "how fresh is this" is one
 * decision made in one place and the answers stay in proportion to each other.
 *
 * The numbers are chosen against what the upstreams actually do. GitHub's REST
 * API is rate limited to 60 requests/hour unauthenticated, so repo and PR data
 * is polled in minutes, not seconds. A portfolio page that burns the budget
 * shows nothing at all. Spotify's "what is playing right now" is the one thing
 * that is genuinely live.
 */
export const REFRESH = {
  /** What is playing this second. The only value that is wrong if it is a
   *  minute old. */
  live: 30_000,
  /** Listening history that moves over a session: recently played, top tracks. */
  session: 5 * 60_000,
  /** Repos, pull requests, contributions. Changes when the author pushes, and
   *  is read from a 60 requests/hour budget. */
  slow: 10 * 60_000,
  /** Effectively static for the length of a visit: pinned repos, playlists. */
  static: 30 * 60_000
} as const;

/**
 * How long a fetched answer is treated as current.
 *
 * Kept under the matching interval in every tier: data that is still "fresh"
 * when the poll fires is not refetched, so a staleTime at or above the interval
 * would quietly cancel the polling it sits next to.
 */
export const STALE = {
  live: 15_000,
  session: 2 * 60_000,
  slow: 5 * 60_000,
  static: 15 * 60_000
} as const;
