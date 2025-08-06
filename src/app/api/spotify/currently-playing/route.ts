import { NextResponse } from 'next/server';
import { CurrentlyPlayingI, SpotifyTrack } from 'types/spotify';
import { ErrorCause } from 'types/types';
import { getAccessToken } from '~/config/spotify';

export async function GET(): Promise<Response> {
  try {
    const token = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }
    });

    if (!response.ok) throw new Error(response.statusText, { cause: { response } });

    const data = (await response.json()) as CurrentlyPlayingI;

    const track = {
      name: data.item?.name,
      href: data?.item?.external_urls?.spotify,
      image: data?.item?.album?.images[0]?.url,
      artists: data?.item?.artists?.map((a) => ({
        href: a.external_urls?.spotify,
        id: a.id,
        name: a.name,
        type: a.type
      })),
      album: {
        name: data?.item?.album?.name,
        id: data?.item?.album?.id,
        href: data?.item?.album?.external_urls?.spotify,
        album_type: data?.item?.album?.album_type
      }
    } satisfies SpotifyTrack;

    return NextResponse.json({ message: response?.statusText || 'gocha', data: track }, { status: response?.status || 200 });
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
