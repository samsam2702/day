import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { fadeUp } from '../animations/variants'
import { saveWriteBackMessage } from '../utils/writeBackStorage'
import siteConfig from '../data/siteConfig'

const EASE = [0.22, 1, 0.36, 1]

/**
 * "Before you leave..." section — invites the visitor to write a
 * little letter back. Saved locally for now via saveWriteBackMessage
 * (see src/utils/writeBackStorage.js for how to wire up a real
 * backend later).
 *
 * @param {{ friendId?: string }} props
 */
export default function BeforeYouLeave({ friendId }) {
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [letter, setLetter] = useState('')

  const copy = siteConfig.beforeYouLeave

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !letter.trim()) return
    setSubmitting(true)
    try {
      await saveWriteBackMessage({ name: name.trim(), letter: letter.trim(), friendId })
      setSubmitted(true)
      setFormOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <motion.h2 variants={fadeUp} initial="initial" animate="animate" className="font-display text-xl text-ink">
        {copy.title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={0.1}
        initial="initial"
        animate="animate"
        className="mx-auto mt-3 max-w-xs whitespace-pre-line font-body text-sm leading-relaxed text-ink/60"
      >
        {copy.text}
      </motion.p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-6 font-hand text-lg text-ink/80"
          >
            {copy.thankYou}
          </motion.p>
        ) : formOpen ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex w-full max-w-xs flex-col gap-3 overflow-hidden"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              required
              className="w-full rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-center font-body text-sm text-ink shadow-card placeholder:text-ink/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder={copy.letterPlaceholder}
              required
              rows={4}
              className="w-full resize-none rounded-2xl border border-ink/15 bg-paper px-5 py-3 text-center font-hand text-base text-ink shadow-card placeholder:text-ink/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <Button type="submit" className="mt-1 self-center" disabled={submitting}>
              {submitting ? 'Sending...' : copy.submitButton}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-6"
          >
            <Button onClick={() => setFormOpen(true)}>{copy.button}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
