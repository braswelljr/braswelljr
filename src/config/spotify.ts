export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || ''
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || ''
export const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || ''

const BASE_URL = `https://api.spotify.com/v1`

export const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`
export const TOP_TRACKS_ENDPOINT = `${BASE_URL}/me/top/tracks?time_range=medium_term&limit=10`
export const TOP_ARTISTS_ENDPOINT = `${BASE_URL}/me/top/artists?time_range=medium_term&limit=3`
export const RECENTLY_PLAYED_ENDPOINT = `${BASE_URL}/me/player/recently-played?limit=10`
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
