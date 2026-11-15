# Anti-slop checklist

Consolidated from Impeccable craft-floor, unslop signs, Hallmark Floor gates and Open Design craft notes. Tick each item at audit time. A ban has no waiver; a default needs a written reason.

## Bans (no waiver)
- Eyebrow / kicker above a heading; tracked-capital labels and small caps (labels are the body face, sentence case, untracked).
- Gradient text; purple-to-blue (or violet-to-pink) gradients; colored glows; blurred blobs and radial washes behind content.
- Card inside a card; same-size icon + heading + text cards as the page structure.
- Emoji or Unicode glyphs as icons; sparkle for "AI".
- Colored `border-left`/`border-right` over 1px on cards, callouts, alerts.
- One italic word inside a roman heading.
- Invented metrics, testimonials, logo walls, user counts.
- `transition: all`; animating width/height/top/left.
- Hand-drawn fake browser or OS windows.
- Horizontal overflow; `100vw` for layout.

## Defaults to avoid (need a stated reason)
- Hero-metric template (big number + small label + stats + accent).
- Section numbers 01 / 02 / 03 without informational purpose.
- Glass / blur as decoration; hard offset shadows outside a real neobrutalist world.
- Every element a full pill; one radius for everything.
- Inter / system font as the only voice with no hierarchy idea; monospace as a "technical" costume.
- Sparklines, progress rings, rainbow chart bars standing in for content.
- Greeting headlines ("Welcome back! 👋"), exclamation marks, hype words (supercharge, seamless, unlock, magic).
- `PRO` / `New ✨` / `Beta 🚀` badges everywhere; glowing count pills.
- Modal for a task that needs neither interruption nor focus trap.
- Light/dark chosen by category cliche instead of the user's real scene.
- Email sign-up at the end of every page; a form that says thanks without sending.

## Craft floor (must verify)
- Contrast: body and placeholder 4.5:1, large 3:1; tint text on colored surfaces from the surface hue, not gray.
- Type: body measure 65-75ch, display max 6rem, balanced headings, one number format with tabular figures.
- Spacing: values from the 4px scale; tight inside groups, generous between; more space above a heading than below.
- Depth: shadows have offset and blur; hairlines at 6-10% opacity beat colored borders.
- Motion: one authored moment per screen; exponential ease-out; enter from an already visible default; reduced-motion fallback for every animation; content visible without JS.
- Browser surfaces themed: text selection, caret, scrollbars, focus ring, underline offset.
- Hero: headline, one sentence and primary action visible at 1280x800; ~80 words per screen at most on landing.
- Every interactive element has `:focus-visible`, appearing instantly.
- Copy: controls name their action; errors name the problem and the fix; empty states say what to do next.

## One-sentence test
Say what this screen shows and why it could only belong to NEWRO. If you cannot, it is the next template.
