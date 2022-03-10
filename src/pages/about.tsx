import React from 'react'
import clsx from 'clsx'

const About = () => {
  return (
    <main
      className={clsx(
        'mx-auto min-h-screen max-w-5xl py-4 px-6 md:px-8 lg:px-12'
      )}
    >
      <h2
        className={clsx(
          'mt-6 text-3xl font-bold first-letter:text-5xl first-letter:font-semibold'
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
    </main>
  )
}

export default About
