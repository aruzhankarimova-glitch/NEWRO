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
