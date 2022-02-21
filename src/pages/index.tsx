import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
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
    <main className="grid-cols-[2fr,3fr] lg:grid">
      <section className="grid min-h-[100vh] place-content-center">
        <section className="space-y-4">
          <div className="h-72">
            <img
              src={'/img/man-in-hoodie.png'}
              alt="boy in hoodie"
              className="mx-auto h-64 w-auto"
            />
          </div>
          <div className="">
            <p className="text-center text-xl sm:text-2xl">
              I am <em className="font-bold">Braswell</em>
            </p>
          </div>
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
          <div className="mt-8 flex items-center justify-center space-x-6">
            {[
              {
                name: 'GitHub',
                url: 'https://github.com/braswelljr',
                icon: <FaGithub className={clsx('h-8 w-auto')} />
              },
              {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/braswell-kenneth-junior-azu-870827192/',
                icon: <FaLinkedin className={clsx('h-8 w-auto')} />
              },
              {
                name: 'Instagram',
                url: 'https://www.instagram.com/braswell_jr/',
                icon: <FaInstagram className={clsx('h-8 w-auto')} />
              }
            ].map(item => (
              <a key={item.name} href={item.url}>
                {item.icon}
              </a>
            ))}
          </div>
        </section>
      </section>
      <section className=""></section>
    </main>
  )
}

export default Index
