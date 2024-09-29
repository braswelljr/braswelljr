import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export const SPOTIFY_CLIENT_ID = process.env.AUTH_SPOTIFY_ID || ''
export const SPOTIFY_CLIENT_SECRET = process.env.AUTH_SPOTIFY_SECRET || ''

const BASE_URL = `https://api.spotify.com/v1`

export const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`
export const TOP_TRACKS_ENDPOINT = `${BASE_URL}/me/top/tracks?time_range=medium_term&limit=10`
export const TOP_ARTISTS_ENDPOINT = `${BASE_URL}/me/top/artists?time_range=medium_term&limit=3`
export const RECENTLY_PLAYED_ENDPOINT = `${BASE_URL}/me/player/recently-played?limit=10`
export const AUTH_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

export const SPOTIFY_COOKIE_STORE = '__spot-tokie__' //Secure-
export const REFRESH_SPOTIFY_COOKIE_STORE = '__refresh-spot-tokie__'

export const SpotifySDK = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  [
    'user-library-read',
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
    'user-read-currently-playing'
  ],
  {
    afterRequest(_, __, response) {
      if (!response.ok) {
        throw new Error(response.statusText, { cause: { response } })
      }
    }
  }
)
