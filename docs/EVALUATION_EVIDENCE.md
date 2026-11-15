# NEWRO — public evaluation evidence

**Status:** self-reported engineering evidence, not independent certification or a competition score.

## What the app does
NEWRO lets a user test a career through a fictional assignment, receive deterministic practice feedback, review and download their work **before** an optional local onboarding step, and continue through a guided project.

## Inspectable evidence

- `scripts/ui-smoke.cjs`: landing behavior, simulator navigation, responsive basics.
- `scripts/responsive-smoke.cjs`: 320–1920 px viewport reflow, touch target sizes, button contrast, result-first flow, exercise history and accessible state assertions.
- `scripts/full-flow-smoke.cjs`: complete marketing and product-management learner journeys, with exported files and persistence.
- `scripts/hackathon-smoke.cjs`: cursor animation exit, mobile haptic opt-out and feature fallback, native Share.
- `scripts/premium-smoke.cjs`: task preview selections, navigation and layout tests.
- `docs/assets/newro-responsive.css`: corrected mobile task controls, intermediate layout and contrast.
- `docs/HACKATHON_AUDIT.md`: product and competition scope.

The test runner publishes screenshots under the `newro-ux-screenshots` artifact of the relevant GitHub Actions run. Check the current commit's run status; passing code assertions do **not** substitute for testing a physical phone or with a screen reader.

## Known limitations

The AI mentor is a **rule-based practice guide**, not live AI inference. There is no backend account, cloud backup, payment or validated ability to judge career suitability. Local storage may be cleared; provide users the text and JSON export options. No independent UX certification, perfect rating or verified paid demand is claimed.

## Public review protocol

Evaluate the deployed version, not only repository assertions. Check the full path from role try-out to output, then try editing a project and using a second attempt. Test narrow widths, touch and keyboard interactions, 200% text scaling, browser storage restrictions, motion reduction and contrast. Record observed results and outstanding issues rather than assigning a score in advance.
