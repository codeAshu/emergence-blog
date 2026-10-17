"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["/chitrakavya", "Home"],
  ["/chitrakavya/visuals", "Visuals"],
  ["/chitrakavya/paduka", "Pādukā"],
  ["/chitrakavya/knights-tour", "Knight's Tour"],
  ["/chitrakavya/resources", "Resources"],
  ["/chitrakavya/about", "About"],
];

export default function CkNav() {
  const path = usePathname();
  return (
    <nav className="subnav" aria-label="Chitrakāvya">
      <span className="seal">चित्रकाव्य</span>
      {items.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
