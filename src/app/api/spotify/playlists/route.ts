import { NextRequest, NextResponse } from 'next/server';
import type { Page, Playlist, TrackItem } from '@spotify/web-api-ts-sdk';
import { ErrorCause } from 'types/types';
import { getAccessToken } from '@/config/spotify';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const MAX_LIMIT = 50;

/**
 * One page of the account's playlists.
 *
 * This handler did not exist, so the Playlist section had been requesting
 * /api/spotify/playlists and rendering its loading skeleton against a 404.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams;
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Math.min(Number(searchParams.get('limit')) || 20, MAX_LIMIT);

  try {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: { response } });

    const data = (await response.json()) as Page<Playlist<TrackItem>>;

    return NextResponse.json(
      { message: 'successfully retrieved playlists', data },
      { status: 200 }
    );
  } catch (error) {
    let err: ErrorCause;

    if (error instanceof Error) {
      err = error as ErrorCause;
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause;
    }

    return NextResponse.json(
      { message: err.cause?.response?.statusText || 'Something happened', data: null },
      { status: err.cause?.response?.status ?? 500 }
    );
  }
}
