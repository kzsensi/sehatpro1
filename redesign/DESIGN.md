---
name: SehatFirstPro OPD Reference Blend
colors:
  primary: "#0657A3"
  ink: "#202D48"
  paper: "#FFFFFF"
  navy: "#1C2539"
  pale: "#F2F5F8"
typography:
  headline:
    fontFamily: Urbanist
    fontWeight: 700
    lineHeight: 0.99
  body:
    fontFamily: Urbanist
    fontSize: 1.065rem
    lineHeight: 1.5
rounded:
  control: 12px
  inset: 18px
  surface: 24px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  section: 72px
---

# SehatFirstPro design record

The OPD reference blend at the end of this document is the active homepage specification. The preceding design notes record earlier passes.

## Overview

A compact guide to everyday outpatient care. A quiet paper canvas, vivid ink-like accent and black-line healthcare illustrations make it feel like an edited publication. The home page opens with an integrated spread, followed by tight service chapters. Pricing and legal pages use straightforward reading layouts.

## Colors

Use white or off-white for text-heavy pages and peach on the large opening spread. Place terracotta on prices or the main action. Soft periwinkle, yellow and green belong to individual images and occasional full panels. Separate the footer with a single dark field.

## Typography

Bricolage Grotesque gives headings a human, rounded cut. Source Sans 3 keeps form labels, plan details and long policies legible. Use sentence case throughout. Pair one headline with one short paragraph when the reader needs context. Write literal action labels for purchase, login and support.

## Layout and imagery

Keep gutters between 16px and 48px. Use a large matched-field illustration on the home canvas and quiet solid image backgrounds for individual care topics. Crop the edges of framed images deliberately. Width and placement should reflect importance. Use the same fine outline and facial construction in each scene.

## Components

Use nested curved surfaces and compact 12px control radii. Give actionable targets at least 44px in height. Use regular tab labels, clear eligibility and one full-plan link. Three-line dense rows are appropriate for price and benefits. Keep phone, email and portal actions visible without relying on hover.

## Motion

Use GSAP for the existing cursor and selected scroll-linked illustration and text reveals. Measure timing against the kiza-charles-ux-animation skill. Default to readable content and native scrolling. Keep content state identical under reduced motion. Preserve plan and portal destinations.

# Homepage revision · Care, closer to home

## Concepts

| Anchor | Visual idea and signature | Originality / fit / feasibility / portability |
| --- | --- | --- |
| Bhopal and Mandideep hospital network | **Care, closer to home.** Build a neighborhood directory around real providers. An oversized front-door consultation introduces a service index whose illustration changes as readers choose the next stop. The key frame puts a warm handoff against blue paper. | 4 / 5 / 5 / 2 |
| Membership process | Follow a membership booklet from selecting a plan to booking care. A stack of annotated pages peels back in sequence. The key frame is the open booklet. | 3 / 5 / 5 / 4 |
| Everyday healthcare materials | Assemble a home calendar around checkups and consultations. Date cells expand into care windows. The key frame is the calendar with one appointment window open. | 4 / 3 / 4 / 4 |

Pick the neighborhood directory. The named local partners give it a reason to exist. The service index and physical-to-online story support useful actions.

## Concept card

- Idea. Annual outpatient care that makes it easier to know where to go next.
- Metaphor. A local directory that opens each care option in its own window.
- Signature. A GSAP-driven list and sticky illustration stage. Scroll sets the active service, hover previews it, and keyboard focus gives the same preview. The phone layout keeps every image beside the link it describes.
- Emotion. A warm invitation with a clear next step.
- Motion verb. Shift the focus, as if sliding a window into view.
- Screenshot. Oversized navy headline, outlined phone-consultation artwork and a warm orange action above the two named hospital cards.

## System

React, Vite and the installed GSAP match the repository and preserve the current route structure. Funnel Display heads, Hanken Grotesk for reading and controls. Midnight #14254a, ice #e8effc, faint blue #f5f8ff, cobalt #214da9, orange #ff9659 and white. Navy text on orange. Primary hover advances its arrow as the fill changes. A 44px minimum target and softly nested 16–34px curves. Six compact chapters, with stronger breaks at the care stage and the member quote. The poster remains still because the illustration and accent already carry the first frame.

| Section | Layout |
| --- | --- |
| Hero | Unified blue poster with giant type and a large waist-up figure cropped at the canvas edge, followed by a three-link route bar. |
| Partners | Named hospital directory with supplied marks, a visible location beside each, then the old partner marks in a quiet supporting line. |
| About | Left framed membership illustration, right one large statement and short context. |
| Services | Full-width midnight chapter with a service index on the left and changing artwork on the right. Small screens keep scenes inline. |
| Why choose | Compact three-item list beside an illustrated product explanation. |
| How it works | Three layered appointment panels, with sticky stacking on tall desktop and straight reading order on phones and reduced motion. |
| Customers | Large rotating quote and visible next/previous controls on a pale blue chapter. |
| Footer | Large plan signpost followed by the existing address, portal and policy links. |

