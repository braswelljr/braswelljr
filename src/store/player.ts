import { create } from 'zustand';
import { SpotifyTrack } from 'types/spotify';

type PlayerState = {
  /** The song in the player, or null when it is closed. */
  track: SpotifyTrack | null;
  /** Shrunk to just the record. */
  collapsed: boolean;
  play: (track: SpotifyTrack) => void;
  setCollapsed: (collapsed: boolean) => void;
  close: () => void;
};

/**
 * The one music player for the whole site.
 *
 * It lives in a store, not in a page, so a song started on one page keeps
 * playing on the next and any page can start one. It holds only the song: what
 * comes next is worked out by the player from the listening lists.
 */
export const usePlayerStore = create<PlayerState>()((set) => ({
  track: null,
  collapsed: false,
  play: (track) => set({ track }),
  setCollapsed: (collapsed) => set({ collapsed }),
  close: () => set({ track: null, collapsed: false })
}));
