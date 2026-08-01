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
 *  - id                unique slug, used as the URL-safe key and as
 *                      the download filename suffix
 *  - name               display name shown on the name-selection card
 *  - themeColor         hex used for this friend's accent (buttons,
 *                      borders, glow) — keep it soft, never bright
 *  - floatingAnimation  one of the FLOATING_ANIMATION_TYPES below —
 *                      selects which ambient animation plays for
 *                      this friend. Only ONE animation type is ever
 *                      shown at a time (the selected friend's).
 *  - music              { src, label } — background track that starts
 *                      once the letter appears. label is optional
 *                      (e.g. song title) and only shown as a caption.
 *  - voiceNote          { src } — or null. When null, the Voice
 *                      Message page and its nav button are skipped
 *                      entirely for that friend.
 *  - letter             { greeting, body[], signoff }
 *  - jarNotes           array of short strings, one per folded paper
 *                      in the Friendship Jar (count varies by friend)
 *  - photo              optional path under /src/assets/images
 * ------------------------------------------------------------------
 */

export const FLOATING_ANIMATION_TYPES = {
  HEARTS_PINK: 'hearts-pink',
  HEARTS_DOUBLE: 'hearts-double',
  STARS: 'stars',
  SUNSHINE: 'sunshine',
  HEARTS_PURPLE: 'hearts-purple',
  HEARTS_RED: 'hearts-red',
}

const friends = [
  {
    id: 'samya',
    name: 'Samya',
    themeColor: '#F0C6D2', // soft pink
    floatingAnimation: FLOATING_ANIMATION_TYPES.HEARTS_PINK,
    music: { src: '/src/assets/music/samya.mp3', label: 'Avalum Naanum' },
    voiceNote: { src: '/src/assets/voices/samya.mp3' },
    letter: {
      greeting: 'Happy Friendship Day,\nSamya',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With all my heart,\nyour friend',
    },
    jarNotes: [
      'You make ordinary days feel lighter.',
      'Thank you for always showing up.',
      'I still think about that one time we laughed until we cried.',
      "You're one of the easiest people to talk to.",
      'Grateful our paths crossed.',
      'Your kindness never goes unnoticed.',
      "You're the kind of friend people write letters about.",
      'Here\'s to many more memories together.',
    ],
    photo: null,
  },
  {
    id: 'saniya',
    name: 'Saniya',
    themeColor: '#E8A6B8', // rose pink
    floatingAnimation: FLOATING_ANIMATION_TYPES.HEARTS_DOUBLE,
    music: { src: '/src/assets/music/saniya.mp3', label: 'Feel My Love' },
    voiceNote: { src: '/src/assets/voices/saniya.mp3' },
    letter: {
      greeting: 'Happy Friendship Day,\nSaniya',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'You make ordinary days feel lighter.',
      'Thank you for always showing up.',
      'I still think about that one time we laughed until we cried.',
      "You're one of the easiest people to talk to.",
      'Grateful our paths crossed.',
      'Your kindness never goes unnoticed.',
      "You're the kind of friend people write letters about.",
      'Here\'s to many more memories together.',
    ],
    photo: null,
  },
  {
    id: 'shafin',
    name: 'Shafin',
    themeColor: '#D9B36C', // gold & cream
    floatingAnimation: FLOATING_ANIMATION_TYPES.STARS,
    music: { src: '/src/assets/music/shafin.mp3', label: 'Jo Tum Mere Ho' },
    voiceNote: { src: '/src/assets/voices/shafin.mp3' },
    letter: {
      greeting: 'Happy Friendship Day,\nShafin',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With gratitude,\nyour friend',
    },
    jarNotes: [
      'You make ordinary days feel lighter.',
      'Thank you for always showing up.',
      'I still think about that one time we laughed until we cried.',
      "You're one of the easiest people to talk to.",
      'Grateful our paths crossed.',
      'Your kindness never goes unnoticed.',
      "You're the kind of friend people write letters about.",
      'Here\'s to many more memories together.',
    ],
    photo: null,
  },
  {
    id: 'shobanaa',
    name: 'Shobanaa',
    themeColor: '#F0D48A', // soft yellow
    floatingAnimation: FLOATING_ANIMATION_TYPES.SUNSHINE,
    music: { src: '/src/assets/music/shobanaa.mp3', label: 'Tum Se Hi' },
    voiceNote: { src: '/src/assets/voices/shobanaa.mp3' },
    letter: {
      greeting: 'Happy Friendship Day,\nShobanaa',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With warmth,\nyour friend',
    },
    jarNotes: [
      'You make ordinary days feel lighter.',
      'Thank you for always showing up.',
      'I still think about that one time we laughed until we cried.',
      "You're one of the easiest people to talk to.",
      'Grateful our paths crossed.',
      'Your kindness never goes unnoticed.',
      "You're the kind of friend people write letters about.",
      'Here\'s to many more memories together.',
    ],
    photo: null,
  },
  {
    id: 'shanofar',
    name: 'Shanofar',
    themeColor: '#C9B6E4', // lavender
    floatingAnimation: FLOATING_ANIMATION_TYPES.HEARTS_PURPLE,
    music: { src: '/src/assets/music/shanofar.mp3', label: 'Enna Oru Azhagiyada' },
    voiceNote: { src: '/src/assets/voices/shanofar.mp3' },
    letter: {
      greeting: 'Happy Friendship Day,\nShanofar',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      'You make ordinary days feel lighter.',
      'Thank you for always showing up.',
      'I still think about that one time we laughed until we cried.',
      "You're one of the easiest people to talk to.",
      'Grateful our paths crossed.',
      'Your kindness never goes unnoticed.',
      "You're the kind of friend people write letters about.",
      'Here\'s to many more memories together.',
    ],
    photo: null,
  },
  {
    id: 'roshini',
    name: 'Roshini',
    themeColor: '#E3A5A0', // soft red
    floatingAnimation: FLOATING_ANIMATION_TYPES.HEARTS_RED,
    music: { src: '/src/assets/music/roshini.mp3', label: 'Soft Violin Instrumental' },
    voiceNote: null, // no voice message for Roshini — Voice page is skipped entirely
    letter: {
      greeting: 'Happy Friendship Day,\nRoshini',
      body: [
        'Placeholder letter — I will replace this later with something written just for you.',
        'A second paragraph goes here — a memory, an inside joke, a thank you.',
        'A closing thought that feels like us.',
      ],
      signoff: 'With love,\nyour friend',
    },
    jarNotes: [
      "You're one of the kindest people I know.",
      'Thank you for every little moment.',
      'Wishing you happiness always.',
    ],
    photo: null,
  },
]

export default friends

export function getFriendById(id) {
  return friends.find((f) => f.id === id) || null
}
