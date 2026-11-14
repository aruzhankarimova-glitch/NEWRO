# Workflow with gates

Each step has an exit gate. Do not move on until it passes. "Skip" is allowed only when Aruzhan says so explicitly.

## 1. Research the audience, product, brand
Inputs: `PRODUCT.md`, existing code, competitors, real material.
Gate: PRODUCT.md has no blocking open questions for this surface (audience state, primary action, tone extreme, anti-references, available real material). If it does, ask via a short multiple-choice, then record answers.

## 2. Three directions
Each direction: name, one-sentence idea, palette logic, type pairing, layout posture, motion posture, what the first screen looks like, why it fits this audience, one honest risk, one anti-reference. They must differ in structure and mood, not just hue. Neither purple-blue gradients nor indigo+clay defaults count as a direction.
Gate: Aruzhan picks one (or a blend, stated explicitly). Log the pick in `docs/decisions.md`.

## 3. Lock the system
Decide: type scale and two families at most, color tokens (neutral ramp tinted toward the brand hue, one accent, semantic colors), 4px spacing scale, grid and container widths, radius by element size, elevation (hairline + soft shadow), motion tokens (durations, one easing), component list with states.
Gate: every value is a token. Nothing arbitrary.

## 4. Write DESIGN.md
Created only after step 2. Sections: principles, color, type, spacing and grid, radius and elevation, motion, components and states, iconography, imagery, voice and copy rules, accessibility floor, do / don't. Keep it short enough to be read each session.
Gate: a stranger could build a new screen from it without asking.

## 5. Build functional UI
Real routes, real state, forms that submit (or are honestly marked as stubbed), loading / error / empty states, keyboard support. Run `modern-web-guidance search` before dialogs, popovers, forms, scroll or view transitions. Use shadcn components with built-in variants first.
Gate: the flow works end to end with realistic data. No lorem ipsum, no fake metrics.

## 6. Anti-slop and craft audit
Run in order: `docs/anti-slop-checklist.md` -> unslop signs -> Impeccable `audit` and `critique` -> `node ~/.claude/skills/hallmark/scripts/sloplint.mjs <path> --render` -> Vercel web-design-guidelines -> Emil review table.
Gate: every FAIL fixed; every waiver recorded in `docs/decisions.md` with a real reason.

## 7. Responsive, keyboard, contrast, states, scenarios
- `node scripts/shoot.mjs <url> --out shots` at 390, 768, 1280, 1440 (full-page screenshots, horizontal overflow check, console errors).
- Keyboard-only pass: Tab order, focus visible, Esc, Enter/Space, no traps.
- Contrast: measure, do not eyeball. Check hover, disabled, placeholder, text on accent.
- States: force error, empty and slow-loading cases.
- Scenarios: write 3-5 real user journeys (first visit -> try-out -> subscribe; returning user; error recovery) and walk each one.
Gate: screenshots viewed, issues fixed, re-shot.

## 8. Report
Format, kept short:
- Checked: what was run and at which sizes.
- Fixed: what the checks found and the change made.
- Remaining limits: untested browsers/devices, stubbed backend, assets still placeholder, waived rules.
Never call it "production ready" if any limit affects real users.
