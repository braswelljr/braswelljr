import { NextResponse } from 'next/server';
import { getGithubToken, GITHUB_USERNAME, githubHeaders } from '@/config/github';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

/**
 * Every public, non-fork repository with its language breakdown.
 *
 * GraphQL rather than REST because REST needs one `languages_url` request per
 * repository: sixty round trips for what is one query here. Forks are excluded
 * so somebody else's codebase does not count as work done.
 */
const LANGUAGES_QUERY = `{
  user(login: "${GITHUB_USERNAME}") {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      nodes {
        name
        languages(first: 12, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
      }
    }
  }
}`;

type Repos = {
  nodes: {
    name: string;
    languages: { edges: { size: number; node: { name: string; color: string | null } }[] };
  }[];
};

export async function GET(): Promise<Response> {
  if (!getGithubToken()) {
    return NextResponse.json(
      { message: 'GITHUB_TOKEN is not configured', data: [] },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...githubHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: LANGUAGES_QUERY }),
      next: { revalidate: 0 }
    });

    const body = (await response.json()) as {
      data?: { user?: { repositories?: Repos } };
      errors?: { message: string }[];
    };

    // GraphQL reports failures in a 200 body, so the status alone is not enough.
    if (!response.ok || body.errors?.length) {
      return NextResponse.json(
        { message: body.errors?.[0]?.message ?? `GitHub responded ${response.status}`, data: [] },
        { status: response.ok ? 502 : response.status }
      );
    }

    const totals = new Map<
      string,
      { name: string; color: string | null; bytes: number; repos: number }
    >();

    for (const repo of body.data?.user?.repositories?.nodes ?? []) {
      for (const { size, node } of repo.languages.edges) {
        const entry = totals.get(node.name) ?? {
          name: node.name,
          color: node.color,
          bytes: 0,
          repos: 0
        };
        entry.bytes += size;
        entry.repos += 1;
        totals.set(node.name, entry);
      }
    }

    const languages = [...totals.values()].sort((a, b) => b.bytes - a.bytes);
    const bytes = languages.reduce((sum, l) => sum + l.bytes, 0);

    return NextResponse.json(
      {
        message: 'successfully retrieved language usage',
        // A share of the whole is what the chips actually display; computing it
        // here keeps the divisor (all languages, not just the ones shown) right.
        data: languages.map((l) => ({ ...l, share: bytes > 0 ? l.bytes / bytes : 0 }))
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
