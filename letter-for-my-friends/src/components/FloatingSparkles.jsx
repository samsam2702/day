import { useMemo } from 'react'
import { generateSparkles } from '../utils/sparkles'

/**
 * Tiny ambient sparkles drifting across the background.
 * Purely decorative — pointer-events disabled.
 *
 * @param {{count?: number, color?: string}} props
 */
export default function FloatingSparkles({ count = 18, color = '#C6A671' }) {
  const sparkles = useMemo(() => generateSparkles(count), [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: color,
            opacity: 0.5,
            animationDelay: s.delay,
            animationDuration: s.duration,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  )
}
