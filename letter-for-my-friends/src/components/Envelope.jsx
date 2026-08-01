import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * A physically-plausible envelope:
 *  - a back panel
 *  - a folded letter tucked inside, initially clipped so only a
 *    sliver peeks above the front pocket
 *  - a front pocket (drawn with clip-path triangles, like a real
 *    envelope's side + bottom folds)
 *  - a top flap, hinged at the top edge, that rotates open in 3D
 *
 * Sequence on tap:
 *  1. flap rotates open on its top hinge (rotateX), revealing the
 *     inside of the envelope
 *  2. the letter slides upward out from inside the pocket
 *  3. the whole envelope gently scales up ("camera zoom")
 *  4. onOpened() fires so the parent can navigate to the Letter page
 *
 * @param {{ friendName: string, onOpened: () => void }} props
 */
export default function Envelope({ friendName, onOpened }) {
  const [phase, setPhase] = useState('closed') // closed -> flap-open -> letter-out -> zoom

  const handleTap = () => {
    if (phase !== 'closed') return
    setPhase('flap-open')
  }

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 1400 }}>
      <motion.div
        className="relative"
        style={{ width: 300, height: 200, transformStyle: 'preserve-3d' }}
        animate={phase === 'zoom' ? { scale: 1.18, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (phase === 'zoom') onOpened?.()
        }}
      >
        {/* Back panel of the envelope */}
        <div className="absolute inset-0 rounded-[6px] bg-blush shadow-letter" />

        {/* The folded letter, tucked inside, clipped to the pocket area */}
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 overflow-hidden"
          style={{ width: 250, height: 132 }}
        >
          <motion.div
            className="absolute left-1/2 w-[250px] -translate-x-1/2 rounded-[3px] bg-paper shadow-card"
            style={{ height: 300, top: 40 }}
            animate={
              phase === 'letter-out' || phase === 'zoom'
                ? { top: -190, rotate: -1.5 }
                : { top: 40, rotate: 0 }
            }
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (phase === 'letter-out') setPhase('zoom')
            }}
          >
            <div className="flex h-full flex-col items-center gap-3 px-6 pt-8 text-ink/70">
              <p className="font-display text-[13px] leading-snug">
                Happy Friendship Day,
                <br />
                <span className="font-hand text-lg">{friendName}</span>
              </p>
              <div className="mt-2 h-px w-16 bg-ink/15" />
              <div className="space-y-1.5 opacity-40">
                <div className="h-1 w-40 rounded bg-ink/30" />
                <div className="h-1 w-36 rounded bg-ink/30" />
                <div className="h-1 w-32 rounded bg-ink/30" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Front pocket — side + bottom folds, drawn as a triangle */}
        <div
          className="absolute inset-0 z-20"
          style={{
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 38%, 50% 68%, 0% 38%)',
            background:
              'linear-gradient(180deg, rgba(217,184,169,0.9) 0%, #E9D3C9 40%, #DDBFAF 100%)',
            borderRadius: 6,
          }}
        />

        {/* Top flap — hinged at the top edge, opens backward in 3D */}
        <motion.div
          className="absolute left-0 right-0 top-0 z-30 origin-top"
          style={{
            height: 132,
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 82%)',
            background: 'linear-gradient(180deg, #EEDCD2 0%, #E9D3C9 100%)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            borderRadius: '6px 6px 0 0',
          }}
          animate={{ rotateX: phase === 'closed' ? 0 : -165 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (phase === 'flap-open') setPhase('letter-out')
          }}
        />

        {/* Wax seal — fades out the moment the flap starts moving */}
        <motion.div
          className="absolute left-1/2 top-[58px] z-40 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-paper shadow-card"
          animate={{ opacity: phase === 'closed' ? 1 : 0, scale: phase === 'closed' ? 1 : 0.6 }}
          transition={{ duration: 0.35 }}
        >
          <span className="font-display text-xs">♡</span>
        </motion.div>

        {/* Tap target, only active while closed */}
        {phase === 'closed' && (
          <button
            type="button"
            aria-label="Open envelope"
            onClick={handleTap}
            className="absolute inset-0 z-50 cursor-pointer rounded-[6px]"
          />
        )}
      </motion.div>
    </div>
  )
}
