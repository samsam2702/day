import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import FriendshipJar from '../components/FriendshipJar'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import MusicPlayer from '../components/MusicPlayer'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

export default function JarPage() {
  const navigate = useNavigate()
  const { friend } = useFriend()

  if (!friend) return null

  // Roshini (and any friend with voiceNote: null) skips the Voice
  // Message page entirely and goes straight to Download.
  const handleContinue = () => {
    navigate(friend.voiceNote ? '/voice' : '/download')
  }

  return (
    <PageShell
      bg="bg-gradient-to-b from-sage-light via-paper to-paper"
      decor={
        <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={8} />
      }
    >
      <MusicPlayer />

      <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="font-display text-2xl text-ink">
        {siteConfig.jar.title}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        custom={0.1}
        initial="initial"
        animate="animate"
        className="mt-2 font-body text-sm text-ink/60"
      >
        {siteConfig.jar.subtitle}
      </motion.p>

      <motion.div variants={fadeUp} custom={0.25} initial="initial" animate="animate" className="mt-10 w-full">
        <FriendshipJar notes={friend.jarNotes} />
      </motion.div>

      <motion.div variants={fadeUp} custom={0.4} initial="initial" animate="animate" className="mt-12">
        <Button onClick={handleContinue}>One more little thing 🤍</Button>
      </motion.div>
    </PageShell>
  )
}
