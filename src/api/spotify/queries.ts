// Spotify domain, TanStack Query read hooks.

import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '../query-client';
import { queryKeys } from '../query-keys';
import { REFRESH, STALE } from '../refresh';
import { getCurrentlyPlaying, listPlaylists, listRecentlyPlayed, listTopTracks } from './services';
import type { SpotifyPlaylistPage, SpotifyTrack } from './types';

/**
 * Shared by every Spotify read: nothing on the listen page has a refresh
 * button, so each list keeps itself current. It polls on its tier, and coming
 * back to the tab asks again straight away if the answer has gone stale. The
 * app-wide default leaves focus refetching off to protect GitHub's budget.
 */
const SELF_UPDATING = { refetchOnWindowFocus: true } as const;

/** Polls, because this is the one value that is wrong the moment it is stale. */
export function useCurrentlyPlayingQuery(options?: QueryOptions<SpotifyTrack | null>) {
  return useQuery({
    queryKey: queryKeys.spotify.currentlyPlaying(),
    queryFn: getCurrentlyPlaying,
    staleTime: STALE.live,
    refetchInterval: REFRESH.live,
    ...SELF_UPDATING,
    ...options
  });
}

export function useRecentlyPlayedQuery(limit = 4, options?: QueryOptions<SpotifyTrack[]>) {
  return useQuery({
    queryKey: queryKeys.spotify.recentlyPlayed(limit),
    queryFn: () => listRecentlyPlayed(limit),
    staleTime: STALE.session,
    refetchInterval: REFRESH.session,
    ...SELF_UPDATING,
    ...options
  });
}

export function useTopTracksQuery(limit = 6, options?: QueryOptions<SpotifyTrack[]>) {
  return useQuery({
    queryKey: queryKeys.spotify.topTracks(limit),
    queryFn: () => listTopTracks(limit),
    staleTime: STALE.session,
    refetchInterval: REFRESH.session,
    ...SELF_UPDATING,
    ...options
  });
}

export function usePlaylistsQuery(offset = 0, options?: QueryOptions<SpotifyPlaylistPage>) {
  return useQuery({
    queryKey: queryKeys.spotify.playlists(offset),
    queryFn: () => listPlaylists(offset),
    staleTime: STALE.static,
    refetchInterval: REFRESH.static,
    ...SELF_UPDATING,
    ...options
  });
}
