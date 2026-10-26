import Link from "next/link";
import DarsanaScript from "@/components/DarsanaScript";
import SectionNav from "@/components/SectionNav";
import { darsanaPosts } from "@/lib/darsana";

interface DarsanaPostProps {
  slug: string;
  /** Page CSS, already scoped under `.darsana` */
  css: string;
  /** The post's markup, with inline SVG diagrams */
  html: string;
  /** The post's interactive widgets (runs once after mount) */
  js: string;
}

const menu = [
  { href: "/darsana", label: "Overview" },
  ...darsanaPosts.map((p) => ({ href: `/darsana/${p.slug}`, label: `${p.n} · ${p.school}` })),
];

/**
 * Renders one of the darśana explainers inside the same left-menu section grid
 * that Chitrakāvya uses. The posts were written as self-contained pages (their
 * own type, diagrams and small interactive widgets), so they are served as-is;
 * their CSS is scoped under `.darsana` so it cannot leak into the rest of the site.
 */
export default function DarsanaPost({ slug, css, html, js }: DarsanaPostProps) {
  const others = darsanaPosts.filter((p) => p.slug !== slug);
  return (
    <div className="wrap section">
      <SectionNav label="Darśana" seal="दर्शन" items={menu} />
      <div className="section-body">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div className="darsana" dangerouslySetInnerHTML={{ __html: html }} />
        <DarsanaScript js={js} />
        <section className="block" style={{ paddingTop: 48 }}>
          <div className="rule"><span className="label">In this series</span></div>
          <ul className="posts">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/darsana/${o.slug}`} className="post">
                  <span className="when"><b>{o.school}</b>{o.n} of 6</span>
                  <span><span className="t">{o.title}</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 28 }}>
            <Link href="/darsana" className="u arrow">All six, in order</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
