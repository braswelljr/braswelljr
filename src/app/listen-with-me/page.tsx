import CurrentlyPlaying from './sections/currently-playing'
import { TopTracks } from './sections/top-tracks'

export default function Page() {
  return (
    <div className="py-10 max-lg:pt-28">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 dark:text-neutral-100 sm:mt-14">
        {/* Header */}
        <nav className="flex items-start justify-between">
          <h1 className="bg-gradient-to-l from-[#ff8d22] to-[#ff2600] bg-clip-text text-2xl font-bold uppercase leading-tight tracking-tight text-transparent dark:to-[#ff7056] sm:text-3xl md:text-4xl">
            Listen With Me
          </h1>
        </nav>
        <div className="mt-8 space-y-8">
          <CurrentlyPlaying />
          <TopTracks />
        </div>
      </div>
    </div>
  )
}
