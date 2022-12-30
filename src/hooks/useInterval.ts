import { useEffect, useRef, ReactNode } from 'react'

/**
 * useInterval hook - sets reference to the previous value and returns a given value within a particular duration.
 * @param callback - callback function
 * @param delay - delay in milliseconds
 * @returns {void}
 */
export default function useInterval(
  callback: () => ReactNode | void,
  delay = 1000
) {
  const savedCallback = useRef<() => ReactNode | void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(
      () =>
        typeof savedCallback.current === 'function' &&
        typeof savedCallback.current !== 'undefined'
          ? savedCallback.current()
          : savedCallback.current,
      delay
    )
    return () => clearInterval(id)
  }, [delay])
}
