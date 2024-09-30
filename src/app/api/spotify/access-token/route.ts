import { NextResponse } from 'next/server'
import { ErrorCause } from 'types/types'
import { AUTH_TOKEN_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_COOKIE_STORE } from '~/config/spotify'

type DataI = {
  access_token: string
  token_type: 'Bearer' | 'Basic'
  expires_in: number
}

export async function POST() {
  try {
    const response = await fetch(AUTH_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    })

    if (!response.ok) throw new Error(response.statusText, { cause: { response } })

    const data: DataI = await response.json()

    // Set cookie with access_token and its expiration time
    const cookieString = `${SPOTIFY_COOKIE_STORE}=${data.access_token}; Path=/; Max-Age=${data.expires_in};`

    return NextResponse.json(
      { message: `Token set successfully`, data }, // Include data in response
      { status: 200, headers: { 'Set-Cookie': cookieString } }
    )
  } catch (error) {
    let err: ErrorCause

    if (error instanceof Error) {
      err = error as ErrorCause
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause
    }

    return NextResponse.json(
      { message: err.cause?.response?.statusText || 'Something happened' },
      { status: err.cause?.response?.status ?? 500 }
    )
  }
}
