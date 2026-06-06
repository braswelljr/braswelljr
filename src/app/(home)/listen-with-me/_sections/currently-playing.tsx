'use client';

import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { MdRefresh } from 'react-icons/md';
import { cn } from 'lib/utils';
import { SpotifyTrack } from 'types/spotify';
import {
  cardVariants,
  containerVariants,
  fadeVariants,
  headingVariants,
  MotionAvatar,
  MotionAvatarFallback,
  MotionAvatarImage,
  MotionFrame,
  MotionFrameHeader,
  MotionFramePanel,
  MotionFrameTitle,
  MotionLink,
  MotionSkeleton,
  safeVariants
} from '@/components/motion';
import { Tracks, TracksLoader } from './top-tracks';

export function CurrentlyPlaying({ className }: { className?: string }) {
  const isReduced = useReducedMotion();

  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: SpotifyTrack;
  }>({
    queryKey: ['currently-playing'],
    queryFn: () =>
      fetch('/api/spotify/currently-playing', { method: 'GET' }).then((res) => res.json()),
    retry: true
  });

  const {
    data: cd,
    refetch: rf,
    isFetching: irf
  } = useQuery<{
    message: string;
    data: Array<SpotifyTrack>;
  }>({
    queryKey: ['recently-played'],
    queryFn: () =>
      fetch('/api/spotify/recently-played?limit=4', { method: 'GET' }).then((res) => res.json()),
    retry: true
  });

  const firstTrack = cd?.data?.at(0);

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
          <nav className="flex items-center justify-between">
            <MotionFrameTitle
              className="bg-linear-to-l from-secondary to-primary bg-clip-text font-semibold tracking-tight text-transparent uppercase dark:to-primary"
              variants={safeVariants(headingVariants, isReduced)}
            >
              {data?.data
                ? 'Currently Playing'
                : cd?.data && Array.isArray(cd?.data) && cd?.data?.length
                  ? 'Last Played'
                  : 'Currently Playing'}
            </MotionFrameTitle>
            <motion.button
              type="button"
              className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none"
              onClick={() => refetch()}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              aria-label="Refresh"
            >
              <MdRefresh className={cn('size-5', (isFetching || irf) && 'animate-spin')} />
            </motion.button>
          </nav>
        </MotionFrameHeader>
        <MotionFramePanel className="p-3">
          {data?.data ? (
            <Player data={data.data} />
          ) : cd?.data && Array.isArray(cd?.data) && cd?.data?.length && firstTrack ? (
            <Player data={firstTrack} />
          ) : (
            <PlayerLoader />
          )}
        </MotionFramePanel>
      </MotionFrame>

      {/* Recently Played */}
      <section className={cn('', className)}>
        <nav className="flex items-center justify-between">
          <h2 className="bg-linear-to-l from-secondary to-primary bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-primary">
            Recently Played
          </h2>
          <motion.button
            type="button"
            className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none"
            onClick={() => rf()}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            aria-label="Refresh recently played"
          >
            <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
          </motion.button>
        </nav>

        <div className="mt-4">
          {cd?.data && Array.isArray(cd?.data) && cd?.data?.length ? (
            <Tracks data={cd.data} />
          ) : (
            <TracksLoader items={4} />
          )}
        </div>
      </section>
    </div>
  );
}

function Player({ className, data }: { className?: string; data: SpotifyTrack }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}
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
          <MotionAvatarImage
            src={data?.image}
            alt={data?.name}
            className="object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <MotionAvatarFallback className="animate-pulse rounded-xl">
            {data?.name?.charAt(0)}
          </MotionAvatarFallback>
        </MotionAvatar>
      </motion.div>

      <motion.div
        className="flex flex-col justify-between gap-4"
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
              <Fragment key={i}>
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
          className="mt-4 line-clamp-1"
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
      </motion.div>
    </motion.div>
  );
}

function PlayerLoader({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={safeVariants(cardVariants, isReduced)}>
        <MotionSkeleton className="size-40 rounded-xl bg-neutral-400/80 max-xsm:w-full dark:bg-neutral-700/80" />
      </motion.div>
      <motion.div
        className="flex flex-col justify-between gap-4"
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
