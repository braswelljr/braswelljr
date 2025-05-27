'use client';

import { useTheme } from 'next-themes';
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi';
import { motion } from 'motion/react';
import { cn } from 'lib/utils';

export default function ThemeSwitch({
  className,
  classNames
}: {
  className?: string;
  classNames?: { base?: string; icon?: string; panel?: string; indicator?: string; block?: string };
}) {
  const { theme, setTheme } = useTheme();

  return (
    <ul className={cn('flex items-center justify-center space-x-2', classNames?.base, className)}>
      {[
        {
          key: 'system',
          icon: <HiDesktopComputer className={cn('size-4', classNames?.icon)} />
        },
        { key: 'dark', icon: <HiMoon className={cn('size-4', classNames?.icon)} /> },
        { key: 'light', icon: <HiSun className={cn('size-4', classNames?.icon)} /> }
      ].map(({ key, icon }, i, self) => (
        <li
          key={key}
          className={cn('relative block cursor-pointer p-1.5', classNames?.panel)}
          onClick={() => setTheme(key)}
        >
          {key === theme && (
            <motion.span
              layoutId="theme-bubble:switch"
              className={cn(
                'absolute inset-0 size-full bg-neutral-800 dark:bg-neutral-500',
                i === 0 && 'rounded-l-sm',
                i === self.length - 1 && 'rounded-r-sm',
                classNames?.indicator
              )}
            />
          )}
          <div className={cn('relative z-[1]', key === theme && 'text-white', classNames?.block)}>{icon}</div>
        </li>
      ))}
    </ul>
  );
}
