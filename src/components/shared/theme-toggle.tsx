'use client';

import type * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from 'lib/utils';
import { ActionSwapIcon } from '@/components/ui/action-swap';
import { Button } from '@/components/ui/button';
import useMounted from '@/hooks/use-mounted';

export type ThemeToggleVariant = 'rectangle' | 'circle' | 'circle-blur' | 'blinds' | 'diagonal';

export type ThemeToggleStart =
  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'bottom-up';

type Theme = 'light' | 'dark' | 'system';

type ViewTransitionDocument = Document & {
  startViewTransition(update: () => void): { finished: Promise<void> };
};

/**
 * Switches the theme behind a view transition. The reveal itself is CSS in
 * `main.css`, keyed off `data-theme-vt` and `data-theme-vt-start` on `<html>`,
 * so all this does is set those two attributes for the length of the switch.
 */
export function useThemeToggle({
  variant = 'rectangle',
  start = 'bottom-up'
}: { variant?: ThemeToggleVariant; start?: ThemeToggleStart } = {}) {
  const { setTheme, resolvedTheme } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === 'dark';

  const switchTo = (next: Theme, { animate = true }: { animate?: boolean } = {}) => {
    if (!animate || reduce || !('startViewTransition' in document)) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    root.dataset.themeVt = variant;
    root.dataset.themeVtStart = start;

    (document as ViewTransitionDocument)
      .startViewTransition(() => setTheme(next))
      .finished.finally(() => {
        delete root.dataset.themeVt;
        delete root.dataset.themeVtStart;
      });
  };

  const toggle = (options?: { animate?: boolean }) => switchTo(isDark ? 'light' : 'dark', options);

  return { isDark, mounted, toggle, switchTo };
}

export interface ThemeToggleProps extends Omit<
  React.ComponentProps<typeof Button>,
  'children' | 'onClick' | 'variant' | 'size'
> {
  /** Shape of the reveal. Default: "rectangle". */
  variant?: ThemeToggleVariant;
  /** Where the reveal starts. Default: "bottom-up". */
  start?: ThemeToggleStart;
  iconClassName?: string;
}

export function ThemeToggle({
  variant = 'rectangle',
  start = 'bottom-up',
  className,
  iconClassName,
  ...props
}: ThemeToggleProps) {
  const { isDark, mounted, toggle } = useThemeToggle({ variant, start });

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      // A keyboard press reports `detail === 0`. It switches without the
      // reveal, because a keyboard-initiated action is never animated.
      onClick={(event) => toggle({ animate: event.detail > 0 })}
      className={cn('rounded-sm text-primary', className)}
      {...props}
    >
      {mounted ? (
        <ActionSwapIcon
          value={isDark ? 'dark' : 'light'}
          className={cn('size-4', iconClassName)}
        >
          {isDark ? <Sun className={iconClassName} /> : <Moon className={iconClassName} />}
        </ActionSwapIcon>
      ) : (
        <span
          aria-hidden
          className={cn('size-4', iconClassName)}
        />
      )}
    </Button>
  );
}
