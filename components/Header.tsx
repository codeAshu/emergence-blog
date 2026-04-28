"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial: "light" | "dark" = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    // Dispatch transition event
    window.dispatchEvent(new CustomEvent("themeTransition", { detail: { theme: next } }));

    // Delay the actual theme change slightly for visual effect
    setTimeout(() => {
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }, 100);
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 site-header">
        <div className="max-w-5xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <div className="h-5 w-24 opacity-10 rounded bg-current" />
          <div className="h-8 w-8 opacity-10 rounded-full bg-current" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 site-header">
      <div className="max-w-5xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
        >
          <span
            className="font-serif italic text-xl leading-none text-[color:var(--accent)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            E
          </span>
          <span className="header-mono text-xs uppercase tracking-[0.2em]">
            Emergence
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {!isHome && (
            <Link
              href="/"
              className="header-mono text-xs uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
            >
              All Posts
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent-veil)] transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
