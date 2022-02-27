import { forwardRef, CSSProperties } from 'react'
import clsx from 'clsx'

const SnapIntoView = forwardRef(
  (
    {
      children,
      className,
      style,
      rest
    }: {
      children?: JSX.Element | JSX.Element[]
      className?: string
      style?: CSSProperties
      rest?: any
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={clsx('snap-mandatory', className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

export default SnapIntoView
