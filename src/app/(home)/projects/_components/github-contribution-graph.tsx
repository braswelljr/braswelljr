'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'motion/react';
import { cn } from 'lib/utils';
import {
  fadeVariants,
  headingVariants,
  MotionFrame,
  MotionFramePanel,
  MotionFrameTitle,
  safeVariants
} from '@/components/motion';

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
    <MotionFrame
      className={cn('gap-0 p-1', className)}
      variants={safeVariants(fadeVariants, isReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
    >
      <MotionFramePanel className="p-3">
        <nav className="mb-3 flex items-center justify-between">
          <MotionFrameTitle
            className="bg-linear-to-l from-secondary to-primary bg-clip-text text-sm font-semibold tracking-tight text-transparent uppercase dark:to-primary"
            variants={safeVariants(headingVariants, isReduced)}
          >
            GitHub Contributions
          </MotionFrameTitle>
        </nav>

        <div className="overflow-auto rounded-lg">
          <GitHubCalendar
            username="braswelljr"
            theme={{
              light: ['#fff3ec', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b'],
              dark: ['#fff3ec6c', '#ffc6a5', '#ff420a', '#cc1602', '#a1130b']
            }}
          />
        </div>
      </MotionFramePanel>
    </MotionFrame>
  );
}
