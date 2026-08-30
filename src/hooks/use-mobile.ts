'use client';

import useMedia from '@/hooks/use-media';

/**
 * Below this width the chat layout collapses from a two-pane split to one pane.
 * Wider than a phone on purpose: the master-detail split needs room for a list
 * and a thread side by side, which a tablet does not have.
 */
const MOBILE_BREAKPOINT = 1024;

/**
 * Built on `useMedia` rather than its own effect.
 *
 * The version this was ported from set state inside an effect, so the first
 * client render always reported `false` and corrected itself a tick later,
 * which made the layout flip panes on mount. `useMedia` reads through
 * `useSyncExternalStore`, so the first render already has the real answer.
 */
export function useIsMobile(): boolean {
  return useMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}
