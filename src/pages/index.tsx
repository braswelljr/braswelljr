import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'
import useInterval from '@/hooks/useInterval'
import useSWR from 'swr'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'

const Index = () => {
  const [r, setR] = useState<number>(0)
  const roles: string[] = ['Web Developer', 'Web Designer', 'UX / UI Designer']
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

  console.log(repositories)

  useInterval(() => {
    if (roles.length > 0) {
      let newIdx = r + 1
      if (newIdx >= roles.length) {
        newIdx = 0
      }
      setR(newIdx)
    }
  }, 5000)

  const pages = [
    {
      title: 'Home',
      content: (
        <>
          <section className="space-y-4">
            <div className="md:h-72">
              <img
                src={'/img/man-in-hoodie.png'}
                alt="boy in hoodie"
                className="mx-auto h-64 w-auto"
              />
            </div>
            <div className="space-y-16">
              <p className="text-center text-xl sm:text-2xl">
                I am <em className="font-bold">Braswell</em>
              </p>
              {roles.map(
                (role, id) =>
                  r === id && (
                    <motion.div
                      key={id}
                      className={clsx(
                        'text-center text-2xl font-semibold xxs:text-3xl xs:text-4xl sm:text-5xl md:h-10 lg:text-4xl xl:text-5xl'
                      )}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        duration: 1,
                        delay: 0.25,
                        stiffness: 260,
                        damping: 20
                      }}
                    >
                      a {role}
                    </motion.div>
                  )
              )}
              <div className="mt-20">
                <div className="mx-auto flex items-center justify-center space-x-3 xs:space-x-6">
                  {[
                    {
                      name: 'LinkedIn',
                      url: 'https://www.linkedin.com/in/braswell-kenneth-junior-azu-870827192/',
                      icon: (
                        <FaLinkedin className={clsx('h-8 w-auto md:h-10')} />
                      )
                    },
                    {
                      name: 'GitHub',
                      url: 'https://github.com/braswelljr',
                      icon: <FaGithub className={clsx('h-8 w-auto md:h-10')} />
                    },
                    {
                      name: 'Instagram',
                      url: 'https://www.instagram.com/braswell_jr/',
                      icon: (
                        <FaInstagram className={clsx('h-8 w-auto md:h-10')} />
                      )
                    },
                    {
                      name: 'Twitter',
                      url: 'https://twitter.com/brakez_ken',
                      icon: <FaTwitter className={clsx('h-8 w-auto md:h-10')} />
                    },
                    {
                      name: 'Figma',
                      url: 'https://www.figma.com/@braswelljr',
                      icon: <FaFigma className={clsx('h-8 w-auto md:h-10')} />
                    }
                  ].map(item => (
                    <a key={item.name} href={item.url} target="_blank">
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )
    },
    {
      title: 'About',
      content: (
        <>
          <p className={clsx()}>
            I am a Software Engineer with experience in solution design and
            implementation of technical software projects. Exploration is one of
            the things which makes me keep learning and growing. I am a
            self-motivated individual who is always looking for new challenges
            and opportunities to grow.
          </p>
        </>
      )
    },
    {
      title: 'Projects',
      content: (
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
        <>
          {Array.isArray(repositories) && repositories.length > 0 ? (
            <div className="grid">
              {repositories.map(repo => (
                <div className="" key={repo.name}>
                  {repo.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="">hello world</div>
          )}
        </>
      )
    },
    {
      title: 'Technical Skills',
      content: (
        <>
          <p className={clsx()}>
            I am a Software Engineer with experience in solution design and
            implementation of technical software projects. Exploration is one of
            the things which makes me keep learning and growing. I am a
            self-motivated individual who is always looking for new challenges
            and opportunities to grow.
          </p>
        </>
      )
    },
    {
      title: 'Blog',
      content: (
        <>
          <p className={clsx()}>
            I am a Software Engineer with experience in solution design and
            implementation of technical software projects. Exploration is one of
            the things which makes me keep learning and growing. I am a
            self-motivated individual who is always looking for new challenges
            and opportunities to grow.
          </p>
        </>
      )
    }
  ]

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto lg:grid lg:grid-cols-[2fr,3fr]">
      {pages.map(({ title, content }) => (
        <section
          key={title}
          className={clsx(
            'snap-start',
            title !== 'Home'
              ? 'min-h-screen py-5 px-6 odd:bg-amber-500/30 even:bg-slate-500/30 md:px-8 lg:col-start-2 lg:py-20 lg:px-12'
              : 'grid h-screen place-content-center lg:sticky lg:inset-y-0 lg:col-span-1'
          )}
        >
          {title !== 'Home' && (
            <h2
              className={clsx(
                'mt-6 text-3xl font-bold first-letter:text-5xl first-letter:font-semibold'
              )}
            >
              {title}
            </h2>
          )}
          <div className={clsx('mt-4' && title !== 'Home')}>{content}</div>
        </section>
      ))}
    </div>
  )
}

export default Index
