'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function GsapTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(avatarRef.current, { opacity: 0, scale: 0.5, duration: 0.45 })
        .from(nameRef.current, { opacity: 0, x: -20, duration: 0.35 }, '-=0.1')
        .from(roleRef.current, { opacity: 0, x: -20, duration: 0.3 }, '-=0.15')
        .from(badgeRef.current, { opacity: 0, y: 10, scale: 0.8, duration: 0.3 }, '-=0.1');
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8">
      <div className="flex items-center gap-4 rounded-2xl bg-neutral-900 px-6 py-4 shadow-xl">
        <div
          ref={avatarRef}
          className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-xl font-bold text-white"
        >
          B
        </div>
        <div className="space-y-0.5">
          <p ref={nameRef} className="font-bold text-white">
            Braswell Jr.
          </p>
          <p ref={roleRef} className="text-sm text-neutral-400">
            Software Engineer
          </p>
          <div
            ref={badgeRef}
            className="inline-block rounded-full bg-orange-500/20 px-2 py-0.5 text-xsm font-medium text-orange-400"
          >
            Available
          </div>
        </div>
      </div>
    </div>
  );
}
