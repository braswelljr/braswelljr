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
