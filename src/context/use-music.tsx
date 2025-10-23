'use client';

import { createContext, useContext, useMemo } from 'react';
import { Page, SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';

type MusicProps = {
  profile: UserProfile | null;
  playlists: Page<SimplifiedPlaylist> | null;
};

export const MusicContext = createContext<MusicProps>({
  profile: null,
  playlists: null
});

type MusicProviderProps = {
  children: React.ReactNode;
};

export function MusicProvider({ children }: MusicProviderProps) {
  const memoizedValue = useMemo<MusicProps>(
    () => ({
      profile: null,
      playlists: null
    }),
    []
  );
  return <MusicContext.Provider value={memoizedValue}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusic must be used within a <MusicProvider />');
  }

  return context;
}
