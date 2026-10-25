import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "The act keeps its own books";
const description = "Mīmāṃsā is the school that defended the Vedic rite when the Buddhists had all but buried it. To do that it argued that the word is older than the god, that a text with no author cannot be wrong, and that nobody is needed to pay out the fruit of an act. This post follows that argument, and then looks at what the rite actually was.";

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

export default function MimamsaPage() {
  return <DarsanaPost css={css} html={html} js={js} />;
}
