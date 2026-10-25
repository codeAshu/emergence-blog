import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "An inventory of everything";
const description = "Vaiśeṣika is Nyāya's partner: the realist's list of what there is, down to the atom, with space and time counted as things rather than gaps. It rarely gets a treatment of its own, so this post gathers it from the places it turns up, inside Nyāya, inside the atom, inside the list of categories, and says where each piece comes from.";

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

export default function VaisheshikaPage() {
  return <DarsanaPost css={css} html={html} js={js} />;
}
