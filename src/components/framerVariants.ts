export const pageTransitionVariant = {
  hidden: {
    // opacity: 0,
    y: '-100%',
    rotate: -90,
    scale: 0.7,
    transition: {
      duration: 2,
      ease: [0.87, 0, 0.13, 1]
    }
  },
  enter: {
    // opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
      duration: 2,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 1,
      delayChildren: 2
    }
  },
  exit: {
    // opacity: 0,
    y: '100%',
    scale: 0.7,
    rotate: 90,
    transition: {
      duration: 3,
      ease: [0.87, 0, 0.13, 1]
    }
  }
}

export const pageItemVariant = {
  exit: { opacity: 0 },
  enter: { opacity: 1 }
}
