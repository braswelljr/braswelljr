import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
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
    <main className="grid place-content-center min-h-screen">
      <section className="">
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
                  'text-3xl xs:text-4xl sm:text-5xl mt-5 py-3 md:text-6xl text-center font-black'
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
      </section>
    </main>
  )
}

export default Index
