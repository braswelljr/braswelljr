'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { MdRefresh } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { cn } from 'lib/utils';
import { SpotifyTrack } from 'types/spotify';
import { AnimatedBackground } from '~/components/ui/animated-background';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Skeleton from '~/components/ui/skeleton';

export function TopTracks({ className }: { className?: string }) {
  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: Array<SpotifyTrack>;
  }>({
    queryKey: ['top-tracks'],
    queryFn: () => fetch(`/api/spotify/top-tracks?limit=6`, { method: 'GET', mode: 'cors' }).then(res => res.json()),
    retry: true
  });

  return (
    <section className={cn('', className)}>
      <nav className="flex items-center justify-between">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-[#ff7056]">
          Top Tracks
        </h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
          onClick={() => refetch()}
        >
          <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
        </button>
      </nav>

      <div className="mt-4">
        {data?.data && Array.isArray(data?.data) && data?.data?.length ? (
          <Tracks data={data?.data} />
        ) : (
          <TracksLoader />
        )}
      </div>
    </section>
  );
}

export function TracksLoader({ className, items = 6 }: { className?: string; items?: number }) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] gap-8', className)}>
      {Array(items || 6)
        .fill('')
        .map((_, i) => (
          <div key={i} className="grid grid-cols-[1.2rem_7rem_1fr] gap-4 p-4">
            <div className="">{i + 1}.</div>
            <Skeleton className="mx-auto size-28 overflow-hidden rounded bg-neutral-400/80 dark:bg-neutral-700/80" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80" />
                <Skeleton className="h-4 w-2/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export function Tracks({ className, data }: { className?: string; data: Array<SpotifyTrack> }) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] gap-8', className)}>
      <AnimatedBackground
        className="rounded-xl bg-yellow-100/30"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        enableHover
      >
        {data?.map((track, i) => (
          <Link
            key={i}
            data-id={`track-card-${i}`}
            href={track?.href}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="grid grid-cols-[1.2rem_7rem_1fr] gap-4 p-4">
              <div className="">{i + 1}.</div>
              <Avatar className="mx-auto size-28 overflow-hidden rounded">
                <AvatarImage src={track?.image} alt={track?.name} />
                <AvatarFallback className="animate-pulse rounded-xl">{track?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h4 className="line-clamp-2 text-sm sm:text-base">{track?.name}</h4>
                <p className="text-xsm line-clamp-2 sm:text-sm">
                  {track?.artists?.map((a, i) => (
                    <Fragment key={i}>
                      {i !== 0 && ', '}
                      <span
                        key={a?.id}
                        onClick={e => {
                          e.stopPropagation(); // Prevent triggering the parent link
                          window.open(a?.href, '_blank', 'noopener noreferrer');
                        }}
                        className={cn('cursor-pointer text-orange-500 underline', i === 0 && 'font-semibold')}
                      >
                        {a?.name}
                      </span>
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </AnimatedBackground>
    </div>
  );
}
