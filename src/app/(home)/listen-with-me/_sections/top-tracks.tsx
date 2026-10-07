'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HiPlay, HiX } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { SpotifyTrack } from 'types/spotify';
import { useTopTracksQuery } from '@/api';
import {
  cardVariants,
  containerVariants,
  headingVariants,
  interactiveCard,
  MotionCard,
  MotionCardContent,
  MotionSkeleton,
  safeVariants
} from '@/components/shared/motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardPanel } from '@/components/ui/card';

/** Which track the page's one player holds, and how a list asks it to play. */
export type PlayControls = {
  playingId: string | null;
  onPlay: (track: SpotifyTrack) => void;
};

export function TopTracks({ className, ...controls }: { className?: string } & PlayControls) {
  const isReduced = useReducedMotion();
  const { data } = useTopTracksQuery(6);

  return (
    <section className={cn('', className)}>
      <div className="flex items-end justify-between gap-4">
        <motion.h2
          className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 uppercase sm:text-3xl md:text-4xl dark:text-neutral-100"
          variants={safeVariants(headingVariants, isReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Top Tracks
        </motion.h2>
      </div>

      <div className="mt-4">
        {data?.length ? (
          <Tracks
            data={data}
            {...controls}
          />
        ) : (
          <TracksLoader />
        )}
      </div>
    </section>
  );
}

export function TracksLoader({ className, items = 6 }: { className?: string; items?: number }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-4', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {Array(items || 6)
        .fill('')
        .map((_, i) => (
          <MotionCard
            key={i}
            variants={safeVariants(cardVariants, isReduced)}
            className="border-0 bg-neutral-100/60 dark:bg-neutral-800/60"
          >
            <MotionCardContent className="grid grid-cols-[1.2rem_5rem_1fr] items-center gap-3 p-3">
              <div className="text-sm">{i + 1}.</div>
              <MotionSkeleton className="size-20 overflow-hidden rounded bg-neutral-400/80 dark:bg-neutral-700/80" />
              <div className="space-y-2">
                <MotionSkeleton className="h-4 w-3/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
                <div className="mt-4 flex items-center gap-2">
                  <MotionSkeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80" />
                  <MotionSkeleton className="h-4 w-2/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
                </div>
              </div>
            </MotionCardContent>
          </MotionCard>
        ))}
    </motion.div>
  );
}

export function Tracks({
  className,
  data,
  playingId,
  onPlay
}: { className?: string; data: Array<SpotifyTrack> } & PlayControls) {
  const isReduced = useReducedMotion();

  return (
    <motion.ol
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-4', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {data?.map((track, i) => {
        const isOpen = Boolean(track.id) && track.id === playingId;

        return (
          <motion.li
            key={trackKey(track)}
            variants={safeVariants(cardVariants, isReduced)}
            {...(isReduced ? {} : interactiveCard)}
          >
            <Card
              className={cn(
                'relative h-full border-0 bg-neutral-100/60 dark:bg-neutral-800/60',
                isOpen && 'ring-2 ring-primary'
              )}
            >
              <CardPanel className="grid grid-cols-[1.2rem_5rem_1fr] items-center gap-3 p-3">
                <div className="text-sm">{i + 1}.</div>
                <div className="relative">
                  <Avatar className="size-20 overflow-hidden rounded">
                    {/* The song is named beside it, so the cover is decoration. */}
                    <AvatarImage
                      src={track?.image}
                      alt=""
                    />
                    <AvatarFallback className="animate-pulse rounded-xl">
                      {track?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {track.id && (
                    <Button
                      size="icon"
                      aria-pressed={isOpen}
                      aria-label={isOpen ? `Stop ${track.name}` : `Play ${track.name}`}
                      onClick={() => onPlay(track)}
                      // Above the stretched title link, or the click would
                      // follow the link instead.
                      className="absolute right-1 bottom-1 z-1 rounded-full shadow-md"
                    >
                      {isOpen ? (
                        <HiX
                          aria-hidden
                          className="size-4"
                        />
                      ) : (
                        <HiPlay
                          aria-hidden
                          className="size-4"
                        />
                      )}
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="line-clamp-2 text-sm sm:text-base">
                    {/* Stretched over the card, so the card is one target. */}
                    <a
                      href={track?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 hover:underline focus-visible:underline focus-visible:outline-none"
                    >
                      {track?.name}
                    </a>
                  </h3>
                  <p className="line-clamp-2 text-xsm sm:text-sm">
                    {track?.artists?.map((a, j) => (
                      <Fragment key={a.id}>
                        {j !== 0 && ', '}
                        <a
                          href={a?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'relative z-1 text-orange-500 underline',
                            j === 0 && 'font-semibold'
                          )}
                        >
                          {a?.name}
                        </a>
                      </Fragment>
                    ))}
                  </p>
                </div>
              </CardPanel>
            </Card>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

/** A recently played list can hold the same track twice, so the play time
 *  identifies the row there and the track link everywhere else. */
function trackKey(track: SpotifyTrack): string {
  return track.playedAt ?? track.href;
}
