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

const Index = () => {
  const [r, setR] = useState<number>(0)
  const roles: string[] = ['Web Developer', 'Web Designer', 'UX / UI Designer']

  useInterval(() => {
    if (roles.length > 0) {
      let newIdx = r + 1
      if (newIdx >= roles.length) {
        newIdx = 0
      }
      setR(newIdx)
    }
  }, 5000)

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto lg:grid lg:grid-cols-[2fr,3fr]">
      {[
        {
          title: 'Home',
          content: (
            <>
              <section className="space-y-4">
                <div className="h-72">
                  <img
                    src={'/img/man-in-hoodie.png'}
                    alt="boy in hoodie"
                    className="mx-auto h-64 w-auto"
                  />
                </div>
                <div className="space-y-7">
                  <p className="text-center text-xl sm:text-2xl">
                    I am <em className="font-bold">Braswell</em>
                  </p>
                  {roles.map(
                    (role, id) =>
                      r === id && (
                        <motion.div
                          key={id}
                          className={clsx(
                            'text-center font-mono text-3xl font-black sm:text-5xl'
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
                  <div className="absolute inset-x-4 bottom-5">
                    <div className="mx-auto flex items-center justify-center space-x-6">
                      {[
                        {
                          name: 'LinkedIn',
                          url: 'https://www.linkedin.com/in/braswell-kenneth-junior-azu-870827192/',
                          icon: <FaLinkedin className={clsx('h-8 w-auto')} />
                        },
                        {
                          name: 'GitHub',
                          url: 'https://github.com/braswelljr',
                          icon: <FaGithub className={clsx('h-8 w-auto')} />
                        },
                        {
                          name: 'Instagram',
                          url: 'https://www.instagram.com/braswell_jr/',
                          icon: <FaInstagram className={clsx('h-8 w-auto')} />
                        },
                        {
                          name: 'Twitter',
                          url: 'https://twitter.com/brakez_ken',
                          icon: <FaTwitter className={clsx('h-8 w-auto')} />
                        },
                        {
                          name: 'Figma',
                          url: 'https://www.figma.com/@braswelljr',
                          icon: <FaFigma className={clsx('h-8 w-auto')} />
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
                implementation of technical software projects. Exploration is
                one of the things which makes me keep learning and growing. I am
                a self-motivated individual who is always looking for new
                challenges and opportunities to grow.
              </p>
            </>
          )
        },
        {
          title: 'Content',
          content: (
            <>
              <p className={clsx()}>
                I am a Software Engineer with experience in solution design and
                implementation of technical software projects. Exploration is
                one of the things which makes me keep learning and growing. I am
                a self-motivated individual who is always looking for new
                challenges and opportunities to grow.
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
                implementation of technical software projects. Exploration is
                one of the things which makes me keep learning and growing. I am
                a self-motivated individual who is always looking for new
                challenges and opportunities to grow.
              </p>
            </>
          )
        }
      ].map(({ title, content }) => (
        <section
          key={title}
          className={clsx(
            'min-h-screen snap-start',
            title !== 'Home'
              ? ' py-5 px-6 backdrop-blur-md odd:bg-amber-500/50 even:bg-slate-500/50 md:px-8 lg:col-start-2 lg:py-20 lg:px-12'
              : 'relative grid place-content-center lg:sticky lg:inset-y-0 lg:col-span-1'
          )}
        >
          {title !== 'Home' && (
            <h2
              className={clsx(
                'mt-10 text-3xl font-bold first-letter:text-5xl first-letter:font-semibold'
              )}
            >
              {title}
            </h2>
          )}
          <div className={clsx('mt-6' && title !== 'Home')}>{content}</div>
        </section>
      ))}
    </div>
  )
}

export default Index
