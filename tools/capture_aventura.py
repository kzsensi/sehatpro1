"""Read-only public frontend reference capture, capped at 20 MiB."""
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'reference/sites/aventura'
base = 'https://aventuradentalarts.com/'
limit = 20 * 1024 * 1024
used = (root / 'index.html').stat().st_size
html = (root / 'index.html').read_text(encoding='utf8')
queue = list(dict.fromkeys(re.findall(r'(?:src|href)="([^\"]+\.(?:js|css)(?:\?[^\"]*)?)"', html)))
seen = set()
manifest = []
while queue and used < limit and len(seen) < 70:
    path = queue.pop(0)
    url = urllib.parse.urljoin(base, path)
    if urllib.parse.urlsplit(url).netloc != 'aventuradentalarts.com' or url in seen:
        continue
    seen.add(url)
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=20) as response:
            data = response.read(limit - used + 1)
        if len(data) + used > limit:
            manifest.append({'url': url, 'status': 'skipped: 20 MiB cap'})
            break
        filename = urllib.parse.urlsplit(url).path.lstrip('/')
        target = root / filename
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        used += len(data)
        manifest.append({'url': url, 'file': filename, 'bytes': len(data)})
        # Only explicitly referenced Nuxt bundles, not API content or media.
        content = data.decode('utf8', errors='ignore')
        for dep in re.findall(r'["\'](\./[A-Za-z0-9_.-]+\.(?:js|css))["\']', content):
            queue.append(urllib.parse.urljoin(url, dep))
    except Exception as exc:
        manifest.append({'url': url, 'error': str(exc)})
(root / 'manifest.json').write_text(json.dumps({'totalBytes': used, 'files': manifest}, indent=2), encoding='utf8')
print('Captured', len(manifest), 'files;', used, 'bytes')
