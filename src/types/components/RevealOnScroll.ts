import { MotionStyle, Transition, Variants } from 'framer-motion'

export type ROS = {
  children: React.ReactChild | React.ReactChildren
  className: string | undefined
  componentProps: React.Component
  style: MotionStyle | undefined
  transition: Transition | undefined
  visible: Variants | undefined
  hidden: Variants | undefined
}
