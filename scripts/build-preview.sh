#!/usr/bin/env bash
# Static, self-contained preview of the site (used for the shareable artifact).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf out .next
EXPORT=1 npm run build >/dev/null
python3 -I scripts/make-preview.py >/dev/null
npx esbuild scripts/preview-src/entry.tsx --bundle --minify --format=iife --jsx=automatic \
  --define:process.env.NODE_ENV='"production"' --define:process='{"env":{"NODE_ENV":"production"}}' --outfile=preview/preview.js \
  --alias:@=. --log-level=warning
echo "preview ready: $(du -sh preview | cut -f1)"
