'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

/**
 * useMedia hook to detect media queries
 * @param {string} query - media query to evaluate
 * @param {boolean} defaultState - value used during SSR, before a window exists
 * @returns boolean
 * @example
 * const isWide = useMedia('(min-width: 480px)')
 * // isWide is true if screen width is >= 480px
 *
 * Backed by `useSyncExternalStore` so the first client render already reports
 * the real match. The previous `useEffect` version always rendered
 * `defaultState` once and corrected itself a tick later, which made anything
 * sized off the result (grid limits, item counts) visibly jump on mount.
 */
export default function useMedia(query: string, defaultState = false): boolean {
  const mql = useMemo(
    () => (typeof window === 'undefined' ? null : window.matchMedia(query)),
    [query]
  );

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!mql) return () => {};

      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [mql]
  );

  const getSnapshot = useCallback(() => (mql ? mql.matches : defaultState), [mql, defaultState]);
  const getServerSnapshot = useCallback(() => defaultState, [defaultState]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
