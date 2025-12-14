import { CurrentlyPlaying } from './_sections/currently-playing';
import { TopTracks } from './_sections/top-tracks';

export default function Page() {
  return (
    <div className="py-10 max-lg:pt-28">
      <div className="mx-auto max-w-4xl px-4 text-gray-800 sm:mt-14 dark:text-neutral-100">
        {/* Header */}
        <nav className="flex items-start justify-between">
          <h1 className="from-secondary to-primary dark:to-primary bg-linear-to-l bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl">
            Listen With Me
          </h1>
        </nav>
        <div className="mt-8 space-y-8">
          <CurrentlyPlaying />
          <TopTracks />
        </div>
      </div>
    </div>
  );
}
