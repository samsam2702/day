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
Welcome → Name (type-your-name) → Envelope → Letter → Little Jar
→ Voice Message* → Keep This Little Letter → Before You Leave → Goodbye
```

\* skipped automatically for any friend with `voiceNote: null`.

Visiting `/letter`, `/jar`, `/voice`, `/download`, or `/ending`
directly (without entering a valid name first) redirects back to
`/name` — see `src/components/RequireFriend.jsx`. `/goodbye` is the
one exception: it's a generic, friend-agnostic closing screen, so
it's reachable directly.

Name entry (`/name`) is a text input, not a visible list of names —
see "Personalizing content" below for how matching works.

## Personalizing content — one file, no code changes

**Everything specific to a friend lives in `src/data/friends.js`.**
No component has any hardcoded names, messages, or media paths.
To personalize the site:

1. Open `src/data/friends.js`.
2. Edit the six friend entries — Samya, Saniya, Shafin, Shobanaa,
   Shanofar, Roshini (or add/remove entries — the Name page and jar
   automatically reflect the array). On `/name`, whatever's typed is
   trimmed, lowercased, and matched against each friend's `name` —
   so "samya", "Samya ", and "SAMYA" all resolve to the same entry.
   No match shows a gentle inline error instead of navigating on.
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
labels, the celebration lines, the "Before you leave" write-back
section, and the final "P.S." message) lives in
`src/data/siteConfig.js` — every string there is written to read
like it was handwritten by a close friend, so feel free to rewrite
any of it to sound like you.

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
  components/     Reusable UI: Envelope (multi-step open animation),
                   FriendshipJar (jar-to-tray note extraction),
                   BeforeYouLeave (write-back section + form),
                   Waveform, TypewriterText, PageShell (with a
                   full-bleed `decor` layer for ambient animations),
                   Button, Confetti, FloatingSparkles
                   (pre-selection pages), FloatingThemeAnimation
                   (per-friend themed animation), HeartCursor,
                   MusicPlayer, RequireFriend
  pages/          One file per full-screen story step, including
                   EndingPage (celebration + write-back) and
                   GoodbyePage (the final peaceful P.S. screen)
  animations/     Shared Framer Motion variants (variants.js)
  context/        FriendContext — holds the selected friend
                   across the whole app (session-persisted)
  data/           friends.js (personalization) and
                   siteConfig.js (site-wide copy)
  utils/          downloadLetter.js (html2canvas export),
                   sparkles.js (ambient sparkle positions),
                   writeBackStorage.js (saves "write me a letter"
                   messages — currently to localStorage, written to
                   be swapped for EmailJS/Firebase/a backend later)
  assets/         music / voices / images / textures
```

## Design notes

- Palette is intentionally muted: warm cream paper, dusty blush
  pink, soft sage green, and a restrained gold accent — no bright
  colors, per the brief.
- Typography: **Gowun Batang** (Korean-inspired serif) for display
  text, **Gaegu/Caveat** for handwritten letter text, **Pretendard**
  for UI/body text.
- The envelope on `/envelope` (`src/components/Envelope.jsx`) runs a
  five-step physical sequence: the wax seal breaks and fades, the
  flap opens on a 3D hinge, the folded letter slides up out of the
  pocket, it unfolds open, then the camera zooms in before handing
  off to the Letter page. Nothing is faked with a reveal-behind
  trick — the letter is a real element that moves the whole way.
- Floating ambient animations (`FloatingThemeAnimation.jsx`) render
  in a full-bleed `decor` layer on `PageShell` rather than inside the
  centered content column — this is what makes them drift across the
  *entire* screen instead of being clipped to a narrow strip. Each
  uses keyframe arrays (not single target values) so the
  infinite-repeat loop actually has something to animate between.
- The Friendship Jar (`FriendshipJar.jsx`) uses a shared
  `layoutId` between the folded paper's position inside the jar and
  its resting spot in the tray beside it, so taking a note out
  animates smoothly between the two — no manual position math.
- The heart cursor trail (`HeartCursor.jsx`) only activates on
  devices with a fine pointer and hover support, so it's
  automatically skipped on touch/mobile.
- Friends with `voiceNote: null` skip the Voice Message page and
  its nav button entirely — the Jar page's Continue button and the
  `/voice` route itself both redirect straight to Download.
- Downloaded letters are named `friendship-letter-[friend-name].png`
  (see `src/pages/DownloadPage.jsx`).
- The "Before you leave..." section (`BeforeYouLeave.jsx`, shown on
  the Ending page) lets a friend write a message back; it's saved
  via `saveWriteBackMessage()` in `src/utils/writeBackStorage.js`,
  which currently writes to `localStorage` but is deliberately
  structured so you can drop in an EmailJS, Firebase, or custom API
  call later without touching the component.
- The final `/goodbye` screen is intentionally bare — no buttons, no
  navigation, just a fade-in "P.S." and a tiny floating heart.
- Reduced-motion preferences are respected globally (see
  `src/index.css`).

## Tech stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- html2canvas (for the "keep this letter forever" download)
