// Renders one 1200×630 social card per page to public/og/<key>.png. Runs before every build
// (`npm run og`, called by `prebuild`), so a change to a title, excerpt or figure updates the
// card with it. Pipeline: satori (element tree → SVG) → resvg (SVG → PNG), the same as
// videodb.io; the card is the site's own first fold in miniature: paper ground, a label with
// the orange point, the serif title, the sans description, and the page's figure on the right
// fading into the paper.
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { getPageCards, type PageCard } from "../lib/pages";
import { site } from "../lib/site";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "og");
const BG = "#F2F1EC";
const INK = "#161614";
const INK2 = "#3d3c38";
const MUTED = "#76746d";
const ACCENT = "#d14016";

const font = (f: string) => fs.readFileSync(path.join(ROOT, "assets", "fonts", f));
const fonts = [
  { name: "Source Serif 4", data: font("SourceSerif4-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-Medium.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "Source Serif 4", data: font("SourceSerif4-Italic.woff"), weight: 400 as const, style: "italic" as const },
];

// The figure SVGs use CSS variables, which resvg does not resolve: inline them.
const VARS: Record<string, string> = { ink: INK, "ink-2": INK2, muted: MUTED, faint: "#a09e96", hair: "#dad7ce", tint: "#ebe9e2", accent: ACCENT };
function figureDataUri(key: string): string {
  let svg = fs.readFileSync(path.join(ROOT, "public", "figures", `${key}.svg`), "utf8");
  svg = svg.replace(/<style>[\s\S]*?<\/style>/, "").replace(/var\(--([a-z0-9-]+)\)/g, (_, v) => VARS[v] ?? INK);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
function imageDataUri(rel: string): { src: string; w: number; h: number } {
  const file = path.join(ROOT, "public", rel);
  const buf = fs.readFileSync(file);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
  // PNG and JPEG dimensions, enough for the files we ship
  let w = 0, h = 0;
  if (mime === "image/png") { w = buf.readUInt32BE(16); h = buf.readUInt32BE(20); }
  else {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) { h = buf.readUInt16BE(i + 5); w = buf.readUInt16BE(i + 7); break; }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return { src: `data:${mime};base64,${buf.toString("base64")}`, w, h };
}

const noOrphan = (s: string) => s.replace(/\s+(\S+)\s*$/, " $1");
function titleSize(t: string) {
  const n = t.length;
  if (n <= 24) return 72;
  if (n <= 40) return 64;
  if (n <= 60) return 54;
  return 46;
}

function card(c: PageCard) {
  const titleFs = titleSize(c.title);
  const desc = noOrphan(c.description.trim());
  const descFs = desc.length > 150 ? 21 : 24;

  // right-hand art: a figure bleeding off the edge, or a raster image framed in the right half
  let art: React.ReactNode = null;
  if (c.image) {
    const im = imageDataUri(c.image);
    const photo = /\.jpe?g$/i.test(c.image);
    if (photo) {
      art = (
        <div style={{ position: "absolute", left: 744, top: 135, width: 360, height: 360, borderRadius: 999, overflow: "hidden", display: "flex", border: "1px solid #dad7ce" }}>
          <img src={im.src} width={360} height={360} style={{ objectFit: "cover", width: 360, height: 360 }} />
        </div>
      );
    } else {
      // fit into a 520×460 box on the right, centred
      const boxW = 600, boxH = 480;
      const s = Math.min(boxW / im.w, boxH / im.h);
      const w = Math.round(im.w * s), h = Math.round(im.h * s);
      art = (
        <div style={{ position: "absolute", left: 1200 - 48 - boxW, top: 0, width: boxW, height: 630, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={im.src} width={w} height={h} />
        </div>
      );
    }
  } else if (c.figure) {
    art = (
      <>
        <div style={{ position: "absolute", left: 600, top: -60, width: 750, height: 750, display: "flex" }}>
          <img src={figureDataUri(c.figure)} width={750} height={750} />
        </div>
        <div style={{ position: "absolute", left: 520, top: 0, width: 260, height: 630, background: "linear-gradient(90deg, #F2F1EC 0%, rgba(242,241,236,0.92) 35%, rgba(242,241,236,0) 100%)" }} />
      </>
    );
  }
  const textW = c.image && !/\.jpe?g$/i.test(c.image ?? "") ? 500 : 620;

  return (
    <div style={{ width: 1200, height: 630, background: BG, color: INK, position: "relative", display: "flex", fontFamily: "Inter" }}>
      {art}
      <div style={{ position: "absolute", left: 84, top: 0, height: 630, width: textW, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 17, fontWeight: 500, letterSpacing: 2.4, textTransform: "uppercase", color: MUTED }}>
          <div style={{ width: 9, height: 9, borderRadius: 999, background: ACCENT, marginRight: 14 }} />
          <div>{c.kicker}</div>
        </div>
        <div style={{ fontFamily: "Source Serif 4", fontSize: titleFs, lineHeight: 1.04, letterSpacing: -1.3, marginTop: 26, maxWidth: textW - 80 }}>{noOrphan(c.title)}</div>
        <div style={{ fontSize: descFs, lineHeight: 1.45, color: INK2, marginTop: 28, maxWidth: textW - 100 }}>{desc}</div>
      </div>
      <div style={{ position: "absolute", left: 84, bottom: 56, fontFamily: "Source Serif 4", fontStyle: "italic", fontSize: 21, color: INK, display: "flex" }}>{site.tagline}</div>
    </div>
  );
}


async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const cards = getPageCards();
  for (const c of cards) {
    const svg = await satori(card(c), { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
    fs.writeFileSync(path.join(OUT, `${c.key}.png`), png);
    console.log(`og/${c.key}.png  ${c.title}`);
  }
  console.log(`${cards.length} cards`);

  // llms.txt: the same list for agents, each page with its Markdown alternate
  const lines = [
    `# ${site.name} · emergence.live`,
    ``,
    `> ${site.ogDescription}`,
    ``,
    `Every page has a Markdown alternate at /md/<path>.md (the home page at /md/index.md); the Human / Machine toggle on each page shows it.`,
    ``,
    `## Pages`,
    ``,
    ...cards.map((c) => `- [${c.title}](${site.domain}/md${c.path === "/" ? "/index" : c.path}.md): ${c.description}`),
    ``,
  ];
  fs.writeFileSync(path.join(ROOT, "public", "llms.txt"), lines.join("\n"));
  console.log("public/llms.txt");
}
main().catch((e) => { console.error(e); process.exit(1); });
