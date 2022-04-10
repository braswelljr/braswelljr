import clsx from 'clsx'
import useSWR from 'swr'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { pageTransitionVariant } from '@/components/framerVariants'

const Projects = () => {
  // const [repositories, setRepositories] = useState<any[]>([])
  const [repositories, setRepositories] = useStore(
    state => [state.repositories, state.setRepositories],
    shallow
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = useSWR(
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
        .then(res => setRepositories(res.data.user.pinnedItems.nodes)),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )

  return (
    <motion.main
      className={clsx(
        'mx-auto min-h-screen max-w-5xl py-4 px-8 md:px-12 lg:px-16'
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
          'mt-6 text-2xl font-bold uppercase first-letter:text-5xl first-letter:font-semibold'
        )}
      >
        Projects
      </h2>
      <div className={clsx('mt-4')}>
        {Array.isArray(repositories) && repositories.length > 0 ? (
          <div className="mt-8 grid gap-5 text-xs sm:grid-cols-2 md:text-sm lg:grid-cols-3 xl:grid-rows-3">
            {repositories.map(repo => (
              <div className={clsx('h-full space-y-2 p-2')} key={repo.name}>
                <div className="flex items-center space-x-2">
                  <a
                    className={clsx('link-underline font-bold')}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className={clsx(
                        'bg-gradient-to-r from-[#ff8d22] to-[#ff2600] bg-clip-text text-transparent'
                      )}
                    >
                      {repo.name}
                    </span>
                  </a>
                </div>

                <p className="line-clamp-2">{repo.description}</p>
                <div className="flex items-center space-x-12">
                  <div className="flex items-center">
                    <HiStar className="h-4 w-auto" />
                    <span>{repo.stargazers?.totalCount ?? 0}</span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-auto [stroke:url(#archive)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <defs>
                <linearGradient id="archive">
                  <stop offset="5%" stopColor="#ff8d22" />
                  <stop offset="95%" stopColor="#ff2600" />
                </linearGradient>
              </defs>
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </svg>
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
