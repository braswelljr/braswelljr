import { useState, useContext } from 'react'
import clsx from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'
import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaFolder,
  FaFolderOpen
} from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'
import { useInterval } from '@/hooks/useInterval'
import { Store } from 'src/store/store'

const Index = () => {
  const { theme, setTheme, repos } = useContext(Store)
  const [r, setR] = useState(0)
  const roles = ['Web Developer', 'Web Designer', 'UX / UI Designer']
  const [pin, setPin] = useState(6)

  useInterval(() => {
    if (roles !== undefined && roles.length > 0) {
      let newIdx = r + 1
      if (newIdx >= roles.length) {
        newIdx = 0
      }
      setR(newIdx)
    }
  }, 5000)

  return (
    <main
      className={clsx('min-h-screen', {
        'bg-gray-900 text-white bg-templeDark': !theme,
        'bg-white bg-templeLight': theme
      })}
    >
      {/* Theme Switch */}
      <button
        type="button"
        className={clsx(
          'h-8 w-14 rounded-full z-10 p-1 fixed flex items-center right-5 top-5',
          { 'bg-white': !theme, 'bg-gray-900': theme }
        )}
        onClick={setTheme}
      >
        <span
          className={clsx(
            'h-6 w-6 rounded-full transform transition-all duration-300',
            { 'translate-x-6 bg-gray-900': !theme, 'bg-white': theme }
          )}
        />
      </button>
      {/* content */}
      <section className={clsx('pt-20 max-w-7xl mx-auto')}>
        {/* Header Section */}
        <section className="">
          <div className="w-full px-8">
            <div className="ml-auto text-3xl text-right md:text-4xl">
              <div className="">Hi there, I&rsquo;m</div>
              <div className="font-sans font-semibold text-sky-600">
                Braswell
              </div>
            </div>
            <AnimateSharedLayout>
              {roles.map(
                (role, id) =>
                  r === id && (
                    <motion.div
                      key={id}
                      className={clsx(
                        'text-4xl sm:text-5xl mt-5 py-3 md:text-6xl bg-clip-text font-mono text-right font-black text-transparent',
                        { 'bg-white': !theme, 'bg-black': theme }
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
            </AnimateSharedLayout>
            <div className="flex justify-around mt-10 md:space-x-4">
              {[
                {
                  name: 'GitHub',
                  link: 'https://github.com/braswelljr',
                  icon: <FaGithub className={clsx('h-10 md:h-6 w-auto')} />
                },
                {
                  name: 'Twitter',
                  link: 'https://twitter.com/brakez_ken',
                  icon: <FaTwitter className={clsx('h-10 md:h-6 w-auto')} />
                },
                {
                  name: 'Linkedin',
                  link: 'https://www.linkedin.com/in/braswell-kenneth-junior-azu-870827192/',
                  icon: <FaLinkedinIn className={clsx('h-10 md:h-6 w-auto')} />
                },
                {
                  name: 'Instagram',
                  link: 'https://www.instagram.com/braswell_jr',
                  icon: <FaInstagram className={clsx('h-10 md:h-6 w-auto')} />
                }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(
                    'md:flex justify-center transform transition-all items-center font-semibold hover:-translate-y-1 rounded-md md:px-1 md:bg-gray-600 md:bg-opacity-50 md:h-10 md:w-full'
                  )}
                >
                  {link.icon}
                  <div className="hidden ml-2 md:block">{link.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section
          className={clsx('px-10 mt-10 py-5 min-h-[50vh]', {
            'flex items-center justify-center': repos === null
          })}
        >
          {repos === null && (
            <HiCode className={clsx('animate-ping h-32 w-auto')} />
          )}
          <div className="py-8 overflow-x-hidden overflow-y-auto whitespace-no-wrap">
            {repos !== null && (
              <>
                <div className="flex items-baseline justify-between">
                  <h1 className={clsx('py-4 font-black text-2xl')}>Projects</h1>
                  <span
                    className="font-black cursor-pointer hover:underline text-sky-700"
                    onClick={() =>
                      pin === repos.length ? setPin(6) : setPin(repos.length)
                    }
                  >
                    {pin === repos.length ? 'See less' : 'See all'}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {repos.map((repo, i) => {
                    if (i < pin) {
                      return (
                        <div
                          className={clsx(
                            'flex flex-col justify-between font-serif hover:shadow-md transform transition-all duration-300 hover:-translate-y-1 p-4 space-y-3 border rounded',
                            {
                              'bg-gray-900': !theme,
                              'bg-white': theme
                            }
                          )}
                          key={repo.id}
                        >
                          <div className="flex items-center justify-start space-x-2">
                            <FaFolderOpen className="w-auto h-5" />
                            <a
                              href={repo.html_url}
                              className="font-bold text-sky-700 hover:underline"
                            >
                              {repo.name}
                            </a>
                          </div>
                          <div className="">{repo.description}</div>
                          <div className="flex items-center justify-start space-x-2">
                            <div
                              className={clsx(
                                'w-3 h-3 bg-green-400 rounded-full'
                              )}
                            />
                            <div className="">{repo.language}</div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default Index
