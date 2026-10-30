# SehatFirstPro design research and critique criteria

Research date: 30 October 2026. Prepared by the critique agent. Prototype visual review remains pending implementation.

## Reference quality and provenance

| Reference | Evidence and useful pattern | Application here |
| --- | --- | --- |
| [Aventura Dental Arts](https://aventuradentalarts.com/) | Relevant dental site with Awwwards SOTD corroborated by [its agency](https://thefirstthelast.agency/about) and [Awwwards' own announcement](https://www.linkedin.com/posts/awwwards_sotd-business-interaction-activity-7440322063359373312-SG9s). Its page separates treatment groups, technology, team, testimonials, and locations. | Use the deliberate section rhythm and service grouping. Inspect its actual visual motion before claiming any exact animation match. |
| [One Medical](https://www.onemedical.com/) | Current primary-care site has explicit appointment CTA, audience navigation, common care needs, membership explanation, and app benefits. No award status established in this research. | Clear patient language and task hierarchy; membership costs and included services should stay easy to compare. |
| [Tend](https://www.hellotend.com/site/home) | Dental brand uses approachable patient language, broad service categories, booking, human portraits, team/technology content, and location-specific proof. No award status established here. | Warmth and recognizable healthcare situations can provide identity without a generic futuristic dashboard. |
| [Zocdoc](https://www.zocdoc.com/) | Task-first doctor search, specialty browsing, provider availability, reviews, and app handoff. No award status established here. | Find care and compare plans should remain useful while decorative motion plays. |

Do not confuse an Awwwards submission, a third-party gallery listing, or an “Awwwards-inspired” template with an award. Do not call borrowed layouts exact copies unless compared in-browser. Track actual code sources and licenses separately from visual references.

## Local references inspected

### DVC

Read `D:/SITES/FULL/dvc/research/dvc-express/DVC-COMPANY-CONTEXT.md`, `DVC-DESIGN-GUARDRAILS.md`, and `DVC-HOMEPAGE-IMPLEMENTATION-PLAN.md`; inspected website `HeroSlideshow.tsx` and `SmoothScroll.tsx`.

The valuable lesson is content-specific illustration and motion. DVC's plan deliberately compresses spectacle into three major moments and alternates them with quiet information. Its revision explicitly rejected a long demonstration reel composed of many separate pinned chapters. The healthcare equivalent can make a patient journey visible: consult, test, understand results, use plan benefits.

Carry over: one clear primary action; purpose-made imagery; restrained type weights; varied section rhythm; one visual focus per section; motion with a beginning and resolution; no invented proof metrics; meaningful reduced-motion composition. Its orange palette and logistics-specific imagery belong to DVC and are not a healthcare art direction.

`SmoothScroll.tsx` contains useful implementation mechanics: Lenis `lerp: 0.1`, `wheelMultiplier: 0.8`, `syncTouch: false`, anchor support, ScrollTrigger updates on scroll, requestAnimationFrame cleanup, and a reduced-motion early return. Adapt the mechanics, not DVC's preloader state or global naming.

### MJ cursor

Read `D:/SITES/PORTFOLIO/mj/index.html`. It is a saved Framer export with `framer-lib-cursors-host`, section-specific `data-framer-cursor` values, cursor-hidden CSS, and native grab states on carousels. Cursor targets occur on hero, category links, featured work, and other interactions. The HTML does not contain a clean standalone magnetic cursor component; its cursor implementation is part of the remote Framer runtime. Do not report exact magnetic physics as recovered from this file.

Use this direction: a small precise pointer/follower; short action label only over a meaningful target; limited magnetic offset on large actions; native input cursor inside forms; default pointer on touch/coarse devices; no screen-wide glowing follower. Keep the cursor subordinate to healthcare content.

## Generic AI patterns to reject

[Anthropic's primary prompting guidance](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables) describes common generic frontend defaults and recommends a deliberate aesthetic and selected high-impact motion. Its [long-running app harness research](https://www.anthropic.com/research/harness-design-long-running-apps) supports a separate critique loop judging coherence and originality. These are design heuristics, not a way to prove whether a site was AI-generated.

For this prototype, flag clusters of these defaults:

- Centered slogan, tiny badge, gradient word, two pill buttons, then three equal icon cards.
- Purple/blue aurora backgrounds, random floating orbs, glass panels, and glow borders without a healthcare purpose.
- Every section using the same heading alignment, spacing, card radius, and fade-up animation.
- Isometric stickers sprinkled everywhere with inconsistent perspective, shadow direction, line weight, or colors.
- Decorative statistics, invented patient reviews, fake physician names, unsupported availability or outcomes.
- Fake dashboard mockups presented as a real portal; animations of loading numbers without meaning.
- Heavy full-width display text that crowds out the illustration or makes mobile hero content scroll for several screens.
- Continuous motion on every object, every headline, and every background at once.
- Generic copy such as transformative care, future of wellness, or unlock potential with no concrete plan benefit.

## Recommended critique gates

1. **Identity:** Hide the logo. Does the composition still communicate a specific OPD and wellness plan product? Is the recurring illustration related to consultation or healthcare access?
2. **Hierarchy:** In the first viewport, can a visitor understand what is offered, what it costs from, and which action to take? Does one visual dominate?
3. **Rhythm:** Do service exploration, plan comparison, process explanation, and support each get a layout suited to that information? Do normal-flow sections separate any pinned sections?
4. **Illustrations:** Same isometric angle, palette, shadow, and outline system throughout. Animate parts: stethoscope tube pulse, medical card checkmark, appointment calendar flip, sample capsule movement. Avoid moving the entire image endlessly as a substitute for meaningful animation.
5. **Motion:** Reveals should be short and optional. Reserve scroll scrubbing for one strong journey section. Avoid changing typography width while users read. Controls stay clickable before and during animations. Static content remains visible if GSAP fails.
6. **Cursor:** Only fine pointer devices get custom cursor effects. Cursor is never lost over dialogs, input fields, text selection, or links. Target response is immediate; follower lag is subtle. Large magnetic motion must not move a button out from under the click.
7. **Interaction:** Hover details also work by keyboard focus or tap. Service tabs, plan selection, FAQ, menu, and primary CTA have real visible outcomes. Prototype-only actions say what they do without making a live purchase or OTP request.
8. **Accessibility:** Visible focus, semantic buttons, escape-to-close, reduced motion, adequate contrast, readable body size, and no reliance on motion or color alone for meaning.
9. **Performance:** Animate transforms/opacity, avoid layout thrash on pointermove, batch or reuse animation setters, clean listeners/timelines on unmount. Avoid importing multiple libraries to perform the same task.
10. **Responsive:** Review 390px, 768px, and desktop. No clipped plan benefits, giant blank sections, fixed cursor overlays on touch, or pinned sequences that trap the page. Text/art safe zones are composed separately for phones.
11. **Honest presentation:** Confirm plan prices, inclusions, age eligibility, and contact details against current content. Mark sample data as sample. Public portal shell does not imply authenticated functionality has been rebuilt.
12. **Provenance:** Every externally copied component has its source URL, downloaded file, and reuse/license note. Separate direct component reuse, adapted mechanics, and visual inspiration in the implementation report.

## Review status

Research and criteria complete. Waiting for the new prototype URL/source path to run a concrete visual and interaction critique. No implementation files changed by this agent.
