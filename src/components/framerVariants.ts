export const pageTransitionVariant = {
  hidden: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: 1,
      ease: [0.87, 0, 0.13, 1]
    }
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
      duration: 1,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 1,
      delayChildren: 2
    }
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 1,
      ease: [0.87, 0, 0.13, 1]
    }
  }
}

export const pageItemVariant = {
  exit: { opacity: 0 },
  enter: { opacity: 1 }
}
