'use client';

import { motion, useReducedMotion } from 'motion/react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  headingVariants,
  interactiveCard,
  MotionAvatar,
  MotionAvatarFallback,
  MotionAvatarImage,
  MotionFrame,
  MotionFrameFooter,
  MotionFramePanel,
  MotionFrameTitle,
  MotionLink,
  safeVariants,
  tapScale
} from '@/components/motion';
import { InView } from '@/components/ui/in-view';
import { OTHER_PROJECTS } from '@/config/data';

type OtherProjectProps = {
  className?: string;
};

export function OtherProjects({ className }: OtherProjectProps) {
  const isReduced = useReducedMotion();

  return (
    <div className={cn('space-y-6', className)}>
      <InView
        variants={safeVariants(headingVariants, isReduced)}
        viewOptions={{ once: false, margin: '-40px' }}
        className="flex items-end justify-between"
      >
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
          Other Projects
        </h2>
        <span className="text-lg">({OTHER_PROJECTS.length})</span>
      </InView>

      <motion.div
        className="grid grid-cols-[repeat(auto-fill,minmax(min(375px,100%),1fr))] gap-4"
        variants={safeVariants(containerVariants, isReduced)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-60px' }}
      >
        {OTHER_PROJECTS.map((project, i) => (
          <MotionFrame
            key={i}
            variants={safeVariants(cardVariants, isReduced)}
            {...(isReduced ? {} : interactiveCard)}
            className="justify-between gap-0 p-1"
          >
            <MotionFramePanel className="p-0">
              <MotionAvatar className="aspect-video h-60 w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
                <MotionAvatarImage
                  src={`/api/screenshot?url=${project.homepageUrl}`}
                  alt={project.name}
                  className="aspect-video size-full object-cover object-top"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
                <MotionAvatarFallback
                  className="aspect-video size-full animate-pulse rounded-none p-5 text-center text-sm"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {project.name}
                </MotionAvatarFallback>
              </MotionAvatar>
            </MotionFramePanel>

            <MotionFrameFooter className="flex flex-1 flex-col gap-2">
              <MotionFrameTitle className="bg-linear-to-l from-secondary to-primary bg-clip-text text-sm text-transparent uppercase dark:to-primary">
                {project.name}
              </MotionFrameTitle>
              <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
              <MotionLink
                href={project.homepageUrl ? project.homepageUrl : project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-neutral-900 px-2 py-1 text-xs text-neutral-100 uppercase focus:outline-none dark:bg-neutral-700/60 dark:text-white"
                {...tapScale}
                whileHover={{ gap: '10px', transition: { duration: 0.15 } }}
              >
                <HiOutlineExternalLink className="size-4" />
                <span>Visit</span>
              </MotionLink>
            </MotionFrameFooter>
          </MotionFrame>
        ))}
      </motion.div>
    </div>
  );
}
