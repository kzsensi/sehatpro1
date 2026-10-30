"""Serve the copied marketing/customer UI and agent portal on two local ports."""

import functools
import http.server
import threading
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class SpaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, directory, **kwargs):
        self.site_root = Path(directory)
        super().__init__(*args, directory=str(self.site_root), **kwargs)

    def _route(self):
        parsed = urllib.parse.urlsplit(self.path)
        requested = self.site_root / urllib.parse.unquote(parsed.path).lstrip("/")
        if requested.is_file() or requested.is_dir():
            return
        if self.site_root == ROOT and parsed.path.startswith("/images/"):
            alternate = self.site_root / "app" / parsed.path.lstrip("/")
            if alternate.is_file():
                self.path = "/app" + parsed.path
                return
        if Path(parsed.path).suffix and parsed.path != "/opd-payments.html":
            return
        fallback = "/app/index.html" if self.site_root == ROOT and parsed.path.startswith("/app/") else "/index.html"
        self.path = fallback

    def do_GET(self):
        self._route()
        super().do_GET()

    def do_HEAD(self):
        self._route()
        super().do_HEAD()

    def log_message(self, format, *args):
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(format, *args)


def serve(directory, port):
    handler = functools.partial(SpaHandler, directory=directory)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    print(f"{directory}: http://localhost:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    agent = threading.Thread(target=serve, args=(ROOT / "agent-portal", 4174), daemon=True)
    agent.start()
    serve(ROOT, 4173)
