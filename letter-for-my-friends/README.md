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
2. Edit the six friend entries — Samya, Saniya, Shafin, Shobanaa,
   Shanofar, Roshini (or add/remove entries — the Name Selection
   page and jar automatically reflect the array).
3. For each friend, fill in:
   - `name` — shown on their name card
   - `themeColor` — a soft hex accent unique to that friend
   - `floatingAnimation` — one of the types in
     `FLOATING_ANIMATION_TYPES` (exported from `friends.js`):
     `hearts-pink`, `hearts-double`, `stars`, `sunshine`,
     `hearts-purple`, `hearts-red`. Only the selected friend's
     animation ever shows — themes are never mixed.
   - `music.src` / `music.label` — that friend's background track
     and an optional caption (e.g. a song title)
   - `voiceNote.src` — path to their recorded voice clip, **or
     `null`** to skip the Voice Message page entirely for that
     friend (used for Roshini in the default data)
   - `letter.greeting` / `letter.body` / `letter.signoff` — the
     letter text (typed out with a typewriter animation)
   - `jarNotes` — an array of short notes, one per folded paper in
     the Friendship Jar (the count can differ per friend — Roshini
     has 3, the others have 8 by default)
   - `photo` — optional path to a polaroid-style photo

Site-wide copy that isn't tied to one friend (page titles, button
labels, the ending message) lives in `src/data/siteConfig.js`.

## Adding your media

Drop files into these folders and update the matching path in
`src/data/friends.js`:

```
src/assets/
  music/    → one track per friend (samya.mp3, saniya.mp3, ...),
              see friends.js → music.src. Starts only after the
              envelope opens and the letter appears.
  voices/   → one clip per friend, see friends.js → voiceNote.src
              (set voiceNote to null to skip that friend's page)
  images/   → optional photo per friend, see friends.js → photo
  textures/ → paper-texture.svg, grain.svg (already included)
```

Each folder has its own README with more detail. The music player
(bottom-right, on every page from the Letter page onward) has
play/pause, mute, and a volume slider — tap the note icon to expand
it.

## Project structure

```
src/
  components/     Reusable UI: Envelope, FriendshipJar, Waveform,
                   TypewriterText, PageShell, Button, Confetti,
                   FloatingSparkles (pre-selection pages),
                   FloatingThemeAnimation (per-friend themed
                   animation), HeartCursor, MusicPlayer,
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
- Friends with `voiceNote: null` skip the Voice Message page and
  its nav button entirely — the Jar page's Continue button and the
  `/voice` route itself both redirect straight to Download.
- Downloaded letters are named `friendship-letter-[friend-name].png`
  (see `src/pages/DownloadPage.jsx`).
- Reduced-motion preferences are respected globally (see
  `src/index.css`).

## Tech stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- html2canvas (for the "keep this letter forever" download)
