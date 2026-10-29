// Static figure from public/figures/<key>.svg (rendered at build time by scripts/render-figures.tsx).
// The file carries its own palette, so there is one per theme; CSS shows the matching one
// (img.light-only / img.dark-only in app/globals.css), and the hidden one is never fetched
// because both load lazily.
export default function Fig({ k, alt = "" }: { k: string; alt?: string }) {
  return (
    <>
      <img className="light-only" src={`/figures/${k}.svg`} alt={alt} width={320} height={320} loading="lazy" decoding="async" />
      <img className="dark-only" src={`/figures/${k}-dark.svg`} alt={alt} width={320} height={320} loading="lazy" decoding="async" />
    </>
  );
}
