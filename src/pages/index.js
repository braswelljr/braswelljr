import { useState, useContext } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaFolder
} from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'
import { useInterval } from '@/hooks/useInterval'
import { Store } from 'src/store/store'

const Index = () => {
  const { theme, setTheme, repos } = useContext(Store)
  const [r, setR] = useState(0)
  const roles = ['Web Developer', 'Web Designer', 'UX / UI Designer']

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
      className={clsx('min-h-screen overflow-x-hidden', {
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
      <section className={clsx('pt-20 max-w-6xl mx-auto')}>
        {/* Header Section */}
        <section className="min-h-[40vh]">
          <div className="w-full px-8 space-y-20">
            <div className="ml-auto text-3xl text-center md:text-6xl">
              Hi there, I&rsquo;m{' '}
              <span className="font-semibold">Braswell</span>
            </div>
            {roles.map(
              (role, id) =>
                r === id && (
                  <motion.div
                    key={id}
                    className={clsx(
                      'text-4xl sm:text-5xl mt-5 py-3 md:text-6xl bg-clip-text font-mono text-center font-black text-transparent',
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
                  data-aos={i > 1 ? 'fade-left' : 'fade-right'}
                  data-aos-delay={(i + 1) * 750}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(
                    'md:flex justify-center transform transition-all items-center font-semibold hover:-translate-y-0.5 rounded-md md:px-1  md:bg-opacity-50 md:h-10 md:w-full',
                    {
                      'md:bg-white md:border md:border-gray-900': theme,
                      'md:bg-gray-900 md:border md:border-white': !theme
                    }
                  )}
                >
                  {link.icon}
                  <div className="hidden ml-2 md:block">{link.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Knowledge */}
        <section className={clsx('px-10 mt-10 py-5')}>
          <h1 className={clsx('py-4 font-black text-xl md:text-2xl')}>
            Domain Knowledge
          </h1>
          <ul className={clsx('pl-5')}>
            {['Software Development', 'UI / UX Design'].map((skill, i) => (
              <li
                key={i}
                data-aos="fade-left"
                data-aos-delay={(i + 1) * 750}
                className={clsx('list-disc font-medium')}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Skill */}
        <section className={clsx('px-10 mt-10 py-5')}>
          <h1 className={clsx('py-4 font-black text-xl md:text-2xl')}>
            Technical Skills
          </h1>
          <ul className={clsx('pl-5 space-y-4')}>
            {Object.entries({
              JavaScript: {
                'React.js': 'https://reactjs.org/',
                'Vue.js': 'https://vuejs.org/',
                'Node.js': 'https://nodejs.org/'
              },
              CSS: {
                'SASS / SCSS': 'https://sass-lang.com/',
                Tailwindcss: 'https://tailwindcss.com/',
                Bootstrap: 'https://getbootstrap.com/'
              },
              'UI / UX': {
                FIGMA: 'https://www.figma.com/',
                'ADOBE XD': 'https://www.adobe.com/products/xd.html'
              }
            }).map(([key, value], i) => (
              <li
                key={i}
                data-aos="fade-left"
                data-aos-delay={(i + 1) * 750}
                className={clsx('list-disc')}
              >
                <h2 className="font-medium">{key}</h2>
                <ul>
                  {Object.entries(value).map(([framework, link], x) => (
                    <li key={x} className="pl-2 ml-4 list-decimal">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline"
                      >
                        {framework}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section
          className={clsx('px-10 py-5', {
            'flex items-center justify-center min-h-[35vh]': repos === null
          })}
        >
          {repos === null && (
            <HiCode className={clsx('animate-ping h-28 w-auto')} />
          )}
          <div className="py-8">
            {repos !== null && (
              <>
                <div className="flex items-baseline justify-between">
                  <h1 className={clsx('py-4 font-black text-xl md:text-2xl')}>
                    Projects
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {repos.map(repo => {
                    return (
                      <div
                        className={clsx(
                          'flex flex-col justify-between font-serif hover:shadow-md transform transition-all duration-300 hover:-translate-y-1 p-4 space-y-3 border rounded',
                          {
                            'bg-gray-900': !theme,
                            'bg-white': theme
                          }
                        )}
                        data-aos="fade-left"
                        key={repo.id}
                      >
                        <div className="flex items-center justify-start space-x-2">
                          <FaFolder className="w-auto h-5" />
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
