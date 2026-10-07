import { REFRESH, STALE } from '@/api/refresh';

type Tier = keyof typeof STALE;

/**
 * Response headers that let the CDN answer for a route handler.
 *
 * Every handler here proxies GitHub or Spotify. Without this, each visitor's
 * poll is its own upstream call, so traffic spends the upstream rate limits
 * directly. With it, the CDN holds one answer per URL for as long as the tier
 * says it is fresh, and all visitors in that window share it. The tiers are the
 * same ones the browser polls on, so the two never disagree about freshness.
 *
 * `max-age=0` keeps the browser from holding its own copy: TanStack Query
 * already decides when to ask again. Send these on a successful answer only.
 * An error held for minutes would outlive the problem that caused it.
 */
export function cacheFor(tier: Tier): HeadersInit {
  const fresh = Math.round(STALE[tier] / 1000);
  const serveStaleFor = Math.round(REFRESH[tier] / 1000);

  return {
    'Cache-Control': `public, max-age=0, s-maxage=${fresh}, stale-while-revalidate=${serveStaleFor}`
  };
}
