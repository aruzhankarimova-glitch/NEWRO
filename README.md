# NEWRO — Career Try-out MVP

**Functional, mobile-first career simulation prototype.** Try out **AI Marketing Specialist** or **Product Manager** through decisions, sample mentor feedback and a downloadable work sample.

## Website

https://aruzhankarimova-glitch.github.io/NEWRO/ (requires GitHub Pages enabled).

## Enable GitHub Pages

Open **Settings → Pages** in this repository, set `Deploy from a branch`, branch `main`, folder `/docs`, and Save. The static site is `docs/index.html` and does not need Node, a server, any API key or deployment build.

## Run locally

Open `docs/index.html` in a browser or serve it:

```bash
python3 -m http.server 8000 --directory docs
```

Go to http://localhost:8000.

## Experience update — November 2026

- Original desktop cursor-swarm animation builds the NEWRO landing page on first view. Controls: Replay and Skip. Supports reduced-motion preferences. Inspired by the concept of [Swarm Rebuild](https://github.com/DhvanilPatel/swarm-cursors); no source code or visual assets from that unlicensed repository are included.
- On phones, NEWRO opens immediately in an app-like layout with a bottom navigation dock, large touch targets, a compact interactive preview and the same two working role simulations.
- Mobile web app manifest, offline page cache and safe-area support enable installing from the browser where supported.
- Primary deploy source is `docs/`; workflow validates JS syntax and publishes it to GitHub Pages on changes to `main`.

## What works

- Landing page, both simulation routes, decision controls, explanations, back/next navigation and interactive review.
- Progress saved using browser localStorage.
- Marketing: evidence → audience → claim → AI-prompt writing → editing sample draft → channel/metric → mentor challenge → feedback → work sample.
- Product manager: brief → 24-hour release planning → trade-off feedback → reasoning quiz → reflection → decision card.
- Download results as text, or copy to clipboard on secure contexts.

## Current limits

- Mentor feedback is transparent prewritten and rule-based, **not a live LLM**.
- Harbor and the customer data are fictional; no real client claims.
- No sign-in, backend, subscription, cross-device sync or professional certification.
- The original React/Vite experiment lives in the previously supplied NEWRO-mvp.zip; this published build is a **standalone static alternative**, not that exact compiled archive.
- The UI still needs complete device and screen-reader QA.

## Design and product docs

- `CLAUDE.md`: operating rules for Claude Code.
- `PRODUCT.md`: open decisions, not settled product requirements.
- `DESIGN.md`: prototype UI contract.
- `docs/ux-first-simulation.md`: detailed marketing simulation design spec.
- `docs/design-stack.md`, `docs/workflow.md`, `docs/anti-slop-checklist.md`.
- `design-stack.lock` and `scripts/setup-design-stack.sh`: pinned third-party design skills.

Existing older files inside `NEWRO/` were preserved to avoid destructive changes. New active files are at the repository root.

## Responsive Swarm 2.0 (mobile + desktop)

- Both screen sizes now show a multi-cursor construction sequence: blank canvas, cursor orbit, frames/guides, text typing, copied cards and a final reveal.
- Mobile runs three cursors and a compact bottom control bar above the app dock. Desktop uses five cursors. Scroll to reveal more tasks.
- Replay, Skip and optional user-initiated synthetic click sounds are included; reduced-motion preferences skip the performance.
- This is an independent reimplementation inspired by the idea, **not a reproduction of or inclusion of unlicensed original source code** from [Swarm Rebuild](https://github.com/DhvanilPatel/swarm-cursors) / [Swarm](https://github.com/califa/swarm-site).

## Course-style design system (November 2026)

NEWRO now uses a unified, mobile-first learning-app visual system: white surfaces, violet selection and progress, green primary actions, purpose-built role illustrations, short lesson cards, mentor feedback and a functional learning-path dialog. Home animation keeps its independently implemented parallel cursor swarm, including on phones.

The design is an original adaptation of user-provided learning app screenshots. It does not reuse those screenshots or copyrighted illustrations as website assets.

The course progress path reflects simulation steps only. Paid subscriptions, real AI feedback and verified professional credentials are not present.

## Complete local-first user flow (v1)

**Visitor → free career try-out → saved result → profile onboarding → learning dashboard → guided four-step project → portfolio/export → explore another career.**

Illustrated role cards and mentor graphics are original in-repository SVGs under `docs/assets/illustrations/`. Full flow modules: `docs/assets/newro-flow.js`, `docs/assets/newro-flow.css`.

The dashboard shows only real local activity, completed try-outs, project progress and portfolio artifacts. Drafts are auto-saved using localStorage. Guided projects are real editable exercises with minimum-length validation and transparent deterministic mentor feedback. The user can export work samples as text and download their personal learning data as JSON. No emails are collected or transmitted.

**Limits:** This is a browser-only functional prototype. No server, authentication, cloud sync, LLM-based grading or billing. Clearing browser storage deletes progress. Onboarding creates a local profile, not an account. All sample client briefs are fictional.

Test both paths with `node scripts/full-flow-smoke.cjs` (requires Playwright and a static server on port 4173).

## Business Cup 2.0 hackathon release (15 November 2026)

**Track:** SKILLS. **One pain:** Career changers don't know whether a profession fits them until after committing time or money to training. **Primary demo:** AI Marketing Specialist (Product Manager is a secondary example).

The homepage now says this clearly, removes fake preview percentages and generic marketing slogans, and keeps one short, actionable experience. Cursor builders leave down past the bottom edge together after completing their work; Replay and Skip still work.

**Phone features:** Optional short vibration through `navigator.vibrate` for meaningful taps/decisions when supported (usually Android; not available through iOS Safari), preference in Profile, visual press feedback on touch, native Share sheet for saved work samples where supported, and optional PWA install button where the browser exposes `beforeinstallprompt`. Unsupported features degrade without errors and without false success messages. No automatic vibration on entry.

**Motion:** One-time result illustration transition replaces heavyweight generic looping GIFs; all motion respects `prefers-reduced-motion`.

**Audit and 5-minute jury walkthrough:** see [docs/HACKATHON_AUDIT.md](docs/HACKATHON_AUDIT.md).
