/**
 * Shared Framer Motion variants. Import these instead of redefining
 * transition curves in every component, so the whole site feels
 * consistently calm and unhurried.
 */

export const softEase = [0.22, 1, 0.36, 1]

export const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: softEase },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(6px)',
    transition: { duration: 0.6, ease: softEase },
  },
}

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: softEase, delay },
  }),
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: softEase, delay },
  }),
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}
