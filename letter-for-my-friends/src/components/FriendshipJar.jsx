import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * A single glass jar containing several folded paper notes. Only
 * one note may be open at a time; clicking a folded note unfolds it
 * into a readable message, and it can be closed to open another.
 *
 * @param {{notes: string[]}} props
 */
export default function FriendshipJar({ notes }) {
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

  return (
    <div className="relative mx-auto" style={{ width: 260, height: 340 }}>
      {/* Jar glass body */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-b-[70px] rounded-t-[18px] border border-white/40 bg-gradient-to-b from-white/10 via-sage-light/30 to-sage/20 shadow-soft backdrop-blur-[1px]"
        style={{ top: 46 }}
      />
      {/* Jar lid */}
      <div className="absolute left-1/2 top-0 h-11 w-[180px] -translate-x-1/2 rounded-[10px] bg-blush-dark shadow-card" />
      <div className="absolute left-1/2 top-9 h-3 w-[200px] -translate-x-1/2 rounded-full bg-blush shadow-card" />

      {/* Folded papers inside */}
      <div className="absolute inset-x-0 bottom-4 top-14 overflow-hidden rounded-b-[70px]">
        {notes.map((note, i) => {
          const pos = positions[i % positions.length]
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              style={{ left: pos.left, bottom: pos.bottom, transform: `rotate(${pos.rotate}deg)` }}
              className="absolute h-9 w-11 rounded-[2px] bg-paper shadow-card transition-transform hover:-translate-y-1 hover:scale-105"
              aria-label={`Open note ${i + 1}`}
            >
              <div className="absolute inset-1 rounded-[1px] border border-ink/10" />
            </button>
          )
        })}
      </div>

      {/* Opened note overlay */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm rounded-sm bg-paper px-8 py-10 text-center shadow-letter"
            >
              <p className="font-hand text-xl leading-relaxed text-ink">
                {notes[openIndex]}
              </p>
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
