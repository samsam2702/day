/**
 * friends.js
 * ------------------------------------------------------------------
 * THE SINGLE SOURCE OF TRUTH for every friend's personalized content.
 *
 * Nothing personal is ever hardcoded inside a component. Every page
 * reads from the friend object stored here (via FriendContext).
 *
 * To add or edit a friend, just edit this array — no other file
 * needs to change.
 *
 * Fields:
 *  - id            unique slug, used as the URL-safe key
 *  - name          display name shown on the name-selection card
 *  - accentColor   a soft tailwind-safe hex used for that friend's
 *                  floating background accents (keep it muted!)
 *  - letter        { greeting, body[], signoff }
 *                  body is an array of paragraphs so the typewriter
 *                  effect can pace itself paragraph by paragraph
 *  - jarNotes      array of short strings, one per folded paper in
 *                  the Friendship Jar
 *  - voiceNote     { src, duration } - path under /src/assets/voice
 *  - photo         optional path under /src/assets/images (used as
 *                  a soft polaroid inside the letter, optional)
 * ------------------------------------------------------------------
 */

const friends = [
  {
    id: 'aarifa',
    name: 'Aarifa',
    accentColor: '#E9D3C9',
    letter: {
      greeting: 'Happy Friendship Day,\nAarifa',
      body: [
        "I don't think I've ever properly told you how much your friendship means to me — so I'm telling you now, in the most old-fashioned way I know how.",
        "Thank you for the laughter, the late-night talks, and for always showing up exactly when it mattered.",
        "Whatever life throws at us next, I'm glad I get to face it knowing you're somewhere out there, rooting for me.",
      ],
      signoff: 'With all my heart,\nyour friend',
    },
    jarNotes: [
      "The way you always know what to say makes hard days softer.",
      "I still remember the first time we really laughed together — I knew right then.",
      "You make ordinary days feel like something worth remembering.",
      "Thank you for never letting distance feel like distance.",
      "You're the kind of friend people write letters about.",
    ],
    voiceNote: {
      src: '/src/assets/voice/aarifa.mp3',
      duration: 0,
    },
    photo: null,
  },
  {
    id: 'friend-2',
    name: 'Friend Two',
    accentColor: '#C7D0BE',
    letter: {
      greeting: 'Happy Friendship Day,\nFriend Two',
      body: [
        'Replace this paragraph with something true and specific about your friendship.',
        'A second paragraph — a memory, an inside joke, a thank you.',
        'A closing thought that feels like you.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'A short, warm note.',
      'Another small memory.',
      'Something you appreciate about them.',
      'A silly inside joke.',
      'A quiet thank you.',
    ],
    voiceNote: { src: '/src/assets/voice/friend-2.mp3', duration: 0 },
    photo: null,
  },
  {
    id: 'friend-3',
    name: 'Friend Three',
    accentColor: '#DDC79A',
    letter: {
      greeting: 'Happy Friendship Day,\nFriend Three',
      body: [
        'Replace this paragraph with something true and specific about your friendship.',
        'A second paragraph — a memory, an inside joke, a thank you.',
        'A closing thought that feels like you.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'A short, warm note.',
      'Another small memory.',
      'Something you appreciate about them.',
      'A silly inside joke.',
      'A quiet thank you.',
    ],
    voiceNote: { src: '/src/assets/voice/friend-3.mp3', duration: 0 },
    photo: null,
  },
  {
    id: 'friend-4',
    name: 'Friend Four',
    accentColor: '#E7DCC7',
    letter: {
      greeting: 'Happy Friendship Day,\nFriend Four',
      body: [
        'Replace this paragraph with something true and specific about your friendship.',
        'A second paragraph — a memory, an inside joke, a thank you.',
        'A closing thought that feels like you.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'A short, warm note.',
      'Another small memory.',
      'Something you appreciate about them.',
      'A silly inside joke.',
      'A quiet thank you.',
    ],
    voiceNote: { src: '/src/assets/voice/friend-4.mp3', duration: 0 },
    photo: null,
  },
  {
    id: 'friend-5',
    name: 'Friend Five',
    accentColor: '#D9B8A9',
    letter: {
      greeting: 'Happy Friendship Day,\nFriend Five',
      body: [
        'Replace this paragraph with something true and specific about your friendship.',
        'A second paragraph — a memory, an inside joke, a thank you.',
        'A closing thought that feels like you.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'A short, warm note.',
      'Another small memory.',
      'Something you appreciate about them.',
      'A silly inside joke.',
      'A quiet thank you.',
    ],
    voiceNote: { src: '/src/assets/voice/friend-5.mp3', duration: 0 },
    photo: null,
  },
  {
    id: 'friend-6',
    name: 'Friend Six',
    accentColor: '#AAB79E',
    letter: {
      greeting: 'Happy Friendship Day,\nFriend Six',
      body: [
        'Replace this paragraph with something true and specific about your friendship.',
        'A second paragraph — a memory, an inside joke, a thank you.',
        'A closing thought that feels like you.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'A short, warm note.',
      'Another small memory.',
      'Something you appreciate about them.',
      'A silly inside joke.',
      'A quiet thank you.',
    ],
    voiceNote: { src: '/src/assets/voice/friend-6.mp3', duration: 0 },
    photo: null,
  },
]

export default friends

export function getFriendById(id) {
  return friends.find((f) => f.id === id) || null
}
