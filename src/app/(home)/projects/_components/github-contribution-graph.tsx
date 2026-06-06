'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from 'lib/utils';
import { fadeVariants, headingVariants, safeVariants } from '@/components/motion';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((m) => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-700" />
    )
  }
);

export function GitHubContributionGraph({ className }: { className?: string }) {
  const isReduced = useReducedMotion();

  return (
    <motion.section
      className={cn(
        'w-full overflow-auto rounded-xl bg-neutral-300/80 p-2 dark:bg-neutral-800/80',
        className
      )}
      variants={safeVariants(fadeVariants, isReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <nav className="flex items-center justify-between px-2">
        <motion.h2
          className="bg-linear-to-l from-secondary to-primary bg-clip-text font-semibold tracking-tight text-transparent uppercase dark:to-primary"
          variants={safeVariants(headingVariants, isReduced)}
        >
          GitHub Contributions
        </motion.h2>
      </nav>

      <div className="relative mt-2 rounded-xl bg-neutral-200 p-1 dark:bg-neutral-900">
        <GitHubCalendar
          username="braswelljr"
          theme={{
            light: ['#fff3ec', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b'],
            dark: ['#fff3ec6c', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b']
          }}
        />
      </div>
    </motion.section>
  );
}
