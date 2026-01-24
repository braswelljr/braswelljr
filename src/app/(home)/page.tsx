'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useInterval } from 'react-use';
import { cn } from 'lib/utils';
import FloatingDock from '~/components/ui/floating-dock';
import { socials } from '~/config/data';
import { useDevice } from '~/hooks/use-device';

export default function Page() {
  const [r, setR] = useState<number>(0);
  const roles: string[] = ['Software Engineer', 'Web Designer', 'UX / UI Designer'];
  const device = useDevice();

  useInterval(() => {
    if (roles.length > 0) {
      let newIdx = r + 1;
      if (newIdx >= roles.length) newIdx = 0;

      setR(newIdx);
    }
  }, 5000);

  return (
    <main className={cn('flex size-full min-h-dvh items-center justify-center px-4 py-10 md:py-20')}>
      <section className="space-y-4 py-10 max-sm:pt-20">
        <Image
          src="/images/braswelljr.png"
          alt="braswelljr"
          loading="eager"
          height={350}
          width={120}
          className="mx-auto"
        />
        <div className="space-y-8 md:space-y-12">
          <div className="text-center text-lg font-extralight sm:text-xl md:text-2xl">
            <div className="">I am</div> <div className="font-cascadia font-bold">Braswell Kenneth Azu Jr.</div>
          </div>
          <AnimatePresence mode="wait">
            {roles.map(
              (role, id) =>
                r === id && (
                  <motion.div
                    key={id}
                    className={cn(
                      'to-primary xxs:text-2xl xsm:text-3xl dark:to-primary from-secondary bg-linear-to-l bg-clip-text pb-3 text-center font-sans text-xl font-black text-transparent uppercase sm:text-4xl md:text-5xl'
                    )}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: 'spring', duration: 1, delay: 0.25, stiffness: 260, damping: 20 }}
                  >
                    a {role}
                  </motion.div>
                )
            )}
          </AnimatePresence>
          <div className="mx-auto w-full max-w-sm">
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
                classNames={{ container: 'data-[motion-hover=true]:bg-linear-to-l from-secondary to-primary backdrop-blur-md' }}
              />
            ) : (
              <div className="xs:space-x-6 mx-auto flex items-center justify-center space-x-3">
                {socials.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon className="h-6 w-auto md:h-9" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="text-center">
            Reach out at{' '}
            <Link
              href="mailto:{braswellkenneth7@gmail.com}"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-cascadia pb-1 font-bold"
            >
              <span className="from-secondary to-primary bg-linear-to-l bg-clip-text text-transparent">braswellkenneth7@gmail.com</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
