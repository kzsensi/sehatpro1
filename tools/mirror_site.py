"""Mirror public Sehat First Pro build files for local visual/reference use."""

import concurrent.futures
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://www.sehatfirstpro.com/"
ROOT = Path(__file__).resolve().parents[1]
SEED = [
    "index.html", "asset-manifest.json", "robots.txt", "favicon.png",
    "static/js/main.430bd3da.js", "static/js/main.430bd3da.js.map",
    "static/js/453.11452aca.chunk.js", "static/js/453.11452aca.chunk.js.map",
    "static/css/main.38078abb.css", "static/css/main.38078abb.css.map",
]
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; local-site-reference/1.0)"}


def fetch(path):
    path = path.lstrip("/")
    url = urllib.parse.urljoin(BASE, path)
    request = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read()
            content_type = response.headers.get("Content-Type", "")
        # The server returns the SPA shell for missing files, so reject that fallback.
        if path != "index.html" and data.startswith(b"<!doctype html>") and "html" in content_type:
            return path, False, "SPA fallback"
        target = ROOT / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        return path, True, len(data)
    except Exception as exc:
        return path, False, str(exc)


def paths_from_text(text):
    result = set()
    # Absolute public paths used by webpack and source modules.
    for match in re.finditer(r"(?:[\"'`(]|url\()\s*(/?(?:assets|static|images|img|fonts|uploads)/[^\"'`\s)<>?]+)", text):
        candidate = match.group(1).lstrip("/").split("#", 1)[0]
        if candidate and not candidate.endswith("/"):
            result.add(urllib.parse.unquote(candidate))
    # Imports and URL references from bundled images.
    for match in re.finditer(r"(?:[\"'`])(/?[^\"'`\s]{1,240}\.(?:png|jpe?g|webp|svg|gif|ico|woff2?|ttf|otf|pdf|mp4|webm))(?:\?[^\"'`]*)?[\"'`]", text, re.I):
        candidate = match.group(1).lstrip("/")
        if candidate.startswith(("assets/", "static/", "images/", "img/", "fonts/", "uploads/")):
            result.add(urllib.parse.unquote(candidate))
    return result


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        first = list(pool.map(fetch, SEED))
    print("Seed:", first)
    source_map = json.loads((ROOT / "static/js/main.430bd3da.js.map").read_text(encoding="utf-8"))
    app_sources = {}
    for source, content in zip(source_map["sources"], source_map["sourcesContent"]):
        if content is not None and "node_modules" not in source:
            app_sources[source] = content
    (ROOT / "reference").mkdir(exist_ok=True)
    (ROOT / "reference/source-index.json").write_text(json.dumps(list(app_sources), indent=2), encoding="utf-8")
    for source, content in app_sources.items():
        clean = source.replace("webpack://", "").lstrip("/.")
        clean = clean.split("?", 1)[0]
        if not clean or ".." in Path(clean).parts:
            continue
        target = ROOT / "reference" / "source" / clean
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
    print("Recovered authored modules:", len(app_sources))
    all_text = "\n".join(app_sources.values())
    for path in ("index.html", "static/js/main.430bd3da.js", "static/css/main.38078abb.css"):
        all_text += "\n" + (ROOT / path).read_text(encoding="utf-8", errors="ignore")
    paths = paths_from_text(all_text)
    paths |= {
        "assets/vendors/bootstrap/bootstrap.min.css", "assets/vendors/bootstrap/bootstrap.bundle.min.js",
        "assets/vendors/bootstrap-icons/font/bootstrap-icons.min.css",
        "assets/vendors/glightbox/glightbox.min.css", "assets/vendors/glightbox/glightbox.min.js",
        "assets/vendors/swiper/swiper-bundle.min.css", "assets/vendors/swiper/swiper-bundle.min.js",
        "assets/vendors/aos/aos.css", "assets/vendors/aos/aos.js",
        "assets/vendors/gsap/gsap.min.js", "assets/vendors/imagesloaded/imagesloaded.pkgd.min.js",
        "assets/vendors/isotope/isotope.pkgd.min.js", "assets/vendors/purecounter/purecounter.js",
        "assets/css/style.css", "assets/js/custom.js",
    }
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        results = list(pool.map(fetch, sorted(paths)))
    successes = [r for r in results if r[1]]
    failures = [r for r in results if not r[1]]
    print("Downloaded:", len(successes), "Failed:", len(failures))
    (ROOT / "reference/download-report.json").write_text(json.dumps({"downloaded": successes, "failed": failures}, indent=2), encoding="utf-8")
    for item in failures[:100]:
        print("FAILED", item)


if __name__ == "__main__":
    main()
