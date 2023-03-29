'use client'

import { useState, useRef } from 'react'
import { BiGitRepoForked } from 'react-icons/bi'
import { BsFolder, BsStar } from 'react-icons/bs'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import useXStore from '~/context/store'
import loadingIcon from '~/assets/icons/loading.json'
import listIcon from '~/assets/icons/list-2.json'
import copyLinkIcon from '~/assets/icons/copy-link.json'
import isFalsy from '~/utils/isFalsy'
import { OTHER_PROJECTS } from '~/components/data'

export default function Projects() {
  const { pinnedProjects, allProjects } = useXStore()
  const [viewMorePins, setViewMorePins] = useState(false)
  const [viewMoreProjects, setViewMoreProjects] = useState(false)
  // lottie animations
  const loadingIconRef = useRef<LottieRefCurrentProps>(null)
  const listIconRef = useRef<LottieRefCurrentProps>(null)
  const listIcon2Ref = useRef<LottieRefCurrentProps>(null)
  const copyLinkIconRef = useRef<LottieRefCurrentProps>(null)
  // pins
  let limitPins = viewMorePins ? pinnedProjects.length : 2
  const PINNED_PROJECTS = Array.isArray(pinnedProjects) ? pinnedProjects.slice(0, limitPins) : []

  // projects
  let limitProjects = viewMoreProjects ? allProjects.length : 4
  // remove pinned projects from all projects
  const filteredProjects = allProjects.filter(
    project => !pinnedProjects.find(pinnedProject => pinnedProject.name === project.name)
  )
  const ALL_PROJECTS = Array.isArray(filteredProjects)
    ? filteredProjects.slice(0, limitProjects)
    : []

  return (
    <div className="pt-10 pb-10 max-lg:pt-28">
      <div className="mx-auto max-w-2xl space-y-8 px-4 text-gray-800 dark:text-neutral-100 sm:mt-14 sm:space-y-10">
        <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
          Work, Hobby and Open Source
        </h1>
        {/* Write up */}
        <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
          <p className="">
            I'm obsessed with building things that are useful and fun to use. I am an{' '}
            <span className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text px-3 uppercase text-transparent dark:to-[#ff7056]">
              enthusiast
            </span>{' '}
            and I love to contribute to open source. I am also a hobbyist and I love to build things
            that are fun to use.
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
          {/* header */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Starred Projects
            </h2>
            <span className="text-lg">({pinnedProjects.length})</span>
          </div>
          {/* projects */}
          <div className="">
            {PINNED_PROJECTS.length > 0 ? (
              <div className="">
                <div className="grid gap-6 sm:grid-cols-2">
                  {PINNED_PROJECTS.map((project, i) => {
                    return (
                      <div
                        key={i}
                        className="group origin-bottom-right rounded bg-zinc-900/20 shadow-sm backdrop-blur transition-transform hover:rotate-1"
                      >
                        {/* main */}
                        <div className="divide-y divide-zinc-500/25 child:px-2.5 child:py-2.5">
                          {/* header */}
                          <div className="flex items-start justify-between">
                            <h2 className="flex items-center space-x-2">
                              <BsFolder className="h-5 w-auto group-hover:animate-wiggle" />
                              <span>{project.name}</span>
                            </h2>
                            {/* stats */}
                            <div className="flex items-center justify-end space-x-3 child:flex child:items-center child:space-x-1">
                              {/* stars */}
                              <span>
                                <BsStar className="h-4 w-auto" />
                                <span>{project.stargazers.totalCount}</span>
                              </span>
                              {/* forks */}
                              <span>
                                <BiGitRepoForked className="h-4 w-auto" />
                                <span>{project.forks.totalCount}</span>
                              </span>
                            </div>
                          </div>
                          {/* body */}
                          <div className="min-h-[4rem] text-sm font-thin">
                            <p className="line-clamp-3">{project.description}</p>
                          </div>
                        </div>
                        {/* footer */}
                        <div className="flex items-center justify-between space-x-3 px-2 py-2 child:flex child:items-center child:space-x-2">
                          {/* language */}
                          <span className="space-x-2">
                            <span
                              className="h-3 w-3 rounded-full"
                              style={{
                                backgroundColor: project.primaryLanguage.color ?? `#ef5453`
                              }}
                            />
                            <span>{project.primaryLanguage.name}</span>
                          </span>
                          {/* link */}
                          <span>
                            <a
                              href={
                                isFalsy(project.homepageUrl) ? project.url : project.homepageUrl
                              }
                              target="_blank"
                              rel="noopener"
                              className="relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                              onMouseEnter={() => copyLinkIconRef.current?.play()}
                              onMouseLeave={() => copyLinkIconRef.current?.stop()}
                            >
                              <Lottie
                                lottieRef={copyLinkIconRef}
                                className="h-4 w-auto"
                                animationData={copyLinkIcon}
                                loop={false}
                                autoplay={true}
                              />
                              <span>Visit</span>
                            </a>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setViewMorePins(!viewMorePins)}
                    className="inline-flex items-center justify-center space-x-1 rounded-sm bg-neutral-900 py-0.5 pr-1.5 uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                    onMouseEnter={() => listIconRef.current?.play()}
                    onMouseLeave={() => listIconRef.current?.stop()}
                  >
                    <Lottie
                      lottieRef={listIconRef}
                      className="h-10 w-auto"
                      animationData={listIcon}
                      loop={false}
                      autoplay={true}
                    />
                    <span>{viewMorePins ? 'View Less' : 'View More'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[25vh] flex-col items-center justify-center uppercase">
                <Lottie
                  lottieRef={loadingIconRef}
                  className="h-32 w-auto"
                  animationData={loadingIcon}
                  loop={true}
                  autoplay={true}
                />
                <span>Loading ...</span>
              </div>
            )}
          </div>
        </div>
        {/* All Projects */}
        <div className="space-y-6">
          {/* header */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl">
              All Projects{' '}
            </h2>
            <span className="text-lg">({filteredProjects.length})</span>
          </div>
          {/* projects */}
          <div className="">
            {ALL_PROJECTS.length > 0 ? (
              <div className="">
                <div className="grid gap-6 sm:grid-cols-2">
                  {ALL_PROJECTS.map((project, i) => {
                    return (
                      <div
                        key={i}
                        className="group origin-bottom-right rounded bg-zinc-900/20 shadow-sm backdrop-blur transition-transform hover:rotate-1"
                      >
                        {/* main */}
                        <div className="divide-y divide-zinc-500/25 child:px-2.5 child:py-2.5">
                          {/* header */}
                          <div className="flex items-center justify-between space-x-3 px-2 py-2 child:flex child:items-center child:space-x-2">
                            {/* title */}
                            <h2 className="text-lg font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                              {project.name}
                            </h2>
                            {/* stats */}
                            <div className="space-x-3 text-sm child:flex child:items-center child:space-x-1">
                              {/* stars */}
                              <span>
                                <BsStar className="h-4 w-auto" />
                                <span>{project.stargazers_count}</span>
                              </span>
                              {/* forks */}
                              <span>
                                <BiGitRepoForked className="h-4 w-auto" />
                                <span>{project.forks_count}</span>
                              </span>
                            </div>
                            {/* body */}
                          </div>
                          <div className="min-h-[4rem] text-sm font-thin">
                            <p className="line-clamp-2">
                              {isFalsy(project.description)
                                ? 'Lorem ipsum dolor sit amet consectetur.'
                                : project.description}
                            </p>
                          </div>
                        </div>
                        {/* footer */}
                        <div className="flex items-center justify-between space-x-3 px-2 py-2 child:flex child:items-center child:space-x-2">
                          {/* language */}
                          <span className="space-x-2">
                            {/* <span
                              className="h-3 w-3 rounded-full"
                              style={{
                                backgroundColor:
                                  project.primaryLanguage.color ?? `#ef5453`
                              }}
                            />
                            <span>{project.primaryLanguage.name}</span> */}
                          </span>
                          {/* link */}
                          <span>
                            <a
                              href={isFalsy(project.html_url) ? project.url : project.html_url}
                              target="_blank"
                              rel="noopener"
                              className="relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                              onMouseEnter={() => copyLinkIconRef.current?.play()}
                              onMouseLeave={() => copyLinkIconRef.current?.stop()}
                            >
                              <Lottie
                                lottieRef={copyLinkIconRef}
                                className="h-4 w-auto"
                                animationData={copyLinkIcon}
                                loop={false}
                                autoplay={true}
                              />
                              <span>Visit</span>
                            </a>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setViewMoreProjects(!viewMoreProjects)}
                    className="inline-flex items-center justify-center space-x-1 rounded-sm bg-neutral-900 py-0.5 pr-1.5 uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                    onMouseEnter={() => listIcon2Ref.current?.play()}
                    onMouseLeave={() => listIcon2Ref.current?.stop()}
                  >
                    <Lottie
                      lottieRef={listIcon2Ref}
                      className="h-10 w-auto"
                      animationData={listIcon}
                      loop={false}
                      autoplay={true}
                    />
                    <span>{viewMoreProjects ? 'View Less' : 'View More'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[25vh] flex-col items-center justify-center uppercase">
                <Lottie
                  lottieRef={loadingIconRef}
                  className="h-32 w-auto"
                  animationData={loadingIcon}
                  loop={true}
                  autoplay={true}
                />
                <span>Loading ...</span>
              </div>
            )}
          </div>
        </div>
        {/* Other Projects */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Other Projects
            </h2>
            <span className="text-lg">({OTHER_PROJECTS.length})</span>
          </div>
          {/* projects */}
          <div className="">
            <div className="">
              {OTHER_PROJECTS.map((project, i) => {
                return (
                  <div
                    key={i}
                    className="origin-bottom-right space-y-2 py-3 px-2 backdrop-blur transition-transform odd:bg-zinc-900/20 hover:rotate-1 dark:odd:bg-zinc-900/50 sm:px-4"
                  >
                    {/* header */}
                    <h2 className="flex items-center space-x-2 bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-sm uppercase text-transparent dark:to-[#ff7056]">
                      {project.name}
                    </h2>
                    <div className="text-xs">
                      <p className="line-clamp-3">{project.description}</p>
                    </div>
                    {/* footer */}
                    <div className="flex items-center justify-end child:flex child:items-center child:space-x-2">
                      {/* link */}
                      <span>
                        <a
                          href={isFalsy(project.homepageUrl) ? project.url : project.homepageUrl}
                          target="_blank"
                          rel="noopener"
                          className="relative flex cursor-pointer items-center justify-center space-x-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs uppercase text-neutral-100 backdrop:backdrop-blur hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                          onMouseEnter={() => copyLinkIconRef.current?.play()}
                          onMouseLeave={() => copyLinkIconRef.current?.stop()}
                        >
                          <Lottie
                            lottieRef={copyLinkIconRef}
                            className="h-4 w-auto"
                            animationData={copyLinkIcon}
                            loop={false}
                            autoplay={true}
                          />
                          <span>Visit</span>
                        </a>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
