import Link from 'next/link';
import { format } from 'date-fns';
import { MdOutlineFileDownload } from 'react-icons/md';
import { cn } from 'lib/utils';
import { Item, ItemContent, ItemTitle } from '~/components/ui/item';
import { career, education } from '~/config/data';

export default function About() {
  return (
    <div className="py-10 max-lg:pt-28">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
        {/* About */}
        <div className="md:leading-relaxed">
          Hey, I am <span className="text-primary dark:text-secondary uppercase">Braswell Kenneth Azu Junior</span>, a Software Engineer with
          experience in building scalable, user-centric web and mobile applications. Adept at collaborating with cross-functional teams to design
          intuitive user interfaces, architect efficient APIs, and implement cloud-native solutions. Passionate about frontend animation, developer
          experience, and creating seamless digital products.
        </div>

        <div className="mt-10">
          <Link
            href="/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf"
            className={cn(
              'inline-flex items-center justify-center space-x-2 rounded-sm px-3 py-1.5 pr-4',
              'bg-primary dark:bg-secondary',
              'text-sm font-bold text-white capitalize dark:text-neutral-950',
              'hocus:translate-y-0.5 transition-transform'
            )}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlineFileDownload className="size-4" /> Downlaod Resume
          </Link>
        </div>
        {/* Career */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold uppercase">Career</h2>
          <div className="space-y-3">
            {career.map((job, index) => (
              <Item
                key={`career-list-key-${index}`}
                // size="sm"
                className={cn(
                  'flex-col items-start justify-start backdrop-blur',
                  'bg-[radial-gradient(circle_at_top_left,var(--color-primary)_0%,var(--color-neutral-100)_3%)]',
                  'dark:bg-[radial-gradient(circle_at_top_left,var(--color-secondary)_0%,var(--color-neutral-900)_3%)]',
                  'border-primary-300/40 dark:border-secondary-300/10'
                )}
              >
                <ItemTitle className="font-cascadia inline-flex text-xl">
                  <span>
                    {job.role} - <span>({job.type})</span>
                  </span>
                </ItemTitle>
                <ItemContent className="pl-2">
                  <h2 className="text-primary dark:text-secondary space-x-2 text-base">
                    <span className="font-cascadia text-lg font-bold">{job.company}</span>
                    <span className="">|</span>
                    <span className="text-primary-400 dark:text-secondary-400">
                      {format(job.date?.from, 'MMM yyyy')} -{' '}
                      {job.date?.to && job.date?.to instanceof Date ? format(job.date?.to, 'MMM yyyy') : 'Current'}
                    </span>
                  </h2>
                  {job.description?.length > 0 && (
                    <ul className="list-item pb-2 text-neutral-600 dark:text-neutral-400">
                      {job.description.map((desc, index) => (
                        <li
                          key={index}
                          className="ml-4 list-disc"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold uppercase">Education</h2>
          <div className="space-y-2">
            {education.map((institute, index) => (
              <Item
                key={`eductation-list-key-${index}`}
                // size="sm"
                className={cn(
                  'flex-col items-start justify-start backdrop-blur',
                  'bg-[radial-gradient(circle_at_top_left,var(--color-primary)_0%,var(--color-neutral-100)_3%)]',
                  'dark:bg-[radial-gradient(circle_at_top_left,var(--color-secondary)_0%,var(--color-neutral-900)_3%)]',
                  'border-primary-300/40 dark:border-secondary-300/10'
                )}
              >
                <ItemTitle className="font-cascadia inline-flex text-xl">
                  <span>{institute.name}</span>
                </ItemTitle>
                <ItemContent className="pl-2">
                  <h2 className="text-primary dark:text-secondary space-x-2 text-base">
                    <span className="font-cascadia text-lg font-bold">{institute.degree}</span>
                    <span className="">|</span>
                    <span className="text-neutral-800 dark:text-neutral-400">
                      {format(institute.date?.from, 'MMM yyyy')} -{' '}
                      {institute.date?.to && institute.date?.to instanceof Date ? format(institute.date?.to, 'MMM yyyy') : 'Current'}
                    </span>
                  </h2>
                  {institute.description?.length > 0 && (
                    <ul className="list-item pb-2 text-neutral-600 dark:text-neutral-400">
                      {institute.description.map((desc, index) => (
                        <li
                          key={index}
                          className="ml-4 list-disc"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
