import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFriend } from '../context/FriendContext'

/**
 * A small, unobtrusive music player. Loads the SELECTED FRIEND's
 * track (friend.music.src) and only starts playing once the parent
 * page (Letter) sets musicPlaying to true — i.e. after the envelope
 * has opened and the letter has appeared, never before.
 *
 * Collapsed: a single circular note icon.
 * Expanded (tap to open): play/pause, mute, and a volume slider.
 */
export default function MusicPlayer() {
  const { friend, musicPlaying, setMusicPlaying } = useFriend()
  const audioRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)

  // (Re)create the audio element whenever the selected friend changes,
  // since each friend has their own track.
  useEffect(() => {
    if (!friend?.music?.src) return undefined
    const audio = new Audio(friend.music.src)
    audio.loop = true
    audio.volume = muted ? 0 : volume
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friend?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = muted ? 0 : volume
  }, [volume, muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.play().catch(() => {
        // Autoplay may be blocked until a user gesture — the play
        // button itself is the gesture, so this only matters for
        // the very first automatic start.
      })
    } else {
      audio.pause()
    }
  }, [musicPlaying])

  if (!friend?.music?.src) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3 rounded-2xl bg-paper/95 px-4 py-3 shadow-card backdrop-blur"
          >
            {friend.music.label && (
              <p className="text-[10px] uppercase tracking-widest text-ink/40">
                {friend.music.label}
              </p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMusicPlaying((p) => !p)}
                aria-label={musicPlaying ? 'Pause music' : 'Play music'}
                className="text-ink"
              >
                {musicPlaying ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="text-ink"
              >
                {muted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="h-1 w-20 accent-ink"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        whileTap={{ scale: 0.92 }}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/80 shadow-card backdrop-blur transition hover:bg-paper"
        aria-label="Music controls"
        title="Music controls"
      >
        <span className="text-lg text-ink">{musicPlaying && !muted ? '♪' : '♫'}</span>
      </motion.button>
    </div>
  )
}
