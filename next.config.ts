import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EXPORT=1 npm run build → static out/ (used for the standalone HTML preview). Vercel runs the normal build.
  output: process.env.EXPORT ? "export" : undefined,
};

export default nextConfig;
