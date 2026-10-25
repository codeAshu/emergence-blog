import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "The clay before the pot";
const description = "Sāṃkhya is the oldest of India's six classical philosophies and the one most often called scientific. Its first move is the question every creation story skips: a maker can shape a pot, but where did the clay come from?";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description, publishedTime: "2026-10-17", authors: ["Ashutosh Trivedi"] },
};

export default function SamkhyaPage() {
  return <DarsanaPost slug="samkhya" css={css} html={html} js={js} />;
}
