import Link from "next/link";

interface BlogPostFooterProps {
  date: string;
}

export default function BlogPostFooter({ date }: BlogPostFooterProps) {
  return (
    <footer className="mt-20 pt-10 border-t border-[color:var(--border)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
          {date}
        </p>
        <Link
          href="/"
          className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
        >
          ← All Essays
        </Link>
      </div>
    </footer>
  );
}
