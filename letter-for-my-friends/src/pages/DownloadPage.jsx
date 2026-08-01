import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import MusicPlayer from '../components/MusicPlayer'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import { downloadNodeAsImage } from '../utils/downloadLetter'
import siteConfig from '../data/siteConfig'

export default function DownloadPage() {
  const navigate = useNavigate()
  const { friend } = useFriend()
  const letterRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  if (!friend) return null

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // friendship-letter-[friend-name].png
      await downloadNodeAsImage(letterRef.current, `friendship-letter-${friend.name.toLowerCase()}`)
    } finally {
      setDownloading(false)
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
        {siteConfig.download.title}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        custom={0.1}
        initial="initial"
        animate="animate"
        className="mt-2 font-body text-sm text-ink/60"
      >
        {siteConfig.download.subtitle}
      </motion.p>

      {/* This is the exact node captured into the downloaded image */}
      <motion.div
        variants={fadeUp}
        custom={0.25}
        initial="initial"
        animate="animate"
        ref={letterRef}
        className="mt-8 w-full max-w-md rounded-[24px] bg-paper px-8 py-10 text-left shadow-letter ring-1 ring-ink/5 sm:px-10 sm:py-12"
        style={{
          backgroundImage: "url('/src/assets/textures/paper-texture.svg')",
          backgroundSize: 'cover',
        }}
      >
        <p className="whitespace-pre-line font-hand text-2xl text-ink">{friend.letter.greeting}</p>
        <div className="mt-5 space-y-3">
          {friend.letter.body.map((para, i) => (
            <p key={i} className="font-hand text-base leading-relaxed text-ink/80">
              {para}
            </p>
          ))}
        </div>
        <p className="mt-6 whitespace-pre-line font-hand text-lg text-ink/90">{friend.letter.signoff}</p>
      </motion.div>

      <motion.div variants={fadeUp} custom={0.4} initial="initial" animate="animate" className="mt-8">
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Wrapping it up...' : siteConfig.download.button}
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} custom={0.55} initial="initial" animate="animate" className="mt-6">
        <Button variant="ghost" onClick={() => navigate('/ending')}>
          Continue 🤍
        </Button>
      </motion.div>
    </PageShell>
  )
}
