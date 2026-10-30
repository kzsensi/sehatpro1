"""Copy the publicly reachable customer and leader/agent portal front ends."""

import concurrent.futures
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; local-site-reference/1.0)"}


def get(base, path, target_root):
    path = path.lstrip("/")
    try:
        req = urllib.request.Request(urllib.parse.urljoin(base, path), headers=HEADERS)
        with urllib.request.urlopen(req, timeout=45) as response:
            data = response.read()
            kind = response.headers.get("Content-Type", "")
        if path not in ("index.html", "app/index.html") and data.lstrip().lower().startswith(b"<!doctype html>") and "html" in kind:
            return path, False, "SPA fallback"
        dest = target_root / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return path, True, len(data)
    except Exception as exc:
        return path, False, str(exc)


def file_refs(text):
    suffixes = "png|jpe?g|webp|svg|gif|ico|woff2?|ttf|otf|pdf|mp4|webm|css|js|json"
    refs = set()
    for match in re.finditer(r"[\"'`](/?(?:app/|src/|assets/|static/|images/|img/|fonts/)[^\"'`\s<>]{1,260}?)\.(" + suffixes + r")(?:\?[^\"'`\s]*)?[\"'`]", text, re.I):
        refs.add(urllib.parse.unquote(match.group(1).lstrip("/") + "." + match.group(2)))
    for match in re.finditer(r"url\(\s*[\"']?(/?[^)\"'\s]{1,260}\. (?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf))", text, re.I):
        refs.add(match.group(1).lstrip("/"))
    return refs


def chunk_refs(text):
    result = set()
    for chunk_id, digest in re.findall(r"(\d+):\"([a-f0-9]{12,})\"", text):
        result.add(f"{chunk_id}.{digest}.js")
    return result


def batch(base, paths, root):
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        return list(pool.map(lambda p: get(base, p, root), sorted(paths)))


def mirror_customer():
    base = "https://www.sehatfirstpro.com/"
    manifest_req = urllib.request.Request(base + "app/asset-manifest.json", headers=HEADERS)
    manifest = json.load(urllib.request.urlopen(manifest_req, timeout=30))
    seeds = {"app/index.html", "app/asset-manifest.json", "app/manifest.json", "app/favicon.png", "login.html", "app/js/tailwind.config.js", "src/assets/css/style.css"}
    seeds |= {p.lstrip("/") for p in manifest["files"].values()}
    result = batch(base, seeds, ROOT)
    texts = "\n".join((ROOT / path).read_text(encoding="utf-8", errors="ignore") for path, ok, _ in result if ok and path.endswith((".js", ".css", ".html")))
    refs = file_refs(texts)
    # CRA references webpack-emitted media using bare filenames under /app/static/media.
    for path in re.findall(r"static/media/[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf)", texts, re.I):
        refs.add("app/" + path)
    refs = {p for p in refs if p.startswith(("app/", "src/"))}
    result += batch(base, refs - seeds, ROOT)
    print("Customer files:", sum(ok for _, ok, _ in result), "failed:", sum(not ok for _, ok, _ in result))
    return result


def mirror_agent():
    base = "https://portal.sehatfirstpro.com/"
    dest = ROOT / "agent-portal"
    seeds = {"index.html", "main.1df99b2d62752885b099.js", "remoteEntry.js", "favicon.png"}
    result = batch(base, seeds, dest)
    scripts = "\n".join((dest / p).read_text(encoding="utf-8", errors="ignore") for p, ok, _ in result if ok and p.endswith((".js", ".html")))
    chunks = chunk_refs(scripts)
    # Public page shell names additional scripts and styles.
    refs = file_refs(scripts)
    refs |= chunks
    refs |= {"assets/js/" + name for name in [
        "popper.min.js", "bootstrap.min.js", "jquery.fancybox.js", "jquery-ui.js", "gsap.js",
        "gsap-scroll-to-plugin.js", "gsap-scroll-smoother.js", "gsap-scroll-trigger.js",
        "gsap-split-text.js", "split-type.min.js", "parallaxie.js", "wow.js", "bxslider.js",
        "nice-select.min.js", "knob.js", "appear.js", "swiper.min.js", "mixitup.js", "script.js",
    ]}
    result += batch(base, refs - seeds, dest)
    # Examine downloaded chunks for media and nested chunk names.
    texts = "\n".join((dest / p).read_text(encoding="utf-8", errors="ignore") for p, ok, _ in result if ok and p.endswith((".js", ".css")))
    more = file_refs(texts) | chunk_refs(texts)
    more |= {p for p in re.findall(r"(?:assets|static)/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf)", texts, re.I)}
    existing = {p for p, _, _ in result}
    result += batch(base, more - existing, dest)
    # The portal's webpack runtime also requests CSS chunks, usually id.hash.css.
    css_candidates = set(re.findall(r"(\d+\.[a-f0-9]{12,}\.css)", texts))
    result += batch(base, css_candidates - {p for p, _, _ in result}, dest)
    print("Agent files:", sum(ok for _, ok, _ in result), "failed:", sum(not ok for _, ok, _ in result))
    return result


def main():
    customer = mirror_customer()
    agent = mirror_agent()
    (ROOT / "reference/portal-download-report.json").write_text(json.dumps({"customer": customer, "agent": agent}, indent=2), encoding="utf-8")
    for label, results in (("customer", customer), ("agent", agent)):
        for row in results:
            if not row[1]:
                print("FAILED", label, row)


if __name__ == "__main__":
    main()
