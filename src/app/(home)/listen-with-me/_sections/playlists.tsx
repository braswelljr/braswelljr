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
  MotionFrame,
  MotionFrameFooter,
  MotionFramePanel,
  MotionFrameTitle,
  MotionLink,
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
    queryKey: ['playlists', pagination.offset],
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
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-4', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {Array(10)
        .fill('')
        .map((_, i) => (
          <MotionFrame
            key={i}
            variants={safeVariants(cardVariants, isReduced)}
            className="gap-0 p-1"
          >
            <MotionFramePanel className="grid grid-cols-2 gap-2 p-3">
              {Array(4)
                .fill('')
                .map((_, x) => (
                  <MotionSkeleton
                    key={x}
                    className="h-20 w-full bg-neutral-400 dark:bg-neutral-800"
                  />
                ))}
            </MotionFramePanel>
            <MotionFrameFooter className="flex flex-col items-start gap-2 px-3 py-2">
              <MotionSkeleton className="h-4 w-4/5 bg-neutral-400 dark:bg-neutral-800" />
              <div className="flex w-full items-center gap-2">
                <MotionSkeleton className="size-4 bg-neutral-400 dark:bg-neutral-800" />
                <MotionSkeleton className="h-4 w-4/5 bg-neutral-400 dark:bg-neutral-800" />
              </div>
            </MotionFrameFooter>
          </MotionFrame>
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
      className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-4', className)}
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      animate="visible"
    >
      {data?.items?.map((playlist, i) => (
        <MotionLink
          key={i}
          href={`/listen-with-me/playlists/${playlist?.id}`}
          variants={safeVariants(cardVariants, isReduced)}
          {...(isReduced ? {} : interactiveCard)}
          className="block"
        >
          <MotionFrame className="h-full gap-0 p-1">
            <MotionFramePanel className="p-2">
              <MotionAvatar className="h-44 w-full overflow-hidden rounded-lg bg-neutral-400 dark:bg-neutral-900">
                <MotionAvatarImage
                  src={playlist?.images?.at(0)?.url}
                  alt={playlist?.name}
                  className="aspect-auto size-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                />
                <MotionAvatarFallback className="size-full animate-pulse rounded-none">
                  {playlist?.name?.charAt(0)}
                </MotionAvatarFallback>
              </MotionAvatar>
            </MotionFramePanel>

            <MotionFrameFooter className="flex flex-col items-start gap-1 px-3 py-2">
              <motion.span
                className="flex items-center gap-2 hover:text-secondary"
                {...tapScale}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(playlist.external_urls?.spotify, '_blank', 'noopener noreferrer');
                }}
              >
                <HiExternalLink className="size-4 shrink-0" />
                <MotionFrameTitle className="line-clamp-1 text-sm font-semibold">
                  {playlist.name}
                </MotionFrameTitle>
              </motion.span>
              <p className="line-clamp-1 text-xs text-neutral-600 dark:text-neutral-400">
                {playlist.owner?.display_name}
              </p>
            </MotionFrameFooter>
          </MotionFrame>
        </MotionLink>
      ))}
    </motion.div>
  );
}
