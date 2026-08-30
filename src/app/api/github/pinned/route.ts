import { NextResponse } from 'next/server';
import { getGithubToken, GITHUB_USERNAME, githubHeaders } from '@/config/github';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const PINNED_QUERY = `{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          createdAt
          updatedAt
          pushedAt
          languages(first: 5) { nodes { name color } }
          primaryLanguage { name color }
          forks { totalCount }
          watchers { totalCount }
          stargazers { totalCount }
        }
      }
    }
  }
}`;

/**
 * The account's pinned repositories.
 *
 * Runs server-side because GitHub's GraphQL API requires a token even for
 * public data. The previous version issued this call from the browser with a
 * NEXT_PUBLIC_ token, which shipped the PAT to every visitor.
 */
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
      body: JSON.stringify({ query: PINNED_QUERY }),
      next: { revalidate: 0 }
    });

    const body = (await response.json()) as {
      data?: { user?: { pinnedItems?: { nodes?: unknown[] } } };
      errors?: { message: string }[];
    };

    // GraphQL reports failures in a 200 body, so the status alone is not enough.
    if (!response.ok || body.errors?.length) {
      return NextResponse.json(
        { message: body.errors?.[0]?.message ?? `GitHub responded ${response.status}`, data: [] },
        { status: response.ok ? 502 : response.status }
      );
    }

    return NextResponse.json(
      {
        message: 'successfully retrieved pinned repositories',
        data: body.data?.user?.pinnedItems?.nodes ?? []
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
