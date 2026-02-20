import type { Metadata } from "next";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "The Agentic Web: When Machines Form Societies | Emergence",
  description:
    "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks. A philosophical journey through Web 4.0.",
};

export default function AgenticWebPost() {
  return <BlogContent />;
}
