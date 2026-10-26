import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "A road out of the clay";
const description = "Sāṃkhya explained how consciousness gets caught in matter, and admitted it had no way out. Patañjali's Yoga is that way. It is a discipline rather than a theory, and the word does not mean what the yoga studios think it means.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description, publishedTime: "2023-10-08", authors: ["Ashutosh Trivedi"] },
};

export default function YogaPage() {
  return <DarsanaPost slug="yoga" css={css} html={html} js={js} />;
}
