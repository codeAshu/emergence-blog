"use client";

import { useEffect, useRef } from "react";

export interface ThemeColors {
  /** Page background — used for the trail-fade overlay */
  background: string;
  /** Subtle background fade applied each frame */
  fadeOverlay: string;
  /** Particle ink — primary mark colour */
  ink: (alpha: number) => string;
  /** Connection / hairline ink */
  hairline: (alpha: number) => string;
  /** Editorial Magenta accent — use sparingly */
  accent: (alpha: number) => string;
  /** True when the page is currently in dark mode */
  isDark: boolean;
}

/**
 * Read the active editorial palette from the document `data-theme`
 * attribute and keep a ref up to date as the user toggles the theme.
 *
 * Canvas animations must read from the returned ref each frame because
 * react state updates would tear the running RAF loop.
 */
export function useThemeColorsRef() {
  const ref = useRef<ThemeColors>(buildPalette("light"));

  useEffect(() => {
    const apply = () => {
      const theme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      ref.current = buildPalette(theme);
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}

function buildPalette(theme: "light" | "dark"): ThemeColors {
  if (theme === "dark") {
    return {
      background: "rgb(20, 20, 22)",
      fadeOverlay: "rgba(20, 20, 22, 0.18)",
      ink: (a) => `hsla(0, 0%, 80%, ${a})`,
      hairline: (a) => `hsla(0, 0%, 75%, ${a})`,
      accent: (a) => `hsla(330, 65%, 70%, ${a})`,
      isDark: true,
    };
  }

  // Light — warm-paper editorial
  return {
    background: "rgb(247, 244, 240)",
    fadeOverlay: "rgba(247, 244, 240, 0.20)",
    ink: (a) => `hsla(0, 0%, 30%, ${a})`,
    hairline: (a) => `hsla(0, 0%, 35%, ${a})`,
    accent: (a) => `hsla(330, 65%, 50%, ${a})`,
    isDark: false,
  };
}
