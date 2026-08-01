import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'
import friends from '../data/friends'
import siteConfig from '../data/siteConfig'

/**
 * Instead of showing every friend's name up front, this page asks
 * for a name and quietly matches it against friends.js. Matching is
 * case-insensitive and trims whitespace, so "samya", "Samya ", and
 * "SAMYA" all resolve to the same friend.
 */
export default function NameSelection() {
  const navigate = useNavigate()
  const { selectFriend } = useFriend()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = value.trim().toLowerCase()
    if (!query) return

    const match = friends.find((f) => f.name.toLowerCase() === query)

    if (match) {
      setError(false)
      selectFriend(match.id)
      navigate('/envelope')
    } else {
      setError(true)
    }
  }

  return (
    <PageShell>
      <motion.h1
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="font-display text-3xl text-ink"
      >
        {siteConfig.namePage.question}
      </motion.h1>

      <motion.form
        variants={fadeUp}
        custom={0.15}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit}
        className="mt-10 flex w-full max-w-xs flex-col items-center gap-4"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError(false)
          }}
          placeholder={siteConfig.namePage.placeholder}
          autoFocus
          className="w-full rounded-full border border-ink/15 bg-paper px-6 py-3 text-center font-hand text-xl text-ink shadow-card placeholder:text-ink/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-xs text-ink/50"
          >
            {siteConfig.namePage.errorMessage}
          </motion.p>
        )}

        <Button type="submit" className="mt-2">
          {siteConfig.namePage.button}
        </Button>
      </motion.form>
    </PageShell>
  )
}
