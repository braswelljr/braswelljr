import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import ky from 'ky';

export const SPOTIFY_CLIENT_ID = process.env.AUTH_SPOTIFY_ID || '';
export const SPOTIFY_CLIENT_SECRET = process.env.AUTH_SPOTIFY_SECRET || '';
export const SPOTIFY_REFRESH_TOKEN = process.env.AUTH_SPOTIFY_REFRESH_TOKEN || '';

const BASE_URL = `https://api.spotify.com/v1`;

export const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`;
export const TOP_TRACKS_ENDPOINT = `${BASE_URL}/me/top/tracks?time_range=medium_term&limit=10`;
export const TOP_ARTISTS_ENDPOINT = `${BASE_URL}/me/top/artists?time_range=medium_term&limit=3`;
export const RECENTLY_PLAYED_ENDPOINT = `${BASE_URL}/me/player/recently-played?limit=10`;
export const AUTH_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const SPOTIFY_COOKIE_STORE = '__spot-tokie__'; //Secure-
export const REFRESH_SPOTIFY_COOKIE_STORE = '__refresh-spot-tokie__';

export const SPOTIFY_USER_ID = `wgohxgl1iukgpy3aya7ni2q66`;

export const AUTH_SCOPES = [
  'user-library-read',
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'user-read-currently-playing'
];

export const SpotifySDK = SpotifyApi.withClientCredentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, AUTH_SCOPES, {
  afterRequest(_, __, response) {
    if (!response.ok) {
      throw new Error(response.statusText, { cause: { response } });
    }
  }
});

export async function getAccessToken(): Promise<string> {
  const tokenResponse = await ky
    .post<{
      access_token: string;
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

  return tokenResponse.access_token;
}
