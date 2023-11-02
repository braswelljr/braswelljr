import { CSSProperties, forwardRef, ReactNode, useMemo, useState } from 'react'
import { cn } from 'lib/utils'
import type { EditorCodeWindowI, EditorTabI, EditorTabItemI } from 'types/Editor'
import { Code } from '~/components/Code/Code'

export const EditorTabItem = forwardRef<
  HTMLDivElement,
  EditorTabItemI & {
    active?: boolean
    children?: ReactNode
  }
>(({ name, saved, open = true, active = false, children, className }, ref) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-none items-center border-b border-t border-b-sky-300 border-t-transparent px-4 py-1 text-sky-300',
        active && 'bg-neutral-900/10',
        hover && 'bg-neutral-900/5',
        open ? 'font-medium' : 'italic',
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {name}
      {saved ? (
        <svg viewBox="0 0 4 4" className="ml-2.5 h-1 w-1 flex-none overflow-visible text-neutral-500">
          <path d="M-1 -1L5 5M5 -1L-1 5" fill="none" stroke="currentColor" strokeLinecap="round" />
        </svg>
      ) : (
        <div className="ml-2.5 h-1 w-1 flex-none rounded-full bg-current" />
      )}
      {children}
    </div>
  )
})
EditorTabItem.displayName = 'EditorTabItem'

export const EditorTab = forwardRef<HTMLDivElement, EditorTabI>(
  (
    { Component = 'div', primary, secondary = [], showTabMarkers = true, side = 'left', translucent = false, children },
    _ref
  ) => {
    return (
      <Component className={cn('flex text-xs text-neutral-400')}>
        <div className="flex flex-none items-center border-b border-t border-b-sky-300 border-t-transparent px-4 py-1 text-sky-300">
          {primary.name}
          {showTabMarkers &&
            (primary.saved ? (
              <svg viewBox="0 0 4 4" className="ml-2.5 h-1 w-1 flex-none overflow-visible text-neutral-500">
                <path d="M-1 -1L5 5M5 -1L-1 5" fill="none" stroke="currentColor" strokeLinecap="round" />
              </svg>
            ) : (
              <div className="ml-2.5 h-1 w-1 flex-none rounded-full bg-current" />
            ))}
        </div>
        <div
          className={cn(
            'flex flex-auto items-center border border-neutral-500/30 bg-neutral-700/50',
            side === 'left' ? 'rounded-tl lg:rounded-tr' : 'rounded-tl',
            translucent && 'dark:bg-neutral-800/50'
          )}
        >
          {secondary.map(({ name, open = true, className }) => (
            <div
              key={name}
              className={cn('border-r border-neutral-200/5 px-4 py-1', className, {
                italic: !open
              })}
            >
              {name}
            </div>
          ))}
          {children && <div className="flex flex-auto items-center justify-end space-x-4 px-4">{children}</div>}
        </div>
      </Component>
    )
  }
)
EditorTab.displayName = 'EditorTab'

export const EditorCodeWrapper = forwardRef<HTMLDivElement, { children?: ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="flex flex-auto overflow-hidden bg-neutral-900/5 dark:bg-neutral-800/50">
      {children}
    </div>
  )
})
EditorCodeWrapper.displayName = 'EditorCodeWrapper'

export const EditorCodeWindow = forwardRef<HTMLDivElement, EditorCodeWindowI>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-auto flex-col overflow-hidden bg-neutral-900/5 dark:bg-neutral-800/50', className)}
    >
      {children}
    </div>
  )
})
EditorCodeWindow.displayName = 'EditorCodeWindow'

export function EditorCode({
  children,
  className,
  border = true
}: {
  children?: ReactNode
  className?: string
  border?: boolean
}) {
  return (
    <div
      className={cn(
        'relative flex h-[31.625rem] max-h-[60vh] overflow-hidden bg-neutral-800 shadow-xl dark:bg-neutral-900/70 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem]',
        className
      )}
    >
      <div className="relative flex w-full flex-col">
        <div className={cn('flex-none', border && 'border-b border-neutral-500/30')}>
          <div className="flex h-8 items-center space-x-1.5 px-3">
            <div className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
            <div className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
            <div className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
          </div>
        </div>
        <div className="relative flex min-h-0 flex-auto flex-col">{children}</div>
      </div>
    </div>
  )
}

EditorCode.Code = forwardRef<
  HTMLDivElement,
  {
    tokens: string[]
    initialLineNumber?: number
    className?: string
    style?: CSSProperties
  }
>(({ tokens, initialLineNumber = 1, ...props }, ref) => {
  const lineNumbers = useMemo(() => {
    const t = tokens.flat(Infinity)
    let line = initialLineNumber + 1
    let str = `${initialLineNumber}\n`
    for (let i = 0; i < t.length; i++) {
      if (typeof t[i] === 'string') {
        const newLineChars = t[i].match(/\n/g)
        if (newLineChars !== null) {
          for (let j = 0; j < newLineChars.length; j++) {
            str += `${line++}\n`
          }
        }
      }
    }
    return str
  }, [initialLineNumber, tokens])

  return (
    <div className="flex min-h-0 w-full flex-auto overflow-auto">
      <div ref={ref} className="relative w-full flex-auto">
        <pre className="flex min-h-full text-sm leading-6">
          <div
            aria-hidden="true"
            className="hidden flex-none select-none py-4 pr-4 text-right text-slate-600 md:block"
            style={{ width: 50 }}
          >
            {lineNumbers}
          </div>
          <code className="relative block flex-auto overflow-auto px-4 pb-4 pt-4 text-slate-50">
            <Code tokens={tokens} {...props} />
          </code>
        </pre>
      </div>
    </div>
  )
})
EditorCode.displayName = 'EditorCode'
