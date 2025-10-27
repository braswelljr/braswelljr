'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { HiOutlineDesktopComputer, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { cn } from 'lib/utils';

const themes = [
  { name: 'system', icon: HiOutlineDesktopComputer, label: 'System' },
  { name: 'light', icon: HiOutlineSun, label: 'Light' },
  { name: 'dark', icon: HiOutlineMoon, label: 'Dark' }
];

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn('size-8 animate-pulse rounded-xl bg-neutral-950 dark:bg-neutral-50', className)} />;
  }

  const currentThemeIndex = themes.findIndex((t) => t.name === theme);
  const currentTheme = themes[currentThemeIndex] || themes[0];

  const handleThemeChange = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      className={cn('relative flex size-8 items-center justify-center rounded-lg transition-colors duration-200', className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${themes[(currentThemeIndex + 1) % themes.length].label} theme`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme.name}
          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <currentTheme.icon className="size-6 text-neutral-900 dark:text-yellow-500" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
