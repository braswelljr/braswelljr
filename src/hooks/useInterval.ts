import { useEffect, useRef } from 'react'

/**
 * useInterval hook - sets reference to the previous value and returns a given value within a particular duration.
 * @param callback - callback function
 * @param delay - delay in milliseconds
 * @returns {void}
 */
export default function useInterval(callback: () => unknown, delay = 1000): void {
  const savedCallback = useRef<() => unknown>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const id = window.setInterval(
      () =>
        typeof savedCallback.current === 'function' && typeof savedCallback.current !== 'undefined'
          ? savedCallback.current()
          : savedCallback.current,
      delay
    )
    return () => window.clearInterval(id)
  }, [delay])
}
