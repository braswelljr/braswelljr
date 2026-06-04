'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

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

  if (!mounted) return <div className="h-7 w-32 animate-pulse rounded bg-primary!" />;

  return (
    <Tabs
      value={theme}
      orientation="horizontal"
      className={cn('flex min-h-max shrink-0 items-center justify-center', classNames?.base)}
    >
      <TabsList
        indicatorClassName="bg-primary!"
        className="min-h-max font-semibold whitespace-nowrap"
      >
        {Object.entries({
          system: <HiDesktopComputer className={cn('size-3.5', classNames?.icon)} />,
          dark: <HiMoon className={cn('size-3.5', classNames?.icon)} />,
          light: <HiSun className={cn('size-3.5', classNames?.icon)} />
        }).map(([key, value], idx) => (
          <TabsTrigger
            key={idx}
            value={key}
            onClick={() => setTheme(key)}
            className={cn('size-7! text-primary!', key === theme && 'text-neutral-950!')}
          >
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
