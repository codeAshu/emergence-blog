import Link from "next/link";

interface BlogPostHeaderProps {
  title: string;
  subtitle?: string;
  date: string;
  author?: string;
}

/**
 * Consistent editorial header for every blog post.
 * Uses Cormorant italic serif for the title and a mono micro-label
 * for the date — per the Impeccable design system.
 *
 * Markup keeps the existing `page-header-animate` / `time` / `.meta` /
 * `.subtitle` / `.header-separator` hooks so the entrance animation
 * defined in globals.css continues to work.
 */
export default function BlogPostHeader({
  title,
  subtitle,
  date,
  author = "Ashutosh Trivedi",
}: BlogPostHeaderProps) {
  return (
    <header className="pt-12 pb-10 md:pt-16 md:pb-12 px-6 md:px-8">
      <div className="max-w-4xl mx-auto page-header-animate">
        <Link
          href="/"
          className="inline-flex items-center gap-2 header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors mb-10"
        >
          <span aria-hidden>←</span>
          <span>All Essays</span>
        </Link>

        <time className="block header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] mb-4">
          {date}
        </time>

        <h1
          className="headline-serif text-[color:var(--foreground)]"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="subtitle mt-3 text-[color:var(--text-subtle)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </p>
        )}

        <p className="meta mt-8 header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
          By {author}
        </p>

        <div className="header-separator" />
      </div>
    </header>
  );
}
