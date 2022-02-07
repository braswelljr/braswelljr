import { useEffect, useRef } from 'react'

export default function useInterval(
  callback: () => void | HTMLElement | undefined | null,
  delay = 1000
) {
  const savedCallback = useRef<() => void | HTMLElement | undefined | null>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(
      () =>
        savedCallback.current !== undefined
          ? savedCallback.current()
          : savedCallback.current,
      delay
    )
    return () => clearInterval(id)
  }, [delay])
}
