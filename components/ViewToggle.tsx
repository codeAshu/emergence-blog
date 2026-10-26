"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * The small Human / Machine switch at the bottom right, as on videodb.io.
 *
 * "Machine" shows the page's Markdown alternate (the file that
 * <link rel="alternate" type="text/markdown"> points at) in place of the page,
 * and "Human" brings the page back. The view is kept in the URL (?view=machine)
 * so the back button and shared links work. Without JavaScript the Machine tab
 * is a plain link to the file.
 */
const mdHref = (p: string) => `/md${p === "/" ? "/index" : p}.md`;

export default function ViewToggle() {
  const path = usePathname();
  const href = mdHref(path);
  const [view, setView] = useState<"human" | "machine">("human");
  const [loaded, setLoaded] = useState<{ href: string; text: string } | null>(null);
  const loadedFor = useRef<string | null>(null);
  const scrollY = useRef(0);

  function go(next: "human" | "machine") {
    const url = new URL(location.href);
    if (next === "machine") {
      scrollY.current = window.scrollY;
      url.searchParams.set("view", "machine");
      history.pushState({ view: "machine", pushed: true }, "", url);
    } else if (history.state && history.state.pushed) {
      history.back(); // the popstate listener applies the human view
      return;
    } else {
      url.searchParams.delete("view");
      history.replaceState(null, "", url);
    }
    setView(next);
    if (next === "human") requestAnimationFrame(() => window.scrollTo(0, scrollY.current));
  }

  // apply the view to the document and load the file when needed
  useEffect(() => {
    const root = document.documentElement;
    if (view === "machine") {
      root.setAttribute("data-view", "machine");
      if (loadedFor.current !== href) {
        loadedFor.current = href;
        fetch(href, { headers: { Accept: "text/markdown" } })
          .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
          .then((text) => setLoaded({ href, text }))
          .catch(() => { loadedFor.current = null; setLoaded({ href, text: `Could not load ${href}. Open the file instead.` }); });
      }
      window.scrollTo(0, 0);
    } else {
      root.removeAttribute("data-view");
    }
  }, [view, href]);

  // read the view from the URL on load, on navigation and on back/forward
  useEffect(() => {
    const fromUrl = () => setView(new URL(location.href).searchParams.get("view") === "machine" ? "machine" : "human");
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && view === "machine") go("human"); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <link rel="alternate" type="text/markdown" href={href} title="Machine-readable markdown" />
      <div className="vtoggle" role="group" aria-label="View mode">
        <button type="button" className={"vtoggle__tab" + (view === "human" ? " is-active" : "")} aria-current={view === "human" ? "true" : undefined} onClick={() => go("human")}>
          Human
        </button>
        <a
          className={"vtoggle__tab" + (view === "machine" ? " is-active" : "")}
          href={href}
          aria-current={view === "machine" ? "true" : undefined}
          title="Machine-readable markdown"
          onClick={(e) => {
            // a modified click still opens the file itself
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            go("machine");
          }}
        >
          Machine
        </a>
      </div>
      <section className="machine wrap" aria-label="Machine-readable markdown">
        <p className="machine__head"><code>{site.domain}{href}</code><a className="u arrow" href={href}>Open the file</a></p>
        <pre className="machine__src" tabIndex={0}>{loaded && loaded.href === href ? loaded.text : `Loading ${href}…`}</pre>
      </section>
    </>
  );
}