# Clinical redesign · 18 November 2026

The latest direction supersedes the warm field guide and the blue illustrated poster. In the screenshots attached to the brief, the phone illustration and heavy display type identify the problems. The earlier images show two usable secondary illustration treatments. One uses an opaque field matched to the page so the edges blend. The other has a distinct opaque color when it sits in a frame.

## Brainstorm

| Direction | Useful part | Decision |
| --- | --- | --- |
| A real outpatient visit | The first image communicates a diagnosis or consultation through the people, their eye line and room. | Use as the hero. |
| Hospital directory | Logos, nearby locations and practical directions give local context. | Use directly below the first viewport. |
| Illustrated guide to using a plan | Original diagrams show services and enrollment without clinical stock imagery on every route. | Use for service rows, comparison, membership steps, contact and policies. |

## Working design

Start on a soft-white background #f8faf9. Pull a restrained medical blue #173f78 from the existing logo and use green only for selected availability cues or artwork. Use Public Sans at 400–650, with headline sizes of 33–57px on the home page, 30–48px on interior routes, and 16–18px body text. The original logo is the supplied PNG, shared by the header and footer. Use 10px corners for controls, 18px for adjacent subpanels and 24px for media. Group related items with alignment, spacing and occasional fine dividers.

The first screen combines plainly stated outpatient services and a single dominant photo showing an Indian doctor listening to a patient in a clinic. Keep the photo's faces and hands within a protected mobile crop. Use the original logo for identification. Put purpose-built, clean line scenes at the point where someone chooses a service, compares membership, signs in or seeks support.

The home page follows a direct sequence from the hero to the provider network, explanation, service selection, membership steps and member stories. The bottom offers a small plan signpost and a quiet contact and policy directory. Carry one shared clinical palette and spacing rhythm through all 22 local routes. Uses the existing React/Vite and GSAP stack, the named kiza-charles-ux-animation skill, and the supplied fun-isometric icon kit sparingly.

## Motion decisions

Keep the existing cursor and native scroll. Use GSAP text reveal only below the fold. Use a React scroll-linked service preview and CSS sticky steps where there is room, and render their illustrations inline in reading order on phones. The service control gives an immediate visual response to hover and keyboard focus. Match the named skill's reduced-motion and menu guidance.

## Editorial composition revision

| Concept territory | Proposal | Originality / fit / feasibility / portability |
| --- | --- | --- |
| Outpatient materials | A patient's care guide, laid out as a clinical journal: opening photograph, image led atlas, appointment sequence and plan comparison index. Each image shows an outpatient decision. | 4 / 5 / 5 / 2 |
| Local places | District directory organized around Medicare Hospital and Care and Cure Hospital, with destinations set like a transit index. | 4 / 3 / 4 / 2 |
| Plan documentation | A membership ledger from eligibility through treatment. Precise table hierarchy would be clear on plans and overly transactional for the home page. | 3 / 4 / 5 / 4 |

Selected the care guide since it can lead with clinical imagery and carry through to guidance, comparison, and support. Its signature is a wide appointment photograph with type and CTA in a separate masthead, followed by a care atlas that changes its plate in response to the reading line or an explicit selection. On mobile the care index becomes portrait thumbnails in a readable list. The photograph remains still. The motion vocabulary is a short and interruptible shift between care subjects, supported by the previously selected animation skill.

Use Newsreader for the editorial titles, Public Sans for content and controls, and the original logo. Ink #182e41, soft paper #f8faf9, green #205b4a and logo blue #173f78. Use varied arrangements across sections. The home opening is a masthead on top of a wide photograph. The hospital directory is made of divided entries with visible locations. Catalogue entries are laid out as an asymmetrical gallery wall. Plan comparison uses a vertical filter index and a structured price ledger. Policy pages use a margin index. Every link uses legible text with a clear focus treatment. The primary action uses a compact round arrow beside its label. Form fields and select popovers retain quiet rounded contours where they communicate affordance.

## Homepage-first revision · Outpatient care guide

Three directions were considered. A color-led directory anchored on nearby hospitals scored 3/4/5/3 for originality, fit, feasibility and portability. A paper ledger for outpatient memberships scored 3/4/5/4. A visual guide to the care visit scored 4/5/5/2 and was selected. Its photo and reading index tell the story from choosing a service to seeing a clinician.

**Color and type.** White paper #fbfaf5, dark pine #203c31, forest #244c3d, spring #e7edb4, lilac #ece5f4, and blush #f0e3d9. The existing blue and green logo appears unaltered on white. Newsreader gives headings a moderate, readable editorial form. Public Sans carries actions and clinical details. Use radius tiers of 12, 18 and 30px for functional controls and media. No identical section shells.

