'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useInterval } from 'react-use';
import { cn } from 'lib/utils';
import {
  containerVariants,
  EASE_OUT,
  itemVariants,
  MotionLink,
  safeVariants,
  tapScale
} from '@/components/motion';
import FloatingDock from '@/components/ui/floating-dock';
import { socials } from '@/config/data';
import { useDevice } from '@/hooks/use-device';

gsap.registerPlugin(useGSAP);

export default function Page() {
  const [r, setR] = useState<number>(0);
  const roles: string[] = ['Software Engineer', 'Web Designer', 'UX / UI Designer'];
  const device = useDevice();
  const isReduced = useReducedMotion();

  // Refs for the GSAP entrance timeline
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useInterval(() => {
    if (roles.length > 0) {
      let newIdx = r + 1;
      if (newIdx >= roles.length) newIdx = 0;
      setR(newIdx);
    }
  }, 5000);

  // GSAP entrance timeline — fires once on mount
  useGSAP(
    () => {
      if (isReduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });

      tl.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.25'
        )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.15'
        )
        .fromTo(
          emailRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 },
          '-=0.15'
        );
    },
    { scope: containerRef }
  );

  const safeContainer = safeVariants(containerVariants, isReduced);
  const safeItem = safeVariants(itemVariants, isReduced);

  return (
    <main
      ref={containerRef}
      className={cn('flex size-full min-h-dvh items-center justify-center px-4 py-10 md:py-20')}
    >
      <section className="space-y-4 py-10 max-sm:pt-20">
        {/* Profile image */}
        <div ref={imgRef}>
          <Image
            src="/images/braswelljr.png"
            alt="Braswell Kenneth Azu Jr."
            loading="eager"
            height={350}
            width={120}
            className="mx-auto drop-shadow-xl"
          />
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Name */}
          <div
            ref={nameRef}
            className="text-center text-lg font-extralight sm:text-xl md:text-2xl"
          >
            <div>I am</div>
            <div className="font-cascadia font-bold tracking-tight">Braswell Kenneth Azu Jr.</div>
          </div>

          {/* Animated role */}
          <div ref={roleRef}>
            <AnimatePresence mode="wait">
              {roles.map(
                (role, id) =>
                  r === id && (
                    <motion.div
                      key={id}
                      className={cn(
                        'bg-linear-to-l from-secondary to-primary bg-clip-text pb-3 text-center font-sans text-xl font-black text-transparent uppercase xxs:text-2xl xsm:text-3xl sm:text-4xl md:text-5xl dark:to-primary'
                      )}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={
                        isReduced
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 260, damping: 20, delay: 0.05 }
                      }
                    >
                      a {role}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Social links */}
          <div
            ref={socialsRef}
            className="mx-auto w-full max-w-sm"
          >
            {device === 'desktop' ? (
              <FloatingDock
                className="mx-auto justify-center rounded-md bg-white/40 backdrop-blur dark:bg-neutral-900/40"
                items={socials.map((s) => ({
                  title: s.name,
                  icon: <s.icon className="size-9" />,
                  href: s.url,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }))}
                classNames={{
                  container:
                    'data-[motion-hover=true]:bg-linear-to-l from-secondary to-primary backdrop-blur-md'
                }}
              />
            ) : (
              <motion.div
                className="mx-auto flex items-center justify-center space-x-3 xs:space-x-6"
                variants={safeContainer}
                initial="hidden"
                animate="visible"
              >
                {socials.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={safeItem}
                    {...tapScale}
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      <item.icon className="h-6 w-auto md:h-9" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Email */}
          <div
            ref={emailRef}
            className="text-center"
          >
            Reach out at{' '}
            <MotionLink
              href="mailto:braswellkenneth7@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline pb-1 font-cascadia font-bold"
              whileHover={{ scale: 1.02 }}
              {...tapScale}
              transition={{ duration: 0.15, ease: EASE_OUT }}
            >
              <span className="bg-linear-to-l from-secondary to-primary bg-clip-text text-transparent">
                braswellkenneth7@gmail.com
              </span>
            </MotionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
