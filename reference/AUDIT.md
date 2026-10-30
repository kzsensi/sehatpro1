# Current site audit — 30 October 2026

## Scope and evidence

Inspected the live marketing site at `www.sehatfirstpro.com`, the customer app at `/app/`, and the leader/agent portal at `portal.sehatfirstpro.com`. Recovered the marketing app's published JavaScript source map and mirrored publicly reachable scripts, styles, fonts, and referenced image assets. Compared the local homepage and both login screens with the live versions in a browser. The local marketing homepage has no broken `<img>` elements; the live agent portal itself serves a broken logo path, so the local copy fills that one image from the marketing asset set.

This is a front-end snapshot, not an export of databases, APIs, account data, or the original development repositories. Authenticated screens cannot be fully audited without authorized accounts.

## Information architecture

### Marketing site

| Route | Current purpose/UI |
| --- | --- |
| `/` | Hero, company introduction, healthcare consultations, partner logo strip, reasons to choose the service, eight service cards, green call to action, testimonials, footer. |
| `/plans` | Six-plan carousel with pricing, benefit lists, eligibility, and purchase entry points. |
| `/contact` | Support details and five-field message form. |
| `/term-of-use` | Terms and conditions. |
| `/shipping-delivery-policy` | Shipping and delivery policy. |
| `/privacy-policy` | Privacy policy. |
| `/cancellation-policy` | Cancellation policy. |
| `/opd-payments`, `/opd-payments.html` | Plan payment details entry. |
| `/plan-purchase/payment-detail` | Standalone payment details step. |
| `/payment` | Payment result/verification view. |
| `/login.html` | Redirect to customer app at `/app/`. |

Header: floating rounded white navigation, logo, Home, Plans, Policies dropdown, Contact, Login dropdown. Footer: company, policy links, contact address/email, association credit. Header and footer are reused on most marketing routes; payment details has a separate layout.

### Customer portal

Public entry: `/app/` shows phone-number OTP login. The visible login layout has a white form panel and bright blue welcome panel with appointment and benefits mockups. The downloaded app bundle contains route definitions for home/policy views, appointments, doctor booking, consultations, diagnostics, pharmacy, reimbursements, reminders, fitness, health vault, reports, prescriptions, support, and ABHA/ABDM flows. These are code-level findings; actual authenticated layouts and data could not be inspected.

### Leader/agent portal

Public entry: `portal.sehatfirstpro.com/` shows a compact phone-number OTP login card on a pale gray canvas. The published bundle contains route definitions for partner, provider, aggregator, and admin sections with tab/subtab navigation, onboarding, signup, plan purchase, and payment. Some ABDM screens are loaded from a separate `abdm-portal.zealthix.com` module federation remote. Without login, their rendered states and permissions remain unknown.

## Visual system

| Element | Current implementation |
| --- | --- |
| Brand colors | Dark navy `#0A2350`, primary blue `#123B7C`, blue hover `#0D2E63`, green accents `#16A34A` and `#0C7233`. |
| Typeface | Montserrat across marketing UI; portal bundles use their own typography. |
| Shapes | Large pill buttons and floating pill header; rounded cards, soft shadows, gradient panels. |
| Homepage layout | Split hero with a large uppercase headline on the left and a healthcare illustration on the right; alternating blue/white sections below. |
| Imagery | Illustrated hero, photographic service cards, partner marks, testimonials, and icons. |
| Motion | Swiper carousel, animated cards and transitions, AOS/GSAP/Framer Motion dependencies. |
| Responsive intent | Tailwind breakpoints in the marketing React components. Desktop navigation is replaced by a mobile menu below `lg`. |

The marketing implementation combines Bootstrap, Tailwind's browser runtime, a custom stylesheet, Bootstrap Icons, Font Awesome, Swiper, and Framer Motion. The local copy includes the public visual dependencies and maintains the same appearance at the observed desktop viewport.

## Plans and user journeys

| Plan | Listed price | Coverage |
| --- | --- | --- |
| Wellness First | ₹999 + GST | Individual |
| Wellness Essential | ₹3,499 + GST | Individual |
| Wellness Advantage | ₹4,999 + GST | Individual |
| Wellness Elite | ₹6,499 + GST | Family: 2 adults + 2 children |
| Wellness Platinum | ₹9,999 + GST | Family: 2 adults + 2 children |
| Wellness GoldenCare | ₹9,999 + GST | Individual, age above 60 |

Primary marketing journey: homepage CTA → Plans carousel → Buy Plan → buyer/OTP/payment details → payment provider → result page. Login journey: header Login menu → customer or leader/agent portal → phone OTP → authenticated app. Support journey: Contact form → notification API.

The carousel enables the Buy Plan button only on its centered, selected card. Purchase completion still depends on live OTP, payment, and plan services.

## Dependencies and limits

- The marketing build calls `endpoint.zealthix.com` for tokens, catalog search, agents, purchase requests, transaction details, and notifications. The local server only serves front-end files.
- Payment UI loads Razorpay and Cashfree scripts. The customer app also loads BoxPay. These external flows are not made local by copying the UI.
- Customer and agent login use live OTP systems. Completing OTP or viewing real account data requires authorized accounts.
- The customer app selects its tenant by hostname. The local bundle maps `localhost`/`127.0.0.1` to `sehatfirstpro` while preserving its `/app` prefix.
- The agent portal refers to many `/images/*` files that the live server responds to with its SPA shell instead of an image. The public login logo is broken on the live page. Only the logo was filled locally from a matching marketing asset; other unavailable agent assets cannot be recovered from that server.
- Some external scripts and services remain remote, especially payment integrations and the ABDM module. The copied public pages render locally, but the full app is not an offline backend replica.

## Redesign observations

1. The homepage says plans start at ₹99, while the lowest listed plan on `/plans` is ₹999. Confirm the correct entry price before rewriting content.
2. The homepage call to action mentions cashless hospitalization benefits, while the visible plan list emphasizes OPD and wellness benefits. Confirm the product promise before redesign.
3. The public marketing brand is Sehatfirstpro, but portal document titles are generic (`Health App`, `zealthix App`). Unify titles, favicon, and navigation between the three surfaces.
4. The agent portal's logo URL is broken on the production login screen. Its public asset paths need fixing when the portal is redesigned.
5. The contact telephone link appears as `tel:+9425005087` while the visible number includes `+91`; verify and correct the actual number/link.
6. The marketing stack has overlapping CSS systems and runtime Tailwind generation. A redesign should consolidate styling into one maintained build so visual behavior is predictable across pages.
7. The purchase and portal flows should be mapped with real authorized test accounts before changing them. Public UI inspection alone does not reveal form validation, errors, permissions, or post-login navigation.
