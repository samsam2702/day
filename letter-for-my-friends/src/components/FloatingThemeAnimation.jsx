import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FLOATING_ANIMATION_TYPES } from '../data/friends'

/**
 * Renders exactly ONE friend's floating ambient animation — never
 * mixed with another theme. Every item has a random position, size,
 * and speed, fades in and out, and — critically — uses KEYFRAME
 * ARRAYS (not single target values) for the properties that repeat,
 * so `transition.repeat: Infinity` actually has something to loop
 * between. (A single target value with `repeat: Infinity` reaches
 * its target once and then has nothing left to animate, which is
 * why the old version looked static after the first pass.)
 *
 *  - hearts-pink    single soft pink hearts rising forever
 *  - hearts-double  pairs of hearts rising forever
 *  - stars          twinkling stars drifting slowly across the screen
 *  - sunshine       small warm sparks rising forever
 *  - hearts-purple  single lavender hearts rising forever
 *  - hearts-red     single soft red hearts rising forever
 *
 * @param {{ type: string, color: string, count?: number }} props
 */
export default function FloatingThemeAnimation({ type, color, count = 16 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${4 + Math.random() * 92}%`,
        top: `${Math.random() * 90}%`,
        size: 12 + Math.random() * 16,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 7, // different speeds
        drift: (Math.random() - 0.5) * 70,
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
          // Twinkling stars that also drift slowly across the whole screen.
          const startX = -10 + Math.random() * 20 // start near the left edge
          const endX = 90 + Math.random() * 20 // drift past the right edge
          return (
            <motion.span
              key={item.id}
              className="absolute select-none"
              style={{ top: item.top, fontSize: item.size, color }}
              initial={{ left: `${startX}%`, opacity: 0, scale: 0.7 }}
              animate={{
                left: [`${startX}%`, `${endX}%`],
                opacity: [0, 1, 0.3, 1, 0.3, 0],
                scale: [0.7, 1.2, 0.85, 1.15, 0.8, 0.7],
              }}
              transition={{
                duration: item.duration * 1.8,
                delay: item.delay,
                repeat: Infinity,
                ease: 'linear',
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
                bottom: 0,
                width: item.size * 0.4,
                height: item.size * 0.4,
                backgroundColor: color,
              }}
              initial={{ y: 0, opacity: 0, x: 0 }}
              animate={{
                y: [0, '-45vh', '-110vh'],
                opacity: [0, 0.9, 0.9, 0],
                x: [0, item.drift * 0.5, item.drift],
              }}
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
            style={{ left: item.left, bottom: 0, fontSize: item.size, color }}
            initial={{ y: 0, opacity: 0, x: 0 }}
            animate={{
              y: [0, '-55vh', '-115vh'],
              opacity: [0, 0.85, 0.85, 0],
              x: [0, item.drift * 0.5, item.drift],
            }}
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
