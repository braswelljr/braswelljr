'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiExternalLink } from 'react-icons/hi'
import { MdRefresh } from 'react-icons/md'
import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'
import { cn } from 'lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '~/components/ui/card'
import Skeleton from '~/components/ui/skeleton'

type Paginate = {
  total: number
  offset: number
  previous: number | null
  next: number | null
}

export function Playlist({ className }: { className?: string }) {
  const [pagination, _setPagination] = useState<Paginate>({
    total: 0,
    offset: 0,
    previous: null,
    next: null
  })
  const { data, refetch, isFetching } = useQuery<{
    message: string
    data: Page<Playlist<TrackItem>>
  }>({
    queryKey: [pagination],
    queryFn: () =>
      fetch(`/api/spotify/playlists?offset=${pagination.offset}`, {
        method: 'GET',
        mode: 'cors'
      }).then(res => res.json()),
    retry: true
  })

  return (
    <section className={cn('', className)}>
      <nav className="flex items-center justify-between">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:to-[#ff7056]">
          Playlist
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
        {data?.data && Array.isArray(data?.data?.items) && data?.data?.items?.length ? (
          <PlaylistData data={data?.data} />
        ) : (
          <PlaylistError />
        )}
      </div>
    </section>
  )
}

export function PlaylistError({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-5', className)}>
      {Array(10)
        .fill('')
        .map((_, i) => (
          <Card key={i} className="grid border-0 bg-neutral-100/60 dark:bg-neutral-800/60">
            <CardContent className="grid grid-cols-2 gap-2 p-4">
              {Array(4)
                .fill('')
                .map((_, x) => (
                  <Skeleton key={x} className="h-20 w-full bg-neutral-400/80 dark:bg-neutral-900/80" />
                ))}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 p-4 pt-0">
              <Skeleton className="h-4 w-4/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
              <div className="flex w-full items-center gap-2">
                <Skeleton className="size-4 bg-neutral-400/80 dark:bg-neutral-900/80" />
                <Skeleton className="h-4 w-4/5 bg-neutral-400/80 dark:bg-neutral-900/80" />
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export function PlaylistData({ className, data }: { className?: string; data: Page<Playlist<TrackItem>> }) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-5', className)}>
      {data?.items?.map((playlist, i) => (
        <Link key={i} href={`/listen-with-me/playlists/${playlist?.id}`} passHref>
          <Card className="playlist-card grid border-0 bg-neutral-100/60 hover:cursor-pointer focus:cursor-pointer dark:bg-neutral-800/60">
            <div className="relative z-[1] rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <CardContent className={cn('p-4')}>
                <Avatar className="h-[176px] w-full rounded bg-neutral-400/80 dark:bg-neutral-900/80">
                  <AvatarImage src={playlist?.images?.at(0)?.url} className="aspect-auto size-full object-cover" />
                  <AvatarFallback className="size-full animate-pulse rounded bg-neutral-900/0">
                    {playlist?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 p-4 pt-0">
                <Link
                  href={playlist.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 hover:text-[#ff8d22]"
                >
                  <HiExternalLink className="size-6" />
                  <CardTitle className="line-clamp-1 w-full text-lg">{playlist.name}</CardTitle>
                </Link>
                <div className="flex w-full items-center gap-2">
                  <CardDescription className="line-clamp-1">{playlist.owner?.display_name}</CardDescription>
                </div>
              </CardFooter>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
