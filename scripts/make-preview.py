#!/usr/bin/env python3
"""Turn the static export in out/ into a self-contained, relatively-linked HTML preview in preview/.
Scripts are stripped (no hydration); a small vanilla preview.js restores the knight's tour, the
writing tabs and the murmuration canvas. Run after: EXPORT=1 npm run build"""
import os, re, shutil, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
PRE = ROOT / "preview"
shutil.rmtree(PRE, ignore_errors=True)
PRE.mkdir()

pages = sorted(p for p in OUT.rglob("*.html") if p.name not in ("404.html", "_not-found.html"))
css = next(OUT.glob("_next/static/chunks/*.css"))
shutil.copy(css, PRE / "styles.css")
shutil.copy(OUT / "ashu.jpg", PRE / "ashu.jpg")

# route -> file
routes = {}
for p in pages:
    rel = p.relative_to(OUT).as_posix()
    route = "/" if rel == "index.html" else "/" + rel[:-5]
    routes[route] = rel

def relativize(url, from_rel):
    """Map a root-absolute site URL to a path relative to from_rel (a file path in preview/)."""
    if not url.startswith("/") or url.startswith("//"):
        return url
    path, _, frag = url.partition("#")
    if path.startswith("/_next/"):
        target = "styles.css" if path.endswith(".css") else None
    elif path in routes:
        target = routes[path]
    elif path.rstrip("/") in routes:
        target = routes[path.rstrip("/")]
    elif path == "/ashu.jpg":
        target = "ashu.jpg"
    else:
        target = None
    if target is None:
        return url
    depth = from_rel.count("/")
    rel = ("../" * depth) + target
    return rel + ("#" + frag if frag else "")

script_re = re.compile(r"<script\b[^>]*>.*?</script>", re.S)
preload_re = re.compile(r"<link\b[^>]*rel=\"preload\"[^>]*>", re.S)
attr_re = re.compile(r'\b(href|src)="([^"]*)"')

for p in pages:
    rel = p.relative_to(OUT).as_posix()
    html = p.read_text(encoding="utf8")
    html = script_re.sub("", html)
    html = preload_re.sub("", html)
    html = re.sub(r'<link rel="icon"[^>]*>', '', html)
    html = attr_re.sub(lambda m: f'{m.group(1)}="{relativize(m.group(2), rel)}"', html)
    depth = rel.count("/")
    js = ("../" * depth) + "preview.js"
    html = html.replace("</body>", f'<script src="{js}"></script></body>')
    if rel == "index.html":
        # The artifact page is wrapped in a skeleton: keep only title, stylesheet links and body content.
        head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
        links = "\n".join(re.findall(r"<link\b[^>]*stylesheet[^>]*>", head))
        body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
        html = f"<title>emergence.live</title>\n<meta name=\"theme-color\" content=\"#F2F1EC\">\n{links}\n<style>body{{font-family:var(--sans)}}</style>\n{body}"
    dest = PRE / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf8")

(PRE / "preview.js").write_text(open(ROOT / "scripts" / "preview.js").read(), encoding="utf8")
print("preview files:")
for f in sorted(PRE.rglob("*")):
    if f.is_file():
        print(" ", f.relative_to(PRE).as_posix(), f.stat().st_size)
