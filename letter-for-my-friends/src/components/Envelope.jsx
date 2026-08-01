import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * A physically-plausible envelope with a multi-step "taking the
 * letter out" sequence:
 *
 *  1. seal-pop   — the wax seal breaks and fades away
 *  2. flap-open  — the top flap slowly rotates open on its hinge
 *  3. slide-out  — the folded letter slides upward, out of the
 *                  pocket, as if a hand were pulling it free
 *  4. unfold     — the letter unfolds open (scaleY from folded to
 *                  full height)
 *  5. zoom       — the camera gently zooms into the letter and the
 *                  envelope fades away, then onOpened() fires so the
 *                  parent can transition to the Letter page
 *
 * The letter is a real DOM element that physically moves — nothing
 * is faked with a reveal-behind-the-envelope trick.
 *
 * @param {{ friendName: string, themeColor?: string, onOpened: () => void }} props
 */
export default function Envelope({ friendName, themeColor = '#C6A671', onOpened }) {
  const [phase, setPhase] = useState('closed')
  // closed -> seal-pop -> flap-open -> slide-out -> unfold -> zoom

  const handleTap = () => {
    if (phase !== 'closed') return
    setPhase('seal-pop')
  }

  const revealed = phase !== 'closed' && phase !== 'seal-pop'
  const slidOut = phase === 'slide-out' || phase === 'unfold' || phase === 'zoom'
  const unfolded = phase === 'unfold' || phase === 'zoom'

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 1400 }}>
      <motion.div
        className="relative"
        style={{ width: 300, height: 200, transformStyle: 'preserve-3d' }}
        animate={phase === 'zoom' ? { scale: 1.22, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        onAnimationComplete={() => {
          if (phase === 'zoom') onOpened?.()
        }}
      >
        {/* Back panel of the envelope */}
        <div className="absolute inset-0 rounded-[6px] bg-blush shadow-letter" />

        {/* The folded letter, tucked inside, clipped to the pocket area until it slides free */}
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 overflow-hidden"
          style={{ width: 250, height: 132 }}
        >
          <motion.div
            className="absolute left-1/2 w-[250px] -translate-x-1/2 rounded-2xl bg-paper shadow-card"
            style={{ height: 300, top: 40 }}
            animate={slidOut ? { top: -190, rotate: -1.5 } : { top: 40, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === 'slide-out') setPhase('unfold')
            }}
          >
            {/* Inner "unfold" wrapper — starts compressed like a folded
                letter, then opens up to full height */}
            <motion.div
              className="flex h-full flex-col items-center gap-3 overflow-hidden px-6 pt-8 text-ink/70"
              style={{ transformOrigin: 'top' }}
              initial={{ scaleY: 0.42 }}
              animate={{ scaleY: unfolded ? 1 : 0.42 }}
              transition={{ duration: 0.75, ease: EASE }}
              onAnimationComplete={() => {
                if (phase === 'unfold') setPhase('zoom')
              }}
            >
              <p className="font-display text-[13px] leading-snug">
                Happy Friendship Day,
                <br />
                <span className="font-hand text-lg">{friendName}</span>
              </p>
              <div className="mt-2 h-px w-16 bg-ink/15" />
              <motion.div
                className="space-y-1.5"
                animate={{ opacity: unfolded ? 0.4 : 0 }}
                transition={{ duration: 0.4, delay: unfolded ? 0.25 : 0 }}
              >
                <div className="h-1 w-40 rounded bg-ink/30" />
                <div className="h-1 w-36 rounded bg-ink/30" />
                <div className="h-1 w-32 rounded bg-ink/30" />
              </motion.div>
            </motion.div>
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
          animate={{ rotateX: revealed ? -165 : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          onAnimationComplete={() => {
            if (phase === 'flap-open') setPhase('slide-out')
          }}
        />

        {/* Wax seal — breaks apart the instant the envelope is tapped */}
        <motion.div
          className="absolute left-1/2 top-[58px] z-40 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-paper shadow-card"
          style={{ backgroundColor: themeColor }}
          animate={
            phase === 'closed'
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.5, rotate: -20 }
          }
          transition={{ duration: 0.4, ease: EASE }}
          onAnimationComplete={() => {
            if (phase === 'seal-pop') setPhase('flap-open')
          }}
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
