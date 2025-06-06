import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAlbumTrack, SpotifyTrack } from 'types/spotify';
import { ErrorCause } from 'types/types';
import { getAccessToken } from '~/config/spotify';

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams;
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 10;
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) throw new Error(response.statusText, { cause: { response } });

    const data = (await response.json()) as { items: Array<SpotifyAlbumTrack> };

    const tracks =
      data?.items && Array.isArray(data?.items)
        ? Array.from(data?.items).map(
            track =>
              ({
                name: track?.name,
                href: track?.external_urls?.spotify,
                image: track?.album?.images[0]?.url,
                artists: track?.artists?.map(a => ({
                  href: a.external_urls?.spotify,
                  id: a.id,
                  name: a.name,
                  type: a.type
                })),
                album: {
                  name: track?.album?.name,
                  id: track?.album?.id,
                  href: track?.album?.external_urls?.spotify,
                  album_type: track?.album?.album_type
                }
              }) satisfies SpotifyTrack
          )
        : [];

    return NextResponse.json(
      { message: response?.statusText || 'gocha', data: tracks },
      { status: response?.status || 200 }
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
