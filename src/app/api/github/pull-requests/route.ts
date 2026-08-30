import { NextRequest, NextResponse } from 'next/server';
import { searchIssues } from '@/config/github';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const MAX_LIMIT = 100;

/**
 * Pull requests authored by the account.
 *
 * `state` narrows to open/closed/merged. Merged is a filter on top of closed
 * rather than a state of its own, so it is expressed as a search qualifier.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams;
  const limit = Math.min(Number(searchParams.get('limit')) || 20, MAX_LIMIT);
  const page = Number(searchParams.get('page')) || 1;
  const state = searchParams.get('state');
  const repo = searchParams.get('repo');
  const q = searchParams.get('q');

  const qualifiers = ['type:pr'];
  if (state === 'open') qualifiers.push('state:open');
  else if (state === 'closed') qualifiers.push('state:closed', '-is:merged');
  else if (state === 'merged') qualifiers.push('is:merged');
  if (repo) qualifiers.push(`repo:${repo}`);
  if (q) qualifiers.push(q);

  try {
    const response = await searchIssues({
      qualifiers,
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
      page,
      limit
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `GitHub responded ${response.status}: ${response.statusText}`, data: [] },
        { status: response.status }
      );
    }

    const body = (await response.json()) as { total_count: number; items: unknown[] };
    const items = Array.isArray(body.items) ? body.items : [];
    const total = body.total_count ?? items.length;

    return NextResponse.json(
      {
        message: 'successfully retrieved pull requests',
        data: items,
        meta: { page, limit, total, hasNextPage: page * limit < total }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something happened', data: [] },
      { status: 500 }
    );
  }
}
