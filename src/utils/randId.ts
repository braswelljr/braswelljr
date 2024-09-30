/**
 * randomId - generates a random id
 * @param {number} len - length of id
 * @returns string
 */
export default function randomId(len: number = 16) {
  // generate a random number
  return Math.random().toString(64).substring(0, len)
}

export function randomString(length: number = 64) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  return crypto.getRandomValues(new Uint8Array(length)).reduce((acc, x) => acc + possible[x % possible.length], '')
}
