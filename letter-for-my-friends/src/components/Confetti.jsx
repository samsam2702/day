import { useMemo } from 'react'
import { motion } from 'framer-motion'

const PALETTE = ['#E9D3C9', '#C7D0BE', '#DDC79A', '#D9B8A9', '#F3E4DC']

/**
 * A soft, muted confetti burst — small rectangles drifting down,
 * matching the site's restrained palette (no bright colors).
 *
 * @param {{ count?: number }} props
 */
export default function Confetti({ count = 36 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: PALETTE[i % PALETTE.length],
        delay: Math.random() * 1.2,
        duration: 3.5 + Math.random() * 2.5,
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] rounded-[2px]"
          style={{ left: p.left, width: p.size, height: p.size * 0.4, backgroundColor: p.color }}
          initial={{ y: '-10%', opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
