'use client';

import { useState } from 'react';
import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { HiExternalLink } from 'react-icons/hi';
import { MdRefresh } from 'react-icons/md';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  interactiveCard,
  MotionAvatar,
  MotionAvatarFallback,
  MotionAvatarImage,
  MotionCard,
  MotionCardContent,
  MotionCardDescription,
  MotionCardFooter,
  MotionCardTitle,
  MotionSkeleton,
  safeVariants,
  tapScale
} from '@/components/motion';

type Paginate = {
  total: number;
  offset: number;
  previous: number | null;
  next: number | null;
};

export function Playlist({ className }: { className?: string }) {
  const [pagination, _setPagination] = useState<Paginate>({
    total: 0,
    offset: 0,
    previous: null,
    next: null
  });
  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: Page<Playlist<TrackItem>>;
  }>({
    queryKey: ['playlists'],
    queryFn: () =>
      fetch(`/api/spotify/playlists?offset=${pagination.offset}`, {
        method: 'GET',
        mode: 'cors'
      }).then((res) => res.json()),
    retry: true
  });

  return (
    <section className={cn('', className)}>
      <nav className="flex items-center justify-between">
        <h2 className="bg-linear-to-l from-secondary to-primary bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-primary">
          Playlist
        </h2>
        <motion.button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none"
          onClick={() => refetch()}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          aria-label="Refresh playlists"
        >
          <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
        </motion.button>
      </nav>

      <div className="mt-4">
        {data?.data && Array.isArray(data?.data?.items) && data?.data?.items?.length ? (
          <PlaylistData data={data?.data} />
        ) : (
          <PlaylistError />
        )}
      </div>
    </section>
  );
}

export function PlaylistError({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-5', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {Array(10)
        .fill('')
        .map((_, i) => (
          <MotionCard
            key={i}
            variants={safeVariants(cardVariants, isReduced)}
            className="grid border-0 bg-neutral-100/60 dark:bg-neutral-800/60"
          >
            <MotionCardContent className="grid grid-cols-2 gap-2 p-4">
              {Array(4)
                .fill('')
                .map((_, x) => (
                  <MotionSkeleton
                    key={x}
                    className="h-20 w-full bg-neutral-400/80 dark:bg-neutral-900/80"
                  />
                ))}
            </MotionCardContent>
            <MotionCardFooter className="flex-col items-start gap-2 p-4 pt-0">
              <MotionSkeleton className="h-4 w-4/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
              <div className="flex w-full items-center gap-2">
                <MotionSkeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-900/80" />
                <MotionSkeleton className="h-4 w-4/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
              </div>
            </MotionCardFooter>
          </MotionCard>
        ))}
    </motion.div>
  );
}

export function PlaylistData({
  className,
  data
}: {
  className?: string;
  data: Page<Playlist<TrackItem>>;
}) {
  const isReduced = useReducedMotion();
  return (
    <motion.div
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-5', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {data?.items?.map((playlist, i) => (
        <MotionCard
          key={i}
          variants={safeVariants(cardVariants, isReduced)}
          {...(isReduced ? {} : interactiveCard)}
          className="playlist-card grid border-0 bg-neutral-100/60 dark:bg-neutral-800/60"
          render={(p) => (
            <a
              {...p}
              href={`/listen-with-me/playlists/${playlist?.id}`}
            />
          )}
        >
          <div className="relative z-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <MotionCardContent className="p-4">
              <MotionAvatar className="h-[176px] w-full rounded bg-neutral-400/80 dark:bg-neutral-900/80">
                <MotionAvatarImage
                  src={playlist?.images?.at(0)?.url}
                  alt={playlist?.name}
                  className="aspect-auto size-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                />
                <MotionAvatarFallback className="size-full animate-pulse rounded bg-neutral-900/0">
                  {playlist?.name?.charAt(0)}
                </MotionAvatarFallback>
              </MotionAvatar>
            </MotionCardContent>
            <MotionCardFooter className="flex-col items-start gap-2 p-4 pt-0">
              <motion.span
                className="group flex items-center justify-center gap-2 hover:text-secondary"
                {...tapScale}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(playlist.external_urls?.spotify, '_blank', 'noopener noreferrer');
                }}
              >
                <HiExternalLink className="size-6" />
                <MotionCardTitle className="line-clamp-1 w-full text-lg">
                  {playlist.name}
                </MotionCardTitle>
              </motion.span>
              <div className="flex w-full items-center gap-2">
                <MotionCardDescription className="line-clamp-1">
                  {playlist.owner?.display_name}
                </MotionCardDescription>
              </div>
            </MotionCardFooter>
          </div>
        </MotionCard>
      ))}
    </motion.div>
  );
}
