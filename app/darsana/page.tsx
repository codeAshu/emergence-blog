import type { Metadata } from "next";
import Link from "next/link";
import { darsanaPosts, darsanaSeries } from "@/lib/darsana";

export const metadata: Metadata = {
  title: darsanaSeries.title,
  description: darsanaSeries.excerpt,
};

export default function DarsanaIndex() {
  return (
    <div className="wrap">
      <div className="pagehead col">
        <h1 className="display">The six darśanas</h1>
        <p className="lead">
          Notes on the orthodox schools of Indian philosophy, one post each, written as a
          compiler&apos;s learning rather than a scholar&apos;s verdict. They read best in order:
          Sāṃkhya lays out the material, Yoga the way out of it, Nyāya and Vaiśeṣika the
          logic and the inventory, Mīmāṃsā the rite, and Vedānta the end the others were
          heading for. The diagrams are my own.
        </p>
      </div>
      <section className="block" style={{ paddingTop: 36, borderTop: 0 }}>
        <ul className="posts">
          {darsanaPosts.map((p) => (
            <li key={p.slug}>
              <Link href={`/darsana/${p.slug}`} className="post">
                <span className="when"><b>{p.school}</b>{p.n} of 6 · {p.read}</span>
                <span>
                  <span className="t">{p.title}</span>
                  <p>{p.excerpt}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
