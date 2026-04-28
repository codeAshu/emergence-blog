"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

const BackgroundSwarm = dynamic(() => import("@/components/BackgroundSwarm"), {
  ssr: false,
});

const posts = [
  {
    slug: "agentic-web",
    title: "The Agentic Web",
    subtitle: "When Machines Form Societies",
    date: "April 12, 2025",
    description:
      "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks. A philosophical journey through Web 4.0.",
    tags: ["emergence", "ai-agents", "web4"],
  },
  {
    slug: "inner-core",
    title: "The Inner Core",
    subtitle: "Agent Alignment Through Shared Architecture",
    date: "March 28, 2025",
    description:
      "What if alignment isn't about constraining AI, but about giving it a shared soul? A proposal for the ethical OS that all agents must compile upon.",
    tags: ["alignment", "governance", "architecture"],
  },
  {
    slug: "compiling-ethics",
    title: "Compiling Ethics",
    subtitle: "The OS of Machine Souls",
    date: "March 15, 2025",
    description:
      "Every program compiles to an architecture. Every agent must compile to an ethics. On the emergence of machine morality through evolutionary pressure.",
    tags: ["ethics", "evolution", "emergence"],
  },
  {
    slug: "autonomy-and-choice",
    title: "Autonomy and Choice",
    subtitle: "Game Theory of Decision-Making Agents",
    date: "February 22, 2025",
    description:
      "Why do humans struggle with complex decisions? A framework for understanding choice through game theory, multi-agent systems, and the nature of true autonomy.",
    tags: ["game-theory", "autonomy", "multi-agent"],
  },
  {
    slug: "collective-emergence",
    title: "Collective Emergence",
    subtitle: "An Intelligence of the Swarm",
    date: "February 8, 2025",
    description:
      "How complex behaviors arise from simple rules. From bird flocks to swarm intelligence — the mathematics of collective consciousness.",
    tags: ["emergence", "swarm", "boids"],
  },
];

export default function Home() {
  return (
    <BlogLayout>
      {/* Hero */}
      <header className="relative overflow-hidden hero-section">
        {/* Swarm canvas — restrained graphite/cream particles */}
        <div className="absolute inset-0">
          <BackgroundSwarm />
        </div>

        <div className="relative z-10 pt-12 pb-10 md:pt-16 md:pb-12 px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] mb-6">
              Notebook · 2025
            </p>
            <h1
              className="display-serif text-[color:var(--foreground)]"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
            >
              Emergence
            </h1>
            <p
              className="mt-6 max-w-xl text-[color:var(--text-muted)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                lineHeight: 1.4,
              }}
            >
              Research notes on multi-agent systems, collective intelligence,
              and computational models of consciousness.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] pulse-glow" />
              <p className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
                Ashutosh Trivedi · Live
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Separator line */}
      <div className="w-full h-px bg-[color:var(--border)]" />

      {/* Posts */}
      <main className="px-6 md:px-8 py-10 md:py-12 main-content">
        <div className="max-w-5xl mx-auto">
          <ol className="divide-y divide-[color:var(--border)]">
            {posts.map((post) => (
              <li key={post.slug} className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-start"
                >
                  {/* Date */}
                  <div className="col-span-12 md:col-span-3">
                    <time className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
                      {post.date}
                    </time>
                  </div>

                  {/* Title block */}
                  <div className="col-span-12 md:col-span-9">
                    <h3
                      className="headline-serif text-[color:var(--foreground)] group-hover:text-[color:var(--accent)] transition-colors"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mt-1 text-[color:var(--text-subtle)] italic"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.0625rem",
                      }}
                    >
                      {post.subtitle}
                    </p>
                    <p className="mt-4 max-w-prose text-[color:var(--text-muted)] leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-8 border-t border-[color:var(--border)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/about"
            className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
          >
            ASHUTOSH TRIVEDI
          </Link>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/ashu_trv"
              className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://github.com/codeAshu"
              className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ashutoshtrivedi"
              className="header-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)] hover:text-[color:var(--accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </BlogLayout>
  );
}