**Composition.** A horizontal masthead sits above a wide clinical photograph, with a spring membership panel over the open part of the image. A ruled partner directory follows. The lilac care atlas has a sticky plate and a ruled service list, with all illustrations visible inline on mobile. The next spread varies image and copy placement. The appointment filmstrip uses real ordered steps, variable image sizes on desktop, and native touch snapping with numbered controls on mobile. The last chapter is a forest-colored member quote, followed by a white contact and links directory. Keep the section headings descriptive and limit explanatory copy.

**Interactions.** Existing GSAP and React remain the stack. Below-fold headings reveal on approach. ScrollTrigger uses the reading line to change the care plate. Hover previews it and keyboard focus updates it immediately. Active plate uses opacity and a 10px shift over 235ms. Native scroll snap on touch, always-visible CTAs, visible focus, and reduced-motion images in the source reading order. Anchor the final CTA in the footer. The photography remains still because the foreground consultation already carries the first frame.

## Active homepage · OPD reference blend

The most recent homepage revision supersedes the editorial guide. The homepage uses white, Aarogya’s public palette #1c2539 and #0657a3, Urbanist typography, compact provider listings, restrained neutral benefit panels and pastel signup steps. Header and footer use the original SehatFirstPro logo. The hero composition combines its own copy region and doctor–patient media, and the service section retains the independently implemented scroll/focus/hover illustration preview. All interface source is authored for this project. Reference source informed color roles and interaction patterns.

The footer is navy with visible white links. About imagery combines the generated consultation photograph and an original clinical illustration with native aspect ratios. The three steps use ordered sticky panels where the viewport has room, and normal vertical reading order on mobile or reduced motion. Keep the native cursor plus its existing follower. Work remains local in the React/Vite proposal on port 5173.

## Local mobile refinement, 18 November 2026

Phone reading order is hero → hospital partners → services → about → reasons → membership steps → member quote → footer. The service directory comes earlier in actual markup on all devices. On phones, the hero is photograph-first on white, touch shortcuts use three columns, services use two illustrated columns, and booking steps become short image-and-copy rows. A native modal dialog provides focus containment, Escape handling and scroll locking for the hamburger menu. Existing navigation destinations stay intact. Public Sans body text improves small-screen reading; Urbanist remains the heading face. Blue #deebff, mint #d9f2e3 and peach #ffe5ce replace subdued step fields. Illustration saturation/contrast is adjusted through CSS; clinical photographs retain their original colors. Mobile text reveal effects are disabled so reading never depends on scrolling an animation into view. The grouped marquees retain their pause control and reduced-motion layout.

This is a local review iteration. Do not commit or push it. Run the local app at http://127.0.0.1:5173/.

Publishing update: after reviewing the local work, the user explicitly requested 'quickly correct it doo it and push'. This authorizes pushing the completed mobile and matching page update to GitHub.

Final scope: the user requested restoration of every non-home page after the push. Only `/` uses the revised design. All other routes load the byte-identical preserved production application and its separate original stylesheet. The newly introduced page renderer and policy wrapper are removed, and policy source files are restored. The homepage, its mobile menu, stronger artwork colors and grouped marquees stay intact.

Homepage section correction: the rejected navy illustration index is replaced by eight medical photo cards. Desktop composition uses four columns with selected cards spanning two, tablet uses two equal columns, and phone uses one column with a larger first card. Hover zoom is pointer-only, the whole card is a touch link and reduced motion remains supported. White text is protected by a layered dark bottom gradient. The reasons section uses a two-by-two benefit grid beside a doctor photograph on desktop, with horizontal icon-and-copy cards and a full-width photo on phones. New assets are compressed variants of existing production photos. All non-home routes still load the original app and original stylesheet.

Membership section unslop: follow kiza-charles-unslop and kiza-unslop as documented in reference/redesign-2026/UNSLOP.md. The four equal icon cards and portrait are removed. The section now presents the exact Wellness First price, eligibility and annual benefit allowances from the existing catalog. A wider semantic table and a shorter introduction replace the template grid; the phone layout uses 16px text and aligned counts. Public Sans 400/500, white, ink and the existing brand blue remain. No image generation, decorative material or new motion is used. This change affects only the one homepage section.

Hero unslop follow-up: remove the floating image label and the three pastel icon shortcuts. Keep one primary plan action and one secondary service text link. Use literal annual outpatient-care copy, the real catalog starting price, Public Sans 500 and one ink color. An open white desktop composition centers the copy against the existing clinical photo. Phones read offer/actions before the photo; the photo remains visible in the first viewport. The original logo, cursor, hospital partners, grouped marquees, services, menu and login targets stay unchanged. Audit and prompt are in reference/redesign-2026/UNSLOP.md.
