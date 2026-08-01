import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import Confetti from '../components/Confetti'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

export default function EndingPage() {
  const { friend, clearFriend } = useFriend()
  const navigate = useNavigate()

  const handleRestart = () => {
    clearFriend()
    navigate('/name')
  }

  return (
    <PageShell bg="bg-gradient-to-b from-paper via-blush-light to-sage-light">
      <Confetti />
      {friend && (
        <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={12} />
      )}

      <div className="space-y-3">
        {siteConfig.ending.lines.map((line, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            custom={i * 0.2}
            initial="initial"
            animate="animate"
            className="font-display text-xl text-ink sm:text-2xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        custom={0.9}
        initial="initial"
        animate="animate"
        className="mt-12"
      >
        <Button variant="ghost" onClick={handleRestart} className="!border-ink/15">
          Send another letter
        </Button>
      </motion.div>
    </PageShell>
  )
}
