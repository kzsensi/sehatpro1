# Motion component provenance

## Current blue/green multipage revision

Actual reused code now includes three React Bits components:

- **Magnet**: `Motion.jsx`, retained spring/pointer implementation and capped `Magnetic` wrapper.
- **ScrollReveal**: `ScrollText.jsx`, original saved in `reference/vendor/react-bits/ScrollReveal.original.jsx`. Used on the introduction heading with no blur or rotation, opacity 0.55. CSS import corrected for the local filename; reduced-motion cleanup retained.
- **SpotlightCard**: original JSX/CSS saved in `reference/vendor/react-bits/SpotlightCard.original.*`, integrated copy in `src/components`. Source: https://github.com/DavidHDev/react-bits/tree/main/src/content/Components/SpotlightCard . Plan cards use blue pointer-following light, no ambient motion, no flare, zero proximity. Added fine-pointer/reduced-motion guard. Static styling and keyboard focus remain available.

All three retain the MIT + Commons Clause notice. Next.js-only `use client` directives were removed from integrated copies for Vite. Original copies remain unmodified.

**Lottie**: Sarpreet Kalyan's Heartbeat | Medical, actual JSON from the official Qt repository. Original and license: `reference/vendor/lottie`. Current colors are blue and green. `LazyLottie` uses the light SVG renderer, loads on intersection, pauses offscreen and respects reduced motion. Source: https://doc.qt.io/qt-6/qtlottieanimation-attribution-heartbeat-medical.html . Animation license also accompanies served JSON.

**Reference-site captures**: HTML/CSS/JS and manifests under `reference/sites/aventura`, `cleveland`, `atlantic-health`. Each has an `extracted` directory with actual hero markup and matching simple CSS rules. These fragments require global dependencies and are inspection material, not standalone React components or imported into the app. Genuinely imported reusable components are listed above. Details: BRAND-REVISION.md.

Earlier notes below record the first implementation phase; ScrollReveal has since moved from reviewed-only to integrated source.

Inspected 30 October 2026.

## Reused implementation

React Bits Magnet by David Haz:
https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/Magnet/Magnet.jsx

The full published Magnet implementation was downloaded and integrated into `redesign/src/components/Motion.jsx`. Its spring solver, pointer proximity arbitration, maximum offset, shared event registry, and transform application are retained. A `Magnetic` wrapper restricts it to fine pointers without reduced-motion preference, caps displacement at 8 pixels, and reduces its capture area to 35 pixels. This prevents CTA hit targets from chasing the pointer excessively. Original source and full license are saved in `reference/vendor/react-bits/`.

License: MIT + Commons Clause. Permits application/website use; do not resell the components as a component library. Preserve the included copyright and license notice.

## Reviewed components and documentation

- React Bits ScrollReveal source: https://github.com/DavidHDev/react-bits/blob/main/src/content/TextAnimations/ScrollReveal/ScrollReveal.jsx . Examined its GSAP matchMedia cleanup, word splitting, and scroll behavior. The prototype's generic Reveal wrapper is a separate simpler implementation with a single enter animation, not an unmodified copy of this text effect.
- 21st.dev Magnetic Button: https://21st.dev/%40mohammadshehadeh/components/magnetic-button . Reviewed as an alternative. It introduces Motion and Radix dependencies, so the React Bits implementation was selected. No claim that this component was copied.
- GSAP matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/ . Used to scope animation creation and cleanup to user motion preferences.
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ . Used for once-only reveal entry.

## Local MJ cursor reference

`D:/SITES/PORTFOLIO/mj/index.html` contains Framer-exported `data-framer-cursor` annotations (hero, category tiles, featured-work CTA, contact controls), cursor host classes, and `grab` states on media tracks. The authored cursor component source is not present in that HTML. The prototype uses a new lightweight GSAP cursor follower inspired by those contextual states. It preserves the native cursor, changes size over controls, supports `data-cursor="label"`, disappears on blur/leave, and is disabled for touch or reduced motion.

## API

```jsx
import { Magnetic, Cursor, Reveal } from './components/Motion';
<Cursor />
<Magnetic><a href="#plans">Explore plans</a></Magnetic>
<Reveal as="section" className="section" delay={0.1}>...</Reveal>
```

All components clean up listeners/tweens on unmount. Reveal leaves document content visible when reduced motion is requested.
