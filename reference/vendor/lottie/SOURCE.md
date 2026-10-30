# Heartbeat animation provenance

- Title: **Heartbeat | Medical** / upstream composition `Heart/heartbeat`.
- Creator: Sarpreet Kalyan, copyright 2025.
- Public creator listing: https://lottiefiles.com/free-animation/heartbeat-medical-pPbWnDhphP
- Official Qt attribution: https://doc.qt.io/qt-6/qtlottieanimation-attribution-heartbeat-medical.html
- Downloaded actual JSON: https://raw.githubusercontent.com/qt/qtlottie/dev/examples/lottie/lottietoqml/original/HeartMedical.json
- Official source attribution manifest: https://github.com/qt/qtlottie/blob/dev/examples/lottie/lottietoqml/qt_attribution.json
- License: Lottie Simple License 9.13.21. Full license preserved in `LICENSE.txt`, and beside the served animation in `redesign/public/animations/heart-medical.LICENSE.txt`.

This is a downloaded reusable third-party animation, not a newly generated or fabricated asset. `HeartMedical.original.json` is the unmodified source. The served animation uses SehatFirstPro's blue and green palette after the brand revision. Geometry and keyframes are unchanged. The derivative remains under the same Lottie Simple License.

The asset is a 600 × 436 vector composition, 45 frames at 60 fps, with three layers and no external images. The wrapper plays it at 0.45× speed for a calmer pulse.

## Renderer and integration

`redesign/src/components/LazyLottie.jsx` exports default `LazyLottie({ src, label, className })`. Default source is `/animations/heart-medical.json`. It dynamically imports `lottie-web` on first intersection, pauses when offscreen or the document is hidden, follows `prefers-reduced-motion`, shows a static frame for reduced motion, aborts outstanding fetches and destroys the animation on cleanup. A static SVG fallback renders on asset/network failure.

Requires `lottie-web` from npm. Renderer source: https://github.com/airbnb/lottie-web (MIT; license retained in `lottie-web.LICENSE.md`). Do not confuse the renderer's MIT license with the animation's Lottie Simple License.

## Verification

Downloaded JSON parses successfully and contains only vector shapes, no external assets. Source colors were inspected before replacing only fill colors. Full visual playback verification must be part of the parent's browser pass after package installation and integration.
