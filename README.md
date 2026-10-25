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
