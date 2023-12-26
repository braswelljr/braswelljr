'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider as Theme } from 'next-themes'

export function ThemeProvider({ children }: { children?: ReactNode }) {
  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0

  useEffect(() => {
    function onPointermove({ x, y }: PointerEvent) {
      document.documentElement.style.setProperty('--x', `${x}`)
      document.documentElement.style.setProperty('--xp', `${x / innerWidth}`)
      document.documentElement.style.setProperty('--y', `${y}`)
      document.documentElement.style.setProperty('--yp', `${y / innerHeight}`)
    }

    window.addEventListener('pointermove', onPointermove)
    window.addEventListener('pointerout', onPointermove)

    return () => {
      window.removeEventListener('pointermove', onPointermove)
      window.removeEventListener('pointerout', onPointermove)
    }
  }, [innerHeight, innerWidth])

  return (
    <Theme enableSystem defaultTheme="light" attribute="class">
      <div data-mouse-glow />
      {children}
    </Theme>
  )
}
