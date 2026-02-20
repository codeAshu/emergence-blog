"use client";

import dynamic from "next/dynamic";

const BackgroundSwarm = dynamic(() => import("@/components/BackgroundSwarm"), {
  ssr: false,
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen grid-bg">
      <BackgroundSwarm />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
