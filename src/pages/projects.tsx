import React from 'react'
import clsx from 'clsx'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'
import { HiStar } from 'react-icons/hi'
import { pageTransitionVariant } from '@/components/framerVariants'

const Projects = () => {
  const [repositories, setRepositories] = useStore(
    state => [state.repositories, state.setRepositories],
    shallow
  )

  const { data: repos, error: repoError } = useSWR(
    [`https://api.github.com/graphql`],
    url =>
      fetch(url, {
        method: 'post',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `{
              user(login: "braswelljr") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      name
                      description
                      url
                      createdAt
                      updatedAt
                      primaryLanguage {
                        name
                        color
                      }
                      stargazers {
                        totalCount
                      }
                    }
                  }
                }
              }
            }`
        })
      })
        .then(res => res.json())
        .then(res => res.data.user.pinnedItems.nodes),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )

  if (!repoError && Array.isArray(repos) && repos.length > 0) {
    setRepositories(repos)
  }
  return (
    <motion.main
      className={clsx(
        'mx-auto min-h-screen max-w-5xl py-4 px-6 md:px-8 lg:px-12'
      )}
      variants={pageTransitionVariant}
      initial="hidden"
      animate="enter"
      exit="exit"
      onAnimationStart={() => document.body.classList.add('overflow-hidden')}
      onAnimationComplete={() =>
        document.body.classList.remove('overflow-hidden')
      }
    >
      <h2
        className={clsx(
          'mt-6 text-3xl font-bold uppercase first-letter:text-5xl first-letter:font-semibold'
        )}
      >
        Projects
      </h2>
      <div className={clsx('mt-4')}>
        {Array.isArray(repositories) && repositories.length > 0 ? (
          <div className="mt-8 grid gap-5 text-xs sm:grid-cols-2 md:text-sm lg:grid-cols-3 lg:grid-rows-3">
            {repositories.map((repo, i) => (
              <div className={clsx('h-full space-y-2 p-2')} key={repo.name}>
                <div className="flex items-center space-x-2">
                  <a
                    className="link-underline font-bold"
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </div>

                <p className="line-clamp-2">{repo.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HiStar className="h-4 w-auto" />
                    <span>{repo.stargazers.totalCount}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      style={{
                        backgroundColor: `${repo.primaryLanguage.color}`
                      }}
                      className="h-3 w-3 rounded-full"
                    />

                    <span>{repo.primaryLanguage.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid min-h-[60vh] place-items-center">
            <div className="h-20 w-20 animate-ping rounded-full bg-pink-600"></div>
          </div>
        )}
      </div>
    </motion.main>
  )
}

export default Projects

// {
//   "name": "glab-docs",
//   "description": "GLab (Documentation) - An open-source GitLab command line tool bringing GitLab's cool features to your command line.",
//   "url": "https://github.com/braswelljr/glab-docs",
//   "createdAt": "2021-05-15T02:53:18Z",
//   "updatedAt": "2022-01-04T16:05:26Z",
//   "primaryLanguage": {
//     "name": "JavaScript",
//     "color": "#f1e05a"
//   },
//   "stargazers": {
//     "totalCount": 2
//   }
// }
