'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { createPortal } from 'react-dom';
import { cn } from 'lib/utils';

export default function Search({
  defaultOpen = false,
  open: openProp,
  onOpenChange: setOpenProp,
  searchButtonRef
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  searchButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const searchId = useId();
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [isAskAiActive, onAskAiToggle] = useState<boolean>(true);
  const { push } = useRouter();

  const [_open, _setOpen] = useState(defaultOpen);
  const o = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(o) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, o]
  );

  const onOpen = useCallback(() => setOpen(true), [setOpen]);

  const onClose = useCallback(() => setOpen(false), [setOpen]);

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setOpen(true);
      setSearchQuery(e.key);
    },
    [setOpen]
  );

  useEffect(() => {
    function onKeyClose(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;

      e.preventDefault();
      setSearchQuery(undefined);
      onClose();
    }
    window.addEventListener('keydown', onKeyClose);
    return () => window.removeEventListener('keydown', onKeyClose);
  }, [onClose]);

  useDocSearchKeyboardEvents({
    isOpen: o,
    onOpen,
    onClose,
    onInput,
    searchButtonRef: searchButtonRef,
    isAskAiActive,
    onAskAiToggle,
    keyboardShortcuts: {
      '/': true,
      'Ctrl/Cmd+K': false
    }
  });

  return (
    <div
      id={searchId}
      className={cn('fixed inset-0 z-11 size-full bg-neutral-500/80', !o && 'hidden')}
    >
      {o &&
        createPortal(
          <DocSearchModal
            initialQuery={searchQuery}
            initialScrollY={window.scrollY}
            placeholder="Search..."
            onClose={onClose}
            appId="QKSUPW3S6U"
            apiKey="c7fe5c895331a45ebd59889d32de1165"
            indices={['braswelljr']}
            navigator={{
              navigate({ itemUrl }: { itemUrl: string }) {
                setOpen(false);
                push(itemUrl);
              }
            }}
            transformItems={(items) => {
              return items.map((item, index) => {
                // We transform the absolute URL into a relative URL to
                // leverage Next's preloading.
                const a = document.createElement('a');
                a.href = item.url;

                const hash = a.hash === '#content-wrapper' ? '' : a.hash;

                if (item.hierarchy?.lvl0) {
                  item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&');
                }

                if (item._highlightResult?.hierarchy?.lvl0?.value) {
                  item._highlightResult.hierarchy.lvl0.value = item._highlightResult.hierarchy.lvl0.value.replace(/&amp;/g, '&');
                }

                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                  __is_result: () => true,
                  __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
                  __is_child: () => item.type !== 'lvl1' && items.length > 1 && items[0].type === 'lvl1' && index !== 0,
                  __is_first: () => index === 1,
                  __is_last: () => index === items.length - 1 && index !== 0
                };
              });
            }}
            hitComponent={({ hit, children }) => {
              return <Link href={hit.url}>{children}</Link>;
            }}
            onAskAiToggle={onAskAiToggle}
          />,
          document.body
        )}
    </div>
  );
}
