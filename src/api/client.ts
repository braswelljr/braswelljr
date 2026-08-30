// HTTP transport for the domain-based API layer (see ./index.ts).
//
// Unlike a first-party API there is no session to carry: every credential this
// app holds (the GitHub PAT, the Spotify refresh token) lives in a Next route
// handler under /api, and the browser only ever talks to those. So `fetcher` is
// a thin JSON transport. `handleResponse` unwraps the `{ message, data }`
// envelope the route handlers return, and `handleApiError` maps a non-2xx body
// to a typed error. Domain `services.ts` files are the only place that name
// concrete endpoints.

import { apiError } from './errors';

/** The envelope every route handler under /api returns. */
export type Envelope<T> = { message: string; data: T };

/** A list plus the cursor needed to ask for the next slice. */
export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
};
export type ListEnvelope<T> = { message: string; data: T[]; meta: PageMeta };

export type FetcherOptions = RequestInit & {
  /** Milliseconds before the request is aborted. Upstreams here are third
   *  parties, so a hung socket should surface as an error rather than a
   *  spinner that never resolves. */
  timeout?: number;
};

const DEFAULT_TIMEOUT = 20_000;

/** Perform a JSON fetch, with a timeout and a typed error on failure. */
export async function fetcher(url: string, options: FetcherOptions = {}): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...rest } = options;

  const headers = new Headers(rest.headers);
  if (!(rest.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // AbortSignal.any lets a caller-supplied signal (React Query cancelling a
  // query) and the timeout both abort the same request.
  const timeoutSignal = AbortSignal.timeout(timeout);
  const signal = rest.signal ? AbortSignal.any([rest.signal, timeoutSignal]) : timeoutSignal;

  try {
    return await fetch(url, { ...rest, headers, signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      throw apiError(504, `Request to ${url} timed out`);
    }
    throw err;
  }
}

/** Parse a successful JSON response, or throw a typed error on a non-2xx. */
export async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type');
  const body: unknown = contentType?.includes('application/json')
    ? await res.json().catch(() => ({}))
    : await res.text();

  if (!res.ok) {
    const b = body as { message?: string; code?: string };
    return handleApiError(res, b?.message, b?.code);
  }
  return body as T;
}

/** Map a non-2xx body to a typed ApiError, keeping the Response as `cause`. */
export function handleApiError(res: Response, message?: string, code?: string): never {
  const err = apiError(res.status, message || res.statusText || 'Request failed', code);
  (err as { cause?: unknown }).cause = res;
  throw err;
}

/** Build a URL against this app's own route handlers. Relative on the client,
 *  absolute on the server, where a bare path has no origin to resolve against. */
export function buildApiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined') return `/api${p}`;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  return `${origin}/api${p}`;
}

/** Params every list endpoint in this app accepts. */
export type ListParams = {
  page?: number;
  limit?: number;
  /** Field to order by; the allowed set is per-endpoint. */
  sort?: string;
  direction?: 'asc' | 'desc';
  /** Free-text search, matched client-side against the fetched rows. */
  q?: string;
};

/** Serialise params to a query string, dropping empty values. Extra keys beyond
 *  ListParams are passed through, so an endpoint can take its own. */
export function toQuery(params?: ListParams & Record<string, unknown>): string {
  if (!params) return '';
  const q = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) value.forEach((v) => q.append(key, String(v)));
    else q.set(key, String(value));
  }

  const s = q.toString();
  return s ? `?${s}` : '';
}
