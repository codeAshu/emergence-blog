import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "Where there is smoke";
const description = "Nyāya is the school of how we know and how we argue: four roads to knowledge, one shape for every inference, and a complete catalogue of the ways a losing opponent cheats. Its best example rises from a kitchen.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description, publishedTime: "2024-04-21", authors: ["Ashutosh Trivedi"] },
};

export default function NyayaPage() {
  return <DarsanaPost slug="nyaya" css={css} html={html} js={js} />;
}
