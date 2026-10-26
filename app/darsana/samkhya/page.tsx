import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { ogFor } from "@/lib/og";
import { css, html, js } from "./content";

const title = "The clay before the pot";
const description = "Sāṃkhya is the oldest of India's six classical philosophies and the one most often called scientific. Its first move is the question every creation story skips: a maker can shape a pot, but where did the clay come from?";

export const metadata: Metadata = {
  title,
  description,
  ...ogFor("/darsana/samkhya"),
  openGraph: { ...ogFor("/darsana/samkhya").openGraph, type: "article", publishedTime: "2023-03-12", authors: ["Ashutosh Trivedi"] },
};

export default function SamkhyaPage() {
  return <DarsanaPost slug="samkhya" css={css} html={html} js={js} />;
}
