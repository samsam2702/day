import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * A decorative animated waveform. Bars gently pulse while `playing`
 * is true, and sit still (short, calm) while paused.
 *
 * @param {{ playing: boolean, bars?: number }} props
 */
export default function Waveform({ playing, bars = 28 }) {
  const heights = useMemo(
    () => Array.from({ length: bars }, () => 8 + Math.random() * 26),
    [bars]
  )

  return (
    <div className="flex h-16 items-center justify-center gap-[3px]">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-ink/50"
          style={{ height: h }}
          animate={
            playing
              ? { scaleY: [0.4, 1, 0.6, 1, 0.4], opacity: [0.5, 1, 0.7, 1, 0.5] }
              : { scaleY: 0.35, opacity: 0.35 }
          }
          transition={
            playing
              ? { duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  )
}
