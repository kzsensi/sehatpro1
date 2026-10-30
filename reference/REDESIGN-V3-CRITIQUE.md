# V3 design critique and acceptance criteria

Reviewed current multipage React source on 30 October 2026. Scope: `App.jsx`, `style.css`, prior DVC research, and the brand/content map. The latest user screenshots are not attached to this critic's context; local CUA access was previously disabled. This is a source-grounded design critique, not a claim of rendered inspection.

## Diagnosis

The brand correction is right: original logo, locally served Montserrat, navy/blue/green, dedicated Plans and service destinations. Keep these. The composition is now too close to a standard healthcare template: equal hero halves, organic blue blob, floating white reassurance badge, three quick links, partner strip, three benefits, four identical service cards, testimonial, rounded blue CTA. Better shadows or extra cursor effects will not change that structure.

The compactness is explicit in the code: 415px hero, 56px standard section padding, 170px service illustrations, 12px service copy, 35px CTA padding. Most elements have the same 8–14px corner radius and pale-blue background. The page has many components but no large, memorable healthcare scene. Current `BRAND-REVISION.md` calls compact sections an accepted requirement; the latest user rejection supersedes that requirement.

## Non-negotiables

- Preserve the actual logo without recoloring, distortion, or replacement. Keep Montserrat as the single type family and the existing blue/green identity.
- Keep all six complete plans on `/plans` and detail routes. Homepage may introduce membership, but must not become a pricing grid.
- Preserve actual prices, eligibility, benefit limits and original policy text. No invented outcomes, availability statistics, doctor counts or accreditation.
- Maintain full navigation and service pages; richer visuals must not regress information coverage.

## Proposed homepage composition

1. **Hero: a care scene, not an illustration in a card.** Build an asymmetric 5/7 composition with a 580–680px desktop scene, a 68–88px headline when width permits, and a short 17–18px explanation. Keep one primary plan CTA and a quieter services link. Use the doctor/family artwork as the main scene; remove the generic background blob and detached white reassurance label. Instead, integrate two or three purposeful objects such as consultation screen, calendar and health record into a shared scene. Animate those objects independently, rather than translating the entire flat image. Reserve image space at every breakpoint.
2. **Useful care navigation.** Replace three equal mini-panels with a spacious, ruled list: Consult a doctor / Arrange a health check / Understand membership. A selected row can update an adjacent large illustration; include a clear destination link. Selection must work by keyboard and tap. Do not pretend this is a live booking widget.
3. **One distinctive care journey.** Show how membership works as a large connected scene: choose a membership → sign in → arrange a service. Give each stage concise text and a relevant isometric object. On desktop, a sticky visual can change with the three text steps. On mobile, render a linear illustrated sequence. This is the main narrative motion moment; do not pin multiple later sections.
4. **Service explorer with varied scale.** Replace four uniform cards with one large featured consultation panel and three compact linked rows for diagnostics, wellness and family care. The complete eight-service catalog remains on its own page. Use consistent illustration scale and a generous illustration crop, not postage-stamp art above tiny body copy. Click/tap selection, hover preview and focus styling must communicate the same state.
5. **Network proof with context.** Keep source partner logos, but identify each with its actual accessible name, not `Healthcare network partner 1`. Add a short factual explanation of the network. Avoid a perpetual logo marquee; allow a controlled horizontal list if necessary. Do not invent provider coverage locations.
6. **Member story as an editorial pause.** One large original quote, source name/photo, restrained pagination and enough whitespace. No extra review stars or success metrics unless present in source. Aim for a 24–30px desktop quote, not a miniature dashboard widget.
7. **Membership gateway.** A broad blue/white section with a large family illustration, truthful starting price and one direct Plans link. This replaces the thin generic rounded CTA banner. Keep the footer practical and readable.

## Plans and service pages

Keep the audience filter, but add a genuinely useful comparison view using the real consultation counts, family eligibility and health-check benefits. Plan cards are appropriate here; emphasize readable differences over hover glow. Benefits should be 14–16px, eligibility and GST at least 12px. A selected-plan comparison strip may be sticky on desktop if it does not obscure content. Do not label a plan “most popular” without evidence.

The eight service-detail routes currently repeat the same generic paragraph and booking-support sidebar. Give each a service-specific visual, the exact relevant catalog benefits, available matching plans and the correct next action. Do not infer medical capabilities or appointment availability from the service name alone.

## Motion specification

| Element | Desired behavior | Acceptance check |
| --- | --- | --- |
| Hero | 700–1000ms composed entrance; delayed calendar/chat object action | Main message readable immediately; no continuous whole-image bobbing |
| Journey | Progress line draws; active scene changes with step | Position follows actual step, works on reverse scroll; static mobile fallback |
| Service explorer | Shared image crossfade/translate 250–400ms | No layout jump; keyboard and tap equivalent |
| Buttons | Arrow shifts; fill responds; magnetic movement capped at 6–8px | Hit target remains stable and cursor never hides native pointer |
| Illustration stickers | One entrance play and optional hover replay | No essential information depends on animation or hover |
| Section entries | Two or three distinct choreographies | Avoid applying the same fade-up wrapper to every section |
| Reduced motion | Remove scrub, parallax, pin and decorative loops | Every word, action and image remains visible |

Use component source already saved in `reference/vendor` where suitable. Keep reference HTML/CSS captures in `reference/sites` for measured typography/layout study. More third-party components alone are not a quality target: each added component must solve a named layout or interaction problem and share the brand style.

## Final review gates

- At desktop width, the hero and one care-journey scene should be identifiable without reading the logo; no generic pill badge/blob/grid stack.
- Vary section height and composition intentionally. Use roughly 88–120px desktop and 52–72px mobile section spacing where content warrants it; do not mechanically enlarge every gap.
- Body copy 16px where possible; controls at least 44px touch targets; no 10–11px essential plan or service information.
- At 390px, service content should remain readable; prefer one generous card or a selectable list over two cramped cards.
- Capture desktop, mobile, Plans and one service detail. Inspect transitions in a browser before calling the result visually validated.
- Recheck actual page overflow, sticky header overlap, focus order, reduced motion and all routes after structural work.

The next pass should change the page's visual hierarchy and interaction model, not merely increase animation count. The largest wins are a composed hero, a healthcare-specific journey, a useful service explorer and a substantive membership gateway.
