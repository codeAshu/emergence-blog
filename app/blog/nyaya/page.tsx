import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "Where there is smoke";
const description = "Nyāya is the school of how we know and how we argue: four roads to knowledge, one shape for every inference, and a complete catalogue of the ways a losing opponent cheats. Its best example rises from a kitchen.";

export const metadata: Metadata = {
  title: `${title} | Emergence`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2026-10-17",
    authors: ["Ashutosh Trivedi"],
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function NyayaPage() {
  return <DarsanaPost css={css} html={html} js={js} />;
}
