# emergence.live

Personal site of Ashutosh Trivedi. Next.js (App Router), no CSS framework, deployed on Vercel.

## Run

    npm install
    npm run dev

## Add a post

Drop a markdown file in `content/posts/<slug>.md` with frontmatter:

    ---
    title: "Title"
    subtitle: "One line under the title."
    category: Essay        # Essay, Research, Notes (the tab it sits under)
    topics: [agents, mind] # one or more of: mathematics, optimization, beauty, agents, philosophy, mind, science, chitrakavya, human
    date: 2026-10-17
    author: Ashutosh Trivedi
    featured: true         # shows in the featured row (first three by date)
    art: flock             # card illustration: clay, flock, knight, or leave out
    excerpt: "Two sentences for the card."
    ---

Topics are the site's index (lib/topics.ts): each has a figure and a page at /topics/<slug>, and collects every post that names it. Add a topic there and it appears on the home page, the Topics page and the nav automatically.

The body is plain markdown. Raw HTML is allowed (for example a closing `<p class="note">`).

## Photo

Replace `public/ashu.jpg` (4:5 portrait works best). It is shown in greyscale on the home page and in colour on hover.

## Chitrakāvya

`/chitrakavya` is the archive moved from chitrakavya.worlddb.io. Data lives in `lib/ck.ts`; figures in `components/ck/Bandha.tsx`; the interactive tour in `components/ck/KnightsTour.tsx`. Point the old domain at `/chitrakavya` with a redirect once this is live.

## Themes

Two themes, paper (light) and night (dark). Every color is a token at the top of `app/globals.css`, with the night values under `prefers-color-scheme: dark` and again under `html[data-theme="dark"]` (keep the two blocks the same). The site follows the reader's system setting; the sun/moon switch in the nav stores a choice in `localStorage` and on `<html data-theme>` (`lib/theme.ts`, `components/ThemeToggle.tsx`), and a small script in `<head>` applies it before the first paint.

- Topic figures are files, and an `<img>` cannot read the page's variables, so each one is rendered twice (`<key>.svg` and `<key>-dark.svg`) and `components/Fig.tsx` shows the one for the theme.
- Canvas animations read their palette from `components/animations/useThemeColors.ts` (the home swarm keeps its own, in `components/BackgroundSwarm.tsx`).
- The darśana posts carry their own tokens under `.darsana`; their night values, and a few contrast adjustments, live in the darśana block of `app/globals.css`, so a regenerated post keeps them.

## Build steps

`npm run build` runs three generators around `next build`:

- `prebuild`: `npm run figures` renders the topic figures to `public/figures/*.svg` (one file per theme), then `npm run og` renders one 1200×630 social card per page to `public/og/<key>.png` (satori → resvg, fonts in `assets/fonts/`) and writes `public/llms.txt`. The list of pages, titles, descriptions and figures is `lib/pages.ts`; `lib/og.ts` points each page's metadata at its card.
- `postbuild`: `npm run md` converts each prerendered page to Markdown in `public/md/<path>.md` (essays come straight from `content/posts`). The Human / Machine toggle at the bottom right of every page shows that file, as on videodb.io.

So a change to any page's content, title or excerpt refreshes its card and its Markdown on the next build. The darśana posts' lead figures for their cards (`public/og/lead/*.png`) are rendered from the standalone pages by the darśana build script and committed.
