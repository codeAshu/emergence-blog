"use client";

import { useSyncExternalStore } from "react";
import { currentTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

// The icon is chosen by CSS (.theme .moon / .theme .sun in app/globals.css), so it is right
// from the first paint; only the label needs the theme, and it fills in after hydration.
export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, currentTheme, () => null);
  const next: Theme | null = theme && (theme === "dark" ? "light" : "dark");
  const label = next ? `Switch to the ${next} theme` : "Switch theme";

  return (
    <button
      type="button"
      className="theme"
      aria-label={label}
      title={label}
      onClick={() => setTheme(currentTheme() === "dark" ? "light" : "dark")}
    >
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z" />
      </svg>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5 7 7M17 17l1.5 1.5M5.5 18.5 7 17M17 7l1.5-1.5" />
      </svg>
    </button>
  );
}
