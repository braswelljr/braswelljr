'use client'

import { Profile } from './sections/profile'

export default function Page() {
  return (
    <div className="">
      <div className="py-10 max-lg:pt-28">
        <div className="mx-auto max-w-3xl px-4 text-gray-800 dark:text-neutral-100 sm:mt-14">
          {/* Header */}
          <nav className="flex items-start justify-between">
            <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
              Listen With Me
            </h1>
          </nav>
          <div className="">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  )
}
