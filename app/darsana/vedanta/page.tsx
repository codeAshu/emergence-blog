import type { Metadata } from "next";
import DarsanaPost from "@/components/DarsanaPost";
import { css, html, js } from "./content";

const title = "The seer who saw both";
const description = "Vedānta is where the six darśanas were always heading: the end of the Veda and, its teachers insist, the end of thought. One set of texts, the Upaniṣads, read four ways: the world as appearance, as God's body, as God's dependent, as God himself. This post follows Śaṅkara's argument first, and then the three who said he had got it wrong.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description, publishedTime: "2026-02-22", authors: ["Ashutosh Trivedi"] },
};

export default function VedantaPage() {
  return <DarsanaPost slug="vedanta" css={css} html={html} js={js} />;
}
