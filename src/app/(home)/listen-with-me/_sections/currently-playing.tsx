'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HiPlay, HiX } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { SpotifyTrack } from 'types/spotify';
import { useCurrentlyPlayingQuery, useRecentlyPlayedQuery } from '@/api';
import {
  cardVariants,
  containerVariants,
  fadeVariants,
  headingVariants,
  MotionAvatar,
  MotionAvatarFallback,
  MotionFrame,
  MotionFrameHeader,
  MotionFramePanel,
  MotionFrameTitle,
  MotionLink,
  MotionSkeleton,
  safeVariants
} from '@/components/shared/motion';
import { AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tracks, TracksLoader, type PlayControls } from './top-tracks';

export function CurrentlyPlaying({
  className,
  ...controls
}: { className?: string } & PlayControls) {
  const isReduced = useReducedMotion();

  const { data } = useCurrentlyPlayingQuery();
  const { data: recent } = useRecentlyPlayedQuery(4);

  // Nothing playing falls back to the most recent track, so the panel always
  // has something to show rather than sitting on a skeleton.
  const firstTrack = recent?.at(0);
  const nowPlaying = data ?? null;

  return (
    <div className={cn('space-y-8', className)}>
      {/* Currently / Last Playing */}
      <MotionFrame
        className="gap-0 p-1"
        variants={safeVariants(fadeVariants, isReduced)}
        initial="hidden"
        animate="visible"
      >
        <MotionFrameHeader>
          <div className="flex items-end justify-between gap-4">
            <MotionFrameTitle
              className="bg-linear-to-l from-secondary to-primary bg-clip-text font-semibold tracking-tight text-transparent uppercase dark:to-primary"
              variants={safeVariants(headingVariants, isReduced)}
            >
              {!nowPlaying && firstTrack ? 'Last Played' : 'Currently Playing'}
            </MotionFrameTitle>
          </div>
        </MotionFrameHeader>
        <MotionFramePanel className="p-3">
          {nowPlaying ? (
            <Player
              data={nowPlaying}
              {...controls}
            />
          ) : firstTrack ? (
            <Player
              data={firstTrack}
              {...controls}
            />
          ) : (
            <PlayerLoader />
          )}
        </MotionFramePanel>
      </MotionFrame>

      {/* Recently Played */}
      <section className={cn('', className)}>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 uppercase sm:text-3xl md:text-4xl dark:text-neutral-100">
            Recently Played
          </h2>
        </div>

        <div className="mt-4">
          {recent?.length ? (
            <Tracks
              data={recent}
              {...controls}
            />
          ) : (
            <TracksLoader items={4} />
          )}
        </div>
      </section>
    </div>
  );
}

function Player({
  className,
  data,
  playingId,
  onPlay
}: { className?: string; data: SpotifyTrack } & PlayControls) {
  const isReduced = useReducedMotion();
  const isOpen = Boolean(data.id) && playingId === data.id;

  return (
    <motion.div
      className={cn('grid items-start gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={safeVariants(cardVariants, isReduced)}>
        <MotionAvatar
          className="mx-auto size-40 overflow-hidden rounded-xl max-xsm:w-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <AvatarImage
            src={data?.image}
            alt={data?.name}
            className="object-cover object-center"
          />
          <MotionAvatarFallback className="animate-pulse rounded-xl">
            {data?.name?.charAt(0)}
          </MotionAvatarFallback>
        </MotionAvatar>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3"
        variants={safeVariants(containerVariants, isReduced)}
      >
        <motion.div
          className="space-y-2"
          variants={safeVariants(cardVariants, isReduced)}
        >
          <h3 className="text-base font-semibold uppercase">{data?.name}</h3>
          <div className="line-clamp-1">
            <span className="mr-2 text-neutral-600">by</span>
            {data?.artists?.map((a, i) => (
              <Fragment key={a.id}>
                {i !== 0 && ','}
                <MotionLink
                  href={a?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('text-sm text-orange-500 underline', i === 0 && 'font-semibold')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {a?.name}
                </MotionLink>
              </Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="line-clamp-1"
          variants={safeVariants(cardVariants, isReduced)}
        >
          <span className="mr-2">album :</span>
          <MotionLink
            href={data?.album?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange-500 uppercase hover:underline focus:underline"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {data?.album?.name}
          </MotionLink>
        </motion.div>

        {data.id && (
          <motion.div variants={safeVariants(cardVariants, isReduced)}>
            <Button
              aria-pressed={isOpen}
              onClick={() => onPlay(data)}
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
              {isOpen ? 'Stop playing' : 'Play this song'}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function PlayerLoader({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid items-start gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={safeVariants(cardVariants, isReduced)}>
        <MotionSkeleton className="size-40 rounded-xl bg-neutral-400/80 max-xsm:w-full dark:bg-neutral-700/80" />
      </motion.div>
      <motion.div
        className="flex flex-col gap-3"
        variants={safeVariants(containerVariants, isReduced)}
      >
        <div className="space-y-2">
          <MotionSkeleton
            variants={safeVariants(cardVariants, isReduced)}
            className="h-4 w-1/2 bg-neutral-400/80 dark:bg-neutral-700/80"
          />
          <div className="flex items-center gap-2">
            <MotionSkeleton
              variants={safeVariants(cardVariants, isReduced)}
              className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80"
            />
            <MotionSkeleton
              variants={safeVariants(cardVariants, isReduced)}
              className="h-4 w-3/5 bg-neutral-400/80 dark:bg-neutral-700/80"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <MotionSkeleton
            variants={safeVariants(cardVariants, isReduced)}
            className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80"
          />
          <MotionSkeleton
            variants={safeVariants(cardVariants, isReduced)}
            className="h-4 w-2/5 bg-neutral-400/80 dark:bg-neutral-700/80"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
