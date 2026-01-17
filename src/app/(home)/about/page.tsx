import Link from 'next/link';
import { differenceInDays, format, isToday } from 'date-fns';
import { MdOutlineFileDownload } from 'react-icons/md';
import { cn } from 'lib/utils';
import { career, education } from '~/config/data';

const isCurrentDate = (date: Date) => {
  if (!date || !(date instanceof Date)) return true;
  // Check if date is today or within 1 day of today (to account for timezone differences)
  return isToday(date) || differenceInDays(date, new Date()) >= -1;
};

export default function About() {
  return (
    <div className="py-12 max-lg:pt-36">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
        <div className="md:leading-relaxed">
          Hey, I am <span className="text-primary! uppercase">Braswell Kenneth Azu Junior</span>, a Software Engineer with experience in building
          scalable, user-centric web and mobile applications. Adept at collaborating with cross-functional teams to design intuitive user interfaces,
          architect efficient APIs, and implement cloud-native solutions. Passionate about frontend animation, developer experience, and creating
          seamless digital products.
        </div>

        <div className="mt-10">
          <Link
            href="/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf"
            className={cn(
              'inline-flex items-center justify-center space-x-2 rounded-sm px-3 py-1.5 pr-4',
              'bg-primary',
              'text-sm font-bold text-white capitalize dark:text-neutral-950',
              'hocus:translate-y-0.5 transition-transform'
            )}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlineFileDownload className="size-4" /> Download Resume
          </Link>
        </div>
        {/* Career */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold uppercase">Career</h2>
          <div className="relative ml-4 pt-5 sm:ml-8.25 md:ml-14.25 lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
            <div className={cn('bg-primary! absolute top-3 right-full bottom-0 w-px', 'mr-7 ml-5 md:mr-13')} />
            <div className="space-y-16">
              {career.map((job, index) => (
                <article
                  key={`career-list-key-${index}`}
                  className="group relative"
                >
                  <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                  <svg
                    viewBox="0 0 9 9"
                    className={cn('text-primary! absolute top-2 right-full size-2.25 overflow-visible', 'mr-6 ml-5 md:mr-12')}
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
                      {job.role} - <span className="text-primary-400 dark:text-secondary-400">({job.type})</span>
                    </h3>
                    <div className="mt-2 mb-4 font-medium text-neutral-900 dark:text-neutral-400">
                      <span className="font-cascadia text-lg font-bold">{job.company}</span>
                    </div>
                    {job.description?.length > 0 && (
                      <ul className="list-item pb-2 text-neutral-600 dark:text-neutral-400">
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
                      <dd className={cn('text-primary leading-6 font-bold whitespace-nowrap')}>
                        <time dateTime="">
                          {format(job.date?.from, 'MMM yyyy')} -{' '}
                          {job.date?.to && !isCurrentDate(job.date.to) ? format(job.date.to, 'MMM yyyy') : 'Current'}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold uppercase">Education</h2>
          <div className="relative ml-4 pt-5 sm:ml-8.25 md:ml-14.25 lg:ml-[max(calc(15.5rem+1px),calc(100%-48rem))]">
            <div className={cn('bg-primary! absolute top-3 right-full bottom-0 w-px', 'mr-7 ml-5 md:mr-13')} />
            <div className="space-y-16">
              {education.map((institute, index) => (
                <article
                  key={`eductation-list-key-${index}`}
                  className="group relative"
                >
                  <div className="absolute -inset-x-4 -inset-y-2.5 md:-inset-x-6 md:-inset-y-4" />
                  <svg
                    viewBox="0 0 9 9"
                    className={cn('text-primary! absolute top-2 right-full size-2.25 overflow-visible', 'mr-6 ml-5 md:mr-12')}
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
                    <h3 className="pt-8 text-xl font-semibold tracking-tight text-neutral-950 lg:pt-0 dark:text-neutral-200">{institute.name}</h3>
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
                      <dd className={cn('text-primary leading-6 font-bold whitespace-nowrap')}>
                        <time dateTime="">
                          {format(institute.date?.from, 'MMM yyyy')} -{' '}
                          {institute.date?.to && !isCurrentDate(institute.date.to) ? format(institute.date.to, 'MMM yyyy') : 'Current'}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
