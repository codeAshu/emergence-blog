// The Markdown alternate of a page: what the Human / Machine toggle shows and what
// <link rel="alternate" type="text/markdown"> points at. Essays come straight from their
// source file; every other page is the prerendered HTML of its <main>, converted by
// scripts/md.tsx after each build into public/md/<path>.md.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { site } from "./site";
import { getPageCard } from "./pages";

export const mdHref = (pagePath: string) => `/md${pagePath === "/" ? "/index" : pagePath}.md`;

function turndown() {
  const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*" });
  td.use(gfm);
  td.remove(["script", "style", "noscript", "canvas", "button", "input", "select", "textarea"]);
  // diagrams: keep the figure's own description, drop the drawing
  td.addRule("svg", {
    filter: (node) => node.nodeName.toLowerCase() === "svg",
    replacement: (_c, node) => {
      const label = (node as Element).getAttribute("aria-label");
      return label ? `\n\n*[Figure: ${label}]*\n\n` : "";
    },
  });
  td.addRule("figcaption", { filter: "figcaption", replacement: (c) => `\n\n*${c.trim()}*\n\n` });
  td.addRule("time", { filter: "time", replacement: (c) => c });
  return td;
}

function strip(html: string, selectors: string[]) {
  // remove whole elements by class or tag with a small regex pass; good enough for our own markup
  let out = html;
  for (const sel of selectors) {
    const cls = sel.startsWith(".") ? sel.slice(1) : null;
    const re = cls
      ? new RegExp(`<([a-z0-9]+)([^>]*class="[^"]*\\b${cls}\\b[^"]*"[^>]*)>[\\s\\S]*?<\\/\\1>`, "g")
      : new RegExp(`<${sel}\\b[^>]*>[\\s\\S]*?<\\/${sel}>`, "g");
    out = out.replace(re, "");
  }
  return out;
}

function essayMarkdown(slug: string): string | null {
  const file = path.join(process.cwd(), "content", "posts", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const head = [`# ${data.title}`, data.subtitle ? `\n*${data.subtitle}*` : "", `\n${data.category ?? "Essay"} · ${data.date} · ${data.author ?? site.name}`].join("\n");
  return `${head}\n\n${content.trim()}\n`;
}

export function pageMarkdown(pagePath: string, html: string | null): string | null {
  const card = getPageCard(pagePath);
  if (!card) return null;
  const url = `${site.domain}${pagePath}`;

  const essay = pagePath.startsWith("/writing/") ? essayMarkdown(pagePath.slice("/writing/".length)) : null;
  if (essay) return `${essay}\n---\n\n${url}\n`;

  if (!html) return null;
  // the page's own content: <main>, minus the section menu, the toggle and the machine view itself
  const m = /<main\b[^>]*>([\s\S]*?)<\/main>/.exec(html);
  let inner = m ? m[1] : html;
  inner = strip(inner, [".secnav", ".vtoggle", ".machine", "nav", "footer"]);
  // inline spans and links sit flush against each other in the markup; give them breathing room
  inner = inner.replace(/<\/(span|a|b|i|time|small)>/g, "</$1> ").replace(/<br\s*\/?>/g, "\n");
  const body = turndown().turndown(inner).replace(/\n{3,}/g, "\n\n").trim();
  const head = `# ${card.title}\n\n*${card.description}*\n`;
  // the page's own h1 repeats the title: drop its first occurrence
  const h1 = new RegExp(`(^|\\n)# ${card.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n`);
  const bodyWithoutTitle = body.replace(h1, "$1");
  return `${head}\n${bodyWithoutTitle}\n\n---\n\n${url}\n`.replace(/ ([.,;:!?])/g, "$1");
}
