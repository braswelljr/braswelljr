'use client';

import { ComponentProps, Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { differenceInDays, format, isToday } from 'date-fns';
import { gsap } from 'gsap';
import { motion, useReducedMotion } from 'motion/react';
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineDocumentText } from 'react-icons/hi';
import { MdOutlineFileDownload } from 'react-icons/md';
import {
  cardVariants,
  containerVariants,
  headingVariants,
  MotionLink,
  safeVariants,
  useRevealOnce
} from '@/components/shared/motion';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger
} from '@/components/ui/attachment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bubble, BubbleContent, BubbleGroup } from '@/components/ui/bubble';
import { InView } from '@/components/ui/in-view';
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader
} from '@/components/ui/message';
import { career, education } from '@/config/data';

gsap.registerPlugin(useGSAP);

/** The downloadable resume. Re-export the source document over this path when
 *  the career data changes, or the page and the file disagree. */
const RESUME_PATH = '/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf';
const RESUME_UPDATED = 'Feb 2026';

/** Mine, and the ones the other side of the thread borrows from. Five square
 *  images ship in /public/images; the list cycles for anything past the fifth. */
const ME_AVATAR = '/images/01.png';
const OTHER_AVATARS = ['/images/02.png', '/images/03.png', '/images/04.png', '/images/49.png'];

const isCurrentDate = (date?: Date) => {
  if (!date || !(date instanceof Date)) return true;
  return isToday(date) || differenceInDays(date, new Date()) >= -1;
};

