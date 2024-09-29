'use client'

import { useEffect, useState } from 'react'

type DeviceType = 'mobile' | 'desktop' | 'tablet'

export const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export function useDevice() {
  const [device, setDevice] = useState<DeviceType>('desktop')

  useEffect(() => {
    function updateDevice() {
      const userAgent = navigator.userAgent
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const screenWidth = window.innerWidth

      // Define breakpoints for mobile and tablet
      const mobileBreakpoint = 768
      const tabletBreakpoint = 1024

      // Check for mobile using userAgent and screen width
      if (/Mobi|Android|iPhone|iPod/i.test(userAgent) || (isTouchDevice && screenWidth <= mobileBreakpoint)) {
        setDevice('mobile')
      }
      // Check for tablets by considering touch support and screen width
      else if (
        /iPad|Tablet|Nexus 7|Nexus 10/i.test(userAgent) ||
        (isTouchDevice && screenWidth > mobileBreakpoint && screenWidth <= tabletBreakpoint)
      ) {
        setDevice('tablet')
      }
      // Otherwise, it’s a desktop
      else {
        setDevice('desktop')
      }
    }

    updateDevice()

    // Recheck device type on window resize
    window.addEventListener('resize', updateDevice)

    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return device
}
