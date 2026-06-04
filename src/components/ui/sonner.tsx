'use client';

import { useTheme } from 'next-themes';
import { Toaster, ToasterProps } from 'sonner';

const Sonner = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Toaster
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      {...props}
    />
  );
};

export { Sonner };
