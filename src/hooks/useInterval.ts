import { useEffect, useRef } from 'react'

export default function useInterval(
  callback: () => void | undefined,
  delay: number
) {
  const savedCallback = useRef<() => void | HTMLElement | undefined>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
