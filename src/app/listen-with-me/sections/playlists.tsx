'use client'

import { useState } from 'react'
import { HiMusicNote } from 'react-icons/hi'
import { MdRefresh } from 'react-icons/md'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'
import { cn } from 'lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import Skeleton from '~/components/ui/skeleton'

type Paginate = {
  total: number
  offset: number
  previous: number | null
  next: number | null
}

export function Playlist({ className }: { className?: string }) {
  const [pagination, setPagination] = useState<Paginate>({
    total: 0,
    offset: 0,
    previous: null,
    next: null
  })
  const { data, error, isLoading, refetch } = useQuery<{ message: string; data: Page<Playlist<TrackItem>> }>({
    queryKey: [pagination],
    queryFn: () =>
      fetch(`/api/spotify/playlists?offset=${pagination.offset}`, {
        method: 'GET',
        mode: 'cors'
      }).then(res => res.json()),
    retry: true
  })

  return (
    <section className={cn('mt-8', className)}>
      <nav className="flex items-center justify-between">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-semibold tracking-tight text-transparent dark:to-[#ff7056]">
          Playlist
        </h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
          onClick={() => refetch()}
        >
          <MdRefresh className={cn('size-5', isLoading && 'animate-spin')} />
        </button>
      </nav>

      <div className="mt-4">
        {data?.data && Array.isArray(data?.data?.items) && data?.data?.items?.length ? (
          <ProfileData data={data?.data} />
        ) : (
          <ProfileError />
        )}
      </div>
    </section>
  )
}

export function ProfileError({ className }: { className?: string }) {
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

export function ProfileData({ className, data }: { className?: string; data: Page<Playlist<TrackItem>> }) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-5', className)}>
      {data?.items?.map((playlist, i) => (
        <Card key={i} className="grid border-0 bg-neutral-100/60 dark:bg-neutral-800/60">
          <CardContent className={cn('grid grid-cols-2 gap-2 p-4')}>
            <Avatar className="h-[176px] w-full">
              <AvatarImage src="" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 p-4 pt-0">
            <CardTitle className="line-clamp-1 w-full">{playlist.name}</CardTitle>
            <div className="flex w-full items-center gap-2">
              <HiMusicNote className="size-4" />
              <CardDescription className="line-clamp-1">{playlist.owner?.display_name}</CardDescription>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
