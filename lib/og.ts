import type { Metadata } from "next";
import { ogKey, getPageCard } from "./pages";

/**
 * Open Graph and Twitter metadata for a page, pointing at the card that
 * scripts/og.tsx rendered for it at build time (public/og/<key>.png).
 */
export function og(path: string, title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { url: `/og/${ogKey(path)}.png`, width: 1200, height: 630, alt: title };
  return {
    openGraph: { type: "website", siteName: "emergence.live", title, description, images: [image] },
    twitter: { card: "summary_large_image", creator: "@ashu_trv", title, description, images: [image.url] },
  };
}

/** The same, read from the page registry in lib/pages.ts. */
export function ogFor(path: string): Pick<Metadata, "openGraph" | "twitter"> {
  const c = getPageCard(path);
  if (!c) throw new Error(`no page card registered for ${path}`);
  return og(path, c.title, c.description);
}
