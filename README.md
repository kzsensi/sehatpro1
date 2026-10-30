# Sehat First Pro — current website reference

This folder contains a local snapshot of the public front ends observed on 30 October 2026. It is a baseline for the redesign, with the current design and wording preserved.

## Run

```powershell
python tools/serve.py
```

Or run `npm run dev`. No package installation or build step is needed.

| UI | Local address |
| --- | --- |
| Marketing website | http://localhost:4173/ |
| Customer portal login | http://localhost:4173/app/ |
| Leader/agent portal login | http://localhost:4174/ |

The marketing site's Login menu routes to both local portals. Stop the server with Ctrl+C.

## What's in the folder

- `index.html`, `static/`, `assets/`: deployed marketing app, its styles, images, fonts, and scripts.
- `app/`: deployed customer portal UI and its public assets.
- `agent-portal/`: deployed leader/agent portal UI and its public bundles.
- `reference/source/`: recovered authored marketing React modules from the published source map. This is useful for the redesign but is not the complete original repository.
- `reference/AUDIT.md`: page, design, functionality, and portal analysis.
- `tools/`: mirroring and local serving scripts.

The local copies preserve the original front-end behavior. Contact submission, OTP, policy/account data, payment, and other authenticated actions still point at live services and may require their original domain, authorization, or production configuration. Do not use the local snapshot to make test purchases or submit real customer information. The public portal login screens are included; authenticated screens are present in the downloaded bundles but cannot be visually verified or populated without an authorized account and backend access.

## Notes for the redesign

Use this copy as the visual and content reference. Build the new design separately so the baseline stays intact. The marketing source map provides readable components and route definitions under `reference/source/`. The customer and agent portal bundles are minified published builds; no readable source maps were available from the public servers.
# sehatpro1
