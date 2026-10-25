import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const fixed = ["", "/writing", "/about", "/chitrakavya", "/chitrakavya/visuals", "/chitrakavya/paduka", "/chitrakavya/knights-tour", "/chitrakavya/resources", "/chitrakavya/about"];
  return [
    ...fixed.map((p) => ({ url: base + p, lastModified: new Date() })),
    ...getPosts().map((p) => ({ url: `${base}/writing/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
