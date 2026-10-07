/**
 * The key-value store behind post views and likes.
 *
 * The site has no database of its own, so the counters live in an Upstash Redis
 * database reached over its REST API. Both names Vercel's integration writes
 * are accepted. With neither set the feature is simply absent: the route
 * answers 503 and the post page hides the counters.
 */
export function getStoreConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  return url && token ? { url, token } : null;
}
