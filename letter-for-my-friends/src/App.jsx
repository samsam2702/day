import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { FriendProvider } from './context/FriendContext'
import RequireFriend from './components/RequireFriend'
import HeartCursor from './components/HeartCursor'

import Welcome from './pages/Welcome'
import NameSelection from './pages/NameSelection'
import EnvelopePage from './pages/EnvelopePage'
import LetterPage from './pages/LetterPage'
import JarPage from './pages/JarPage'
import VoiceMessagePage from './pages/VoiceMessagePage'
import DownloadPage from './pages/DownloadPage'
import EndingPage from './pages/EndingPage'
import GoodbyePage from './pages/GoodbyePage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/name" element={<NameSelection />} />
        <Route
          path="/envelope"
          element={
            <RequireFriend>
              <EnvelopePage />
            </RequireFriend>
          }
        />
        <Route
          path="/letter"
          element={
            <RequireFriend>
              <LetterPage />
            </RequireFriend>
          }
        />
        <Route
          path="/jar"
          element={
            <RequireFriend>
              <JarPage />
            </RequireFriend>
          }
        />
        <Route
          path="/voice"
          element={
            <RequireFriend>
              <VoiceMessagePage />
            </RequireFriend>
          }
        />
        <Route
          path="/download"
          element={
            <RequireFriend>
              <DownloadPage />
            </RequireFriend>
          }
        />
        <Route
          path="/ending"
          element={
            <RequireFriend>
              <EndingPage />
            </RequireFriend>
          }
        />
        <Route path="/goodbye" element={<GoodbyePage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <FriendProvider>
      <HeartCursor />
      <AnimatedRoutes />
    </FriendProvider>
  )
}
