import { RefObject } from 'react';
import useEventListener from '~/hooks/useEventListener';

/**
 * useOnClickOutside - Hook that handles click events outside of a given element
 * @param ref - React ref object
 * @param handler - Function to be called when click event is outside of the given element
 * @param mouseEvent - Mouse event to listen for
 * @returns void
 */
export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) return;

    // Call handler function to handle outside click event
    handler(event);
  });
}
