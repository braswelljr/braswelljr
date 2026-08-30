import { NextRequest, NextResponse } from 'next/server';
import { GITHUB_USERNAME, githubHeaders } from '@/config/github';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

/** GitHub caps per_page at 100, so more than one call is needed past 100 repos. */
const PER_PAGE = 100;
/** Safety stop so a malformed upstream response cannot spin the pager forever. */
const MAX_PAGES = 10;

const SORTS = new Set(['created', 'updated', 'pushed', 'full_name']);

/**
 * Every public repo for the account, following pagination.
 *
 * The previous client-side call asked for `/users/{u}/repos` with no params,
 * which returns GitHub's default of 30 rows in `full_name` order, so an
 * account with more than 30 repos silently lost the rest, and "newest" was
 * really "alphabetical".
 */
export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams;
  const sortParam = searchParams.get('sort') ?? 'pushed';
  const sort = SORTS.has(sortParam) ? sortParam : 'pushed';
  const direction = searchParams.get('direction') === 'asc' ? 'asc' : 'desc';

  try {
    const repos: unknown[] = [];

    for (let page = 1; page <= MAX_PAGES; page++) {
      const url =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
        `?per_page=${PER_PAGE}&sort=${sort}&direction=${direction}&page=${page}`;

      const response = await fetch(url, { headers: githubHeaders(), next: { revalidate: 0 } });

      if (!response.ok) {
        return NextResponse.json(
          { message: `GitHub responded ${response.status}: ${response.statusText}`, data: [] },
          { status: response.status }
        );
      }

      const batch = (await response.json()) as unknown[];
      if (!Array.isArray(batch)) break;

      repos.push(...batch);

      // A short page means this was the last one.
      if (batch.length < PER_PAGE) break;
    }

    return NextResponse.json(
      { message: 'successfully retrieved repositories', data: repos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something happened', data: [] },
      { status: 500 }
    );
  }
}
