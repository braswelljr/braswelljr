'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from 'lib/utils'

interface TabProps {
  title: string
  content: string
}

export default function Tab({ contains, className }: { contains: TabProps[]; className?: string }) {
  const [tab, setTab] = useState(contains[0])
  const animationId = useId()

  return (
    <div className={cn('my-5', className)}>
      <div className="space-y-2">
        {/* menu items */}
        <div className="flex w-full items-center space-x-4 overflow-x-auto border border-orange-300 dark:border-[0.5px] max-xsm:text-sm">
          {contains.map((item, idx) => (
            <button key={idx} className={cn('relative')} onClick={() => setTab(item)}>
              <AnimatePresence>
                {tab.title === item.title && (
                  <motion.div
                    layoutId={animationId}
                    className={cn(
                      'absolute inset-0 bottom-0 h-full w-full bg-orange-300/50 backdrop-blur',
                      idx === 0 && 'rounded-l-sm',
                      idx === contains.length - 1 && 'rounded-r-sm'
                    )}
                  />
                )}
              </AnimatePresence>
              <div className={cn('relative z-[1] flex items-center space-x-2 px-3 py-1 font-light uppercase')}>
                {/* <item.icon className="h-4 w-auto" /> */}
                <span>{item.title}</span>
              </div>
            </button>
          ))}
        </div>
        {/* content */}
        <div className="border border-orange-300 px-4 py-5 dark:border-[0.5px]">
          {/* <code className="h-[30vh] w-full overflow-y-auto">{tab.content}</code> */}
          {contains.map(
            (item, idx) =>
              item.content === tab.content && (
                <AnimatePresence key={idx}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      duration: 1,
                      delay: 0.25,
                      stiffness: 260,
                      damping: 20
                    }}
                    className="h-[10vh] w-full overflow-y-auto"
                  >
                    {item.content}
                  </motion.div>
                </AnimatePresence>
              )
          )}
        </div>
      </div>
    </div>
  )
}
