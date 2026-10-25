import DarsanaScript from "@/components/DarsanaScript";

interface DarsanaPostProps {
  /** Page CSS, already scoped under `.darsana` */
  css: string;
  /** The post's `<main>` markup, with inline SVG diagrams */
  html: string;
  /** The post's interactive widgets (runs once after mount) */
  js: string;
}

/**
 * Renders one of the darśana explainers. These posts were written as
 * self-contained pages (their own type, diagrams and small interactive
 * widgets), so they are served as-is inside the site shell rather than
 * re-typeset in prose-emergence. The CSS is scoped under `.darsana`
 * so it cannot leak into the header or the other essays.
 */
export default function DarsanaPost({ css, html, js }: DarsanaPostProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="darsana" dangerouslySetInnerHTML={{ __html: html }} />
      <DarsanaScript js={js} />
    </>
  );
}
