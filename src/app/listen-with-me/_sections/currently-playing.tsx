'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { MdRefresh } from 'react-icons/md';
import { cn } from 'lib/utils';
import { SpotifyTrack } from 'types/spotify';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '~/components/ui/skeleton';
import { Tracks, TracksLoader } from './top-tracks';

export function CurrentlyPlaying({ className }: { className?: string }) {
  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: SpotifyTrack;
  }>({
    queryKey: ['currently-playing'],
    queryFn: () => fetch('/api/spotify/currently-playing', { method: 'GET' }).then((res) => res.json()),
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
    queryFn: () => fetch('/api/spotify/recently-played?limit=4', { method: 'GET' }).then((res) => res.json()),
    retry: true
  });

  const firstTrack = cd?.data?.at(0);

  return (
    <div className={cn('space-y-8', className)}>
      <section className="w-full rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80">
        <nav className="flex items-center justify-between px-2">
          <h2 className="from-secondary to-primary dark:to-primary bg-linear-to-l bg-clip-text font-semibold tracking-tight text-transparent uppercase">
            {data?.data ? 'Curently Playing' : cd?.data && Array.isArray(cd?.data) && cd?.data?.length ? 'Last Played' : 'Curently Playing'}
          </h2>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
            onClick={() => refetch()}
          >
            <MdRefresh className={cn('size-5', (isFetching || irf) && 'animate-spin')} />
          </button>
        </nav>

        <div className="mt-2 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-900">
          {data?.data ? (
            <Player data={data?.data} />
          ) : cd?.data && Array.isArray(cd?.data) && cd?.data?.length && firstTrack ? (
            <Player data={firstTrack} />
          ) : (
            <PlayerLoader />
          )}
        </div>
      </section>

      <section className={cn('', className)}>
        <nav className="flex items-center justify-between">
          <h2 className="from-secondary to-primary dark:to-primary bg-linear-to-l bg-clip-text text-xl font-semibold tracking-tight text-transparent">
            Recently Played
          </h2>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
            onClick={() => rf()}
          >
            <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
          </button>
        </nav>

        <div className="mt-4">
          {cd?.data && Array.isArray(cd?.data) && cd?.data?.length ? <Tracks data={cd?.data} /> : <TracksLoader items={4} />}
        </div>
      </section>
    </div>
  );
}

function Player({ className, data }: { className?: string; data: SpotifyTrack }) {
  return (
    <div className={cn('xsm:grid-cols-[auto_1fr] grid gap-6 px-2 py-4', className)}>
      <Avatar className="max-xsm:w-full mx-auto size-40 overflow-hidden rounded-xl">
        <AvatarImage
          src={data?.image}
          alt={data?.name}
          className="object-cover object-center"
        />
        <AvatarFallback className="animate-pulse rounded-xl">{data?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold uppercase">{data?.name}</h3>
          <div className="line-clamp-1">
            <span className="mr-2 text-neutral-600">by</span>
            {data?.artists?.map((a, i) => (
              <Fragment key={i}>
                {i !== 0 && ','}
                <Link
                  key={a?.id}
                  href={a?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('text-sm text-orange-500 underline', i === 0 && 'font-semibold')}
                >
                  {a?.name}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="mt-4 line-clamp-1">
          <span className="mr-2">album :</span>{' '}
          <Link
            key={data?.album?.id}
            href={data?.album?.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('text-sm text-orange-500 uppercase hover:underline focus:underline')}
          >
            {data?.album?.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlayerLoader({ className }: { className?: string }) {
  return (
    <div className={cn('', className)}>
      <div className={cn('xsm:grid-cols-[auto_1fr] grid gap-6 px-2 py-4', className)}>
        <Skeleton className="max-xsm:w-full size-40 rounded-xl bg-neutral-400/80 dark:bg-neutral-700/80" />
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="size-4 w-1/2 bg-neutral-400/80 dark:bg-neutral-700/80" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80" />
              <Skeleton className="h-4 w-3/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-700/80" />
            <Skeleton className="h-4 w-2/5 bg-neutral-400/80 dark:bg-neutral-700/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
