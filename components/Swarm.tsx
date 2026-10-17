"use client";

import dynamic from "next/dynamic";

// Client wrapper so the society swarm (canvas-only) skips SSR, as in the original site.
const BackgroundSwarm = dynamic(() => import("@/components/BackgroundSwarm"), { ssr: false });

export default function Swarm() {
  return <BackgroundSwarm />;
}
