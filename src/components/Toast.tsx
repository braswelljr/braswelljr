import { ReactNode, useEffect } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiPlus,
  HiPlusCircle
} from 'react-icons/hi'

const Toast = ({
  title,
  description,
  type = 'default',
  showToast,
  setShowToast,
  className
}: {
  className?: string
  title?: ReactNode
  description?: ReactNode
  type: 'success' | 'error' | 'warning' | 'info' | 'default'
  showToast: boolean
  setShowToast: (showToast: boolean) => void
}) => {
  const toastVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showToast) {
        setShowToast(false)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [showToast, setShowToast])

  return (
    <motion.div
      className={clsx(
        className,
        'fixed right-1/2 bottom-5 z-[3] w-11/12 !translate-x-1/2 rounded-sm border bg-neutral-200 py-2 px-2 text-neutral-900 shadow-sm backdrop-blur-sm dark:bg-neutral-700 dark:text-neutral-400 sm:w-[600px]',
        {
          'border-green-600 dark:border-green-600': type === 'success',
          'border-red-600 dark:border-red-600': type === 'error',
          'border-yellow-500 dark:border-yellow-500': type === 'warning',
          'border-blue-500 dark:border-blue-500': type === 'info',
          'border-neutral-500 dark:border-neutral-500': type === 'default'
        }
      )}
      initial="hidden"
      animate={showToast ? 'visible' : 'hidden'}
      variants={toastVariants}
    >
      {/* Close */}
      <button
        id="search-button"
        className={clsx(
          'absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-sm bg-neutral-900 text-neutral-100 hover:bg-neutral-800 focus:outline-none dark:bg-neutral-500 dark:text-white'
        )}
        onClick={() => setShowToast(false)}
      >
        <HiPlus className="h-4 w-auto rotate-45" />
      </button>
      {/* Check */}
      <div className="grid grid-cols-[1fr,7fr]">
        <div className="flex items-center justify-center">
          {type === 'success' && (
            <HiCheckCircle className="h-8 w-auto text-green-600 dark:text-green-600" />
          )}
          {type === 'error' && (
            <HiPlusCircle className="h-8 w-auto rotate-45 text-red-600 dark:text-red-600" />
          )}
          {type === 'warning' && (
            <HiExclamationCircle className="h-8 w-auto text-yellow-500 dark:text-yellow-500" />
          )}
          {type === 'info' && (
            <HiInformationCircle className="h-8 w-auto text-blue-500 dark:text-blue-500" />
          )}
          {type === 'default' && (
            <HiExclamationCircle className="h-8 w-auto text-neutral-500 dark:text-neutral-500" />
          )}
        </div>
        {/* Header */}
        <div className="space-y-2">
          <div className="font-semibold uppercase leading-relaxed text-slate-800 dark:text-white">
            {title}
          </div>
          {/* Description */}
          <div className="text-xs text-slate-600 dark:text-neutral-300 sm:text-sm">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Toast
