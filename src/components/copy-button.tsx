'use client';

import { useCallback, useEffect, useState } from 'react';
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';
import { cn } from 'lib/utils';
import { TerminalCommands } from 'types/unist';
import { Icons } from '~/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}

async function copyToClipboardWithMeta(value: string, _meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({ value, className, src, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <button
      className={cn(
        'relative z-20 inline-flex h-8 items-center justify-center rounded-md border-neutral-200 p-2 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-800',
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(value, {
          component: src
        });
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <Icons.check className="size-4" /> : <Icons.copy className="size-4" />}
    </button>
  );
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string;
  classNames: string;
  className: string;
}

export function CopyWithClassNames({ value, classNames, className, ...props }: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyToClipboard = useCallback((value: string) => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'relative z-20 inline-flex h-8 items-center justify-center rounded-md p-2 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-800',
          className
        )}
        {...props}
      >
        {hasCopied ? <Icons.check className="size-4" /> : <Icons.copy className="size-4" />}
        <span className="sr-only">Copy</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>
          <Icons.react className="mr-2 size-4" />
          <span>Component</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
          <Icons.tailwind className="mr-2 size-4" />
          <span>Classname</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<TerminalCommands>;
  className?: string;
}

export function CopyNpmCommandButton({ commands, className, ...props }: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyCommand = useCallback((value: string) => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'relative z-20 inline-flex h-8 items-center justify-center rounded-md p-2 text-sm font-medium text-white transition-all hover:bg-neutral-100 focus:outline-none',
          className
        )}
        {...props}
      >
        {hasCopied ? <Icons.check className="size-4" /> : <Icons.copy className="size-4" />}
        <span className="sr-only">Copy</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => copyCommand(commands.__yarnCommand__)}>
          <Icons.yarn className="mr-2 size-4 fill-[#2C8EBB]" />
          <span>yarn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__npmCommand__)}>
          <Icons.npm className="mr-2 size-4 fill-[#CB3837]" />
          <span>npm</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__pnpmCommand__)}>
          <Icons.pnpm className="mr-2 size-4 fill-[#F69220]" />
          <span>pnpm</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
