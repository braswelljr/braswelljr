export const Next = array => {
  if (Array.isArray(array) && array.length > 0) {
    let i = 0
    let newIdx = i + 1
    if (newIdx >= array.length) {
      newIdx = 0
    }
    return newIdx
  }
}

export const Previous = array => {
  if (Array.isArray(array) && array.length > 0) {
    let i = 0
    let newIdx = i - 1
    if (newIdx <= 0) {
      newIdx = array.length
    }
    return newIdx
  }
}
