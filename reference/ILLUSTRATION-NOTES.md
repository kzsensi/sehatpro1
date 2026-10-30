# Illustration implementation

## Current brand revision

The earlier cream/sage/orange palette below is superseded. Current canvas colors are navy #0A2350, blue-tinted #B7D4FF, green #16A34A, white and pale blue #EFF6FF. Six transparent PNG illustrations are integrated across the homepage, services, Plans and Contact. They follow one.txt/two.txt with the explicit user brand override; see BRAND-REVISION.md for file list. PNG alpha channels were checked. The earlier garden illustration is historical artwork and is not used in the current UI.

## Sources

- Requested local prompts: `image base prompts/one.txt`, `two.txt`, `three.txt`.
- Installed skill: `C:/Users/Krishna/.codex/skills/fun-isometric/SKILL.md`.
- Actual upstream source: https://github.com/kelvinkn17/skills/tree/main/skills/fun-isometric/kit
- Upstream license: MIT, preserved verbatim at `redesign/src/stickers/LICENSE`.

The four runtime files `fun.ts`, `motions.ts`, `icons.ts`, and `Sticker.tsx` are copied directly from the installed upstream kit. These are genuine reusable components and keyframe presets, not approximate CSS imitations.

## Integration

`CareSticker` from `src/components/CareArt.jsx` supports `heartbeat`, `heart`, `calendar`, `chat`, `folder`, `phone`, and `notes`. It uses the kit's original worked illustrations with a project palette: cream `#f6f3e9`, sage `#b5c7aa`, orange `#eb784d`, and dark green `#203c35`. Each sticker plays once on entry, settles on an explicit still frame, and replays on hover. Passing `loop` opts into looping, but the default avoids continuous competing animation.

```jsx
<CareSticker type="calendar" style={{ width: 160 }} />
```

The shared runtime suspends offscreen canvases, uses one animation clock, and honors reduced motion. The `Sticker` canvas carries a descriptive accessible name. Icons are illustrative; nearby text should convey the actual service.

`CareArt` is an original small family SVG intended for supporting sections, not the main editorial hero. It has no independent animation loop, so it can inherit the site's section reveal.

## Validation limits

Bun is not installed in the inspected environment. The skill's `fi check` uses Bun's bundler and Playwright Chromium, so the complete frame/clipping validator was not run. No large validation dependencies were installed during disk pressure. The kit source is unmodified; the wrapper only sets palettes, names, still frames, and playback props. Parent implementation must visually inspect the rendered canvases in its browser pass.

Made with fun-isometric by Kelvin Adithya (https://x.com/KelvinAdithya), heavily inspired by Slush (https://slush.app), more at https://skills.klvn.dev/fun-isometric.
