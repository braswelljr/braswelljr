import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { ROS } from '@/types/components/RevealOnScroll'

const RevealOnScroll = ({
  children,
  transition,
  visible,
  hidden,
  className,
  style,
  componentProps
}: ROS) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) controls.start('visible')
    else controls.start('hidden')
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={className}
      style={style}
      initial="hidden"
      transition={transition ?? { type: 'spring', duration: 1 }}
      variants={{
        visible: visible ?? { scale: 1, opacity: 1 },
        hidden: hidden ?? { scale: 0, opacity: 0 }
      }}
      {...componentProps}
    >
      {children}
    </motion.div>
  )
}

export default RevealOnScroll
