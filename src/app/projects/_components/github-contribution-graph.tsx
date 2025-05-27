'use client';

import { MdRefresh } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { cn } from 'lib/utils';
import ActivityCalendar from 'rsc-activity-calendar';
import { GitHubProperties } from 'types/types';
import Skeleton from '~/components/ui/skeleton';

export function GitHubContributionGraph({ className }: { className?: string }) {
  const { data, refetch, isFetching } = useQuery<{
    message: string;
    data: GitHubProperties;
  }>({
    queryKey: ['token'],
    queryFn: () => fetch('/api/github/contributions', { method: 'GET' }).then(res => res.json()),
    retry: true
  });

  return (
    <section className={cn('w-full max-w-md rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80', className)}>
      <nav className="flex items-center justify-between px-2">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text font-semibold tracking-tight text-transparent uppercase dark:to-[#ff7056]">
          GitHub Contributions
        </h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
          onClick={() => refetch()}
        >
          <MdRefresh className={cn('size-5', isFetching && 'animate-spin')} />
        </button>
      </nav>

      <div className="mt-2 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-900">
        {data?.data && data.data?.data ? (
          <ActivityCalendar
            hideColorLegend
            // hideTotalCount
            // hideMonthLabels
            data={data?.data?.data}
            theme={{
              light: ['#fafafa', '#e5e5e5', '#a3a3a3', '#525252', '#262626'],
              dark: ['#404040', '#e5e5e5', '#a3a3a3', '#525252', '#262626']
            }}
          />
        ) : (
          <Skeleton className="h-60 w-full rounded-xl bg-neutral-400/80 dark:bg-neutral-900/80" />
        )}
      </div>
    </section>
  );
}
