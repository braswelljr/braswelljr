'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARDS = [
  { label: 'Design', color: 'from-violet-500 to-purple-600', icon: '🎨' },
  { label: 'Build', color: 'from-orange-400 to-red-500', icon: '⚡' },
  { label: 'Deploy', color: 'from-emerald-400 to-teal-500', icon: '🚀' }
];

export default function GsapScrollTrigger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);

  useGSAP(
    () => {
      gsap.from('.scroll-card', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });
    },
    { scope: containerRef, dependencies: [replay] }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center justify-center gap-4 p-8"
    >
      {CARDS.map(({ label, color, icon }) => (
        <div
          key={label}
          className={`scroll-card flex size-28 flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          <span className="text-3xl">{icon}</span>
          <span className="text-sm font-bold">{label}</span>
        </div>
      ))}
      <button
        onClick={() => setReplay((r) => r + 1)}
        title="Replay animation"
        className="absolute top-2 right-2 flex items-center gap-1 rounded-md border border-orange-400/60 bg-neutral-900/80 px-2 py-1 text-xsm font-semibold text-orange-400 backdrop-blur transition-colors hover:border-orange-400 hover:bg-neutral-900 active:scale-95"
      >
        ↺ Replay
      </button>
    </div>
  );
}
