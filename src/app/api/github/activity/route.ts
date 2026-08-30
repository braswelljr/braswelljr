import { NextResponse } from 'next/server';
import { getGithubToken, GITHUB_USERNAME, githubHeaders } from '@/config/github';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

/**
 * The trailing year's contribution totals, split the way GitHub's own activity
 * overview splits them.
 *
 * Only GraphQL exposes this breakdown, so it runs here rather than in the
 * browser: `contributionsCollection` requires a token even for public data.
 */
const ACTIVITY_QUERY = `{
  user(login: "${GITHUB_USERNAME}") {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalPullRequestReviewContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar { totalContributions }
      commitContributionsByRepository(maxRepositories: 25) {
        repository { name nameWithOwner url }
        contributions { totalCount }
      }
    }
  }
}`;

type Collection = {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedCommits: number;
  contributionCalendar: { totalContributions: number };
  commitContributionsByRepository: {
    repository: { name: string; nameWithOwner: string; url: string };
    contributions: { totalCount: number };
  }[];
};

const EMPTY = {
  total: 0,
  commits: 0,
  pullRequests: 0,
  issues: 0,
  codeReviews: 0,
  repositoryCount: 0,
  repositories: []
};

export async function GET(): Promise<Response> {
  if (!getGithubToken()) {
    return NextResponse.json(
      { message: 'GITHUB_TOKEN is not configured', data: EMPTY },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...githubHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ACTIVITY_QUERY }),
      next: { revalidate: 0 }
    });

    const body = (await response.json()) as {
      data?: { user?: { contributionsCollection?: Collection } };
      errors?: { message: string }[];
    };

    // GraphQL reports failures in a 200 body, so the status alone is not enough.
    if (!response.ok || body.errors?.length) {
      return NextResponse.json(
        {
          message: body.errors?.[0]?.message ?? `GitHub responded ${response.status}`,
          data: EMPTY
        },
        { status: response.ok ? 502 : response.status }
      );
    }

    const c = body.data?.user?.contributionsCollection;
    if (!c) {
      return NextResponse.json(
        { message: 'No contributions returned', data: EMPTY },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message: 'successfully retrieved activity overview',
        data: {
          total: c.contributionCalendar.totalContributions,
          commits: c.totalCommitContributions,
          pullRequests: c.totalPullRequestContributions,
          issues: c.totalIssueContributions,
          codeReviews: c.totalPullRequestReviewContributions,
          repositoryCount: c.totalRepositoriesWithContributedCommits,
          repositories: c.commitContributionsByRepository
            .map((r) => ({
              name: r.repository.name,
              nameWithOwner: r.repository.nameWithOwner,
              url: r.repository.url,
              commits: r.contributions.totalCount
            }))
            .sort((a, b) => b.commits - a.commits)
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something happened', data: EMPTY },
      { status: 500 }
    );
  }
}
