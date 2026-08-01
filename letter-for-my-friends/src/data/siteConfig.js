/**
 * siteConfig.js
 * ------------------------------------------------------------------
 * Site-wide copy and settings that are NOT specific to any one
 * friend. Friend-specific content lives in friends.js.
 *
 * Every string here is meant to read like it was handwritten by a
 * close friend — soft, warm, a little playful. Edit freely; nothing
 * else in the code needs to change when you do.
 * ------------------------------------------------------------------
 */

const siteConfig = {
  welcome: {
    message: 'Someone made something special just for you... 💌',
    button: '💌 Open Your Little Surprise',
  },
  namePage: {
    question: "Who's opening this little letter? 🌸",
    placeholder: 'Type your name...',
    button: 'Continue ✨',
    errorMessage: "Hmm, I don't think I know that name yet... 💭 try again?",
  },
  envelope: {
    hint: 'Tap gently to open it 🤍',
    subtitle: 'A little letter, just for',
  },
  jar: {
    title: '🫙 Little Jar of Memories',
    subtitle: 'Take a little note out, and see what it says.',
  },
  voice: {
    title: '🎧 A Tiny Something From Me',
    subtitle: 'Psst... I wanted to tell you something 🤍',
  },
  download: {
    title: '🌸 Take This Little Letter Home',
    subtitle: 'So it stays with you, even after you close this tab.',
    button: '🌸 Keep This Little Letter',
  },
  celebration: {
    lines: [
      'No matter where life takes us,',
      "I'm grateful our paths crossed.",
      'Happy Friendship Day 🤍',
    ],
  },
  beforeYouLeave: {
    title: 'Before you leave... 🥺',
    text: "If you'd like,\nI'd love to receive a little letter from you too.\n\nIt would make me really happy. 🤍",
    button: '💌 Write Me A Letter',
    namePlaceholder: 'Your name',
    letterPlaceholder: 'Write your little letter here...',
    submitButton: 'Send 💌',
    thankYou: '🤍 Thank you for this. It means so much.',
    skipLink: 'Maybe later',
  },
  goodbye: {
    ps: 'P.S.',
    message: 'I hope this tiny little surprise made you smile today. 🌸🤍',
  },
}

export default siteConfig
