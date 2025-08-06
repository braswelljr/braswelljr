import { NextResponse } from 'next/server';
import { ErrorCause } from 'types/types';
import { AUTH_TOKEN_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_COOKIE_STORE, SPOTIFY_REFRESH_TOKEN } from '~/config/spotify';

type DataI = {
  access_token: string;
  token_type: 'Bearer' | 'Basic';
  scope: string;
  expires_in: number;
};

export const maxDuration = 60;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

// if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
//   throw new Error('Missing Spotify Client ID, Client Secret, or Refresh Token')
// }

export async function GET() {
  try {
    const response = await fetch(AUTH_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      })
    });

    if (!response.ok) throw new Error(response.statusText, { cause: { response } });

    const data: DataI = await response.json();

    // Set cookie with access_token and its expiration time
    const cookieString = `${SPOTIFY_COOKIE_STORE}=${data.access_token}; Path=/; Max-Age=${data.expires_in}; HttpOnly; Secure`;

    return NextResponse.json(
      { message: `Token set successfully`, data }, // Include data in response
      {
        status: 200,
        headers: {
          'Set-Cookie': cookieString // Set the access_token as a cookie
        }
      }
    );
  } catch (error) {
    let err: ErrorCause;

    if (error instanceof Error) {
      err = error as ErrorCause;
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause;
    }

    return NextResponse.json(
      {
        message: err.cause?.response?.statusText || 'Something happened'
      },
      {
        status: err.cause?.response?.status ?? 500
      }
    );
  }
}
