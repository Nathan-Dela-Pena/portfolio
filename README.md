# Corkboard portfolio

A portfolio built as a single physical board you view from across the room, then
lean into. React + Vite + Tailwind, no client routing, no backend.

**Three levels of attention**

| Level | What you see | How you get there |
| --- | --- | --- |
| Overview | The whole framed board fits the screen | Load the page, or **Whole board** / `Esc` |
| Section | The camera pans and scales to one cluster | Any header link |
| Note | A note lifts off the board, readable at any size | Click or tap a note |

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

---

## Editing your content

Almost everything lives in `src/data/`. You should not need to touch a component
to change what the board says.

| File | Holds |
| --- | --- |
| `data/profile.js` | Name, role, one-line thesis, contact details, the stat counters |
| `data/experience.js` | Jobs and internships |
| `data/projects.js` | Projects, their links, and their artwork |
| `data/leadership.js` | Leadership roles |
| `data/stack.js` | Skills, grouped |
| `data/media.js` | Paths to the images in `public/images/` |

**Placeholders to replace before you deploy:** `PROFILE.email`,
`PROFILE.linkedin`, and the `COMPANY A`, `COMPANY B`, `UNIVERSITY`, and
`Las Vegas, Nevada` tokens in `profile.js`, `experience.js`, and `leadership.js`.

### Adding a note

Two steps:

1. Add the content to the relevant file in `src/data/`.
2. Register it in `src/board/notes.js` — give it an `id`, a `section`, a paper
   `stock`, a width, and a resting tilt.

That registry is the one place data, rendering, and board position meet. Both the
board and the lifted view read from it, so a note's content exists once.

### Moving things around the board

`src/board/geometry.js` defines a fixed-size world (2620 × 1800) and a rectangle
per section. Positions never change with screen size — only the camera does,
which is what keeps the layout identical on every device. If a cluster's notes
start overflowing its rectangle, widen or heighten that rectangle and adjust
`BOARD` to match.

---

## Architecture

Dependencies run one direction, top to bottom.

```
src/
├── data/          content only, no React
├── board/
│   ├── geometry.js  where each cluster sits, in board coordinates
│   └── notes.js     the registry: data → body → position
├── components/
│   ├── primitives/  Pin, Tape, Meta, Bullets — no content knowledge
│   ├── bodies/      one per data shape; rendered on the board AND lifted
│   ├── BoardNote    a single sheet of paper, and its zoom target
│   ├── Cluster      arranges one section's notes
│   ├── LiftedNote   the note off the board, and its flight
│   ├── Board        the frame, the cork, the camera transform
│   └── Header       section links
├── hooks/
│   ├── useCamera      fits a rectangle to the viewport, refits on resize
│   └── useLiftedNote  which note is off the board, and its exit timing
└── styles/          tokens, board, paper, motion
```

### Why some styling is CSS rather than Tailwind

Paper stocks are applied by name at runtime (`stock-${note.stock}`). Tailwind
scans source text, so a dynamically built `bg-${...}` gets purged. Stocks
therefore live in `styles/paper.css`. Textures, pushpins, tape, and the cork
grain are gradients and pseudo-elements that Tailwind has no vocabulary for.
Everything else — layout, spacing, type, colour on static elements — is Tailwind.

`src/index.css` slots those stylesheets between Tailwind's own layers so
utilities are always emitted last. That is what lets `mx-auto` on a photo print
override the component rule without `!important` anywhere in the codebase.

### The lift animation

`LiftedNote` measures its own resting box against the note still pinned to the
board (`[data-note="..."]`) and animates between them — same top-left, same
width, same tilt. Scaling by width alone keeps the paper's side edges tracking
exactly, which is the edge the eye follows. Opening and closing use the same
path in opposite directions.

`prefers-reduced-motion` disables the flight, the camera glide, and the paper
tilt throughout.

---

## Deploying

### GitHub

```bash
git init
git add .
git commit -m "Corkboard portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Vercel

Zero config — Vercel detects Vite and gets everything right. No `vercel.json`
needed.

1. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
2. Confirm the detected settings (Framework **Vite**, build `npm run build`,
   output `dist`) and deploy.
3. Every push to `main` redeploys; pull requests get preview URLs.

Or from the terminal:

```bash
npx vercel        # preview deploy
npx vercel --prod # production
```

**Custom domain:** Vercel dashboard → your project → Settings → Domains.

---

## Fonts and images

Fonts load from Google Fonts via `index.html` — Caveat for handwriting, IBM Plex
Sans for body, Space Mono for dates and labels. All three have system fallbacks
if the request is blocked.

Images live in `public/images/` and are served as static files, so the browser
caches them separately from the JS bundle. Replace a file and keep the name and
nothing else needs to change.
