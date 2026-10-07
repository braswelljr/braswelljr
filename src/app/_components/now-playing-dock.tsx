'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCurrentlyPlayingQuery } from '@/api';
import { EASE_OUT } from '@/components/shared/motion';
import { NowPlaying } from '@/components/shared/now-playing';
import { usePlayerStore } from '@/store/player';

/** Pages that already show the player in full. */
const HIDDEN_ON = ['/listen-with-me'];

/**
 * Pins the song that is on right now to the corner of every page.
 *
 * It renders nothing while the answer is unknown or when nothing is playing, so
 * a quiet moment is an empty corner, not a placeholder.
 */
export function NowPlayingDock() {
  const pathname = usePathname();
  const isReduced = useReducedMotion();
  // The player takes this corner once a song is on, and one record is enough.
  const playerOpen = usePlayerStore((state) => state.track !== null);
  const hidden = playerOpen || HIDDEN_ON.some((path) => pathname.startsWith(path));
  const { data: track } = useCurrentlyPlayingQuery({ enabled: !hidden });
  const play = usePlayerStore((state) => state.play);

  const playing = !hidden && track?.name && track.href ? track : null;

  return (
    <AnimatePresence>
      {playing && (
        <motion.aside
          aria-label="Now playing on Spotify"
          className="fixed bottom-5 left-5 z-10 origin-bottom-left"
          initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={isReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <NowPlaying
            track={playing}
            onClick={() => play(playing)}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
