import { useState, useEffect, RefObject } from 'react'
import { useRect } from '@reach/rect'

// useTop hook - it is used to detect the top value of a given area or rect
const useTop = (ref: RefObject<HTMLElement | null | undefined>) => {
  let [top, setTop] = useState<number>(0)
  let rect = useRect(ref)
  let rectTop = rect ? rect.top : undefined
  useEffect(() => {
    if (typeof rectTop === 'undefined') return
    let newTop = rectTop + window.pageYOffset
    if (newTop !== top) {
      setTop(newTop)
    }
  }, [rectTop, top])
  return top
}

export default useTop
