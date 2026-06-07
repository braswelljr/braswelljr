'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';
import { CurrentlyPlaying } from './_sections/currently-playing';
import { TopTracks } from './_sections/top-tracks';

gsap.registerPlugin(useGSAP);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(
    () => {
      if (isReduced) return;
      gsap.fromTo(
        '[data-listen-header]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="py-12 max-lg:pt-36"
    >
      <div className="mx-auto max-w-4xl px-4 text-gray-800 sm:mt-14 dark:text-neutral-100">
        <nav className="flex items-start justify-between">
          <h1
            data-listen-header
            className="bg-linear-to-l from-secondary to-primary bg-clip-text text-2xl leading-tight font-bold tracking-tight text-transparent uppercase sm:text-3xl md:text-4xl dark:to-primary"
          >
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
