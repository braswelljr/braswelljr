'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  HiChevronDown,
  HiExternalLink,
  HiFastForward,
  HiPause,
  HiPlay,
  HiRewind,
  HiX
} from 'react-icons/hi';
import { cn } from 'lib/utils';
import { EASE_IN_OUT, EASE_OUT } from '@/components/shared/motion';
import { Equalizer, SpinningRecord } from '@/components/shared/now-playing';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export type MusicPlayerTrack = {
  name: string;
  href: string;
  image?: string;
  artists: Array<{ id: string; name: string }>;
};

export type MusicPlayerState = {
  status: 'loading' | 'ready' | 'failed';
  isPlaying: boolean;
  /** Milliseconds. */
  position: number;
  duration: number;
};

type MusicPlayerProps = {
  className?: string;
  track: MusicPlayerTrack;
  playback: MusicPlayerState;
  /** Shrunk to just the record. */
  collapsed: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (ms: number) => void;
  /** Asked for by the record and by the shrink button. */
  onCollapsedChange: (collapsed: boolean) => void;
  onClose: () => void;
  /** Starts a drag of the whole player. Attached to the record and the header,
   *  so the controls and the seek bar stay usable. */
  onDragHandlePointerDown?: React.PointerEventHandler<HTMLElement>;
};

/** Spotify's previews run about thirty seconds. Anything this short is one. */
const PREVIEW_MAX_MS = 31_000;

