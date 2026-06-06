'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

const ITEMS = ['React', 'GSAP', 'Next.js', 'TypeScript', 'Tailwind'];

export default function GsapStagger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);

  useGSAP(
    () => {
      gsap.from('.stagger-item', {
        opacity: 0,
        y: 30,
        scale: 0.85,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1
      });
    },
    { scope: containerRef, dependencies: [replay] }
  );

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center justify-center gap-3 p-8">
      {ITEMS.map((item) => (
        <div
          key={item}
          className="stagger-item rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-5 py-2 text-sm font-semibold text-white shadow"
        >
          {item}
        </div>
      ))}
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
