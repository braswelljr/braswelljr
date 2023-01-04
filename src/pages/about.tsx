import { useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import downloadIcon from '@/assets/icons/download.json'
import { career } from '@/components/data'
import Toast from '@/components/Toast'

export default function About() {
  const downloadResumeRef = useRef<LottieRefCurrentProps>(null)
  const [toast, setToast] = useState(false)

  return (
    <>
      <div className="pt-10 pb-10 max-lg:pt-28">
        <div className="mx-auto max-w-xl px-4 text-gray-800 child:space-y-6 dark:text-neutral-100 sm:mt-14 sm:child:space-y-10">
          {/* About */}
          <div className="md:leading-relaxed">
            <p className="">
              Hey, I am{' '}
              <span className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text px-3 uppercase text-transparent dark:to-[#ff7056]">
                Braswell Kenneth Azu Junior
              </span>
              . I started as a Software Engineer back in 2018 working on
              freelance projects and open-source projects.
            </p>
            <p>
              I am currently working as a Software Engineer at{' '}
              <a
                href="https://solartaxi.co"
                target="_blank"
                rel="noopener"
                className="group/solar-link relative pb-1"
              >
                <span className="relative bg-gradient-to-l from-[#ff8d22]  to-[#ff2600] bg-clip-text text-transparent dark:to-[#ff7056]">
                  Solar Taxi
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[0.2rem] w-0 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] transition-width group-hover/solar-link:w-full dark:to-[#ff7056]" />
              </a>
              . I have had multiple experiences with firms and individuals with
              which I would say benefited me and my experence. I completed{' '}
              <a
                href="https://umat.edu.gh"
                target="_blank"
                rel="noopener"
                className="group/solar-link relative pb-1"
              >
                <span className="relative bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-transparent dark:to-[#ff7056]">
                  The University of Mines and Technology
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[0.2rem] w-0 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] transition-width group-hover/solar-link:w-full dark:to-[#ff7056]" />
              </a>{' '}
              in{' '}
              <span className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-transparent dark:to-[#ff7056]">
                October 2022
              </span>
              .
            </p>
          </div>
          {/* Resume */}
          <div className="mt-10">
            {/* buttons */}
            <div className="">
              <button
                className="flex items-center justify-center space-x-3 rounded-sm bg-neutral-900 px-2 py-1.5 uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                onMouseEnter={() => downloadResumeRef.current?.play()}
                onMouseLeave={() => downloadResumeRef.current?.stop()}
                onClick={() => {
                  downloadResumeRef.current?.play() // play animation
                  window.open(
                    '/documents/braswell-kenneth-azu-junior-cv.pdf',
                    '_blank'
                  )
                  setToast(true) // for toast
                  downloadResumeRef.current?.stop() // stop animation
                }}
              >
                <Lottie
                  lottieRef={downloadResumeRef}
                  className="h-6 w-auto text-neutral-900"
                  animationData={downloadIcon}
                  loop={false}
                  autoplay={false}
                />
                <span>Downlaod Resume</span>
              </button>
            </div>
          </div>
          {/* Career */}
          <div className="mt-10">
            <div className="">
              <h2 className="text-2xl font-bold uppercase">Career</h2>
              <div className="divide-y divide-neutral-500/50">
                {career.map((job, index) => (
                  <div key={index} className="space-y-3 py-5">
                    <h1 className="">{job.role}</h1>
                    <h2 className="space-x-2">
                      <span className="">{job.company}</span>
                      <span className="">|</span>
                      <span className="text-slate-800 dark:text-slate-400">
                        {job.date}
                      </span>
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
      <Toast
        title="Resume Downloaded"
        description="Your resume has been downloaded successfully"
        type="success"
        showToast={toast}
        setShowToast={setToast}
      />
    </>
  )
}
