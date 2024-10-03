import { NextRequest, NextResponse } from 'next/server'
import { ErrorCause } from 'types/types'
import { SpotifySDK } from '~/config/spotify'

type Props = {
  params?: {
    id: string
  }
}

export async function GET(_: NextRequest, { params }: Props) {
  const id = params?.id || ''

  if (!id) {
    return NextResponse.json({ message: 'Playlist id not not found', data: null }, { status: 500 })
  }
  try {
    const playlist = await SpotifySDK.playlists.getPlaylist(id)

    if (!playlist) throw new Error(`couldn't retrieve playlist`)

    return NextResponse.json({ message: 'successfully retrieved playlist', data: playlist }, { status: 200 })
  } catch (error) {
    let err: ErrorCause

    if (error instanceof Error) {
      err = error as ErrorCause
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause
    }

    return NextResponse.json(
      { message: err.cause?.response?.statusText || 'Something happened', data: null },
      { status: err.cause?.response?.status ?? 500 }
    )
  }
}
