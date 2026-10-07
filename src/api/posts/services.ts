// Posts domain, raw API service functions. Each names the route handler under
// /api/posts, which is where the store credentials live.

import { buildApiUrl, fetcher, handleResponse, toQuery, type Envelope } from '../client';
import type { PostStats, PostStatsAction } from './types';

/** Views and likes for one post. */
export async function getPostStats(slug: string): Promise<PostStats> {
  const res = await fetcher(buildApiUrl(`/posts/stats${toQuery({ slug })}`), { method: 'GET' });
  return (await handleResponse<Envelope<PostStats>>(res)).data;
}

/** Record a view, a like or an unlike, and get the counters back. */
export async function recordPostStat(slug: string, action: PostStatsAction): Promise<PostStats> {
  const res = await fetcher(buildApiUrl('/posts/stats'), {
    method: 'POST',
    body: JSON.stringify({ slug, action })
  });
  return (await handleResponse<Envelope<PostStats>>(res)).data;
}
