"""Fetch customer images referenced with both /app/images and /images paths."""

import re
from pathlib import Path

from mirror_portals import ROOT, get

bundle = (ROOT / "app/static/js/main.80a280cc.js").read_text(encoding="utf-8")
images = set(re.findall(r"/images/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|gif)", bundle))
for image in sorted(images):
    path = "app" + image
    if not (ROOT / path).exists():
        result = get("https://www.sehatfirstpro.com/", path, ROOT)
        print(result)
