import { useEffect, useState } from 'react'

/**
 * useWindowSize hook - is used to determine the with and height of a browser window.
 * @returns width, height
 */
export default function useWindowSize() {
  const isClient = typeof window === 'object'
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  })

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  return windowSize
}
