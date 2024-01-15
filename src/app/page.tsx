'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from 'lib/utils'
import { socials } from '~/config/data'
import useInterval from '~/hooks/useInterval'

export default function Page() {
  const [r, setR] = useState<number>(0)
  const roles: string[] = ['Software Engineer', 'Web Designer', 'UX / UI Designer']

  useInterval(() => {
    if (roles.length > 0) {
      let newIdx = r + 1
      if (newIdx >= roles.length) newIdx = 0

      setR(newIdx)
    }
  }, 5000)

  return (
    <main className={cn('grid h-screen place-content-center')}>
      <section className="space-y-4">
        <div className="md:pt-8">
          <Image
            src={'/images/man-in-hoodie.png'}
            alt={'boy in hoodie'}
            loading="eager"
            height={200}
            width={75}
            style={{ marginRight: 'auto', marginLeft: 'auto' }}
          />
        </div>
        <div className="space-y-8 md:space-y-12">
          <div className="text-center text-lg font-extralight sm:text-xl md:text-2xl">
            <div className="">I am</div> <div className="">Braswell Kenneth Azu Jr.</div>
          </div>
          {roles.map(
            (role, id) =>
              r === id && (
                <motion.div
                  key={id}
                  className={cn(
                    'bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text pb-3 text-center text-xl font-black uppercase text-transparent dark:to-[#ff7056] xxs:text-2xl xsm:text-3xl sm:text-4xl md:text-5xl'
                  )}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: 'spring', duration: 1, delay: 0.25, stiffness: 260, damping: 20 }}
                >
                  a {role}
                </motion.div>
              )
          )}
          <div className="">
            <div className="mx-auto flex items-center justify-center space-x-3 xs:space-x-6">
              {socials.map(item => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-6 w-auto md:h-9" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
