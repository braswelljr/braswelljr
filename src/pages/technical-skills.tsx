import useStore from '@/store/store'
import shallow from 'zustand/shallow'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { pageTransitionVariant } from '@/components/framerVariants'
import flattenArray from '@/utils/flattenArray'

const TechnicalSkills = () => {
  const [languages, setLanguages] = useStore(
    state => [state.languages, state.setLanguages],
    shallow
  )

  const _ = useSWR(
    [`https://api.github.com/graphql`, languages],
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
                # fetch only owner repos & not forks
                repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                  nodes {
                    name
                    languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                      edges {
                        size
                        node {
                          color
                          name
                        }
                      }
                    }
                  }
                }
              }
            }`
        })
      })
        .then(res => res.json())
        .then(res => {
          return flattenArray(
            res.data.user.repositories.nodes.map((repo: any) =>
              repo.languages.edges.map((langs: any) => ({
                name: langs.node.name,
                color: langs.node.color
              }))
            )
          ).reduce(
            (accumulator, lang: { name: string; color: string }, _, self) => {
              return [
                ...accumulator,
                {
                  name: lang.name,
                  color: lang.color,
                  count: self.filter(x => x.name === lang.name).length
                  // size: 10
                }
              ].filter(
                (value, index, self) =>
                  self.findIndex(x => x.name === value.name) === index
              )
            },
            []
          )
        })
        .then(res => setLanguages(res)),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )

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
          'mt-6 text-2xl font-bold uppercase first-letter:text-5xl first-letter:font-semibold'
        )}
      >
        Technical Skills
      </h2>
      <div className={clsx('mt-4')}>
        {Array.isArray(languages) && languages.length > 0 ? (
          <section></section>
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
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity
                }}
              />
            </svg>
          </div>
        )}
      </div>
    </motion.main>
  )
}

export default TechnicalSkills
