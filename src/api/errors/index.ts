// Typed API errors, functional style (no custom classes). Services throw an
// `ApiError` (a plain Error augmented with `status`, `code`, and a `title`);
// callers narrow with `isApiError(err)` / `isApiError(err, 'NOT_FOUND')`.
//
// The codes are derived from the HTTP status, since the upstreams here (GitHub,
// Spotify, and this app's own route handlers) do not share a machine-readable
// error vocabulary the way a first-party API would.

export type ApiErrorCode =
  | 'INTERNAL'
  | 'INVALID_ARGUMENT'
  | 'UNAUTHENTICATED'
  | 'PERMISSION_DENIED'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'UNAVAILABLE'
  | 'UNKNOWN';

export type ApiError = Error & {
  name: 'ApiError';
  status: number;
  code: ApiErrorCode;
  title: string;
};

const CODE_TITLE: Record<ApiErrorCode, string> = {
  INTERNAL: 'Something went wrong',
  INVALID_ARGUMENT: 'Invalid request',
  UNAUTHENTICATED: 'Not authenticated',
  PERMISSION_DENIED: 'Access denied',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict',
  RATE_LIMITED: 'Rate limit reached',
  UNAVAILABLE: 'Service unavailable',
  UNKNOWN: 'Request failed'
};

function codeForStatus(status: number): ApiErrorCode {
  switch (status) {
    case 400:
      return 'INVALID_ARGUMENT';
    case 401:
      return 'UNAUTHENTICATED';
    // GitHub answers an exhausted rate limit with 403, not 429.
    case 403:
      return 'PERMISSION_DENIED';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 429:
      return 'RATE_LIMITED';
    case 503:
      return 'UNAVAILABLE';
    default:
      return status >= 500 ? 'INTERNAL' : 'UNKNOWN';
  }
}

function normaliseCode(raw?: string, status?: number): ApiErrorCode {
  const upper = raw?.toUpperCase();
  if (upper && upper in CODE_TITLE) return upper as ApiErrorCode;
  return codeForStatus(status ?? 0);
}

export function apiError(status: number, message: string, rawCode?: string): ApiError {
  const code = normaliseCode(rawCode, status);
  const err = new Error(message || CODE_TITLE[code]) as ApiError;
  err.name = 'ApiError';
  err.status = status;
  err.code = code;
  err.title = CODE_TITLE[code];
  return err;
}

export function isApiError(err: unknown, code?: ApiErrorCode): err is ApiError {
  const is = err instanceof Error && err.name === 'ApiError';
  return code ? is && (err as ApiError).code === code : is;
}

/** True when GitHub turned the request away for exhausting the hourly budget,
 *  which it reports as a 403 rather than a 429. Worth telling apart, because
 *  the fix is "wait", not "log in". */
export function isRateLimited(err: unknown): boolean {
  return (
    isApiError(err, 'RATE_LIMITED') ||
    (isApiError(err, 'PERMISSION_DENIED') && /rate limit/i.test(err.message))
  );
}
