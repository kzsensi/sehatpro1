# Brand revision and content map

Updated 30 October 2026 after the user rejected the cream/forest editorial direction.

## Accepted requirements

- Use the original SehatFirstPro logo and navy/blue/green identity. No invented wordmark or registered trademark symbol.
- One readable font family. Montserrat is retained from the original site and served locally in four weights.
- Compact sections: generally 56px desktop and 38px mobile vertical padding, with bounded content width.
- A new hero with concrete healthcare copy, illustration, plan CTA and useful care shortcuts.
- Dedicated pages for Plans, complete plan details, Services, individual services, Contact and all policies.
- Six coordinated transparent illustrations, plus small animated isometric icons and a licensed healthcare Lottie.
- Keep actual source code and licenses for borrowed components. Keep downloaded reference-site frontend files separately.
- Use plain language; remove poetic lifestyle slogans and unsupported claims.

## Source sites and what informed the revision

| Reference | Observed structure | Application |
| --- | --- | --- |
| [Cleveland Clinic](https://my.clevelandclinic.org/) | Clear care navigation, prominent provider/appointment actions, practical service categories | Compact navigation and care shortcuts beneath the hero; blue/white content hierarchy |
| [Atlantic Health](https://www.atlantichealth.org/home) | Direct hero message and immediate patient actions; separate care resources | Short hero text and separate destinations for consultations, diagnostics and membership |
| [AdventHealth](https://www.adventhealth.com/) | Separate find-care, services and account journeys | Clear distinction between marketing pages and customer portal |
| [Aventura Dental Arts](https://aventuradentalarts.com/) | Purposeful cursor, transitions and service presentation | Restrained cursor follower and hover/scroll polish |

Award evidence: AdventHealth is listed as Platinum and Atlantic Health as Gold in the official [2024 eHealthcare Best Site Design awards](https://ehealthcareawards.com/2024-winners/best-site-design/). These are healthcare design awards; do not label every reference an Awwwards winner. Aventura award evidence is in DESIGN-CRITIQUE.md.

Saved public HTML/CSS/JS: `reference/sites/aventura`, `reference/sites/cleveland`, `reference/sites/atlantic-health`. Each manifest records original URL, local file and size. AdventHealth's direct download returned HTTP 403, recorded in its manifest; its accessible web content was reviewed. Captures are inspection material, not source repositories or permission to redistribute a complete third-party product. No reference-site analytics or scripts run in the proposal.

## Original content coverage

| Original content | New location |
| --- | --- |
| Logo, Home, Plans, Contact, Policies, two login destinations | Shared header/footer |
| OPD/wellness introduction and reasons to choose | Homepage introduction and benefit rows |
| Partner logos | Homepage scrollable network strip, original files |
| Eight healthcare service categories | `/services`, eight individual service pages, four homepage previews |
| Six plans, prices, eligibility, all benefits, value-added and platform benefits | `/plans` and six `/plans/:planCode` pages |
| Four member testimonials | Homepage manual carousel, original quotations and names |
| Five-field enquiry form and support details | `/contact` |
| Four full policies | Original route names, legal JSX copied with presentation classes removed |
| Payment and customer/agent authentication | Existing preserved local frontends on 4173/4174 |

No fake counters were added. The original homepage says ₹99 while the lowest plan is ₹999; the proposal uses the catalog price. Hospitalization promises and unsupported new performance claims are omitted. These discrepancies remain in AUDIT.md for client review.

## Copy review

Read and applied `reference/vendor/humanizer/SKILL.md` from [blader/humanizer](https://github.com/blader/humanizer). The copy uses concrete nouns, short explanations and descriptive CTAs. Removed the earlier repeated italic headings and fragments such as “A little care. A fuller life.” Testimonials and policy statements remain source text. Benefit display wording is normalized in `benefitText.js`; original catalog strings and quantities remain in `plans.json`.

## Artwork

`image base prompts/one.txt` supplies rounded shapes and stronger contours for the medical kit. `two.txt` supplies approachable human scenes and soft organic forms. The user's explicit brand correction overrides both files' warm color palettes. All six PNGs have alpha channels, verified from their image metadata:

1. `healthcare-hero.png`: doctor with mother and child, revised to an illustrated style.
2. `consultation.png`: remote doctor conversation.
3. `diagnostics.png`: laboratory technician.
4. `family.png`: multigenerational family.
5. `support.png`: support coordinator.
6. `care-kit.png`: medical kit, stethoscope and calendar.

The canvas stickers now use blue, pale blue, green and white. The Lottie is also recolored to blue/green. Original artwork and upstream source files remain available.

## Verification

- Production build passed.
- Server rendering smoke check passed for 22 routes, checking original logo, all referenced local image files, six plans and eight services.
- HTTP 200 for redesign home/plans/services and original marketing/agent servers.
- Static review: visible keyboard focus, dropdown Escape/outside dismissal, semantic native FAQ, labeled form fields, reduced-motion variants, native pointer preserved, no automatic enquiry submission.
- Browser control was explicitly disabled in Work settings. Rendered desktop/mobile layout, actual pointer behavior, keyboard traversal and visual playback remain unverified. The user's supplied screenshot was of the rejected earlier design.
- Full authenticated portal redesign and live transaction integration are outside this prototype revision; their preserved login frontends remain available.