/** 83000 becomes "1:23". */
function clock(ms: number): string {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/**
 * The player: a record that turns while the song plays, the song, and every
 * control. It draws whatever playback it is handed. The one thing it remembers
 * is where the seek thumb is while it is being dragged.
 *
 * Collapsing does not swap it for a second component. The same panel shrinks
 * around the same record, so the record never stops turning and the change
 * reads as one object changing size.
 */
export function MusicPlayer({
  track,
  playback,
  collapsed,
  hasPrevious,
  hasNext,
  onToggle,
  onPrevious,
  onNext,
  onSeek,
  onCollapsedChange,
  onClose,
  onDragHandlePointerDown,
  className
}: MusicPlayerProps) {
  const isReduced = useReducedMotion();
  const loading = playback.status === 'loading';
  // While the thumb is held, the bar follows the hand and not the song. The
  // song is only moved once, when the thumb is let go.
  const [scrub, setScrub] = useState<number | null>(null);
  const position = scrub ?? Math.min(playback.position, playback.duration);

  const isPreview = playback.duration > 0 && playback.duration <= PREVIEW_MAX_MS;

  const morph = { duration: isReduced ? 0 : 0.3, ease: EASE_IN_OUT };

  return (
    <motion.section
      layout
      aria-label="Music player"
      transition={morph}
      // Motion needs the radius here, not in a class, to keep the corners round
      // while it scales the panel between its two sizes.
      style={{ borderRadius: collapsed ? 28 : 16 }}
      className={cn(
        'relative overflow-hidden border border-neutral-200 bg-neutral-50/95 shadow-2xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95',
        collapsed
          ? 'size-14 border-primary dark:border-primary'
          : 'w-[min(22rem,calc(100vw-2.5rem))]',
        className
      )}
    >
      {/* The record is the same element in both sizes. It is the handle to
          drag the player by, and pressing it shrinks or restores the panel. */}
      <motion.button
        layout
        type="button"
        transition={morph}
        aria-expanded={!collapsed}
        aria-label={
          collapsed
            ? `Open the player. ${playback.isPlaying ? 'Playing' : 'Paused'}: ${track.name}`
            : 'Shrink the player to a record'
        }
        onPointerDown={onDragHandlePointerDown}
        onClick={() => onCollapsedChange(!collapsed)}
        className={cn(
          'absolute z-1 block size-14 cursor-grab touch-none rounded-full active:cursor-grabbing',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
          collapsed ? '-top-px -left-px' : 'top-3 left-3'
        )}
      >
        <SpinningRecord
          image={track.image}
          spinning={playback.isPlaying}
          className="size-full"
        />
      </motion.button>

      <AnimatePresence
        initial={false}
        mode="popLayout"
      >
        {!collapsed && (
          <motion.div
            key="controls"
            // Laid out at full size from the start and only faded, so the text
            // is never squeezed while the panel grows around it.
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="w-[min(22rem,calc(100vw-2.5rem))] space-y-3 p-3"
          >
            <header
              onPointerDown={onDragHandlePointerDown}
              className={cn(
                'flex items-center gap-3 pl-17',
                onDragHandlePointerDown && 'cursor-grab touch-none active:cursor-grabbing'
              )}
            >
              <div className="flex min-h-14 min-w-0 flex-1 flex-col justify-center">
                <p className="flex items-center gap-1.5 text-xsm font-semibold tracking-wide text-primary uppercase">
                  {playback.isPlaying && <Equalizer />}
                  <span aria-live="polite">
                    {playback.isPlaying ? 'Playing' : loading ? 'Loading' : 'Paused'}
                  </span>
                </p>
                <h2 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {track.name}
                </h2>
                <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">
                  {track.artists.map((artist) => artist.name).join(', ')}
                </p>
              </div>

              <div className="flex shrink-0 items-center self-start">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Shrink the player to a record"
                  onClick={() => onCollapsedChange(true)}
                >
                  <HiChevronDown
                    aria-hidden
                    className="size-4"
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close the player"
                  onClick={onClose}
                >
                  <HiX
                    aria-hidden
                    className="size-4"
                  />
                </Button>
              </div>
            </header>

            <div className="flex items-center gap-2 text-xs font-semibold text-primary tabular-nums dark:text-primary">
              <span>{clock(position)}</span>
              <Slider
                aria-label="Seek"
                min={0}
                max={Math.max(1, playback.duration)}
                step={1000}
                value={[position]}
                disabled={loading || playback.duration < 1}
                onValueChange={(value) => setScrub(Array.isArray(value) ? value[0] : value)}
                onValueCommitted={(value) => {
                  onSeek(Array.isArray(value) ? value[0] : value);
                  setScrub(null);
                }}
                // Coloured so the three parts read apart: a soft track, the
                // played stretch in the brand gradient, and a solid thumb.
                className={cn(
                  'min-w-0 flex-1',
                  '**:data-[slot=slider-track]:bg-primary-200 dark:**:data-[slot=slider-track]:bg-primary-800',
                  '**:data-[slot=slider-range]:bg-linear-to-r **:data-[slot=slider-range]:from-secondary **:data-[slot=slider-range]:to-primary',
                  '**:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-thumb]:bg-primary dark:**:data-[slot=slider-thumb]:border-primary dark:**:data-[slot=slider-thumb]:bg-primary'
                )}
              />
              <span>{clock(playback.duration)}</span>
            </div>

            <footer className="flex items-center justify-between">
              {/* Spotify plays the music, so the song always links back to it. */}
              <a
                href={track.href}
                target="_blank"
                rel="noopener noreferrer"
                title={isPreview ? 'Open in Spotify for the full song' : undefined}
                className="flex w-14 items-center gap-1 text-xsm font-medium text-neutral-600 underline-offset-4 hover:text-primary hover:underline dark:text-neutral-400 dark:hover:text-primary"
              >
                <HiExternalLink
                  aria-hidden
                  className="size-3.5"
                />
                Spotify
              </a>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Previous song"
                  disabled={!hasPrevious}
                  onClick={onPrevious}
                  className="rounded-full"
                >
                  <HiRewind
                    aria-hidden
                    className="size-4"
                  />
                </Button>
                <Button
                  size="icon-lg"
                  aria-label={playback.isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
                  disabled={loading}
                  onClick={onToggle}
                  className="rounded-full"
                >
                  {playback.isPlaying ? (
                    <HiPause
                      aria-hidden
                      className="size-5"
                    />
                  ) : (
                    <HiPlay
                      aria-hidden
                      className="size-5"
                    />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next song"
                  disabled={!hasNext}
                  onClick={onNext}
                  className="rounded-full"
                >
                  <HiFastForward
                    aria-hidden
                    className="size-4"
                  />
                </Button>
              </div>

              {/* Thirty seconds is Spotify's preview for a listener it does not
                  recognise as signed in. Say so, since nothing here can lift it. */}
              <span className="w-14 text-right text-xsm font-medium text-neutral-600 dark:text-neutral-400">
                {isPreview && 'Preview'}
              </span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
