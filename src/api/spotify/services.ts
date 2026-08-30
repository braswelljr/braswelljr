// Spotify domain, raw API service functions. Each names a concrete route handler
// under /api/spotify, where the Spotify client secret and refresh token live,
// never in the browser.

import { buildApiUrl, fetcher, handleResponse, toQuery, type Envelope } from '../client';
import type { SpotifyPlaylistPage, SpotifyTrack } from './types';

/** What is playing right now, or null when nothing is. */
export async function getCurrentlyPlaying(): Promise<SpotifyTrack | null> {
  const res = await fetcher(buildApiUrl('/spotify/currently-playing'), { method: 'GET' });
  return (await handleResponse<Envelope<SpotifyTrack | null>>(res)).data;
}

/** The most recently played tracks. */
export async function listRecentlyPlayed(limit = 4): Promise<SpotifyTrack[]> {
  const res = await fetcher(buildApiUrl(`/spotify/recently-played${toQuery({ limit })}`), {
    method: 'GET'
  });
  return (await handleResponse<Envelope<SpotifyTrack[]>>(res)).data;
}

/** The account's top tracks. */
export async function listTopTracks(limit = 6): Promise<SpotifyTrack[]> {
  const res = await fetcher(buildApiUrl(`/spotify/top-tracks${toQuery({ limit })}`), {
    method: 'GET'
  });
  return (await handleResponse<Envelope<SpotifyTrack[]>>(res)).data;
}

/** One page of the account's playlists. */
export async function listPlaylists(offset = 0): Promise<SpotifyPlaylistPage> {
  const res = await fetcher(buildApiUrl(`/spotify/playlists${toQuery({ offset })}`), {
    method: 'GET'
  });
  return (await handleResponse<Envelope<SpotifyPlaylistPage>>(res)).data;
}
