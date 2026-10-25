import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string; // ISO
  author: string;
  excerpt?: string;
  featured?: boolean;
  href?: string; // override link (for non-markdown entries)
  art?: string; // key for the card illustration
  html?: string;
  words?: number;
  topics: string[];
};

const dir = path.join(process.cwd(), "content", "posts");

function read(slug: string): Post {
  const file = fs.readFileSync(path.join(dir, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    category: data.category ?? "Essay",
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    author: data.author ?? "Ashutosh Trivedi",
    excerpt: data.excerpt,
    featured: !!data.featured,
    href: data.href,
    art: data.art,
    html: marked.parse(content, { gfm: true }) as string,
    words: content.split(/\s+/).length,
    topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
  };
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => read(f.replace(/\.md$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  try {
    return read(slug);
  } catch {
    return null;
  }
}

export function fmt(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getPostsByTopic(slug: string): Post[] {
  return getPosts().filter((p) => p.topics.includes(slug));
}
