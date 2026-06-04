'use client';

import { Fragment, useEffect, useId, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { LayoutGroup, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { RadioGroup, RadioGroupItem } from './radio-group';

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
  const id = useId();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Fragment />;

  return (
    <LayoutGroup>
      <ul className={cn('flex items-center space-x-2', classNames?.base)}>
        {Object.entries({
          system: <HiDesktopComputer className={cn('h-3 w-auto', classNames?.icon)} />,
          dark: <HiMoon className={cn('h-3 w-auto', classNames?.icon)} />,
          light: <HiSun className={cn('h-3 w-auto', classNames?.icon)} />
        }).map(([key, value], i, self) => (
          <li
            key={key}
            className={cn('relative block cursor-pointer p-2', classNames?.panel)}
            onClick={() => setTheme(key)}
          >
            {key === theme && (
              <motion.span
                layoutId={id}
                initial={false}
                className={cn(
                  'absolute inset-0 size-full bg-primary',
                  i === 0 && 'rounded-l-xl',
                  i === self.length - 1 && 'rounded-r-xl',
                  classNames?.indicator
                )}
              />
            )}
            <span className={cn('relative z-1 block size-full', classNames?.block)}>{value}</span>
          </li>
        ))}
      </ul>
    </LayoutGroup>
  );
}

const items = [
  {
    id: 'radio-18-r1',
    value: 'r1',
    label: 'Light',
    image: '../..assets/images/ui-light.png'
  },
  {
    id: 'radio-18-r2',
    value: 'r2',
    label: 'Dark',
    image: '../..assets/images/ui-dark.png'
  },
  {
    id: 'radio-18-r3',
    value: 'r3',
    label: 'System',
    image: '../..assets/images/ui-system.png'
  }
];

export function ThemeSwitchBlock() {
  return (
    <fieldset className="space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">Choose a theme</legend>
      <RadioGroup
        className="flex gap-3"
        defaultValue="r1"
      >
        {items.map((item) => (
          <label key={item.id}>
            <RadioGroupItem
              id={item.id}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <img
              src={item.image}
              alt={item.label}
              width={88}
              height={70}
              className="border-input ring-offset-background peer-focus-visible:ring-ring/70 peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent relative cursor-pointer overflow-hidden rounded-lg border shadow-xs shadow-black/4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50"
            />
            <span className="peer-data-[state=unchecked]:text-muted-foreground/70 group mt-2 flex items-center gap-1">
              <Check
                size={16}
                strokeWidth={2}
                className="peer-data-[state=unchecked]:group-[]:hidden"
                aria-hidden="true"
              />
              <Minus
                size={16}
                strokeWidth={2}
                className="peer-data-[state=checked]:group-[]:hidden"
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
