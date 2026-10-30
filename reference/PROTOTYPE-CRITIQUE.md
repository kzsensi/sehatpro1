# Prototype critique — first implementation

Reviewed 30 October 2026. Source inspection of `redesign/src/App.jsx`, `style.css`, `components/Motion.jsx`, `motion.css`, `CareArt.jsx`, and `stickers/Sticker.tsx`. Browser control for the local prototype was disabled; this report makes no claims about rendered pixel accuracy, observed animation smoothness, or tested keyboard behavior. No app files edited by the critic.

## What is working in the source

- A coherent cream/forest/sage/terracotta palette; actual healthcare illustration rather than unrelated abstract stock art.
- Real six-plan names/prices, a useful audience filter, service selector, FAQ, native modal, and login choices.
- Authentic downloaded React Bits Magnet component and fun-isometric runtime with provenance, rather than claims that visually similar custom code is an exact source extraction.
- Magnetic offset capped at eight pixels; pointer and reduced-motion gating; cursor retains native pointer; animation cleanup exists.
- No invented doctor count or patient success statistics. Plan details clearly distinguish prototype experience from purchase.

## Actionable issues

### P1 — finish the interaction semantics

1. Service selector declares `role="tablist"` and `role="tab"`, but all four controls remain in the normal tab order and there is no arrow/Home/End keyboard handling. Implement a roving tab index and arrow navigation, or use ordinary buttons with `aria-pressed` if that simpler interaction is intended. Give the panel `tabIndex=0` if useful for keyboard reading.
2. The plan dialog is unnamed: no `aria-label` or `aria-labelledby` connects it to the plan heading. Add an ID to the heading and reference it; keep the existing Escape cancellation and native modal behavior. Verify focus returns to the originating plan button.
3. Login dropdown has no Escape or outside-click closure. Keyboard users can move through the links, but cannot dismiss it consistently with expected dropdown behavior. Add a ref, Escape handler, outside-pointer handler, and close it when selecting a destination. Close the mobile navigation when appropriate too.

### P1 — increase readability of product decisions

Plan benefit lists are 11px, plan summary 11px, price metadata 10px, filter text 11px, and plan footnote 9px. These are core comparison details, particularly for GoldenCare. Raise benefits to 14px with comfortable line height, filter controls to at least 13px, and essential qualifiers to 12px. Minor art captions may stay small; eligibility and GST must not be treated as decoration.

The Senior filter says `60 & beyond` while GoldenCare says `above 60`, and the captured original Platinum eligibility says up to 60. Resolve the boundary consistently: label GoldenCare `Above 60` until the business confirms inclusive age eligibility.

### P2 — the illustration and motion brief is only partly fulfilled

The prototype contains one editorial PNG, `care-garden.png`, used twice with different clipping. The second use creates a strong sense of repetition and does not fulfill the request for many distinct healthcare illustrations. Add at least one purpose-made second scene (preventive checkup, family routine, or a care journey) with the same palette and art direction. Use the available phone/notes stickers in relevant sections if useful, rather than adding decorative copies to empty space.

The only scroll-linked motion in App is hero-image vertical parallax. Other sections use the same `Reveal` fade-up. This creates a clean basic landing page, but falls short of the requested rich motion prototype. Add one carefully composed interactive care journey: the user scrolls through consult → checkup → understand results with a stable scene and moving internal parts. Keep plan comparison and FAQ in ordinary document flow. Do not add motion to every object just to increase animation count.

### P2 — reduce repeated visual formulas

Nearly every major heading is a two-line serif construction with the second line italic; sections repeatedly use a numbered uppercase eyebrow. This is becoming a new template even though it avoids purple gradients. Keep that signature on the hero and one editorial moment. Use a compact sans-serif product heading for plans and a direct sentence heading for the FAQ. The steps are three equal columns and the default plans are three cards; both are valid content structures, but their visual treatment needs enough contrast that the page does not become two consecutive feature grids.

The custom wordmark replaces the existing logo and adds an `®` registration symbol not justified by the captured brand information. A prototype can propose a wordmark, but remove the trademark-registration claim until confirmed. Keep a record that the wordmark is a proposed visual identity.

### P2 — cursor and image details

The hero illustration advertises `data-cursor="Explore"` but is a div with no click behavior. This suggests an action that does not exist. Either link the art to the care section or remove the action label. The closing CTA is a genuine anchor and is an appropriate cursor-label target.

The hero and life images have no intrinsic width/height attributes or declared aspect ratio. Since the illustration determines grid height, slow loading can cause layout shifts. Set intrinsic dimensions or explicit image aspect ratio and reserve their space. The 2.4MB PNG should be optimized for the preview once disk space permits; preserve the generated original separately.

### P2 — provenance and coverage still need completion

The source ledger accurately distinguishes React Bits reuse, fun-isometric reuse, and custom cursor/reveal code. It does not yet include actual saved frontend code from the awarded healthcare reference. User specifically requested extraction. Save the publicly served HTML/CSS needed for inspection with source URL and capture date, then identify which section rules informed the prototype. Do not call proprietary minified build files reusable React components unless they actually are. Keep licenses beside directly reused open-source components.

The prototype links to baseline policy and portal screens. It is therefore a redesigned homepage proposal with preserved baseline destinations, not a complete redesigned website or portal suite. State this accurately until the remaining pages receive the new system.

## Browser checks still required

- Inspect desktop and 390px/768px widths for art cropping, horizontal overflow, title wrapping, and plan filter layout.
- Switch each service, each plan audience, all FAQ entries, and open/close the modal with mouse and keyboard.
- Ensure any scroll animation does not leave content at opacity zero after navigating back, changing viewport, or requesting reduced motion.
- Inspect actual sticker frames and clipping; hover replay is decorative, so it should not hide information from keyboard or touch users.
- Check links to both baseline portals and policy pages while all servers are running.
- Check dialog and mobile menu focus order and Escape dismissal.

## Critic verdict

The foundation is coherent and functional in intent. Before presenting it as the completed requested prototype, address readable plan details and interaction semantics, add a second distinctive illustration and one meaningful section-specific motion sequence, and document the actual saved healthcare reference code. Rendered quality remains unverified by this critic because local browser automation was unavailable.

## Revision follow-up

The blue/green revision resolves the invented wordmark, tiny plan benefits, same image repeated, oversized editorial spacing, vague slogans and single-page scope issues. Service tabs and plan modal were replaced by separate routes, removing their accessibility defects. Dropdowns now dismiss on Escape/outside click. Plans have full detail pages and benefit text is 13–14px. All six new illustration assets have alpha channels. SpotlightCard, ScrollReveal, Magnet, fun-isometric and a licensed Lottie are integrated with reduced-motion handling. Source captures and extracted hero fragments are saved.

This follow-up is a root-agent source review, not a new subagent visual sign-off. Browser access remains disabled. Rendered layout, pointer motion, mobile interaction and visual animation checks are pending.
