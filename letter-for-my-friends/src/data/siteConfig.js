/**
 * siteConfig.js
 * ------------------------------------------------------------------
 * Site-wide copy and settings that are NOT specific to any one
 * friend. Friend-specific content lives in friends.js.
 * ------------------------------------------------------------------
 */

const siteConfig = {
  welcome: {
    message: 'Someone made something special just for you... 💌',
    button: 'Open My Surprise',
  },
  namePage: {
    eyebrow: 'Before we begin...',
    question: "What's your name?",
  },
  envelope: {
    hint: 'Tap the envelope to open it',
  },
  jar: {
    title: 'A Jar Full of Little Things',
    subtitle: 'Small notes I never got to say out loud.',
  },
  voice: {
    title: '🎙️ Listen to My Voice',
    subtitle: 'A little something, in my own voice.',
  },
  download: {
    title: '📥 Keep This Letter Forever',
    subtitle: 'Save a copy of your letter, just as it was written for you.',
    button: 'Download My Letter',
  },
  ending: {
    lines: [
      'No matter where life takes us,',
      "I'm grateful our paths crossed.",
      'Happy Friendship Day 🤍',
    ],
  },
  music: {
    // Put your background track here — see README for asset instructions.
    src: '/src/assets/music/background.mp3',
    volume: 0.35,
  },
}

export default siteConfig
