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
  MotionCard,
  MotionCardContent,
  MotionCardDescription,
  MotionCardFooter,
  MotionCardHeader,
  MotionCardTitle,
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
        viewOptions={{ once: true, margin: '-40px' }}
        className="flex items-end justify-between"
      >
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
          Other Projects
        </h2>
        <span className="text-lg">({OTHER_PROJECTS.length})</span>
      </InView>

      <motion.div
        className="grid gap-6 sm:grid-cols-2"
        variants={safeVariants(containerVariants, isReduced)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {OTHER_PROJECTS.map((project, i) => (
          <MotionCard
            key={i}
            variants={safeVariants(cardVariants, isReduced)}
            {...(isReduced ? {} : interactiveCard)}
            className="justify-between gap-2 border border-neutral-700/30 p-0 py-2 backdrop-blur dark:bg-neutral-900/50"
          >
            <MotionCardHeader className="px-2">
              <MotionAvatar className="aspect-video h-full max-h-54 w-full rounded bg-neutral-200 dark:bg-neutral-900">
                <MotionAvatarImage
                  src={`/api/screenshot?url=${project.homepageUrl}`}
                  alt={project.name}
                  className="aspect-video size-full object-cover object-top"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
                <MotionAvatarFallback
                  className="aspect-video size-full animate-pulse rounded-none p-5 text-center"
                  style={{ animationDelay: `${i}s` }}
                >
                  {project.name}
                </MotionAvatarFallback>
              </MotionAvatar>
            </MotionCardHeader>

            <div className="flex min-h-24 flex-1 flex-col justify-between gap-4">
              <MotionCardContent className="px-2">
                <MotionCardTitle className="flex items-center space-x-2 bg-linear-to-l from-secondary to-primary bg-clip-text text-sm text-transparent uppercase dark:to-primary">
                  {project.name}
                </MotionCardTitle>
                <MotionCardDescription className="line-clamp-2">
                  {project.description}
                </MotionCardDescription>
              </MotionCardContent>

              <MotionCardFooter className="px-2">
                <MotionLink
                  href={project.homepageUrl ? project.homepageUrl : project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs text-neutral-100 uppercase backdrop:backdrop-blur focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                  {...tapScale}
                  whileHover={{ gap: '10px', transition: { duration: 0.15 } }}
                >
                  <HiOutlineExternalLink className="size-5" />
                  <span>Visit</span>
                </MotionLink>
              </MotionCardFooter>
            </div>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}

