"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SectionItem = { href: string; label: string; note?: string };

/**
 * A section's own menu, as a vertical list on the left rather than a second
 * horizontal bar under the site nav. Two placements:
 *  - inside a `.wrap.section` grid (default): a sticky column beside the content;
 *  - `rail`: fixed to the left edge of wide screens, for pages that set their own
 *    full-width layout (the darśana posts), hidden on narrower screens.
 */
export default function SectionNav({
  label,
  seal,
  sealImg,
  items,
  rail = false,
}: {
  label: string;
  seal?: string;
  sealImg?: string;
  items: SectionItem[];
  rail?: boolean;
}) {
  const path = usePathname();
  return (
    <nav className={"secnav" + (rail ? " secnav--rail" : "")} aria-label={label}>
      <div className="secnav-head">
        {sealImg && <img src={sealImg} alt="" width={20} height={20} />}
        <span className={seal ? "deva" : undefined}>{seal ?? label}</span>
      </div>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} aria-current={path === i.href ? "page" : undefined}>
              {i.label}
              {i.note && <small>{i.note}</small>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
