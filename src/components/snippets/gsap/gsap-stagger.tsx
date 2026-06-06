'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

const ITEMS = ['React', 'GSAP', 'Next.js', 'TypeScript', 'Tailwind'];

export default function GsapStagger() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-wrap items-center justify-center gap-3 p-6">
      {ITEMS.map((item) => (
        <div
          key={item}
          className="stagger-item rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-5 py-2 text-sm font-semibold text-white shadow"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
