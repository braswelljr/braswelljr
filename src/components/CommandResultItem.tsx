import { forwardRef, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { Action, ActionImpl } from 'kbar'
import { LottieComponentProps } from 'lottie-react'

export interface ItemProps {
  icon?: LottieComponentProps
}

export interface CommandResultItemProps {
  className?: string
  action: ActionImpl
  iconSize?: { width: number; height: number }
  active: boolean
  currentRootActionId?: string | null
}

/**
 * CommandResultItem - A component that renders a command result item
 * @param {CommandResultItemProps} props
 * @property {ComponentType} Component - The component to render
 * @property {string} className - The className of the component
 * @property {object} item - The item to render
 * @property {object} iconSize - The size of the icon
 * @property {boolean} active - Whether the item is active
 * @returns {JSX.Element} - A command result item
 */
const ResultItem = forwardRef<HTMLDivElement, CommandResultItemProps>(
  ({ className, action, active, currentRootActionId }, ref) => {
    const { icon: i, name, shortcut } = action
    let icon = i as LottieComponentProps & Action['icon']

    const ancestors = useMemo(() => {
      // If there is no currentRootActionId, return all ancestors
      if (!currentRootActionId) return action.ancestors

      // Otherwise, return all ancestors after the currentRootActionId
      const index = action.ancestors.findIndex(ancestor => ancestor.id === currentRootActionId)
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1)
    }, [action.ancestors, currentRootActionId])

    useEffect(() => {
      if (icon?.lottieRef?.current) {
        active ? icon.lottieRef.current.play() : icon.lottieRef.current.stop()
      }
    }, [active, icon])

    return (
      <div
        ref={ref}
        className={clsx(className)}
        onMouseEnter={() => icon?.lottieRef?.current?.play()}
        onMouseLeave={() => icon?.lottieRef?.current?.stop()}
      >
        {/* parent */}
        <div
          className={clsx(
            'flex cursor-pointer items-center justify-between px-4 py-2 text-xs sm:text-sm lg:px-6 lg:py-3',
            active && 'bg-neutral-800/50'
          )}
        >
          <div className="flex items-center">
            {icon && icon}
            <span className="ml-2">{name}</span>
          </div>
          {shortcut && Array.isArray(shortcut) && shortcut.length > 0 ? (
            <div className="flex items-center justify-end space-x-1">
              {shortcut.map((s, i) => (
                <kbd
                  key={i}
                  className="rounded-sm bg-neutral-500/50 px-1.5 py-0.5 text-xs font-medium uppercase dark:bg-neutral-700/50"
                  aria-hidden
                >
                  {s}
                </kbd>
              ))}
            </div>
          ) : null}
        </div>

        {/* children if they exist */}
        {ancestors.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 text-xs sm:text-sm lg:px-6 lg:py-3">
            <div className="flex items-center">
              {ancestors.map((ancestor, i) => (
                <span key={i} className="ml-2">
                  {ancestor.name}
                  {i < ancestors.length - 1 && ' > '}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

ResultItem.displayName = 'CommandResultItem'

export default ResultItem
