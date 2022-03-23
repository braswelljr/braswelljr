import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { pageTransitionVariant } from '@/components/framerVariants'

const About = () => {
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
          'mt-6 text-3xl font-bold uppercase first-letter:text-5xl first-letter:font-semibold'
        )}
      >
        About
      </h2>
      <div className={clsx('mt-4')}>
        <p className={clsx()}>
          I am a Software Engineer with experience in solution design and
          implementation of technical software projects. Exploration is one of
          the things which makes me keep learning and growing. I am a
          self-motivated individual who is always looking for new challenges and
          opportunities to grow.
        </p>
      </div>
    </motion.main>
  )
}

export default About
