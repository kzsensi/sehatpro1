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

Run `npm run dev` from the project root to serve the preserved original marketing/customer frontend on 4173 and agent frontend on 4174. The local checkout and footer login links use these mirrors. The header Login menu uses the existing customer and agent portals and honors `VITE_CARE_PORTAL_URL` and `VITE_SALES_PORTAL_URL`.

The contact form validates fields and displays a local preview status. It does not send enquiries. The proposal itself does not call the live medical, OTP or payment APIs.

Only the homepage uses the updated design and phone layout. Every other route loads the preserved production app and its original stylesheet from `src/production`. The homepage uses a photograph-first white phone layout, an accessible mobile menu, photographic service cards, benefit cards beside a doctor photograph and compact booking steps. See `DESIGN.md` and `../reference/redesign-2026/BRIEF.md` for the design decisions and supplied references. Site comparisons and verification are in `../reference/redesign-2026/RESEARCH.md`. Source code and license ledger: `../reference/COMPONENT-SOURCES.md`. The previous cream design is archived under `../reference/archive`.

Made with fun-isometric by Kelvin Adithya (https://x.com/KelvinAdithya), heavily inspired by Slush (https://slush.app), more at https://skills.klvn.dev/fun-isometric.
