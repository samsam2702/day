import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import FloatingSparkles from '../components/FloatingSparkles'
import TypewriterText from '../components/TypewriterText'
import MusicToggle from '../components/MusicToggle'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import { useFriend } from '../context/FriendContext'

export default function LetterPage() {
  const navigate = useNavigate()
  const { friend, setMusicPlaying } = useFriend()
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [greetingDone, setGreetingDone] = useState(false)

  // Start background music as soon as the letter page mounts.
  useEffect(() => {
    setMusicPlaying(true)
  }, [setMusicPlaying])

  if (!friend) return null

  const { greeting, body, signoff } = friend.letter
  const allParagraphsDone = paragraphIndex >= body.length

  return (
    <PageShell bg="bg-paper">
      <FloatingSparkles count={10} color={friend.accentColor} />
      <MusicToggle />

      <div
        className="relative w-full max-w-lg rounded-sm bg-paper px-8 py-12 shadow-letter sm:px-12"
        style={{
          backgroundImage: "url('/src/assets/textures/paper-texture.svg')",
          backgroundSize: 'cover',
        }}
      >
        <TypewriterText
          text={greeting}
          speed={38}
          className="font-hand text-2xl leading-relaxed text-ink"
          onDone={() => setGreetingDone(true)}
        />

        {greetingDone && (
          <div className="mt-6 space-y-4">
            {body.slice(0, paragraphIndex + 1).map((para, i) => (
              <TypewriterText
                key={i}
                text={para}
                speed={14}
                className="font-body text-sm leading-relaxed text-ink/80"
                onDone={() => {
                  if (i === paragraphIndex) setParagraphIndex((p) => p + 1)
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {allParagraphsDone && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 whitespace-pre-line font-hand text-lg text-ink/90"
            >
              {signoff}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {allParagraphsDone && (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-10"
          >
            <Button onClick={() => navigate('/jar')}>Continue</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
