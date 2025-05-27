export const variants = {
  initial: (direction: number) => ({
    x: 300 * direction,
    opacity: 0,
    filter: 'blur(4px)'
  }),
  active: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)'
  },
  exit: (direction: number) => ({
    x: -300 * direction,
    opacity: 0,
    filter: 'blur(4px)'
  })
};
