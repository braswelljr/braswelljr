/** The GitHub account every /api/github route reads from. */
export const GITHUB_USERNAME = 'braswelljr';

/**
 * Server-side GitHub token.
 *
 * Read without the NEXT_PUBLIC_ prefix so it stays out of the client bundle.
 * `NEXT_PUBLIC_AUTH_TOKEN` is still honoured as a fallback so existing
 * .env.local files keep working, but it should be renamed to GITHUB_TOKEN,
 * anything NEXT_PUBLIC_ is inlined into the JavaScript served to the browser,
 * which publishes the token to anyone who opens devtools.
 */
export function getGithubToken(): string | undefined {
  return process.env.GITHUB_TOKEN ?? process.env.NEXT_PUBLIC_AUTH_TOKEN;
}

/** Headers for a GitHub REST call, authenticated when a token is configured.
 *  Authenticating also lifts the rate limit from 60 to 5,000 requests/hour. */
export function githubHeaders(): HeadersInit {
  const token = getGithubToken();
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

/** Fields the issue/PR search endpoint can order by. `relevance` is GitHub's
 *  "best match", expressed by sending no sort at all. */
export const SEARCH_SORTS = new Set([
  'created',
  'updated',
  'comments',
  'reactions',
  'interactions'
]);

export type SearchIssuesArgs = {
  /** Extra qualifiers appended to `author:<user>` (e.g. `type:pr`). */
  qualifiers: string[];
  sort?: string | null;
  order?: string | null;
  page: number;
  limit: number;
};

/**
 * Query GitHub's issue/PR search.
 *
 * Issues and pull requests share one endpoint, `/search/issues`, because
 * there is no REST route that lists either across every repository. `type:pr`
 * or `type:issue` is what separates them.
 */
export async function searchIssues({ qualifiers, sort, order, page, limit }: SearchIssuesArgs) {
  const q = [`author:${GITHUB_USERNAME}`, ...qualifiers].join(' ');
  const direction = order === 'asc' ? 'asc' : 'desc';

  const params = new URLSearchParams({
    q,
    order: direction,
    per_page: String(limit),
    page: String(page)
  });
  // Omitting `sort` is what asks for relevance ranking, so only set it when the
  // caller named a field GitHub actually accepts.
  if (sort && SEARCH_SORTS.has(sort)) params.set('sort', sort);

  const response = await fetch(`https://api.github.com/search/issues?${params}`, {
    headers: githubHeaders(),
    next: { revalidate: 0 }
  });

  return response;
}
