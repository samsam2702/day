import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

/**
 * Small, unobtrusive music control. Mounted once the story reaches
 * the Letter page and persists (visually) through the rest of the
 * flow via shared context state.
 */
export default function MusicToggle() {
  const { musicPlaying, setMusicPlaying } = useFriend()
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(siteConfig.music.src)
    audio.loop = true
    audio.volume = siteConfig.music.volume
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.play().catch(() => {
        // Autoplay can be blocked until user gesture — that's fine,
        // the toggle button itself is the user gesture.
      })
    } else {
      audio.pause()
    }
  }, [musicPlaying])

  return (
    <motion.button
      type="button"
      onClick={() => setMusicPlaying((p) => !p)}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-paper/80 shadow-card backdrop-blur transition hover:bg-paper"
      aria-label={musicPlaying ? 'Pause music' : 'Play music'}
      title={musicPlaying ? 'Pause music' : 'Play music'}
    >
      <span className="text-lg text-ink">{musicPlaying ? '♪' : '♫'}</span>
    </motion.button>
  )
}
