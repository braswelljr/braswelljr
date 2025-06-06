import { MdOutlineFileDownload } from 'react-icons/md';
import { career } from '~/config/data';

export default function About() {
  return (
    <div className="py-10 max-lg:pt-28">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 *:space-y-6 sm:mt-14 sm:*:space-y-10 dark:text-neutral-100">
        {/* About */}
        <div className="md:leading-relaxed">
          <p className="">
            Hey, I am{' '}
            <span className="from-secondary to-primary bg-gradient-to-l bg-clip-text px-3 text-transparent uppercase dark:to-[#ff7056]">
              Braswell Kenneth Azu Junior
            </span>
            . I started as a Software Engineer back in 2018 working on freelance projects and open-source projects.
          </p>
          <p>
            I have had multiple experiences with firms and individuals with which I would say benefited me and my
            experence. I completed{' '}
            <a
              href="https://umat.edu.gh"
              target="_blank"
              rel="noopener noreferrer"
              className="group/solar-link relative pb-1"
            >
              <span className="from-secondary to-primary relative bg-gradient-to-l bg-clip-text text-transparent dark:to-[#ff7056]">
                The University of Mines and Technology
              </span>
              <span className="transition-width from-secondary to-primary absolute inset-x-0 bottom-0 h-[0.2rem] w-0 bg-gradient-to-l group-hover/solar-link:w-full dark:to-[#ff7056]" />
            </a>{' '}
            in{' '}
            <span className="from-secondary to-primary bg-gradient-to-l bg-clip-text text-transparent dark:to-[#ff7056]">
              October 2022
            </span>
            .
          </p>
        </div>
        {/* Resume */}
        <div className="mt-10">
          {/* buttons */}
          <p>
            <a
              className="inline-flex items-center justify-center space-x-2 rounded-sm bg-neutral-900 px-3 py-1.5 text-neutral-100 capitalize transition-transform backdrop:backdrop-blur hover:translate-y-0.5 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
              download
              href="/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineFileDownload className="h-6 w-auto" />
              <span>
                Downlaod<span className="max-xxs:hidden"> Resume</span>
              </span>
            </a>
          </p>
        </div>
        {/* Career */}
        <div className="mt-10">
          <div className="">
            <h2 className="text-2xl font-bold uppercase">Career</h2>
            <div className="divide-y divide-neutral-500/50">
              {career.map((job, index) => (
                <div key={index} className="space-y-3 py-5">
                  <h1 className="font-cascadia text-xl">
                    {job.role} {job.type}
                  </h1>
                  <h2 className="space-x-4">
                    <span className="">{job.company}</span>
                    <span className=""> | </span>
                    <span className="text-neutral-800 dark:text-neutral-400">{job.date}</span>
                  </h2>
                  <ul className="list-item text-neutral-600 dark:text-neutral-400">
                    {job.description.map((desc, index) => (
                      <li key={index} className="ml-4 list-disc">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
