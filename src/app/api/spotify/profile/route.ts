import { NextResponse } from 'next/server'
import { ErrorCause } from 'types/types'
import { SpotifySDK } from '~/config/spotify'

export async function GET() {
  try {
    const profile = await SpotifySDK.currentUser?.profile()

    // Check if both promises were successful
    if (!profile) throw new Error(`couldn't retrieve profile`)

    return NextResponse.json(
      {
        message: 'successfully retrieved profile',
        data: profile
      },
      {
        status: 200
      }
    )
  } catch (error) {
    let err: ErrorCause

    if (error instanceof Error) {
      err = error as ErrorCause
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause
    }
    return NextResponse.json(
      {
        message: err.cause?.response?.statusText || 'Something happened',
        data: null
      },
      {
        status: err.cause?.response?.status ?? 500
      }
    )
  }
}
