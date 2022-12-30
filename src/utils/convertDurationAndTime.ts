/**
 * convertDurationToTimeString - convert duration to string
 * @param duration - duration in seconds
 * @returns string
 * @example
 * convertDurationToTimeString(123) // 02:03
 * convertDurationToTimeString(1234) // 20:34
 */
export function convertDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60

  return [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')
}

/**
 * convertTimeToDuration - convert time to duration
 * @param time - time in string
 * @returns number
 * @example
 * convertTimeToDuration('02:03') // 123
 * convertTimeToDuration('20:34') // 1234
 */
export function convertTimeToDuration(time: string): number {
  // extract hours, minutes and seconds from time
  const [hours, minutes, seconds] = time.split(':').map(Number)

  // get convert to duration
  return hours * 3600 + minutes * 60 + seconds
}
