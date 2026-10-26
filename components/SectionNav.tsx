"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SectionItem = { href: string; label: string };

/**
 * A section's own menu: a vertical list in the left column of a `.wrap.section`
 * grid, sticky beside the content, rather than a second horizontal bar under
 * the site nav. Used by Chitrakāvya and by the individual darśana posts.
 */
export default function SectionNav({
  label,
  seal,
  sealImg,
  items,
}: {
  label: string;
  seal?: string;
  sealImg?: string;
  items: SectionItem[];
}) {
  const path = usePathname();
  return (
    <nav className="secnav" aria-label={label}>
      <div className="secnav-head">
        {seal && (
          <span className="secnav-seal">
            {sealImg && <img src={sealImg} alt="" width={20} height={20} />}
            <span className="deva">{seal}</span>
          </span>
        )}
        <span className="secnav-en">{label}</span>
      </div>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} aria-current={path === i.href ? "page" : undefined}>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
