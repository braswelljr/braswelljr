/**
 * Centralised query-key definitions for consistent cache management across the
 * domain-based API layer. Keys are hierarchical so a domain's `all` key
 * invalidates everything beneath it.
 */

type Filters = Record<string, unknown> | undefined;

export const queryKeys = {
  github: {
    all: ['github'] as const,
    repos: (filters?: Filters) => [...queryKeys.github.all, 'repos', filters] as const,
    pinned: () => [...queryKeys.github.all, 'pinned'] as const,
    pullRequests: (filters?: Filters) =>
      [...queryKeys.github.all, 'pull-requests', filters] as const,
    issues: (filters?: Filters) => [...queryKeys.github.all, 'issues', filters] as const,
    contributions: (year?: number) => [...queryKeys.github.all, 'contributions', year] as const,
    activity: () => [...queryKeys.github.all, 'activity'] as const,
    languages: () => [...queryKeys.github.all, 'languages'] as const
  },

  spotify: {
    all: ['spotify'] as const,
    currentlyPlaying: () => [...queryKeys.spotify.all, 'currently-playing'] as const,
    recentlyPlayed: (limit?: number) =>
      [...queryKeys.spotify.all, 'recently-played', limit] as const,
    topTracks: (limit?: number) => [...queryKeys.spotify.all, 'top-tracks', limit] as const,
    playlists: (offset?: number) => [...queryKeys.spotify.all, 'playlists', offset] as const
  }
} as const;
