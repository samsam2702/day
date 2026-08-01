import { motion } from 'framer-motion'
import { pageVariants } from '../animations/variants'

/**
 * Every "page" in the story (Welcome, Envelope, Letter, ...) is
 * wrapped in this shell so the whole site shares one consistent,
 * calm full-screen transition and background treatment.
 *
 * @param {{children: React.ReactNode, className?: string, bg?: string}} props
 */
export default function PageShell({ children, className = '', bg = 'bg-paper' }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-12 ${bg} ${className}`}
    >
      {/* subtle grain overlay for a paper-like feel across the whole site */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: "url('/src/assets/textures/grain.svg')",
          backgroundSize: '220px 220px',
        }}
      />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {children}
      </div>
    </motion.main>
  )
}
