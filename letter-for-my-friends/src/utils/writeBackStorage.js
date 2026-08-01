const STORAGE_KEY = 'letter-for-my-friends:write-back-messages'

/**
 * Saves a "write me a letter" message from a visitor. For now this
 * just persists to localStorage so nothing is lost, but the shape
 * of this function is intentionally backend-agnostic — swap the
 * body out for an EmailJS `send()` call, a Firebase `addDoc()`, or
 * a fetch() to your own API, and nothing calling this function
 * needs to change.
 *
 * @param {{ name: string, letter: string, friendId?: string }} entry
 * @returns {Promise<void>}
 */
export async function saveWriteBackMessage({ name, letter, friendId }) {
  const entry = {
    name,
    letter,
    friendId: friendId || null,
    submittedAt: new Date().toISOString(),
  }

  // --- TODO: swap this block for a real backend when you're ready ---
  //
  // EmailJS example:
  //   await emailjs.send('service_id', 'template_id', entry, 'public_key')
  //
  // Firebase example:
  //   await addDoc(collection(db, 'writeBackMessages'), entry)
  //
  // Plain backend example:
  //   await fetch('/api/write-back', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(entry),
  //   })
  // --------------------------------------------------------------

  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    existing.push(entry)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch {
    // localStorage can fail (private browsing, storage full, etc.) —
    // fail silently so the thank-you message still shows either way.
  }
}

/**
 * Reads back everything saved so far — handy for a future admin
 * view, or just for checking things worked during development.
 *
 * @returns {Array<{name: string, letter: string, friendId: string|null, submittedAt: string}>}
 */
export function getWriteBackMessages() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}
