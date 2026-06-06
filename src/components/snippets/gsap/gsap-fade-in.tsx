'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function GsapFadeIn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);

  useGSAP(
    () => {
      gsap.from('.fade-box', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out'
      });
    },
    { scope: containerRef, dependencies: [replay] }
  );

  return (
    <div ref={containerRef} className="relative flex items-center justify-center p-8">
      <div className="fade-box flex size-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-center text-sm font-bold text-white shadow-lg">
        Fade In
      </div>
      <button
        onClick={() => setReplay(r => r + 1)}
        title="Replay animation"
        className="absolute top-2 right-2 flex items-center gap-1 rounded-md border border-orange-400/60 bg-neutral-900/80 px-2 py-1 text-xsm font-semibold text-orange-400 backdrop-blur transition-colors hover:border-orange-400 hover:bg-neutral-900 active:scale-95"
      >
        ↺ Replay
      </button>
    </div>
  );
}
