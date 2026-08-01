import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import siteConfig from '../data/siteConfig'

/**
 * The true final screen. Nearly blank, no buttons, no navigation —
 * just a quiet "P.S." and a tiny floating heart. This is the last
 * thing a friend sees, so it stays deliberately still and simple.
 */
export default function GoodbyePage() {
  return (
    <PageShell bg="bg-paper" className="!py-24">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="font-hand text-2xl text-ink/70"
      >
        {siteConfig.goodbye.ps}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.6, ease: 'easeOut' }}
        className="mt-4 max-w-xs font-display text-lg leading-relaxed text-ink/80"
      >
        {siteConfig.goodbye.message}
      </motion.p>

      <motion.span
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0], y: -18 }}
        transition={{ duration: 4, delay: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-10 text-xl text-blush-dark"
        aria-hidden="true"
      >
        ♥
      </motion.span>
    </PageShell>
  )
}
