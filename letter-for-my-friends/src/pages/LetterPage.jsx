import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import FloatingThemeAnimation from '../components/FloatingThemeAnimation'
import TypewriterText from '../components/TypewriterText'
import MusicPlayer from '../components/MusicPlayer'
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
    <PageShell
      bg="bg-paper"
      decor={
        <FloatingThemeAnimation type={friend.floatingAnimation} color={friend.themeColor} count={10} />
      }
    >
      <MusicPlayer />

      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-lg rounded-[28px] bg-paper px-8 py-14 shadow-letter ring-1 ring-ink/5 sm:px-14 sm:py-16"
        style={{
          backgroundImage: "url('/src/assets/textures/paper-texture.svg')",
          backgroundSize: 'cover',
        }}
      >
        <TypewriterText
          text={greeting}
          speed={38}
          className="font-hand text-3xl leading-relaxed text-ink"
          onDone={() => setGreetingDone(true)}
        />

        {greetingDone && (
          <div className="mt-7 space-y-5">
            {body.slice(0, paragraphIndex + 1).map((para, i) => (
              <TypewriterText
                key={i}
                text={para}
                speed={14}
                className="font-hand text-lg leading-relaxed text-ink/80"
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
              className="mt-9 whitespace-pre-line font-hand text-xl text-ink/90"
            >
              {signoff}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {allParagraphsDone && (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-12"
          >
            <Button onClick={() => navigate('/jar')}>Take me to the little jar 🫙</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
