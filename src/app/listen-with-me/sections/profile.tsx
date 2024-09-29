'use client'

import { MdRefresh } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { cn } from 'lib/utils'

export function Profile({ className }: { className?: string }) {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetch(`/api/spotify/profile`, { method: 'GET', mode: 'cors' }).then(res => res.json()),
    retry: true
  })

  return (
    <section className={cn('', className)}>
      <nav className="flex items-center justify-between">
        <h2 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-semibold tracking-tight text-transparent dark:to-[#ff7056]">
          Profile
        </h2>
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded-full outline-none hover:outline-none focus:outline-none"
          onClick={() => query?.refetch()}
        >
          <MdRefresh className="size-5" />
        </button>
      </nav>
    </section>
  )
}

export function ProfileError() {
  return <div className=""></div>
}
export function ProfileData() {
  return <div className=""></div>
}
