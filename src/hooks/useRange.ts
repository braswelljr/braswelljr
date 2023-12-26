import { useMemo } from 'react'

/**
 * useRange - Maps a number from one range to another
 * @param {number} num - The number to map
 * @param {number} inMin - The minimum value of the input range
 * @param {number} inMax - The maximum value of the input range
 * @param {number} outMin - The minimum value of the output range
 * @param {number} outMax - The maximum value of the output range
 * @returns {number}
 */
export default function useRange(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const mappedValue = useMemo(() => {
    const newValue = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    const largest = Math.max(outMin, outMax)
    const smallest = Math.min(outMin, outMax)
    return Math.min(Math.max(newValue, smallest), largest)
  }, [inMax, inMin, num, outMax, outMin])

  return mappedValue
}
