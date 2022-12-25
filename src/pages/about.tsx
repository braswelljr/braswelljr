import React from 'react'

export default function About() {
  return (
    <div className="pt-16 max-lg:pt-28">
      <div className="mx-auto max-w-xl px-4 text-gray-800 child:space-y-6 dark:text-neutral-100 sm:mt-14 sm:child:space-y-10">
        {/* About */}
        <div className="">
          <p className="">
            Hey, I am{' '}
            <span className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text px-3 uppercase text-transparent dark:to-[#ff7056]">
              Braswell Kenneth Azu Junior
            </span>
            . I started as a Software Engineer back in 2018 working on freelance
            projects and open-source projects.
          </p>
          <p>
            I am currently working as a Software Engineer at{' '}
            <a
              href="https://solartaxi.co"
              target="_blank"
              className="group/solar-link relative pb-1"
            >
              <span className="relative bg-gradient-to-l from-[#ff8d22]  to-[#ff2600] bg-clip-text text-transparent dark:to-[#ff7056]">
                Solar Taxi
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[0.2rem] w-0 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] transition-width group-hover/solar-link:w-full dark:to-[#ff7056]" />
            </a>
            . I have had multiple experences with firms and individuals with
            which I would say would say benefited me and my experence. I
            completed{' '}
            <a
              href="https://umat.edu.gh"
              target="_blank"
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
        <div className="">
          {/* buttons */}
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}