/** "Nov 2025 - Current", the separator between one message and the next. */
function rangeLabel(date: { from: Date; to?: Date }) {
  const from = format(date.from, 'MMM yyyy');
  const to = date.to && !isCurrentDate(date.to) ? format(date.to, 'MMM yyyy') : 'Current';
  return `${from} - ${to}`;
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(
    () => {
      if (isReduced) return;
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="py-12 max-lg:pt-36"
    >
      <div className="mx-auto w-full max-w-4xl space-y-12 px-4 text-gray-800 sm:mt-14 dark:text-neutral-100">
        <Intro ref={bioRef} />

        <ThreadSection
          id="career"
          title="Career"
          icon={<HiOutlineBriefcase />}
          entries={career.map((job) => ({
            key: `${job.company}-${job.role}`,
            date: job.date,
            header: job.role,
            subject: job.company,
            subjectLink: job.companyLink,
            meta: job.type,
            lines: job.description
          }))}
        />

        <ThreadSection
          id="education"
          title="Education"
          icon={<HiOutlineAcademicCap />}
          entries={education.map((school) => ({
            key: school.name,
            date: school.date,
            header: school.name,
            subject: school.school,
            meta: school.degree,
            lines: school.description
          }))}
        />
      </div>
    </div>
  );
}

/**
 * The summary, as an exchange rather than a paragraph.
 *
 * Questions come from the left, answers from the right, so the three claims the
 * résumé summary makes land one at a time instead of dissolving into a block
 * nobody finishes. The resume rides along as an attachment on the last answer,
 * which is where a file belongs in a conversation.
 */
function Intro({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  const exchange = [
    {
      ask: 'Who am I ?',
      answer: (
        <>
          Hey, I am{' '}
          <span className="font-semibold text-primary uppercase">Braswell Kenneth Azu Junior</span>,
          a Software Engineer building scalable, user-centric web and mobile applications.
        </>
      )
    },
    {
      ask: 'What do I do?',
      answer:
        'I work with cross-functional teams to design intuitive interfaces, architect efficient APIs, and ship cloud-native solutions.'
    },
    {
      ask: 'What part do I enjoy the most?',
      answer:
        'Frontend animation, developer experience and seamless digital products are the parts I care most about.'
    }
  ];

  return (
    <div ref={ref}>
      <MessageGroup className="gap-6">
        {exchange.map(({ ask, answer }, i) => (
          <Fragment key={ask}>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarImage
                    src={OTHER_AVATARS[i % OTHER_AVATARS.length]}
                    alt=""
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>{ask}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarImage
                    src={ME_AVATAR}
                    alt="Braswell Kenneth Azu Junior"
                  />
                  <AvatarFallback>BK</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>{answer}</BubbleContent>
                </Bubble>
                {i === exchange.length - 1 && <MessageFooter>Delivered</MessageFooter>}
              </MessageContent>
            </Message>
          </Fragment>
        ))}

        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src={ME_AVATAR}
                alt="Braswell Kenneth Azu Junior"
              />
              <AvatarFallback>BK</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>Here is the long version, if you want it.</BubbleContent>
            </Bubble>
            <Attachment className="w-full max-w-xs">
              <AttachmentTrigger
                render={
                  <a
                    href={RESUME_PATH}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Download resume as PDF</span>
                  </a>
                }
              />
              <AttachmentMedia className="bg-primary/10 text-primary">
                <HiOutlineDocumentText />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Resume</AttachmentTitle>
                <AttachmentDescription>PDF, updated {RESUME_UPDATED}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  aria-hidden
                  tabIndex={-1}
                  className="text-primary"
                >
                  <MdOutlineFileDownload />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  );
}

type ThreadEntry = {
  key: string;
  date: { from: Date; to?: Date };
  /** The headline: a role, or a qualification. */
  header: string;
  /** Who it was with: an employer, or a school. */
  subject: string;
  subjectLink?: string;
  /** The one-line qualifier under the bubbles: employment type, or degree. */
  meta: string;
  lines: string[];
};

/**
 * A run of history read as a thread.
 *
 * Each entry is one message: the date is the separator above it, the role and
 * employer are its header, every achievement is its own bubble, and the
 * employment type is the footer. A still-current entry gets a live marker.
 */
function ThreadSection({
  id,
  title,
  icon,
  entries,
  ...props
}: Readonly<
  ComponentProps<'section'> & {
    id: string;
    title: string;
    icon: React.ReactNode;
    entries: ThreadEntry[];
  }
>) {
  const isReduced = useReducedMotion();
  // Sections are revealed on scroll, but children mounted afterwards must not
  // be stranded at `initial`, which is what `whileInView` alone would do.
  const reveal = useRevealOnce();

  return (
    <section
      aria-labelledby={`${id}-heading`}
      {...props}
    >
      <InView
        variants={safeVariants(headingVariants, isReduced)}
        transition={{ duration: 0.35 }}
        viewOptions={{ once: false, margin: '-50px' }}
        as="h2"
        id={`${id}-heading`}
        className="text-2xl leading-tight font-bold tracking-tight uppercase sm:text-3xl md:text-4xl"
      >
        {title}
      </InView>

      <motion.div
        className="mt-8 flex flex-col gap-8"
        variants={safeVariants(containerVariants, isReduced)}
        initial="hidden"
        {...reveal}
      >
        {entries.map((entry, index) => {
          const current = isCurrentDate(entry.date.to);

          return (
            <motion.div
              key={entry.key}
              className="space-y-3"
              variants={safeVariants(cardVariants, isReduced)}
            >
              <Marker variant="separator">
                <MarkerContent className="font-semibold text-primary">
                  {rangeLabel(entry.date)}
                </MarkerContent>
              </Marker>

              <Message>
                <MessageAvatar className="mt-1 self-start group-has-data-[slot=message-footer]/message:translate-y-0">
                  <Avatar>
                    <AvatarImage
                      src={OTHER_AVATARS[index % OTHER_AVATARS.length]}
                      alt=""
                    />
                    <AvatarFallback>{initials(entry.subject)}</AvatarFallback>
                  </Avatar>
                </MessageAvatar>

                <MessageContent>
                  <MessageHeader className="flex flex-wrap items-baseline gap-2">
                    <span className="text-base font-semibold text-neutral-950 dark:text-neutral-100">
                      {entry.header}
                    </span>
                    {entry.subjectLink ? (
                      <MotionLink
                        href={entry.subjectLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-cascadia text-base font-bold text-primary transition-colors"
                        whileHover={isReduced ? undefined : { x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        - {entry.subject}
                      </MotionLink>
                    ) : (
                      <span className="font-cascadia text-base font-bold text-primary">
                        - {entry.subject}
                      </span>
                    )}
                  </MessageHeader>

                  <BubbleGroup>
                    {entry.lines.map((line, i) => (
                      <Bubble
                        key={line}
                        variant={i % 2 === 0 ? 'info' : 'muted'}
                      >
                        <BubbleContent>{line}</BubbleContent>
                      </Bubble>
                    ))}
                  </BubbleGroup>

                  <MessageFooter>
                    <Marker className="gap-1.5">
                      <MarkerIcon>{icon}</MarkerIcon>
                      <MarkerContent>{entry.meta}</MarkerContent>
                    </Marker>
                  </MessageFooter>
                </MessageContent>
              </Message>

              {current && (
                <Marker
                  role="status"
                  className="pl-10"
                >
                  <MarkerContent className="shimmer font-medium">Still here</MarkerContent>
                </Marker>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
