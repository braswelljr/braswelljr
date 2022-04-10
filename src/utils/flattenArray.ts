// flattenArray - repeatedly steps through array and concatenates all nested arrays
export default function flattenArray(array: any[]): any[] {
  return array.reduce(
    (flat: any, toFlat: any[]) =>
      flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat),
    []
  )
}
