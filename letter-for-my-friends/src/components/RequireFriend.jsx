import { Navigate } from 'react-router-dom'
import { useFriend } from '../context/FriendContext'

/**
 * Guards every page after Name Selection. If someone lands on
 * /letter, /jar, /voice, /download, or /ending directly without
 * having chosen a friend first, send them back to pick one.
 */
export default function RequireFriend({ children }) {
  const { friend } = useFriend()
  if (!friend) return <Navigate to="/name" replace />
  return children
}
