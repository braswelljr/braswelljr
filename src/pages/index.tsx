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

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/braswell-kenneth-junior-azu-870827192/',
    icon: FaLinkedin
  },
  {
    name: 'GitHub',
    url: 'https://github.com/braswelljr',
    icon: FaGithub
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/braswell_jr/',
    icon: FaInstagram
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/braswell_jnr',
    icon: FaTwitter
  },
  {
    name: 'Figma',
    url: 'https://www.figma.com/@braswelljr',
    icon: FaFigma
  }
]

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
    <motion.main className={clsx('grid h-screen place-content-center')}>
      <section className="space-y-4">
        <div className="md:h-72">
          <img
            src={require('@/assets/img/man-in-hoodie.png')}
            alt="boy in hoodie"
            className="mx-auto h-64 w-auto"
          />
        </div>
        <div className="space-y-10 md:space-y-16">
          <div className="text-center text-xl font-extralight sm:text-2xl">
            <p className="">I am</p>{' '}
            <p className="">Braswell Kenneth Azu Jr.</p>
          </div>
          {roles.map(
            (role, id) =>
              r === id && (
                <motion.div
                  key={id}
                  className={clsx(
                    'bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text pb-3 text-center text-2xl font-black text-transparent dark:to-[#ff7056] xxs:text-3xl xs:text-4xl sm:text-5xl'
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
          <div className="">
            <div className="mx-auto flex items-center justify-center space-x-3 xs:space-x-6">
              {socials.map(item => (
                <a key={item.name} href={item.url} target="_blank">
                  <item.icon className="h-6 w-auto md:h-9" />
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
