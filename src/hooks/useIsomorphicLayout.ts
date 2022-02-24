import { useEffect, useLayoutEffect } from 'react'

// useIsomorphicLayoutEffect hooks - checks for a defined window to return useEffect after the DOM is painted or returns useLayoutEffect for an undefined hook.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
