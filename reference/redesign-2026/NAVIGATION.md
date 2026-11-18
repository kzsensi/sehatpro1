# Shared site navigation

The user approved the homepage mobile hamburger menu and asked that every page use it, replacing the other pages' top advertising strip and dropdown navigation. They also rejected the local appointment-section preview and requested the original layout back.

## Result

- Restored `Home.jsx` from the pushed version before making navigation changes. The original three illustrated appointment panels and existing member-story redesign remain.
- Removed the uncommitted `JourneyPreview.jsx`, `journey-preview.css` and local-preview instructions file. There is no remaining appointment-preview import or component.
- Extracted the homepage header into `redesign/src/components/SiteHeader.jsx` and `site-header.css`.
- Both the homepage app and the preserved app for all non-home routes render that same component.
- Namespaced navigation classes prevent the preserved page stylesheet's global header/nav rules from altering the shared menu. Page styles are not imported from the homepage onto non-home routes.
- Removed the legacy utility banner and legacy header render. No page content or footer is redesigned.

## Behavior retained

The mobile menu uses a native modal dialog with its existing links, focus on the close button, Escape and backdrop dismissal, body scroll locking, and focus return. Keyboard focus cycles inside the dialog. Policies expand inside it. Desktop keeps the homepage's navigation and policy/login disclosures. Menu state closes when switching to desktop width. Short screens scroll the dialog rather than the background.

Customer login remains `https://portal.mdoc.samvargsolutions.com/login` and agent login remains `https://broker.mdoc.samvargsolutions.com/login`, with the same Vite environment overrides. The existing plan purchase URL and original footer portal URLs remain unchanged.

## Verification

Before changing navigation, the rendered main content was saved for all 21 non-home routes. After extraction, every main-content string matched exactly. The original non-home stylesheet and data files were not edited.

All 22 routes passed browser checks at 390px: one shared header, no old utility banner, no page overflow, modal opening, policy links, customer/agent destinations, Escape, focus return and restored background scrolling. Responsive checks covered home, plans and privacy at 320, 768, 811, 1024 and 1440px. At 320×568 the expanded menu scrolls and keyboard focus remains inside. Desktop login/policy disclosures and reduced-motion behavior passed. Plan filters and the existing checkout destination passed.

Header WCAG A/AA axe checks returned no violations on home, services, plans, contact and privacy. Build and all 22 route-render checks passed. Screenshots and browser report are in `D:/Temp/sehat-shared-header/`.
