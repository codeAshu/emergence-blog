// Writes the Markdown alternate of every page to public/md/<path>.md after each build
// (`npm run md`, called by `postbuild`): the prerendered HTML in .next/server/app is read,
// its <main> converted, and essays are copied from their source. The Human / Machine toggle
// fetches these files; public/llms.txt (written by scripts/og.tsx) lists them.
import fs from "node:fs";
import path from "node:path";
import { pageMarkdown, mdHref } from "../lib/markdown";
import { getPageCards } from "../lib/pages";

const ROOT = process.cwd();
const APP = path.join(ROOT, ".next", "server", "app");

function htmlFor(pagePath: string): string | null {
  const rel = pagePath === "/" ? "index" : pagePath.replace(/^\//, "");
  try { return fs.readFileSync(path.join(APP, `${rel}.html`), "utf8"); } catch { return null; }
}

let n = 0;
for (const c of getPageCards()) {
  const md = pageMarkdown(c.path, htmlFor(c.path));
  if (!md) { console.warn(`md: no HTML for ${c.path}`); continue; }
  const out = path.join(ROOT, "public", mdHref(c.path));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, md);
  n++;
}
console.log(`${n} markdown alternates in public/md`);
