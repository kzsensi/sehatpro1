# SehatFirstPro design proposal

From `D:\SITES\PORTFOLIO\sehatpro` run:

```powershell
npm run redesign
```

Open http://127.0.0.1:5173/. Plans: http://127.0.0.1:5173/plans.

The app has separate URL routes for services, plan details, contact and policies. Vite handles direct navigation to these routes. For a deployment, configure the static host to fall back to `index.html`.

```powershell
npm run build:redesign
cd redesign
node smoke-check.cjs
```

Run `npm run dev` from the project root to serve the preserved original marketing/customer frontend on 4173 and agent frontend on 4174. Those are the destinations of the proposal's login and purchase links.

The contact form validates fields and displays a local preview status. It does not send enquiries. The proposal itself does not call the live medical, OTP or payment APIs.

Research, content map, checks and current limitations: `../reference/BRAND-REVISION.md`. Source code and license ledger: `../reference/COMPONENT-SOURCES.md`. The previous cream design is archived under `../reference/archive`.

Made with fun-isometric by Kelvin Adithya (https://x.com/KelvinAdithya), heavily inspired by Slush (https://slush.app), more at https://skills.klvn.dev/fun-isometric.
