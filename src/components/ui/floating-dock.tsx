/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import { cn } from 'lib/utils';

export type IconT = { title: string; icon: React.ReactNode; href: string };

export default function FloatingDock({
  items,
  className,
  springConfig,
  classNames
}: {
  items: Array<IconT>;
  className?: string;
  classNames?: IconClassNames;
  springConfig?: SpringOptions;
}) {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={e => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900',
        className
      )}
    >
      {items.map(item => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} classNames={classNames} springConfig={springConfig} />
      ))}
    </motion.div>
  );
}

type IconClassNames = {
  base?: string;
  container?: string;
  icon?: string;
  title?: string;
};

type IconContainerProps = {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  classNames?: IconClassNames;
  springConfig?: SpringOptions;
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  classNames,
  springConfig = {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  }
}: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, springConfig);
  const height = useSpring(heightTransform, springConfig);

  const widthIcon = useSpring(widthTransformIcon, springConfig);
  const heightIcon = useSpring(heightTransformIcon, springConfig);

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} className={cn(classNames?.base)}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        data-motion-hover={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800',
          classNames?.container
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className={cn(
                'absolute -top-8 left-1/2 w-fit -translate-x-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
                classNames?.title
              )}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn('flex items-center justify-center', classNames?.icon)}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
