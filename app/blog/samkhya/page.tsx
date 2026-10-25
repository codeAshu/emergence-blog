import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "The clay before the pot";
const description = "Sāṃkhya is the oldest of India's six classical philosophies and the one most often called scientific. Its first move is the question every creation story skips: a maker can shape a pot, but where did the clay come from?";

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

export default function SamkhyaPage() {
  return <DarsanaPost css={css} html={html} js={js} />;
}
