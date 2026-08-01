import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * A glass jar of folded notes, redesigned to feel like physically
 * taking a memory out:
 *
 *  1. Tap a folded paper still inside the jar — it slides out and
 *     settles in a little tray beside the jar (a shared `layoutId`
 *     animates the same element smoothly from jar to tray).
 *  2. Tap a paper in the tray — it unfolds into an overlay showing
 *     the message.
 *  3. Close it — the paper folds back up but STAYS in the tray, so
 *     you can go take another one from the jar.
 *
 * @param {{notes: string[]}} props
 */
export default function FriendshipJar({ notes }) {
  const [extracted, setExtracted] = useState([]) // ordered indices taken out of the jar
  const [openIndex, setOpenIndex] = useState(null)

  // fixed, hand-placed positions so the folded papers look scattered
  // naturally inside the jar rather than in a rigid grid
  const positions = [
    { left: '18%', bottom: '8%', rotate: -8 },
    { left: '42%', bottom: '5%', rotate: 5 },
    { left: '66%', bottom: '10%', rotate: -3 },
    { left: '28%', bottom: '22%', rotate: 10 },
    { left: '54%', bottom: '20%', rotate: -12 },
    { left: '76%', bottom: '26%', rotate: 6 },
    { left: '36%', bottom: '38%', rotate: -6 },
    { left: '60%', bottom: '42%', rotate: 9 },
  ]

  const takeNote = (i) => {
    if (extracted.includes(i)) {
      setOpenIndex(i)
      return
    }
    setExtracted((prev) => [...prev, i])
  }

  const Folded = ({ i, className, style }) => (
    <motion.button
      layoutId={`jar-note-${i}`}
      layout
      type="button"
      onClick={() => takeNote(i)}
      whileHover={{ y: -4, scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ layout: { duration: 0.7, ease: EASE } }}
      style={style}
      className={`h-9 w-11 rounded-[2px] bg-paper shadow-card ${className}`}
      aria-label={extracted.includes(i) ? `Open note ${i + 1}` : `Take note ${i + 1} out of the jar`}
    >
      <div className="pointer-events-none absolute inset-1 rounded-[1px] border border-ink/10" />
    </motion.button>
  )

  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-center sm:gap-6">
      {/* The jar itself */}
      <div className="relative shrink-0" style={{ width: 260, height: 340 }}>
        {/* Jar glass body */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-[70px] rounded-t-[18px] border border-white/40 bg-gradient-to-b from-white/10 via-sage-light/30 to-sage/20 shadow-soft backdrop-blur-[1px]"
          style={{ top: 46 }}
        />
        {/* Jar lid */}
        <div className="absolute left-1/2 top-0 h-11 w-[180px] -translate-x-1/2 rounded-[10px] bg-blush-dark shadow-card" />
        <div className="absolute left-1/2 top-9 h-3 w-[200px] -translate-x-1/2 rounded-full bg-blush shadow-card" />

        {/* Folded papers still inside */}
        <div className="absolute inset-x-0 bottom-4 top-14 overflow-hidden rounded-b-[70px]">
          {notes.map((_, i) => {
            if (extracted.includes(i)) return null
            const pos = positions[i % positions.length]
            return (
              <Folded
                key={i}
                i={i}
                className="absolute"
                style={{ left: pos.left, bottom: pos.bottom, transform: `rotate(${pos.rotate}deg)` }}
              />
            )
          })}
        </div>
      </div>

      {/* Tray beside the jar — where taken-out notes come to rest */}
      <div className="flex min-h-[52px] w-full max-w-[240px] flex-wrap items-center justify-center gap-3 sm:w-[220px]">
        <AnimatePresence>
          {extracted.length === 0 ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-[180px] text-center font-body text-xs text-ink/40"
            >
              Take a little note out of the jar ✨
            </motion.p>
          ) : (
            extracted.map((i) => <Folded key={i} i={i} className="relative" />)
          )}
        </AnimatePresence>
      </div>

      {/* Opened note overlay */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/30 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm rounded-2xl bg-paper px-8 py-10 text-center shadow-letter"
            >
              <p className="font-hand text-xl leading-relaxed text-ink">{notes[openIndex]}</p>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="mt-6 text-xs uppercase tracking-widest text-ink/50 hover:text-ink"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
