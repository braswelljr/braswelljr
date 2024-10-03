'use client'

import Link from 'next/link'
import { MdRefresh } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { cn } from 'lib/utils'
import { SpotifyTrack } from 'types/spotify'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import Skeleton from '~/components/ui/skeleton'

export default function CurrentlyPlaying({ className }: { className?: string }) {
  const { data, refetch, isFetching } = useQuery<{
    message: string
    data: SpotifyTrack
  }>({
    queryKey: ['token'],
    queryFn: () => fetch('/api/spotify/currently-playing', { method: 'GET' }).then(res => res.json()),
    retry: true
  })

  return (
    <section className={cn('w-full rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80', className)}>
      <nav className="flex items-center justify-between px-2">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text font-semibold uppercase tracking-tight text-transparent dark:to-[#ff7056]">
          Curently Playing
        </h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
          onClick={() => refetch()}
        >
          <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
        </button>
      </nav>

      <div className="mt-2 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-900">
        {data?.data ? <Player data={data?.data} /> : <PlayerLoader />}
      </div>
    </section>
  )
}

function Player({ className, data }: { className?: string; data: SpotifyTrack }) {
  return (
    <div className={cn('grid gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}>
      <Avatar className="mx-auto size-32 overflow-hidden rounded-xl">
        <AvatarImage src={data?.image} alt={data?.name} />
        <AvatarFallback className="animate-pulse rounded-xl">{data?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold uppercase">{data?.name}</h3>
          <div className="line-clamp-2">
            <span className="mr-2 text-neutral-600">by</span>
            {data?.artists?.map((a, i) => (
              <>
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
              </>
            ))}
          </div>
        </div>
        <div className="mt-4 line-clamp-1">
          <span className="mr-2">album :</span>{' '}
          <Link
            key={data?.album.id}
            href={data?.album.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('text-sm uppercase text-orange-500 hover:underline focus:underline')}
          >
            {data?.album.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

function PlayerLoader({ className }: { className?: string }) {
  return (
    <div className={cn('', className)}>
      <div className={cn('grid gap-6 px-2 py-4 xsm:grid-cols-[auto_1fr]', className)}>
        <Skeleton className="size-32 rounded-xl bg-neutral-400/80 dark:bg-neutral-900/80" />
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="size-4 w-1/2 bg-neutral-400/80 dark:bg-neutral-900/80" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-900/80" />
              <Skeleton className="h-4 w-3/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-900/80" />
            <Skeleton className="h-4 w-2/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
          </div>
        </div>
      </div>
    </div>
  )
}
