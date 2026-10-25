// Static figure from public/figures/<key>.svg (rendered at build time by scripts/render-figures.tsx).
export default function Fig({ k, alt = "" }: { k: string; alt?: string }) {
  return <img src={`/figures/${k}.svg`} alt={alt} width={320} height={320} loading="lazy" decoding="async" />;
}
