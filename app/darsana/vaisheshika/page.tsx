import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "An inventory of everything";
const description = "Vaiśeṣika is Nyāya's partner: the realist's list of what there is, down to the atom, with space and time counted as things rather than gaps. It rarely gets a treatment of its own, so this post gathers it from the places it turns up, inside Nyāya, inside the atom, inside the list of categories, and says where each piece comes from.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description, publishedTime: "2024-11-03", authors: ["Ashutosh Trivedi"] },
};

export default function VaisheshikaPage() {
  return <DarsanaPost slug="vaisheshika" css={css} html={html} js={js} />;
}
