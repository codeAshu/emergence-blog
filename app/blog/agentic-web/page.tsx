import type { Metadata } from "next";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "The Agentic Web: When Machines Form Societies | Emergence",
  description:
    "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks. A philosophical journey through Web 4.0.",
  openGraph: {
    title: "The Agentic Web: When Machines Form Societies",
    description: "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks.",
    type: "article",
    publishedTime: "2025-04-12",
    authors: ["Ashutosh Trivedi"],
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agentic Web: When Machines Form Societies",
    description: "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks.",
    images: ["/og-image.png"],
  },
};

export default function AgenticWebPost() {
  return <BlogContent />;
}
