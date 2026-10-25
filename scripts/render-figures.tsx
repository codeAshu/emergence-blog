// Renders each figure once to public/figures/<key>.svg so pages reference a file instead of
// carrying thousands of inline shapes. Run by `npm run figures` (also before build).
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "node:fs";
import { figureByKey } from "../components/Figures";

const css = `
:root{--ink:#161614;--ink-2:#3d3c38;--muted:#76746d;--faint:#a09e96;--hair:#dad7ce;--tint:#ebe9e2;--accent:#d14016}
`.trim();

mkdirSync("public/figures", { recursive: true });
for (const [key, F] of Object.entries(figureByKey)) {
  let svg = renderToStaticMarkup(<F />);
  svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  svg = svg.replace(/^(<svg[^>]*>)/, `$1<style>${css}</style>`);
  writeFileSync(`public/figures/${key}.svg`, svg);
  console.log(key, svg.length);
}
