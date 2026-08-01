import { useRef, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Waveform from '../components/Waveform'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import MusicPlayer from '../components/MusicPlayer'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

export default function VoiceMessagePage() {
  const navigate = useNavigate()
  const { friend } = useFriend()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  if (!friend) return null

  // Friends with voiceNote: null (e.g. Roshini) never see this page —
  // send them straight through to Download instead.
  if (!friend.voiceNote) return <Navigate to="/download" replace />

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <PageShell
      decor={
        <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={8} />
      }
    >
      <MusicPlayer />

      <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="font-display text-2xl text-ink">
        {siteConfig.voice.title}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        custom={0.1}
        initial="initial"
        animate="animate"
        className="mt-2 font-body text-sm text-ink/60"
      >
        {siteConfig.voice.subtitle}
      </motion.p>

      <motion.button
        variants={fadeUp}
        custom={0.3}
        initial="initial"
        animate="animate"
        onClick={togglePlay}
        whileTap={{ scale: 0.95 }}
        className="mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-blush-light shadow-soft"
        aria-label={playing ? 'Pause voice message' : 'Play voice message'}
      >
        <span className="text-2xl">{playing ? '⏸' : '▶'}</span>
      </motion.button>

      <motion.div variants={fadeUp} custom={0.45} initial="initial" animate="animate" className="mt-6 w-full">
        <Waveform playing={playing} />
      </motion.div>

      <audio
        ref={audioRef}
        src={friend.voiceNote.src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />

      <motion.div variants={fadeUp} custom={0.6} initial="initial" animate="animate" className="mt-14">
        <Button onClick={() => navigate('/download')}>Almost there 🌸</Button>
      </motion.div>
    </PageShell>
  )
}
