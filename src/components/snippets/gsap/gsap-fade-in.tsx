'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function GsapFadeIn() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.box', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out'
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8">
      <div className="box flex size-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-center text-sm font-bold text-white shadow-lg">
        Fade In
      </div>
    </div>
  );
}
