'use client';

import { cn } from 'lib/utils';
import GitHubActivity from 'react-github-calendar';

export function GitHubContributionGraph({ className }: { className?: string }) {
  return (
    <section className={cn('w-full overflow-auto rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80', className)}>
      <nav className="flex items-center justify-between px-2">
        <h2 className="from-secondary to-primary bg-gradient-to-l bg-clip-text font-semibold uppercase tracking-tight text-transparent dark:to-[#ff7056]">
          GitHub Contributions
        </h2>
      </nav>

      <div className="relative mt-2 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-900">
        <GitHubActivity
          // data={events}
          username="braswelljr"
          theme={{
            light: ['#fff3ec', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b'],
            dark: ['#fff3ec6c', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b']
          }}
        />
      </div>
    </section>
  );
}
