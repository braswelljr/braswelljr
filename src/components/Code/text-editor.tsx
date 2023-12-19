import { forwardRef } from 'react'
import { cn } from 'lib/utils'
import { TextEditorI } from 'types/Editor'

export const TextEditor = forwardRef<HTMLDivElement, TextEditorI>(({ children, className }, ref) => {
  if (!children) {
    return (
      <div ref={ref} className={cn(className)}>
        No open files
      </div>
    )
  }

  return (
    <div ref={ref} className={cn(className)}>
      {children?.map((child, i) => {
        return <div key={i}>{child.children}</div>
      })}
    </div>
  )
})
