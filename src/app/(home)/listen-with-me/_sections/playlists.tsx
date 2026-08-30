'use client';

import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { motion, useReducedMotion } from 'motion/react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { HiExternalLink } from 'react-icons/hi';
import { MdRefresh } from 'react-icons/md';
import { cn } from 'lib/utils';
import { usePlaylistsQuery } from '@/api';
import {
  cardVariants,
  containerVariants,
  interactiveCard,
  MotionAvatar,
  MotionAvatarFallback,
  MotionFrame,
  MotionFrameFooter,
  MotionFramePanel,
  MotionFrameTitle,
  MotionLink,
  MotionSkeleton,
  safeVariants,
  tapScale
} from '@/components/shared/motion';
import { AvatarImage } from '@/components/ui/avatar';

/** Named `Playlists` rather than `Playlist` so it stops shadowing the
 *  `Playlist` type imported from the Spotify SDK just above. */
export function Playlists({ className }: { className?: string }) {
  // Offset lives in the URL so a page of playlists can be linked to. The old
  // version held it in state with a `_setPagination` nobody called, so the
  // pagination could never actually move.
  const [offset, setOffset] = useQueryState(
    'playlists',
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true })
  );
  const { data, refetch, isFetching } = usePlaylistsQuery(offset);

  const limit = data?.limit ?? 20;
  const total = data?.total ?? 0;
  const hasPrevious = offset > 0;
  const hasNext = offset + limit < total;

  return (
    <section className={cn('', className)}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 uppercase sm:text-3xl md:text-4xl dark:text-neutral-100">
          Playlists
          {total > 0 && <span className="ml-2 text-lg font-normal tabular-nums">({total})</span>}
        </h2>
        <div className="flex items-center gap-1">
          <motion.button
            type="button"
            className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none disabled:opacity-30"
            onClick={() => void setOffset(Math.max(0, offset - limit))}
            disabled={!hasPrevious}
            aria-label="Previous playlists"
            {...tapScale}
          >
            <ArrowLeft2
              size={16}
              color="currentColor"
              variant="Linear"
            />
          </motion.button>
          <motion.button
            type="button"
            className="flex size-6 items-center justify-center rounded-full outline-none focus:outline-none disabled:opacity-30"
            onClick={() => void setOffset(offset + limit)}
            disabled={!hasNext}
            aria-label="Next playlists"
            {...tapScale}
          >
            <ArrowRight2
              size={16}
              color="currentColor"
              variant="Linear"
            />
          </motion.button>
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
        </div>
      </div>

      <div className="mt-4">
        {data?.items?.length ? <PlaylistData data={data} /> : <PlaylistError />}
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
          href={playlist?.external_urls?.spotify ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          variants={safeVariants(cardVariants, isReduced)}
          {...(isReduced ? {} : interactiveCard)}
          className="block"
        >
          <MotionFrame className="h-full gap-0 p-1">
            <MotionFramePanel className="p-2">
              <MotionAvatar className="h-44 w-full overflow-hidden rounded-lg bg-neutral-400 dark:bg-neutral-900">
                {/* See top-tracks: an Avatar image that mounts on load cannot
                    carry its own mount animation. */}
                <AvatarImage
                  src={playlist?.images?.at(0)?.url}
                  alt={playlist?.name}
                  className="aspect-auto size-full object-cover"
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
