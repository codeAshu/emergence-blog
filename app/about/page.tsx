import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "About | Emergence",
  description: "Builder at the edge of complexity.",
};

export default function AboutPage() {
  return (
    <BlogLayout>
      <div className="min-h-screen">
        <main className="px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors mb-12"
            >
              <span aria-hidden>←</span>
              <span>All Essays</span>
            </Link>

            <p className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] mb-4">
              About
            </p>

            <h1
              className="headline-serif text-[color:var(--foreground)]"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              Ashutosh Trivedi
            </h1>

            <div className="header-separator" />

            <section className="prose-emergence mt-12">
              <p>
                I build at the intersection of machine learning and distributed
                systems. I think about emergence, consciousness, and the
                mathematics that connects them.
              </p>
              <p>
                The questions that keep me awake: What patterns persist across
                scales? Where does order come from? Can we design systems that
                are more than the sum of their parts?
              </p>
              <p>
                I work on multi-agent systems, collective intelligence, and
                computational models of consciousness. Somewhere between the
                mountains and the machine.
              </p>
            </section>

            <div className="header-separator" />

            <div className="flex gap-6 mt-10">
              <a
                href="https://twitter.com/ashu_trv"
                target="_blank"
                rel="noopener noreferrer"
                className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com/codeAshu"
                target="_blank"
                rel="noopener noreferrer"
                className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ashutoshtrivedi"
                target="_blank"
                rel="noopener noreferrer"
                className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </main>
      </div>
    </BlogLayout>
  );
}
