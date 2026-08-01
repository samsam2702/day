import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import Confetti from '../components/Confetti'
import BeforeYouLeave from '../components/BeforeYouLeave'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import siteConfig from '../data/siteConfig'

/**
 * This is the celebratory "Happy Friendship Day" moment, followed by
 * the "Before you leave..." write-back invitation. The truly final,
 * peaceful P.S. screen (no buttons, nearly blank) lives separately
 * at /goodbye — see GoodbyePage.jsx.
 */
export default function EndingPage() {
  const { friend } = useFriend()
  const navigate = useNavigate()

  return (
    <PageShell
      bg="bg-gradient-to-b from-paper via-blush-light to-sage-light"
      decor={
        <>
          <Confetti />
          {friend && (
            <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={12} />
          )}
        </>
      }
    >
      <div className="space-y-3">
        {siteConfig.celebration.lines.map((line, i) => (
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

      <motion.div variants={fadeUp} custom={0.7} initial="initial" animate="animate" className="mt-16 w-full">
        <BeforeYouLeave friendId={friend?.id} />
      </motion.div>

      <motion.button
        variants={fadeUp}
        custom={1.1}
        initial="initial"
        animate="animate"
        onClick={() => navigate('/goodbye')}
        className="mt-10 font-body text-xs uppercase tracking-[0.25em] text-ink/40 hover:text-ink/70"
      >
        Continue 🤍
      </motion.button>
    </PageShell>
  )
}
