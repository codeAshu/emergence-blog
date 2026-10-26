import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { ogFor } from "@/lib/og";
import { css, html, js } from "./content";

const title = "A road out of the clay";
const description = "Sāṃkhya explained how consciousness gets caught in matter, and admitted it had no way out. Patañjali's Yoga is that way. It is a discipline rather than a theory, and the word does not mean what the yoga studios think it means.";

export const metadata: Metadata = {
  title,
  description,
  ...ogFor("/darsana/yoga"),
  openGraph: { ...ogFor("/darsana/yoga").openGraph, type: "article", publishedTime: "2023-10-08", authors: ["Ashutosh Trivedi"] },
};

export default function YogaPage() {
  return <DarsanaPost slug="yoga" css={css} html={html} js={js} />;
}
