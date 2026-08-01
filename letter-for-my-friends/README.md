# A Letter For My Friends 💌

A Friendship Day website that feels like a handwritten digital letter,
made just for one person at a time. Built with React, Vite, Tailwind
CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## The story flow

Each step is its own full-screen page, connected with React Router
and animated with Framer Motion:

```
Welcome → Name Selection → Envelope → Letter → Friendship Jar
→ Voice Message → Download Letter → Ending
```

Visiting `/letter`, `/jar`, `/voice`, `/download`, or `/ending`
directly (without picking a friend first) redirects back to
`/name` — see `src/components/RequireFriend.jsx`.

## Personalizing content — one file, no code changes

**Everything specific to a friend lives in `src/data/friends.js`.**
No component has any hardcoded names, messages, or media paths.
To personalize the site:

1. Open `src/data/friends.js`.
2. Edit the six friend entries (or add/remove entries — the Name
   Selection page and jar automatically reflect the array).
3. For each friend, fill in:
   - `name` — shown on their name card
   - `letter.greeting` / `letter.body` / `letter.signoff` — the
     letter text (typed out with a typewriter animation)
   - `jarNotes` — an array of short notes, one per folded paper in
     the Friendship Jar
   - `voiceNote.src` — path to their recorded voice clip
   - `photo` — optional path to a polaroid-style photo

Site-wide copy that isn't tied to one friend (page titles, button
labels, the ending message, background music path) lives in
`src/data/siteConfig.js`.

## Adding your media

Drop files into these folders and update the matching path in the
data files above:

```
src/assets/
  music/    → background.mp3 (site-wide music, see siteConfig.js)
  voice/    → one clip per friend, see friends.js → voiceNote.src
  images/   → optional photo per friend, see friends.js → photo
  textures/ → paper-texture.svg, grain.svg (already included)
```

Each folder has its own README with more detail.

## Project structure

```
src/
  components/     Reusable UI: Envelope, FriendshipJar, Waveform,
                   TypewriterText, PageShell, Button, Confetti,
                   FloatingSparkles, HeartCursor, MusicToggle,
                   RequireFriend
  pages/          One file per full-screen story step
  animations/     Shared Framer Motion variants (variants.js)
  context/        FriendContext — holds the selected friend
                   across the whole app (session-persisted)
  data/           friends.js (personalization) and
                   siteConfig.js (site-wide copy)
  utils/          downloadLetter.js (html2canvas export),
                   sparkles.js (ambient sparkle positions)
  assets/         music / voice / images / textures
```

## Design notes

- Palette is intentionally muted: warm cream paper, dusty blush
  pink, soft sage green, and a restrained gold accent — no bright
  colors, per the brief.
- Typography: **Gowun Batang** (Korean-inspired serif) for display
  text, **Gaegu/Caveat** for handwritten letter text, **Pretendard**
  for UI/body text.
- The envelope on `/envelope` (`src/components/Envelope.jsx`) is a
  real 3D-hinged flap (CSS `rotateX` + `perspective`) with a letter
  that physically slides up and out from inside the pocket — not a
  fake reveal.
- The heart cursor trail (`HeartCursor.jsx`) only activates on
  devices with a fine pointer and hover support, so it's
  automatically skipped on touch/mobile.
- Reduced-motion preferences are respected globally (see
  `src/index.css`).

## Tech stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- html2canvas (for the "keep this letter forever" download)
