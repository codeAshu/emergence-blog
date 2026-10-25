import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "A road out of the clay";
const description = "Sāṃkhya explained how consciousness gets caught in matter, and admitted it had no way out. Patañjali's Yoga is that way. It is a discipline rather than a theory, and the word does not mean what the yoga studios think it means.";

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

export default function YogaPage() {
  return <DarsanaPost css={css} html={html} js={js} />;
}
