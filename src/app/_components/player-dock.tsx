'use client';

import { useRef } from 'react';
import { motion, useDragControls, useReducedMotion } from 'motion/react';
import { SpotifyTrack } from 'types/spotify';
import { useCurrentlyPlayingQuery, useRecentlyPlayedQuery, useTopTracksQuery } from '@/api';
import { EASE_OUT } from '@/components/shared/motion';
import { MusicPlayer } from '@/components/shared/music-player';
import { SpotifyEmbed } from '@/components/shared/spotify-embed';
import { useSpotifyController } from '@/hooks/use-spotify-controller';
import { usePlayerStore } from '@/store/player';

/**
 * Mounts the site's one music player whenever a song has been asked for.
 *
 * It sits in the root layout, which survives navigation, so the song carries on
 * from page to page.
 */
export function PlayerDock() {
  const track = usePlayerStore((state) => state.track);

  // Keyed by nothing: one player, re-pointed as the song changes.
  return track ? <ActivePlayer track={track} /> : null;
}

function ActivePlayer({ track }: { track: SpotifyTrack }) {
  const isReduced = useReducedMotion();
  const boundsRef = useRef<HTMLDivElement>(null);
  // Dragging starts from a handle, not from anywhere: otherwise pulling the
  // seek thumb would pull the whole player along with it.
  const dragControls = useDragControls();
  /** Set while a drag is under way, so letting go does not also count as a
   *  press on the record. */
  const draggedRef = useRef(false);

  const collapsed = usePlayerStore((state) => state.collapsed);
  const { play, setCollapsed, close } = usePlayerStore.getState();

  // One loop for the whole site, in the order the listen page shows it: what
  // is playing now, then recently played, then the top tracks, then round
  // again. These are the page's own queries, so on that page they are already
  // in the cache. A song that sits in two lists is one stop.
  const { data: nowPlaying } = useCurrentlyPlayingQuery();
  const { data: recent } = useRecentlyPlayedQuery(4);
  const { data: topTracks } = useTopTracksQuery(6);
  const loop = [nowPlaying, ...(recent ?? []), ...(topTracks ?? [])].filter(
    (item, at, all): item is SpotifyTrack =>
      Boolean(item?.id) && all.findIndex((other) => other?.id === item?.id) === at
  );

  // A song that is not in the loop, because the lists moved on since it
  // started, steps into it at the beginning or the end.
  const at = loop.findIndex((item) => item.id === track.id);
  const canMove = loop.some((item) => item.id !== track.id);
  const goNext = () => {
    const target = loop[(at + 1) % loop.length];
    if (target) play(target);
  };
  const goPrevious = () => {
    const target = loop[(Math.max(at, 0) - 1 + loop.length) % loop.length];
    if (target) play(target);
  };

  const { hostRef, playback, toggle, seek } = useSpotifyController(track.id, {
    // A song that plays through hands over to the next one in the loop.
    onEnded: () => {
      if (canMove) goNext();
    }
  });
  const failed = playback.status === 'failed';

  return (
    <>
      {/* The area the player may be dragged within: the window, less a margin. */}
      <div
        ref={boundsRef}
        aria-hidden
        className="pointer-events-none fixed inset-3 z-20"
      />

      <motion.div
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={boundsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          draggedRef.current = true;
        }}
        onDragEnd={() => {
          // Cleared after the click that ends the drag has been delivered.
          window.setTimeout(() => {
            draggedRef.current = false;
          }, 0);
        }}
        initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="fixed bottom-5 left-5 z-20"
      >
        <MusicPlayer
          track={track}
          playback={playback}
          collapsed={collapsed}
          hasPrevious={canMove}
          hasNext={canMove}
          onToggle={toggle}
          onPrevious={goPrevious}
          onNext={goNext}
          onSeek={seek}
          onCollapsedChange={(next) => {
            // Letting go of a drag also lands as a press on the record.
            if (!draggedRef.current) setCollapsed(next);
          }}
          onClose={close}
          onDragHandlePointerDown={(event) => dragControls.start(event)}
        />

        {/* Spotify's embed does the playing. The controls above drive it, so it
            is kept out of sight. It only shows itself if its script cannot
            load, when it is the one way left to press play. */}
        <div
          ref={hostRef}
          aria-hidden={!failed}
          className={
            failed
              ? 'mt-2 w-[min(22rem,calc(100vw-2.5rem))]'
              : 'pointer-events-none absolute bottom-0 left-0 h-20 w-72 opacity-0'
          }
        >
          {failed && (
            <SpotifyEmbed
              trackId={track.id}
              name={track.name}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
