'use client';

import { useQueryClient } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { SpotifyTrack } from 'types/spotify';
import { queryKeys } from '@/api';
import { headingVariants, safeVariants } from '@/components/shared/motion';
import { PullToRefresh } from '@/components/shared/pull-to-refresh';
import { usePlayerStore } from '@/store/player';
import { CurrentlyPlaying } from './_sections/currently-playing';
import { TopTracks } from './_sections/top-tracks';

export default function Page() {
  const isReduced = useReducedMotion();
  const queryClient = useQueryClient();

  // Every list starts and stops the site's one player. Asking for the song
  // that is already on stops it.
  const playingId = usePlayerStore((state) => state.track?.id ?? null);
  const controls = {
    playingId,
    onPlay: (track: SpotifyTrack) => {
      const player = usePlayerStore.getState();
      if (playingId === track.id) player.close();
      else player.play(track);
    }
  };

  return (
    <div className="py-12 max-lg:pt-36">
      {/* Every list here polls on its own. This is the manual override: a long
          drag down from the top re-reads all of them at once. */}
      <PullToRefresh
        onRefresh={() => queryClient.invalidateQueries({ queryKey: queryKeys.spotify.all })}
      />
      <div className="mx-auto max-w-4xl px-4 text-gray-800 sm:mt-14 dark:text-neutral-100">
        <nav className="flex items-start justify-between">
          <motion.h1
            variants={safeVariants(headingVariants, isReduced)}
            initial="hidden"
            animate="visible"
            className="bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl dark:to-primary"
          >
            Listen With Me
          </motion.h1>
        </nav>
        <div className="mt-8 space-y-8">
          <CurrentlyPlaying {...controls} />
          <TopTracks {...controls} />
        </div>
      </div>
    </div>
  );
}
