import { NextRequest, NextResponse } from 'next/server';
import { blog } from 'lib/source';
import { getStoreConfig } from '@/config/store';

export const dynamic = 'force-dynamic';

/** What a visitor may do to a post's counters, and the field each one moves. */
const ACTIONS = {
  view: { field: 'views', by: 1 },
  like: { field: 'likes', by: 1 },
  unlike: { field: 'likes', by: -1 }
} as const;

type Action = keyof typeof ACTIONS;

/** The slug when it names a real post, otherwise null. Checking it against the
 *  content keeps a caller from minting keys for posts that do not exist. */
function knownSlug(raw: string | null): string | null {
  if (!raw) return null;
  return blog.getPage(raw.split('/').filter(Boolean)) ? raw : null;
}

/** Run Redis commands through Upstash's REST pipeline, in order. */
async function pipeline(
  store: { url: string; token: string },
  commands: Array<Array<string | number>>
): Promise<Array<{ result?: unknown; error?: string }>> {
  const response = await fetch(`${store.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${store.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store'
  });

  if (!response.ok) throw new Error(`Store responded ${response.status}`);
  return response.json();
}

/** HGETALL comes back as a flat [field, value, field, value] list. */
function toStats(flat: unknown): { views: number; likes: number } {
  const list = Array.isArray(flat) ? flat : [];
  const read = (field: string) => {
    const at = list.indexOf(field);
    // An unlike that outruns its like must not show as a negative count.
    return at < 0 ? 0 : Math.max(0, Number(list[at + 1]) || 0);
  };

  return { views: read('views'), likes: read('likes') };
}

function unavailable() {
  return NextResponse.json(
    { message: 'Post stats are not configured', data: null },
    { status: 503 }
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  const store = getStoreConfig();
  if (!store) return unavailable();

  const slug = knownSlug(req.nextUrl.searchParams.get('slug'));
  if (!slug) return NextResponse.json({ message: 'Unknown post', data: null }, { status: 404 });

  try {
    const [stats] = await pipeline(store, [['HGETALL', `post:${slug}`]]);
    return NextResponse.json({ message: 'ok', data: toStats(stats?.result) });
  } catch {
    return NextResponse.json({ message: 'Could not read post stats', data: null }, { status: 502 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const store = getStoreConfig();
  if (!store) return unavailable();

  const body = (await req.json().catch(() => null)) as { slug?: string; action?: string } | null;
  const slug = knownSlug(body?.slug ?? null);
  if (!slug) return NextResponse.json({ message: 'Unknown post', data: null }, { status: 404 });

  const action = body?.action && body.action in ACTIONS ? ACTIONS[body.action as Action] : null;
  if (!action) {
    return NextResponse.json({ message: 'Unknown action', data: null }, { status: 400 });
  }

  try {
    const [, stats] = await pipeline(store, [
      ['HINCRBY', `post:${slug}`, action.field, action.by],
      ['HGETALL', `post:${slug}`]
    ]);
    return NextResponse.json({ message: 'ok', data: toStats(stats?.result) });
  } catch {
    return NextResponse.json(
      { message: 'Could not update post stats', data: null },
      { status: 502 }
    );
  }
}
