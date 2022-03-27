import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'
import useInterval from '@/hooks/useInterval'
import clsx from 'clsx'
import { pageTransitionVariant } from '@/components/framerVariants'

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
    <motion.main
      className="grid min-h-screen place-items-center"
      variants={pageTransitionVariant}
      initial="hidden"
      animate="enter"
      exit="exit"
      onAnimationStart={() => document.body.classList.add('overflow-hidden')}
      onAnimationComplete={() =>
        document.body.classList.remove('overflow-hidden')
      }
    >
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
                    'bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-center text-2xl font-black text-transparent xxs:text-3xl xs:text-4xl sm:text-5xl'
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
                  icon: <FaLinkedin className={clsx('h-8 w-auto md:h-10')} />
                },
                {
                  name: 'GitHub',
                  url: 'https://github.com/braswelljr',
                  icon: <FaGithub className={clsx('h-8 w-auto md:h-10')} />
                },
                {
                  name: 'Instagram',
                  url: 'https://www.instagram.com/braswell_jr/',
                  icon: <FaInstagram className={clsx('h-8 w-auto md:h-10')} />
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
    </motion.main>
  )
}

export default Index
