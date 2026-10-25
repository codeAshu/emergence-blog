"use client";

import { useEffect } from "react";

/**
 * Runs a post's inline widget script once the server-rendered markup is
 * in the DOM. Guarded so React's development double-invoke of effects
 * does not attach the listeners twice.
 */
export default function DarsanaScript({ js }: { js: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".darsana");
    if (!root || root.dataset.init === "1") return;
    root.dataset.init = "1";
    try {
      new Function(js)();
    } catch (err) {
      console.error("darsana widget script failed", err);
    }
  }, [js]);
  return null;
}
