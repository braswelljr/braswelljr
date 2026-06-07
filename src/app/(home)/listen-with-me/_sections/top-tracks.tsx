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
  headingVariants,
  interactiveCard,
  MotionAvatar,
  MotionAvatarFallback,
  MotionAvatarImage,
  MotionCard,
  MotionCardContent,
  MotionSkeleton,
  safeVariants
} from '@/components/motion';

export function TopTracks({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: Array<SpotifyTrack>;
  }>({
    queryKey: ['top-tracks'],
    queryFn: () =>
      fetch(`/api/spotify/top-tracks?limit=6`, { method: 'GET', mode: 'cors' }).then((res) =>
        res.json()
      ),
    retry: true
  });

  return (
    <section className={cn('', className)}>
      <nav className="flex items-center justify-between">
        <motion.h2
          className="bg-linear-to-l from-secondary to-primary bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-primary"
          variants={safeVariants(headingVariants, isReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Top Tracks
        </motion.h2>
        <motion.button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none"
          onClick={() => refetch()}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          aria-label="Refresh top tracks"
        >
          <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
        </motion.button>
      </nav>

      <div className="mt-4">
        {data?.data && Array.isArray(data?.data) && data?.data?.length ? (
          <Tracks data={data.data} />
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
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] gap-4', className)}
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
            <MotionCardContent className="grid grid-cols-[1.2rem_7rem_1fr] gap-4 p-3">
              <div className="text-sm">{i + 1}.</div>
              <MotionSkeleton className="mx-auto size-28 overflow-hidden rounded bg-neutral-400/80 dark:bg-neutral-700/80" />
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

export function Tracks({ className, data }: { className?: string; data: Array<SpotifyTrack> }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] gap-4', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {data?.map((track, i) => (
        <MotionCard
          key={i}
          variants={safeVariants(cardVariants, isReduced)}
          {...(isReduced ? {} : interactiveCard)}
          className="border-0 bg-neutral-100/60 dark:bg-neutral-800/60"
          render={(p) => (
            <a
              {...p}
              href={track?.href}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
        >
          <MotionCardContent className="grid grid-cols-[1.2rem_7rem_1fr] gap-4 p-3">
            <div className="text-sm">{i + 1}.</div>
            <MotionAvatar
              className="mx-auto size-28 overflow-hidden rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MotionAvatarImage
                src={track?.image}
                alt={track?.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              />
              <MotionAvatarFallback className="animate-pulse rounded-xl">
                {track?.name?.charAt(0)}
              </MotionAvatarFallback>
            </MotionAvatar>
            <div className="space-y-2">
              <h4 className="line-clamp-2 text-sm sm:text-base">{track?.name}</h4>
              <p className="line-clamp-2 text-xsm sm:text-sm">
                {track?.artists?.map((a, j) => (
                  <Fragment key={j}>
                    {j !== 0 && ', '}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(a?.href, '_blank', 'noopener noreferrer');
                      }}
                      className={cn(
                        'cursor-pointer text-orange-500 underline',
                        j === 0 && 'font-semibold'
                      )}
                    >
                      {a?.name}
                    </span>
                  </Fragment>
                ))}
              </p>
            </div>
          </MotionCardContent>
        </MotionCard>
      ))}
    </motion.div>
  );
}
