import { useEffect, useRef } from 'react'

/**
 * Renders a tiny fading heart at the cursor position on desktop
 * (fine pointer, hover-capable) devices only. Does nothing on touch
 * devices, per the brief ("Mobile: Ignore cursor effects").
 */
export default function HeartCursor() {
  const containerRef = useRef(null)
  const lastSpawn = useRef(0)

  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) return

    const handleMove = (e) => {
      const now = performance.now()
      // throttle so we don't spawn a heart on every single pixel
      if (now - lastSpawn.current < 90) return
      lastSpawn.current = now

      const heart = document.createElement('span')
      heart.textContent = '♥'
      heart.style.position = 'fixed'
      heart.style.left = `${e.clientX}px`
      heart.style.top = `${e.clientY}px`
      heart.style.pointerEvents = 'none'
      heart.style.fontSize = `${10 + Math.random() * 6}px`
      heart.style.color = '#D9B8A9'
      heart.style.opacity = '0.75'
      heart.style.transform = 'translate(-50%, -50%)'
      heart.style.transition = 'transform 900ms ease-out, opacity 900ms ease-out'
      heart.style.zIndex = '9999'
      heart.style.userSelect = 'none'

      containerRef.current?.appendChild(heart)

      requestAnimationFrame(() => {
        heart.style.transform = `translate(-50%, -140%) scale(0.6)`
        heart.style.opacity = '0'
      })

      setTimeout(() => heart.remove(), 950)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return <div ref={containerRef} aria-hidden="true" />
}
