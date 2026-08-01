import { useEffect, useState } from 'react'

/**
 * Reveals a block of text character-by-character, typewriter style.
 * Calls onDone() once when finished so a parent can reveal the next
 * paragraph, a signature, a button, etc.
 *
 * @param {{text: string, speed?: number, startDelay?: number, onDone?: () => void, className?: string}} props
 */
export default function TypewriterText({ text, speed = 28, startDelay = 0, onDone, className = '' }) {
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    let raf
    let timeout
    let i = 0

    timeout = setTimeout(() => {
      const tick = () => {
        i += 1
        setVisibleChars(i)
        if (i < text.length) {
          raf = setTimeout(tick, speed)
        } else {
          onDone?.()
        }
      }
      tick()
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearTimeout(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <p className={`whitespace-pre-line ${className}`}>
      {text.slice(0, visibleChars)}
      <span className="animate-pulse opacity-60">{visibleChars < text.length ? '|' : ''}</span>
    </p>
  )
}
