'use client'

import { MdRefresh } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { cn } from 'lib/utils'
import ActivityCalendar from 'rsc-activity-calendar'
import { GitHubProperties } from 'types/types'
import Skeleton from '~/components/ui/skeleton'
import tailwind from '~/utils/tailwind'

export function GitHubContributionGraph({ className }: { className?: string }) {
  const { data, refetch, isFetching } = useQuery<{
    message: string
    data: GitHubProperties
  }>({
    queryKey: ['token'],
    queryFn: () => fetch('/api/github/contributions', { method: 'GET' }).then(res => res.json()),
    retry: true
  })

  return (
    <section className={cn('w-full max-w-md rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80', className)}>
      <nav className="flex items-center justify-between px-2">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text font-semibold uppercase tracking-tight text-transparent dark:to-[#ff7056]">
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
              light: [
                tailwind.theme.colors.neutral[50],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800]
              ],
              dark: [
                tailwind.theme.colors.neutral[700],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800]
              ]
            }}
          />
        ) : (
          <Skeleton className="h-60 w-full rounded-xl bg-neutral-400/80 dark:bg-neutral-900/80" />
        )}
      </div>
    </section>
  )
}
