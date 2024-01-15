import { NextResponse } from 'next/server'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '~/config/spotify'

export async function GET() {
  const sdk = SpotifyApi.withClientCredentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
  console.log(sdk.currentUser.playlists)
  return NextResponse.json({ message: `braswelljr's portfolio API` }, { status: 200 })
}
