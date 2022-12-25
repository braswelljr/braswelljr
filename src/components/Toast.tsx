import { ReactNode } from 'react'
import clsx from 'clsx'
import * as ToastPrimitive from '@radix-ui/react-toast'

const Toast = ({
  title,
  description,
  isSuccess,
  showToast,
  setShowToast,
  children,
  className
}: {
  children: ReactNode
  className?: string
  title: ReactNode
  description: ReactNode
  isSuccess: boolean
  showToast: boolean
  setShowToast: (showToast: boolean) => void
}) => {
  return (
    <ToastPrimitive.Provider>
      {children}
      <div
        className={clsx(
          className,
          'rounded-sm border bg-neutral-200 dark:bg-neutral-800'
        )}
      ></div>
    </ToastPrimitive.Provider>
  )
}

export default Toast
