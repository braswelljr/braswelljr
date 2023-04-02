import { useLayoutEffect } from 'react'

/**
 * useLockBody hook - Locks the body scroll
 * @returns {void}
 */
export default function useLockBody(): void {
  useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
