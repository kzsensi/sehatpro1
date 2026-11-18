# Research and design decisions

## Brainstorm

| Direction | Decision |
| --- | --- |
| Clinic-style navigation | Keep its speed for prices, eligibility, contact and sign-in. |
| Illustrated care field guide | Use this as the visual direction. Open on a full care scene and let each service have its own smaller image. |
| Full-screen illustrated scroll story | Use scroll-linked motion in the care gallery and entrance reveals. Keep booking and plan decisions in ordinary page flow. |

## References and application

- **Maxima Therapy**, Awwwards Site of the Day and Developer Award. One oversized illustrative interaction establishes the story. Program art varies in color and framing while the line work ties it together. Give the first scene the largest canvas and attach each small illustration to a service or next step. [Awwwards entry](https://www.awwwards.com/sites/maxima-therapy) · [Developer case study](https://tympanus.net/codrops/2026/04/06/building-the-maxima-therapy-website-react-gsap-and-dabbling-with-ai/)
- **Vibrant Wellness**, Awwwards Site of the Day. The named testing categories and carefully staged imagery give abstract diagnostic topics a visual distinction. Apply that lesson to the service catalogue, then keep plan comparisons fast to scan. [Awwwards entry](https://www.awwwards.com/sites/vibrant-wellness)
- **Apple** uses alignment to communicate hierarchy and coordinated curves to group surfaces and controls. Apply 12px radii on controls, around 22px on inset panels and 32px on large surfaces, with proportionally tighter interior curves. [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) · [Design system and concentric shapes](https://developer.apple.com/videos/play/wwdc2025/356/)
- **Anti-AI prompts** identify gradient text, purple-blue floods, shiny cards, decorative pill labels, uniform three-card sections, and catch-all fonts such as Inter, Roboto, Geist, Space Grotesk, Plus Jakarta Sans and generic serif italics. Font choice alone is not a reliable classifier. Use Bricolage Grotesque for its wide rounded forms and Source Sans 3 for longer content, with mixed-width layouts, plain language and a visible next step on each page. [Anti-AI UI checklist](https://github.com/Vanszs/Anti-AI-UI/blob/main/Anti-AI-SLop/SKILL.md) · [Typography pattern field guide](https://sloppatterns.com/) · [HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2025/)
- **DESIGN.md** records exact colors, spacing, type and curve choices with application guidance. [Google Labs specification](https://github.com/google-labs-code/design.md)
- **Framer Motion** documents scroll position as a separate input from entrance events. Use the same distinction in React components on the existing GSAP stack, following the named animation skill. Keep interactive states in CSS and split section heading words only where they reveal as the reader arrives. [Motion useScroll](https://motion.dev/docs/react-use-scroll) · [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) · [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Illustration analysis

Reference 1 reads as a single wide silhouette. Overlapping figures, fine dark contours, opaque black hair and clothing, and white cheek dots make eyes and hands readable even at small sizes. A single peach field shows around and between opaque shapes. The hero follows this model with an alpha silhouette over the canvas. Reference 2 uses independent scenes on solid mint, periwinkle and warm paper. Each image has its own composition and remains readable at catalogue-card scale. Preserve the thin outline, same face construction and limited solid fills across both modes. The assets depict consultations, tests, support and membership decisions. Keep required text in the page.

## Routes and connections

- 22 named React routes with a bespoke fallback. Home covers care discovery, providers, member stories and plans. The services catalogue links to eight distinct scenes. Plans has all six plans, filters, prices, eligibility, FAQ, and drilldowns. Contact stays a local form preview. Four policy pages retain their legal content.
- The React plan cards use the existing data and plan codes. Checkout continues to the original local marketing app on port 4173. Header Login uses its original Vite-configurable customer and agent URLs. The existing service-detail and footer links use the local mirrors on 4173 and 4174.
- Baseline critique found 32px menu controls, undersized filter and testimonial buttons, 11–12px copy, lost focus after Escape, and failed legacy SSR assertions. Use 44px interaction targets, larger body text, proper focus return and semantic checks. The authenticated portals and legacy payment screens remain integration destinations.

## Motion checklist

Cursor responds to fine-pointer hover and gives the same desktop affordance as the existing cursor. Menu, FAQ and form controls respond immediately to click or keyboard. Below-fold type reveals once when it approaches the viewport. Horizontal service browsing has buttons, native swipe, and readable links without scrolling effects. The content is visible on first paint and in reduced motion. Use one hero motion event per view and short property-specific transitions for controls. Apply the named skill's timing and interruption guidance.

## Homepage pass · visual and source review

Both reference sites were reviewed as rendered pages at desktop and mobile widths. The critique agent also inspected the public scripts and captured the pages through the signup sections. These are third-party reference sites.

- **Aarogya OPD** sits provider logos directly below its main promise, follows with an asymmetrical about block, and uses sticky illustration cards for onboarding. Its public script includes IntersectionObserver and Swiper. The new home uses early partner proof and a short layered journey. [Homepage](https://aarogyaopd.com/) · [Public script](https://aarogyaopd.com/assets/js/main.js)
- **Swasth OPD** transitions into a dark services gallery, then uses an ordered, mobile-friendly signup sequence and member quotes. Its public assets include GSAP ScrollTrigger, SplitText and Swiper. The new home uses a dark care index with a changing visual, text reveals on below-fold headings and readable inline thumbnails on touch. [Homepage](https://swasthopd.com/) · [Public script](https://swasthopd.com/assets/js/main.js)
- **Maxima Therapy** assigns unique illustrations to its care programs and makes the illustration itself integral to navigation. **Terminal Industries** relates each step in its story to a changing, sticky visual. The homepage uses these interaction ideas for the independent service routes. [Maxima Therapy award](https://www.awwwards.com/sites/maxima-therapy) · [Terminal Industries](https://terminal-industries.com/)
- Reviewed the [public React Bits Scroll Stack source](https://reactbits.dev/components/scroll-stack), the [MIT Codrops scroll layout examples](https://github.com/codrops/ScrollBasedLayoutAnimations) and [native scroll-driven animation patterns](https://developer.chrome.com/docs/css-ui/scroll-driven-animations). Retain the installed GSAP and native scrolling to keep the list and step ordering usable at all widths. The two OPD sites supplied behavioral references. Their public bundles lacked a verified reuse license.

### Artwork and supplied logos

The homepage uses five original scenes from the built-in image generation tool. The poster has one oversized figure in orange, matching the fine contours and cheek mark in the approved reference. The home sheet provides a family reviewing membership, the card and envelope, mobile sign-in and booking. Site-ready images are opaque WebP files. The existing care service scenes continue to illustrate the named services. The hospital marks were supplied by the user and resized with their original proportions. The locality strings come from the brief. Map links search those exact names and locations.

- [Poster asset](sheets/home-poster.png)
- [About and appointment sheet](sheets/home-journey.png)
- [Hero composition study](sheets/home-hero-study.png)
- [Prompt specification](illustration-prompt.json)

### Critique pass 1

Independent juror's first evidence-only score was 7.69/10. The juror identified a clipped mobile hairline, an incidental strip behind the appointment stack, an overly narrow testimonial heading, and shortcut wording that suggested immediate bookings. Lifted the mobile crop, reduced and gave definition to the stacking offset, balanced the testimonial title, and made the shortcut labels match their destinations. The first axe pass found duplicate visible-versus-accessible names on the map cards. The cards now use their visible names and addresses for speech and keyboard access.

### Critique pass 2 and browser verification

The fresh evidence-only jury scored the revised home 7.85/10 weighted. Design 8.0, usability 8.0, creativity 7.5 and content 7.5. Enlarged the supporting network marks at phone widths and added one sourced benefit example from the Wellness First membership. The final check also verified that normal and reduced motion both use the same portal step label.

- Vite production build and SSR smoke check passed. The smoke check covered all 22 named React routes, verified local images, and counted six plans and eight services.
- Chromium ran 66 route-and-width checks covering the 22 pages and the fallback at 390px and 1440px, with representative routes at 320px, 768px, 1024px and 1920px. No overflow, missing assets or runtime errors.
- Hover, keyboard focus and scrolling switched the care illustration. Desktop appointment cards stacked on scroll. Mobile and reduced-motion layouts kept the destination links, illustrations and ordering visible. Both testimonial controls worked. The fine-pointer follower remained active with the native pointer, and the Login disclosure restored focus on Escape. Tapping outside closed mobile navigation.
- The customer and agent paths matched their existing header destinations. The Family filter returned two plans. The plan detail used the existing checkout URL on port 4173. The handoff was checked without starting a purchase or sending an OTP.
- The throttled mobile run measured 2.23 seconds LCP, 0.001 CLS and 60 fps in headless Chromium. The desktop and mobile axe runs found zero violations. The raw HTTP audit still finds the Vite SPA host serves client-rendered landmarks and a 200 fallback. Canonical and social metadata would need the eventual deployment origin.
- The site remains running locally on port 5173. [Preview board](previews/homepage-preview.png) · [Desktop full page](previews/homepage-desktop.png) · [Mobile full page](previews/homepage-mobile.png)

## Homepage-first reference pass

- The award examples previously reviewed show how a full-width human scene can own a viewport and how a single, purposeful service interaction can anchor the next section. Keep the healthcare composition original. [Maxima Therapy](https://www.awwwards.com/sites/maxima-therapy) · [Vibrant Wellness](https://www.awwwards.com/sites/vibrant-wellness) · [Terminal Industries](https://terminal-industries.com/)
- Avoid duplicated eyebrows, stock pill labels, formulaic card rows, giant low-information type and default Inter/Geist pairings. Use a clinical image, one distinct heading voice and an explicit action. [Slop Patterns](https://sloppatterns.com/)
- Use concentric corners where surfaces actually nest, with alignment and whitespace for unrelated groups. Record real tokens and purpose in DESIGN.md. [Apple design system](https://developer.apple.com/videos/play/wwdc2025/356/) · [DESIGN.md specification](https://github.com/google-labs-code/design.md)
- Motion for React illustrates scroll-linked motion values. The code keeps the project’s existing GSAP ScrollTrigger for the reading line and heading entrances, CSS for simple transitions and native scroll for touch. [Motion useScroll](https://motion.dev/docs/react-use-scroll) · [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

### Homepage-first critique and verification

- The first external critique scored the opening pass 7.29/10. Its fixes covered the doctor’s mobile crop, visible and accessible names for the appointment controls, the active step, and the cursor treatment. The second external critique scored the revised pass 7.46/10 and identified the stray network mark and the need for plain-language step controls. In the final visual pass, the network wraps in intentional rows and the mobile controls read Choose, Sign in, and Book.
- Tested seven viewport widths from 320px to 1920px. Verified the responsive care image, hover/focus/scroll selection, mobile appointment selection, testimonial controls, both login targets and Escape focus, Family plan filtering, the legacy checkout link and reduced motion. Desktop and mobile axe scans reported zero violations.
- Production build and 22-route smoke check passed. On a Chromium mobile profile with 4× CPU throttling and 1.6 Mbps downlink, three cold-run LCP measurements were 1.95s, 1.96s and 2.01s with no measured layout shift after the responsive hero preload. The Awwwards skill harness measured 60 fps in its separate mobile scroll pass. The present local Vite SPA sends an empty application shell and uses an HTTP 200 fallback for unknown URLs. Deployment SEO was outside this homepage-first implementation pass.
- The new consultation image is generated editorial photography. [Source image](clinical-sheets/visit.png) · [Desktop and mobile preview board](previews/home-guide-preview.png) · [Desktop full page](previews/home-guide-desktop.png) · [Mobile full page](previews/home-guide-mobile.png)

### OPD reference blend research

The requested reference palette was confirmed from Aarogya’s public stylesheet. It uses navy #1c2539, action blue #0657a3, off-white #f7f8fc, secondary navy #20325b and pale lavender #e1e2ee. Prior rendered captures were reviewed again for the provider strip, benefit grouping and illustrated sticky steps. Swasth contributes the service-browsing and phone sequence patterns. The code uses independently authored React and CSS, shared SehatFirstPro data and the supplied logo/partner assets. [Aarogya](https://aarogyaopd.com/) · [Swasth](https://swasthopd.com/) · [Original SehatFirstPro](https://www.sehatfirstpro.com/)

### OPD blend critique and checks

The reference critique confirmed palette continuity across hero, services and footer, readable mobile order and correct integration targets. It identified an oversized desktop photo crop and the wide Care and Cure mark’s small optical size. The final pass uses a wider consultation crop with both faces visible and enlarges the wordmark slot. About images now retain their natural proportions.

The production browser checks cover seven widths from 320px to 1920px, the service illustration on hover/focus/scroll, both testimonial controls, all three appointment steps, login paths, Escape focus return, Family filtering, checkout handoff and reduced motion. The final desktop and mobile axe scans have no violations. The 22-route rendering smoke check passes. The Vite preview still uses client rendering and an HTTP 200 fallback; deployment metadata and server rendering remain outside this homepage review.

[Homepage preview board](previews/home-opd-preview.png) · [Desktop full page](previews/home-opd-desktop.png) · [Mobile full page](previews/home-opd-mobile.png)

## Local verification — phone-first revision

- Built the Vite app and server-rendered all 22 routes successfully.
- Browser-checked every route at 390px and 1440px, plus homepage/services/plans/contact/privacy at 320, 360, 430, 768 and 1024px. No horizontal overflow, missing images or browser errors.
- WCAG A/AA axe scans passed for home, services, plans, a family plan detail, contact and privacy at both 390px and 1440px.
- Verified native mobile dialog open/Escape/focus return, unchanged customer portal destination, plan filters, FAQ expansion, unchanged purchase destination, local-only contact preview and reduced-motion rendering.
- Independent phone critic verified 320, 390, 430px and the menu at 320×568. Fixed additive section gaps, reading order, duplicate photo and thin body text from that critique.
- Screenshots and browser report are in D:/Temp/sehat-mobile-final. All work remains local; no Git commit or push was made.
