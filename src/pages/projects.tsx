import { useState, useRef } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import useXStore from '@/context/store'
import bookIcon from '@/assets/icons/14-habits.json'

export default function Projects() {
  const { pinnedProjects } = useXStore()
  const [viewMore, setViewMore] = useState(false)
  // lottie animation ref
  const bookRef = useRef<LottieRefCurrentProps>(null)

  return (
    <div className="pt-10 pb-10 max-lg:pt-28">
      <div className="mx-auto max-w-2xl space-y-8 px-4 text-gray-800 dark:text-neutral-100 sm:mt-14 sm:space-y-10">
        <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
          Work, Hobby and Open Source
        </h1>
        {/* Write up */}
        <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
          <p className="">
            I'm obsessed with building things that are useful and fun to use. I
            am an{' '}
            <span className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text px-3 uppercase text-transparent dark:to-[#ff7056]">
              enthusiast
            </span>{' '}
            and I love to contribute to open source. I am also a hobbyist and I
            love to build things that are fun to use.
          </p>
          <p>
            {' '}
            I prefer to work with{' '}
            <span className="bg-gradient-to-l from-[#2273ff] to-[#00e5ff] bg-clip-text uppercase text-transparent">
              React
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#3b80ff] to-[#3b80ff] bg-clip-text uppercase text-transparent">
              Next.js
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#3b80ff] to-[#0d59ff] bg-clip-text uppercase text-transparent">
              Golang
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#236e00] to-[#00bf06] bg-clip-text uppercase text-transparent">
              Node.js
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#00b731] to-[#008f02] bg-clip-text uppercase text-transparent">
              MongoDB
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#f2ff00] to-[#ffc70d] bg-clip-text uppercase text-transparent">
              Firebase
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#00b731] to-[#008f02] bg-clip-text uppercase text-transparent">
              Supabase
            </span>
            ,{' '}
            <span className="bg-gradient-to-l from-[#3b80ff] to-[#0d59ff] bg-clip-text uppercase text-transparent">
              PostgreSQL
            </span>
            , and{' '}
            <span className="bg-gradient-to-l from-[#3b80ff] to-[#0d59ff] bg-clip-text uppercase text-transparent">
              GraphQL
            </span>
            .
          </p>
        </div>
        {/* Starred Projects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl">
            Starred Projects
          </h2>
          <div className="">
            {Array.isArray(pinnedProjects) &&
            Array(...pinnedProjects).length > 0 ? (
              <div className="">
                <div className="grid gap-6 sm:grid-cols-2">
                  {Array(...pinnedProjects).map((project, i, self) => {
                    // get a unique ref for all the items
                    const bookRefs = Array(self.length).fill(bookRef)

                    return (
                      <div
                        key={i}
                        className="divide-y divide-zinc-500/25 rounded bg-zinc-900/20 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5 child:px-2.5 child:py-2.5"
                        onMouseEnter={() => bookRefs[i].current?.play()}
                        onMouseLeave={() => bookRefs[i].current?.stop()}
                      >
                        <h2 className="flex items-center justify-between">
                          <span>{project.name}</span>
                          <Lottie
                            lottieRef={bookRefs[i]}
                            className="h-5 w-auto text-neutral-900"
                            animationData={bookIcon}
                            loop={false}
                            autoplay={false}
                          />
                        </h2>
                        <div className="min-h-[5rem] text-sm font-thin">
                          <p className="line-clamp-3">{project.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setViewMore(!viewMore)}
                    className="flex items-center justify-center space-x-3 rounded-sm bg-neutral-900 px-2 py-1.5 uppercase text-neutral-100 transition-transform backdrop:backdrop-blur hover:-translate-y-0.5 hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                  >
                    {viewMore ? 'View Less' : 'View More'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
