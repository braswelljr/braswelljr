import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import ky from 'ky';

export const SPOTIFY_CLIENT_ID = process.env.AUTH_SPOTIFY_ID || '';
export const SPOTIFY_CLIENT_SECRET = process.env.AUTH_SPOTIFY_SECRET || '';
export const SPOTIFY_REFRESH_TOKEN = process.env.AUTH_SPOTIFY_REFRESH_TOKEN || '';

export const SPOTIFY_USER_ID = `wgohxgl1iukgpy3aya7ni2q66`;

export const AUTH_SCOPES = [
  'user-library-read',
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'user-read-currently-playing'
];

export const SpotifySDK = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  AUTH_SCOPES,
  {
    afterRequest(_, __, response) {
      if (!response.ok) {
        throw new Error(response.statusText, { cause: { response } });
      }
    }
  }
);

/** Refresh this long before Spotify's stated expiry, so a token handed to a
 *  request cannot lapse while that request is still in flight. */
const EXPIRY_MARGIN_MS = 60_000;

let cachedToken: { value: string; expiresAt: number } | undefined;
let pendingToken: Promise<string> | undefined;

async function requestAccessToken(): Promise<string> {
  const tokenResponse = await ky
    .post<{
      access_token: string;
      expires_in?: number;
    }>('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      }),
      next: {
        revalidate: 0
      }
    })
    .json();

  // Spotify issues hour-long tokens. Fall back to that if the field is missing.
  const lifetimeMs = (tokenResponse.expires_in ?? 3600) * 1000;
  cachedToken = {
    value: tokenResponse.access_token,
    expiresAt: Date.now() + lifetimeMs - EXPIRY_MARGIN_MS
  };

  return tokenResponse.access_token;
}

/**
 * A Spotify access token for the site owner's account.
 *
 * Held in module memory until just before it expires. The "now playing" tile
 * polls every 30 seconds, and trading the refresh token on each of those calls
 * doubled every request to Spotify for a token that is good for an hour.
 * Concurrent callers share one in-flight exchange instead of racing.
 */
export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  pendingToken ??= requestAccessToken().finally(() => {
    pendingToken = undefined;
  });

  return pendingToken;
}
