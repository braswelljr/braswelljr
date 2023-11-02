// flattenArray - repeatedly steps through array and concatenates all nested arrays
export default function flattenArray<T>(array: Array<T | Array<T>>): Array<T> {
  return array.reduce<Array<T>>(
    (flat: Array<T>, toFlat: T | Array<T>) => flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat),
    []
  )
}
