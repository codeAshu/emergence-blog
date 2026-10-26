import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { topics } from "@/lib/topics";
import { darsanaPosts } from "@/lib/darsana";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const fixed = ["", "/writing", "/topics", "/about", "/chitrakavya", "/chitrakavya/visuals", "/chitrakavya/paduka", "/chitrakavya/knights-tour", "/chitrakavya/resources", "/chitrakavya/about"];
  return [
    ...fixed.map((p) => ({ url: base + p, lastModified: new Date() })),
    ...topics.map((t) => ({ url: `${base}/topics/${t.slug}`, lastModified: new Date() })),
    ...getPosts().map((p) => ({ url: `${base}/writing/${p.slug}`, lastModified: new Date(p.date) })),
    { url: `${base}/darsana`, lastModified: new Date(darsanaPosts[darsanaPosts.length - 1].date) },
    ...darsanaPosts.map((p) => ({ url: `${base}/darsana/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
