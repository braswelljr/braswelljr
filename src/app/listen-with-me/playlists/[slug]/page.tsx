'use client'

import type { Playlist, Page as SptifyResPage, TrackItem } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'

type PageProps = {
  params: { slug: string }
}

export default function Page({ params: { slug } }: PageProps) {
  const _ = useQuery<{
    message: string
    data: SptifyResPage<Playlist<TrackItem>>
  }>({
    queryKey: [slug],
    queryFn: () =>
      fetch(`/api/spotify/playlists/${slug}`, {
        method: 'GET',
        mode: 'cors'
      }).then(res => res.json()),
    retry: true
  })

  return null
}
