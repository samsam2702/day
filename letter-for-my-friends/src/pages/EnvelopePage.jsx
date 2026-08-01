import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Envelope from '../components/Envelope'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

export default function EnvelopePage() {
  const navigate = useNavigate()
  const { friend } = useFriend()

  return (
    <PageShell bg="bg-gradient-to-b from-paper via-blush-light to-paper">
      {friend && (
        <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={10} />
      )}

      <motion.p
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-14 font-display text-xl text-ink/70"
      >
        A letter, just for {friend?.name}
      </motion.p>

      <Envelope
        friendName={friend?.name}
        themeColor={friend?.themeColor}
        onOpened={() => navigate('/letter')}
      />

      <motion.p
        variants={fadeUp}
        custom={0.4}
        initial="initial"
        animate="animate"
        className="mt-14 font-body text-xs uppercase tracking-[0.25em] text-ink/40"
      >
        {siteConfig.envelope.hint}
      </motion.p>
    </PageShell>
  )
}
