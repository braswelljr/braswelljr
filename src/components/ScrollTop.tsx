'use client'

import { useEffect, useRef } from 'react'
import { HiArrowUp } from 'react-icons/hi'
import clsx from 'clsx'

export default function ScrollTop({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Scroll event handler
    function scroll() {
      // Check if ref exists
      if (scrollRef.current) {
        // Check if scroll position is greater than 100px
        if (window.scrollY > 100) {
          scrollRef.current.classList.remove('translate-y-20')
        } else {
          scrollRef.current.classList.add('translate-y-20')
        }
      }
    }

    // Add event listener
    window.addEventListener('scroll', scroll)

    return () => {
      // Remove event listener
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <button
      ref={scrollRef}
      className={clsx(
        className,
        'flex h-10 w-10 translate-y-20 items-center justify-center rounded-sm bg-neutral-900 text-white transition-transform dark:bg-neutral-500 dark:text-white'
      )}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }}
    >
      <HiArrowUp className="h-5 w-auto" />
    </button>
  )
}
