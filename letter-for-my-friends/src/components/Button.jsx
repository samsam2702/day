import { motion } from 'framer-motion'

/**
 * A single, restrained button style used across the whole site.
 * No oversized buttons, no bright colors — per the brief.
 *
 * @param {{children: React.ReactNode, onClick?: Function, variant?: 'solid'|'ghost', className?: string}} props
 */
export default function Button({ children, onClick, variant = 'solid', className = '', ...rest }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-wide font-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

  const styles =
    variant === 'solid'
      ? 'bg-ink text-paper shadow-soft hover:shadow-letter hover:-translate-y-0.5'
      : 'border border-ink/25 text-ink hover:bg-ink/5'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
