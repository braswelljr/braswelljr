// Spotify domain, TanStack Query read hooks.

import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '../query-client';
import { queryKeys } from '../query-keys';
import { REFRESH, STALE } from '../refresh';
import { getCurrentlyPlaying, listPlaylists, listRecentlyPlayed, listTopTracks } from './services';
import type { SpotifyPlaylistPage, SpotifyTrack } from './types';

/** Polls, because this is the one value that is wrong the moment it is stale. */
export function useCurrentlyPlayingQuery(options?: QueryOptions<SpotifyTrack | null>) {
  return useQuery({
    queryKey: queryKeys.spotify.currentlyPlaying(),
    queryFn: getCurrentlyPlaying,
    staleTime: STALE.live,
    refetchInterval: REFRESH.live,
    ...options
  });
}

export function useRecentlyPlayedQuery(limit = 4, options?: QueryOptions<SpotifyTrack[]>) {
  return useQuery({
    queryKey: queryKeys.spotify.recentlyPlayed(limit),
    queryFn: () => listRecentlyPlayed(limit),
    staleTime: STALE.session,
    refetchInterval: REFRESH.session,
    ...options
  });
}

export function useTopTracksQuery(limit = 6, options?: QueryOptions<SpotifyTrack[]>) {
  return useQuery({
    queryKey: queryKeys.spotify.topTracks(limit),
    queryFn: () => listTopTracks(limit),
    staleTime: STALE.session,
    ...options
  });
}

export function usePlaylistsQuery(offset = 0, options?: QueryOptions<SpotifyPlaylistPage>) {
  return useQuery({
    queryKey: queryKeys.spotify.playlists(offset),
    queryFn: () => listPlaylists(offset),
    staleTime: STALE.static,
    ...options
  });
}
