// Renders each figure once to public/figures/<key>.svg so pages reference a file instead of
// carrying thousands of inline shapes. Run by `npm run figures` (also before build).
// Each figure is written twice, with the paper and the night palettes (<key>.svg and
// <key>-dark.svg): an <img> cannot see the page's CSS variables, so components/Fig.tsx
// shows the file that matches the theme.
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "node:fs";
import { figureByKey } from "../components/Figures";

// keep in step with the tokens in app/globals.css
const palettes = {
  "": ":root{--ink:#161614;--ink-2:#3d3c38;--muted:#76746d;--faint:#a09e96;--hair:#dad7ce;--tint:#ebe9e2;--accent:#d14016}",
  "-dark": ":root{--ink:#ecebe4;--ink-2:#cfccc3;--muted:#a29f96;--faint:#7d7a71;--hair:#34322d;--tint:#24231f;--accent:#e5683d}",
};

mkdirSync("public/figures", { recursive: true });
for (const [key, F] of Object.entries(figureByKey)) {
  const base = renderToStaticMarkup(<F />).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  for (const [suffix, css] of Object.entries(palettes)) {
    const svg = base.replace(/^(<svg[^>]*>)/, `$1<style>${css}</style>`);
    writeFileSync(`public/figures/${key}${suffix}.svg`, svg);
    console.log(`${key}${suffix}`, svg.length);
  }
}
