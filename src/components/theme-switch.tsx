'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger } from '~/components/ui/segmented-control';

export function ThemeSwitch({
  classNames
}: {
  classNames?: {
    base?: string;
    icon?: string;
    panel?: string;
    indicator?: string;
    block?: string;
  };
}): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-primary dark:bg-secondary h-7 w-32 animate-pulse rounded" />;

  return (
    <SegmentedControl
      value={theme}
      className={cn('flex min-h-max shrink-0 items-center justify-center', classNames?.base)}
    >
      <SegmentedControlList
        orientation="horizontal"
        className="min-h-max font-semibold whitespace-nowrap"
        classNames={{ indicator: cn('bg-primary dark:bg-secondary', classNames?.indicator) }}
      >
        {Object.entries({
          system: <HiDesktopComputer className={cn('size-3.5', classNames?.icon)} />,
          dark: <HiMoon className={cn('size-3.5', classNames?.icon)} />,
          light: <HiSun className={cn('size-3.5', classNames?.icon)} />
        }).map(([key, value], idx) => (
          <SegmentedControlTrigger
            key={idx}
            value={key}
            onClick={() => setTheme(key)}
            className={cn('text-primary dark:text-secondary p-1.5', key === theme && 'text-neutral-950!')}
          >
            {value}
          </SegmentedControlTrigger>
        ))}
      </SegmentedControlList>
    </SegmentedControl>
  );
}
