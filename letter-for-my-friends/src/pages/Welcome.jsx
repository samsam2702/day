import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import FloatingSparkles from '../components/FloatingSparkles'
import Button from '../components/Button'
import { fadeUp } from '../animations/variants'
import siteConfig from '../data/siteConfig'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <PageShell bg="bg-gradient-to-b from-blush-light via-paper to-sage-light">
      <FloatingSparkles count={22} />

      <motion.p
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="font-display text-2xl leading-relaxed text-ink sm:text-3xl"
      >
        {siteConfig.welcome.message}
      </motion.p>

      <motion.div variants={fadeUp} custom={0.3} initial="initial" animate="animate" className="mt-12">
        <Button onClick={() => navigate('/name')}>{siteConfig.welcome.button}</Button>
      </motion.div>
    </PageShell>
  )
}
