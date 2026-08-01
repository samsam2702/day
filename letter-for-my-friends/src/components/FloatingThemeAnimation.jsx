import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FLOATING_ANIMATION_TYPES } from '../data/friends'

/**
 * Renders exactly ONE friend's floating ambient animation — never
 * mixed with another theme. The `type` prop maps to a distinct
 * visual treatment:
 *
 *  - hearts-pink    single soft pink hearts drifting up
 *  - hearts-double  pairs of hearts drifting up together
 *  - stars          twinkling stars (opacity pulse, no upward drift)
 *  - sunshine       small warm sparks drifting up
 *  - hearts-purple  single lavender hearts drifting up
 *  - hearts-red     single soft red hearts drifting up
 *
 * @param {{ type: string, color: string, count?: number }} props
 */
export default function FloatingThemeAnimation({ type, color, count = 16 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${4 + Math.random() * 92}%`,
        size: 12 + Math.random() * 14,
        delay: Math.random() * 6,
        duration: 7 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count, type]
  )

  const isStars = type === FLOATING_ANIMATION_TYPES.STARS
  const isDouble = type === FLOATING_ANIMATION_TYPES.HEARTS_DOUBLE
  const isSunshine = type === FLOATING_ANIMATION_TYPES.SUNSHINE

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item) => {
        if (isStars) {
          return (
            <motion.span
              key={item.id}
              className="absolute"
              style={{ left: item.left, top: `${(item.id * 37) % 90}%`, fontSize: item.size, color }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.15, 0.8] }}
              transition={{
                duration: item.duration * 0.6,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ✦
            </motion.span>
          )
        }

        if (isSunshine) {
          return (
            <motion.span
              key={item.id}
              className="absolute rounded-full"
              style={{
                left: item.left,
                bottom: '-5%',
                width: item.size * 0.4,
                height: item.size * 0.4,
                backgroundColor: color,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: '-110vh', opacity: [0, 0.9, 0.9, 0], x: [0, item.drift] }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )
        }

        // heart variants: pink / double / purple / red
        return (
          <motion.span
            key={item.id}
            className="absolute select-none"
            style={{ left: item.left, bottom: '-8%', fontSize: item.size, color }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-115vh', opacity: [0, 0.85, 0.85, 0], x: [0, item.drift] }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {isDouble ? '♥ ♥' : '♥'}
          </motion.span>
        )
      })}
    </div>
  )
}
