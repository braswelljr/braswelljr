'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function GsapReplay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.rp-bar', { scaleX: 0, transformOrigin: 'left', duration: 0.5 })
        .from('.rp-icon', { opacity: 0, scale: 0, duration: 0.4 }, '-=0.2')
        .from('.rp-title', { opacity: 0, x: -16, duration: 0.35 }, '-=0.25')
        .from('.rp-sub', { opacity: 0, x: -12, duration: 0.3 }, '-=0.2')
        .from(
          '.rp-tag',
          {
            opacity: 0,
            y: 8,
            scale: 0.85,
            stagger: 0.08,
            duration: 0.28
          },
          '-=0.15'
        );
    },
    { scope: containerRef, dependencies: [replay] }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-8"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-900 shadow-xl">
        <div className="rp-bar h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500" />
        <div className="flex items-start gap-4 p-5">
          <div className="rp-icon flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-2xl">
            🎬
          </div>
          <div className="min-w-0 space-y-1.5">
            <p className="rp-title font-bold text-white">GSAP Timeline</p>
            <p className="rp-sub text-sm leading-snug text-neutral-400">
              Sequenced entrance with stagger — all driven by one timeline.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['gsap', 'timeline', 'stagger'].map((t) => (
                <span
                  key={t}
                  className="rp-tag rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xsm font-medium text-orange-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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
