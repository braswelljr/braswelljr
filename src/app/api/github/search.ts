import { GITHUB_USERNAME, githubHeaders } from '@/config/github';

/** Fields the issue/PR search endpoint can order by. `relevance` is GitHub's
 *  "best match", expressed by sending no sort at all. */
const SEARCH_SORTS = new Set(['created', 'updated', 'comments', 'reactions', 'interactions']);

export type SearchIssuesArgs = {
  /** Extra qualifiers appended to `author:<user>` (e.g. `type:pr`). */
  qualifiers: string[];
  sort?: string | null;
  order?: string | null;
  page: number;
  limit: number;
};

/**
 * Query GitHub's issue/PR search.
 *
 * Issues and pull requests share one endpoint, `/search/issues`, because
 * there is no REST route that lists either across every repository. `type:pr`
 * or `type:issue` is what separates them.
 */
export async function searchIssues({ qualifiers, sort, order, page, limit }: SearchIssuesArgs) {
  const q = [`author:${GITHUB_USERNAME}`, ...qualifiers].join(' ');
  const direction = order === 'asc' ? 'asc' : 'desc';

  const params = new URLSearchParams({
    q,
    order: direction,
    per_page: String(limit),
    page: String(page)
  });
  // Omitting `sort` is what asks for relevance ranking, so only set it when the
  // caller named a field GitHub actually accepts.
  if (sort && SEARCH_SORTS.has(sort)) params.set('sort', sort);

  const response = await fetch(`https://api.github.com/search/issues?${params}`, {
    headers: githubHeaders(),
    next: { revalidate: 0 }
  });

  return response;
}
