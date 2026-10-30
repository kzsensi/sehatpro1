"""Make the mirrored front ends start locally with visual dependencies bundled."""

import re
import shutil
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTERNAL = ROOT / "assets/external"
HEADERS = {"User-Agent": "Mozilla/5.0"}


def download(url, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=30) as response:
        target.write_bytes(response.read())
    print(target.relative_to(ROOT), target.stat().st_size)


def replace(path, substitutions):
    text = path.read_text(encoding="utf-8")
    for old, new in substitutions:
        text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")


def main():
    download("https://www.sehatfirstpro.com/login.html", ROOT / "login.html")
    download("https://www.sehatfirstpro.com/assets/vendors/bootstrap-icons/font/fonts/bootstrap-icons.woff2", ROOT / "assets/vendors/bootstrap-icons/font/fonts/bootstrap-icons.woff2")
    shared = {
        "tailwindcss.js": "https://cdn.tailwindcss.com",
        "flowbite.min.js": "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js",
        "flowbite.min.css": "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css",
        "fontawesome/all.min.css": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        "montserrat.css": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
    }
    for path, url in shared.items():
        download(url, EXTERNAL / path)
    css = (EXTERNAL / "fontawesome/all.min.css").read_text(encoding="utf-8")
    fa_base = shared["fontawesome/all.min.css"]
    for ref in set(re.findall(r"url\((?:[\"'])?(\.\./webfonts/[^)\"']+)", css)):
        download(urllib.parse.urljoin(fa_base, ref), EXTERNAL / "fontawesome" / ref)
    font_css = (EXTERNAL / "montserrat.css").read_text(encoding="utf-8")
    for index, url in enumerate(dict.fromkeys(re.findall(r"https://fonts\.gstatic\.com/[^)\s]+", font_css))):
        name = f"montserrat-{index}.ttf"
        download(url, EXTERNAL / name)
        font_css = font_css.replace(url, "/assets/external/" + name)
    (EXTERNAL / "montserrat.css").write_text(font_css, encoding="utf-8")
    substitutions = [
        ("https://cdn.tailwindcss.com", "/assets/external/tailwindcss.js"),
        ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", "/assets/external/fontawesome/all.min.css"),
        ("https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js", "/assets/external/flowbite.min.js"),
        ("https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css", "/assets/external/flowbite.min.css"),
        ("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap", "/assets/external/montserrat.css"),
    ]
    for page in (ROOT / "index.html", ROOT / "app/index.html"):
        replace(page, substitutions)
    portal = ROOT / "agent-portal"
    shutil.copytree(EXTERNAL, portal / "assets/external", dirs_exist_ok=True)
    shutil.copyfile(ROOT / "favicon.png", portal / "favicon.png")
    replace(portal / "index.html", substitutions + [("%PUBLIC_URL%/favicon.png", "/favicon.png")])
    main_js = ROOT / "static/js/main.430bd3da.js"
    replace(main_js, [("https://portal.sehatfirstpro.com/", "http://localhost:4174/")])


if __name__ == "__main__":
    main()
