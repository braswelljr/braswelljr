// Spotify domain types. The route handlers under /api/spotify reshape Spotify's
// payloads into the trimmed forms below, so these are the app's shapes rather
// than Spotify's.

import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk';

export type { SpotifyTrack } from 'types/spotify';

export type SpotifyPlaylistPage = Page<Playlist<TrackItem>>;
