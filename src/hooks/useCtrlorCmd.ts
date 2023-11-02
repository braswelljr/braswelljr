import { useEffect, useState } from 'react'

/**
 * useCtrlorCmd - A hook to check if the user is pressing ctrl or cmd + key
 * @param {string} key - The key to check for
 * @param {function} callback - A callback function to run if the user is pressing ctrl or cmd + key
 * @param {Array} deps - An array of dependencies to pass to useEffect
 * @returns {boolean}
 * @example
 * useCtrlorCmd('s', (isCtrlOrCmd) => {
 *  if (isCtrlOrCmd) {
 *   // Do something
 * }
 * }, [someState])
 */
export default function useCtrlorCmd(key: string, callback: (isCtrlOrCmd: boolean) => void): boolean {
  const [isCtrlOrCmd, setIsCtrlOrCmd] = useState(false)

  useEffect(() => {
    // downHandler to set isCtrlOrCmd to true when the user presses the key combination
    function downHandler(e: KeyboardEvent) {
      // If the user is pressing ctrl or cmd + key
      if (e.key === key && (e.ctrlKey || e.metaKey)) {
        // set isCtrlOrCmd to true
        setIsCtrlOrCmd(true)
        // run the callback function and pass isCtrlOrCmd as an argument to be used in the callback
        callback(isCtrlOrCmd)
      }

      return
    }

    // Add event listeners
    window.addEventListener('keydown', downHandler)

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener('keydown', downHandler)
    }
  }, [callback, isCtrlOrCmd, key])

  return isCtrlOrCmd
}
