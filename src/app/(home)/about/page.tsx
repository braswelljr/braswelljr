'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { differenceInDays, format, isToday } from 'date-fns';
import { gsap } from 'gsap';
import { motion, useReducedMotion } from 'motion/react';
import { MdOutlineFileDownload } from 'react-icons/md';
import { cn } from 'lib/utils';
import {
  cardVariants,
  containerVariants,
  EASE_OUT,
  headingVariants,
  MotionButton,
  MotionLink,
  safeVariants,
  tapScale
} from '@/components/motion';
import { InView } from '@/components/ui/in-view';
import { career, education } from '@/config/data';

gsap.registerPlugin(useGSAP);

const isCurrentDate = (date: Date) => {
  if (!date || !(date instanceof Date)) return true;
  return isToday(date) || differenceInDays(date, new Date()) >= -1;
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // GSAP entrance for bio + resume button
  useGSAP(
    () => {
      if (isReduced) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        bioRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' }
      ).fromTo(
        resumeRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, clearProps: 'all' },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  const safeContainer = safeVariants(containerVariants, isReduced);
  const safeCard = safeVariants(cardVariants, isReduced);
  const safeHeading = safeVariants(headingVariants, isReduced);

  return (
    <div
      ref={containerRef}
      className="py-12 max-lg:pt-36"
    >
      <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
        {/* Bio */}
        <div
          ref={bioRef}
          className="md:leading-relaxed"
        >
          Hey, I am <span className="text-primary! uppercase">Braswell Kenneth Azu Junior</span>, a
          Software Engineer with experience in building scalable, user-centric web and mobile
          applications. Adept at collaborating with cross-functional teams to design intuitive user
          interfaces, architect efficient APIs, and implement cloud-native solutions. Passionate
          about frontend animation, developer experience, and creating seamless digital products.
        </div>

        {/* Resume download */}
        <div
          ref={resumeRef}
          className="mt-10"
        >
          <MotionLink
            href="/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf"
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 pr-4',
              'bg-primary',
              'text-sm font-bold text-white capitalize dark:text-neutral-950'
            )}
            download
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, transition: { duration: 0.15, ease: EASE_OUT } }}
            {...tapScale}
          >
            <MdOutlineFileDownload className="size-4" /> Download Resume
          </MotionLink>
        </div>

        {/* Career */}
        <div className="mt-10">
          <InView
            variants={safeHeading}
            transition={{ duration: 0.35 }}
            viewOptions={{ once: true, margin: '-50px' }}
            as="h2"
            className="text-2xl font-bold uppercase"
          >
            Career
          </InView>

          <div className="relative ml-6 pt-5 sm:ml-8.25 md:ml-14.25 lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
            <div
              className={cn(
                'absolute top-3 right-full bottom-0 w-px bg-primary',
                'mr-7 ml-6 md:mr-13'
              )}
            />
            <motion.div
              className="space-y-16"
              variants={safeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {career.map((job, index) => (
                <motion.article
                  key={`career-list-key-${index}`}
                  variants={safeCard}
                  className="group relative"
                >
                  <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                  <svg
                    viewBox="0 0 9 9"
                    className={cn(
                      'absolute top-2 right-full size-2.25 overflow-visible text-primary',
                      'mr-6 ml-5 md:mr-12'
                    )}
                  >
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      stroke="currentColor"
                      className="fill-white dark:fill-neutral-900"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="relative">
                    <h3 className="pt-8 text-xl font-semibold tracking-tight text-neutral-950 lg:pt-0 dark:text-neutral-200">
                      {job.role} —{' '}
                      <span className="text-base font-normal text-primary-600">({job.type})</span>
                    </h3>
                    <div className="mt-2 mb-4 font-medium text-neutral-900 dark:text-neutral-400">
                      <MotionLink
                        href={job.companyLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-cascadia text-lg font-bold transition-colors hocus:text-primary"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15, ease: EASE_OUT }}
                      >
                        {job.company}
                      </MotionLink>
                    </div>
                    {job.description?.length > 0 && (
                      <ul className="list-item pb-2 text-neutral-600 dark:text-neutral-300">
                        {job.description.map((desc, i) => (
                          <li
                            key={i}
                            className="ml-4 list-disc"
                          >
                            {desc}
                          </li>
                        ))}
                      </ul>
                    )}
                    <dl className="absolute top-0 left-0 lg:right-full lg:left-auto lg:mr-26.25">
                      <dt className="sr-only">Date</dt>
                      <dd className={cn('leading-6 font-bold whitespace-nowrap text-primary')}>
                        <time>
                          {format(job.date?.from, 'MMM yyyy')} —{' '}
                          {job.date?.to && !isCurrentDate(job.date.to)
                            ? format(job.date.to, 'MMM yyyy')
                            : 'Current'}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-10">
          <InView
            variants={safeHeading}
            transition={{ duration: 0.35 }}
            viewOptions={{ once: true, margin: '-50px' }}
            as="h2"
            className="text-2xl font-bold uppercase"
          >
            Education
          </InView>

          <div className="relative ml-6 pt-5 sm:ml-8.25 md:ml-14.25 lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
            <div
              className={cn(
                'absolute top-3 right-full bottom-0 w-px bg-primary',
                'mr-7 ml-6 md:mr-13'
              )}
            />
            <motion.div
              className="space-y-16"
              variants={safeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {education.map((institute, index) => (
                <motion.article
                  key={`education-list-key-${index}`}
                  variants={safeCard}
                  className="group relative"
                >
                  <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                  <svg
                    viewBox="0 0 9 9"
                    className={cn(
                      'absolute top-2 right-full size-2.25 overflow-visible text-primary',
                      'mr-6 ml-5 md:mr-12'
                    )}
                  >
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      stroke="currentColor"
                      className="fill-white dark:fill-neutral-900"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="relative">
                    <h3 className="pt-8 text-xl font-semibold tracking-tight text-neutral-950 lg:pt-0 dark:text-neutral-200">
                      {institute.name}
                    </h3>
                    <div className="mt-2 mb-4 font-medium text-neutral-900 dark:text-neutral-400">
                      <span className="font-cascadia text-lg font-bold">{institute.degree}</span>
                    </div>
                    {institute.description?.length > 0 && (
                      <ul className="list-item pb-2 text-neutral-600 dark:text-neutral-400">
                        {institute.description.map((desc, i) => (
                          <li
                            key={i}
                            className="ml-4 list-disc"
                          >
                            {desc}
                          </li>
                        ))}
                      </ul>
                    )}
                    <dl className="absolute top-0 left-0 lg:right-full lg:left-auto lg:mr-26.25">
                      <dt className="sr-only">Date</dt>
                      <dd className={cn('leading-6 font-bold whitespace-nowrap text-primary')}>
                        <time>
                          {format(institute.date?.from, 'MMM yyyy')} —{' '}
                          {institute.date?.to && !isCurrentDate(institute.date.to)
                            ? format(institute.date.to, 'MMM yyyy')
                            : 'Current'}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
