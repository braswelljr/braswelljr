import clsx from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'

const Item = ({
  tab,
  isSelected,
  onClick,
  itemClassName
}: {
  tab: any
  isSelected: boolean
  onClick: () => void
  itemClassName?: {
    container?: string
    item?: string
    isSelected?: string
    notSelected?: string
  }
}) => {
  return (
    <li className="relative">
      {isSelected && (
        <motion.div
          layoutId="highlight"
          className={clsx('absolute inset-0', itemClassName?.container)}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          `relative z-10 block w-full transition-colors duration-300 focus:outline-none ${
            isSelected
              ? itemClassName?.isSelected ?? 'text-white'
              : itemClassName?.notSelected ?? 'text-yellow-300'
          }`,
          itemClassName?.item
        )}
      >
        {tab}
      </button>
    </li>
  )
}

export default function Tabs({
  tabs,
  selected = Array.isArray(tabs) ? tabs[0] : Object.keys(tabs)[0],
  onChange = () => {},
  addFunction = () => {},
  className = '',
  direction = 'column',
  itemClassName
}: {
  tabs: any | any[]
  selected: any
  onChange: (tab?: any, addFunction?: any) => void
  addFunction?: () => void
  className?: string
  direction?: 'column' | 'row'
  itemClassName?: {
    container?: string
    item?: string
    isSelected?: string
    notSelected?: string
  }
}) {
  const tabLength = Array.isArray(tabs) ? tabs.length : Object.keys(tabs).length

  return (
    <AnimateSharedLayout>
      <ul
        className={clsx('grid whitespace-nowrap', className)}
        style={{
          gridTemplateColumns:
            direction === 'column'
              ? `repeat(${tabLength}, minmax(0, 1fr))`
              : ``,
          gridTemplateRows:
            direction === 'row' ? `repeat(${tabLength}, minmax(0, 1fr))` : ``
        }}
      >
        {(Array.isArray(tabs) ? tabs : Object.keys(tabs)).map(tab => (
          <Item
            key={tab}
            tab={Array.isArray(tabs) ? tab : tabs[tab]}
            isSelected={selected === tab}
            onClick={() => {
              onChange(tab)
              addFunction()
            }}
            itemClassName={itemClassName}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  )
}
