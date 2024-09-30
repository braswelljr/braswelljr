import { NextResponse } from 'next/server'
import { ErrorCause } from 'types/types'
import { SPOTIFY_USER_ID, SpotifySDK } from '~/config/spotify'

export async function GET() {
  try {
    const playlists = await SpotifySDK.playlists.getUsersPlaylists(SPOTIFY_USER_ID)

    if (!playlists) throw new Error(`couldn't retrieve playlists`)

    return NextResponse.json({ message: 'successfully retrieved playlists', data: playlists }, { status: 200 })
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
