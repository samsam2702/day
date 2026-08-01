import { createContext, useContext, useState, useCallback } from 'react'
import { getFriendById } from '../data/friends'

const FriendContext = createContext(null)

const STORAGE_KEY = 'letter-for-my-friends:selected-friend-id'

/**
 * Wraps the whole app. Holds the currently selected friend so that
 * every page after Name Selection can personalize itself without
 * re-fetching or re-asking who the user is.
 */
export function FriendProvider({ children }) {
  const [friend, setFriendState] = useState(() => {
    if (typeof window === 'undefined') return null
    const savedId = window.sessionStorage.getItem(STORAGE_KEY)
    return savedId ? getFriendById(savedId) : null
  })

  const [musicPlaying, setMusicPlaying] = useState(false)

  const selectFriend = useCallback((id) => {
    const found = getFriendById(id)
    setFriendState(found)
    if (found && typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, found.id)
    }
  }, [])

  const clearFriend = useCallback(() => {
    setFriendState(null)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return (
    <FriendContext.Provider
      value={{ friend, selectFriend, clearFriend, musicPlaying, setMusicPlaying }}
    >
      {children}
    </FriendContext.Provider>
  )
}

export function useFriend() {
  const ctx = useContext(FriendContext)
  if (!ctx) {
    throw new Error('useFriend must be used within a FriendProvider')
  }
  return ctx
}
