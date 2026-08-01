import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import FriendshipJar from '../components/FriendshipJar'
import MusicToggle from '../components/MusicToggle'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

export default function JarPage() {
  const navigate = useNavigate()
  const { friend } = useFriend()

  if (!friend) return null

  return (
    <PageShell bg="bg-gradient-to-b from-sage-light via-paper to-paper">
      <MusicToggle />

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

      <motion.div variants={fadeUp} custom={0.25} initial="initial" animate="animate" className="mt-8">
        <FriendshipJar notes={friend.jarNotes} />
      </motion.div>

      <motion.div variants={fadeUp} custom={0.4} initial="initial" animate="animate" className="mt-10">
        <Button onClick={() => navigate('/voice')}>Continue</Button>
      </motion.div>
    </PageShell>
  )
}
