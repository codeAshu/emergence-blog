"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

const items = [
  { href: "/writing", label: "Writing" },
  { href: "/topics", label: "Topics" },
  { href: "/darsana", label: "Darśana" },
  { href: "/chitrakavya", label: "Chitrakāvya" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="wordmark">
          {site.name}
        </Link>
        <ul>
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} aria-current={path.startsWith(i.href) ? "page" : undefined}>
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="right">
          <div className="social">
            <a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
