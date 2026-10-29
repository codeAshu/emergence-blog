"use client";

import { useEffect, useRef } from "react";
import { currentTheme, subscribeTheme, type Theme } from "@/lib/theme";

export interface ThemeColors {
  /** Page background — used for the trail-fade overlay */
  background: string;
  /** Subtle background fade applied each frame */
  fadeOverlay: string;
  /** Particle ink — primary mark colour */
  ink: (alpha: number) => string;
  /** Connection / hairline ink */
  hairline: (alpha: number) => string;
  /** The orange accent, used sparingly */
  accent: (alpha: number) => string;
  /** True when the page is currently in dark mode */
  isDark: boolean;
}

/**
 * The palette for the theme the page is showing (the reader's pick, or the system's),
 * kept up to date in a ref as the theme changes.
 *
 * Canvas animations must read from the returned ref each frame because
 * react state updates would tear the running RAF loop.
 */
export function useThemeColorsRef() {
  const ref = useRef<ThemeColors>(buildPalette("light"));

  useEffect(() => {
    const apply = () => {
      ref.current = buildPalette(currentTheme());
    };
    apply();
    return subscribeTheme(apply);
  }, []);

  return ref;
}

function buildPalette(theme: Theme): ThemeColors {
  if (theme === "dark") {
    // Night: the dark surface, warm light greys, the brighter orange
    return {
      background: "rgb(28, 27, 24)",
      fadeOverlay: "rgba(28, 27, 24, 0.20)",
      ink: (a) => `hsla(45, 8%, 80%, ${a})`,
      hairline: (a) => `hsla(45, 6%, 72%, ${a})`,
      accent: (a) => `hsla(15, 76%, 57%, ${a})`,
      isDark: true,
    };
  }

  // Light: the site's cream canvas, ink greys, one orange accent
  return {
    background: "rgb(248, 247, 243)",
    fadeOverlay: "rgba(248, 247, 243, 0.20)",
    ink: (a) => `hsla(40, 4%, 28%, ${a})`,
    hairline: (a) => `hsla(40, 4%, 35%, ${a})`,
    accent: (a) => `hsla(14, 80%, 45%, ${a})`,
    isDark: false,
  };
}
