import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { fadeUp, staggerContainer } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import friends from '../data/friends'
import siteConfig from '../data/siteConfig'

export default function NameSelection() {
  const navigate = useNavigate()
  const { selectFriend } = useFriend()

  const handleSelect = (id) => {
    selectFriend(id)
    navigate('/envelope')
  }

  return (
    <PageShell>
      <motion.p
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="font-body text-xs uppercase tracking-[0.25em] text-ink/50"
      >
        {siteConfig.namePage.eyebrow}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        custom={0.15}
        initial="initial"
        animate="animate"
        className="mt-3 font-display text-3xl text-ink"
      >
        {siteConfig.namePage.question}
      </motion.h1>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {friends.map((f) => (
          <motion.button
            key={f.id}
            variants={fadeUp}
            onClick={() => handleSelect(f.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl border border-ink/10 bg-paper px-4 py-6 font-display text-lg text-ink shadow-card transition-shadow hover:shadow-soft"
            style={{ borderTopColor: f.accentColor, borderTopWidth: 3 }}
          >
            {f.name}
          </motion.button>
        ))}
      </motion.div>
    </PageShell>
  )
}
