# Design stack registry

Pinned versions live in `design-stack.lock`; `scripts/setup-design-stack.sh` installs them into `~/.claude/skills`. Skills are third-party instructions the agent follows, so versions are pinned and were only skimmed, not audited line by line. Re-review before bumping a pin.

Status key: installed = copied and smoke-tested in this environment. reference = cloned for reading, not installed as a skill.

| # (your list) | Tool | Repo | Status | Use it for | Do not use it for |
|---|---|---|---|---|---|
| 4 | UI/UX Pro Max | nextlevelbuilder/ui-ux-pro-max-skill | installed, `search.py --design-system` tested | Searching styles, palettes, type pairings, UX rules; raw material for the three directions | Taking its recommended system as final (it returned Claymorphism + indigo for an education product) |
| 5 | unslop | heydamir/unslop | installed | 9-pass redline: spacing, color, icons, copy, type, layout, details, visuals, motion; `references/signs.md` audit list | Redesigning screens that already have no slop |
| 5 | Hallmark | Nutlope/hallmark | installed, `sloplint` runs | Floor gates, `sloplint.mjs --render`, 50-theme catalog for landing pages | Redesigning existing UI unless explicitly invoked with `redesign` / `audit` |
| 5 | Impeccable | pbakaus/impeccable | installed, launcher runs | `init` (PRODUCT.md), `shape`, `critique`, `audit`, `polish`, `harden`, DESIGN.md | Nothing excluded; it is the primary vocabulary |
| (taste) | taste-skill | leonxlnx/taste-skill | installed | Landing / marketing build rules, finish gate | Dense app screens (its one-section-per-screen rules suit Persuade mode) |
| 6 | Vercel Agent Skills | vercel-labs/agent-skills | installed: web-design-guidelines, react-best-practices | Accessibility, forms, animation, React performance audit. web-design-guidelines fetches its rules from raw.githubusercontent.com at run time | Design direction |
| 7 | Emil Kowalski skills | emilkowalski/skills | installed: emil-design-eng (others available in clone) | Press states, easing, popover origin, tooltip timing, review tables | Layout or brand decisions |
| 8 | Anthropic frontend-design | anthropics/skills | installed | Aesthetic direction, typography discipline, subject-grounded design | Detailed audits |
| 9 | Studio Groei Anti-Slop | not provided | not installed | Generating several directions and tuning in browser | No link was given and I did not guess a repo. Send the URL to add it |
| 10 | React Bits | DavidHDev/react-bits | reference (215+ components) | Source of animated backgrounds and text effects, picked per need, each with a stated purpose | Decoration. License is MIT + Commons Clause: fine inside our product, not for reselling the components |
| 11 | Motion Primitives | ibelick/motion-primitives | reference | Restrained, shadcn-style motion components (in-view, text-morph, accordion, morphing-dialog) | Stacking effects |
| - | shadcn/ui | shadcn-ui/ui | installed skill (shadcn-ui) | App component foundation, semantic tokens, CLI | Overriding colors with className |
| - | modern-web-guidance | GoogleChrome/modern-web-guidance | installed | `npx modern-web-guidance search "<2-5 words>"` before dialogs, popovers, forms, scroll animation, dark mode | Backend or tooling work |
| - | Astryx | meta/astryx | reference | How a large agent-friendly design system documents specs and tokens | Dependency (React 19 + StyleX, heavy) unless chosen deliberately |
| - | Open Design | nexu-io/open-design | reference | 154 reference design systems in `design-systems/`, craft docs in `craft/` (anti-ai-slop, state-coverage, typography, accessibility-baseline, laws-of-ux) | Running its app |

## How they fit the pipeline

- Direction (step 2-3): Anthropic frontend-design + UI/UX Pro Max search + Open Design references + Hallmark theme index for contrast between options.
- System (step 3-4): Impeccable `shape`/`document` to write DESIGN.md; shadcn tokens map.
- Build (step 5): Impeccable new-work flow (app) or Hallmark/taste-skill (landing). One generator per file.
- Audit (step 7): unslop signs, Impeccable `audit` + `critique`, `sloplint --render`, web-design-guidelines, react-best-practices.
- Polish (step 7-8): Emil design-eng review table, Impeccable `polish`.

## Known caveats found while setting up

- NEWRO repo was empty at setup; no existing code or brand to preserve.
- Impeccable reports no PRODUCT.md and asks for the `init` interview first. That is expected and is why `PRODUCT.md` is a draft with open questions.
- `gh` in this sandbox has an invalid GH_TOKEN, so pushing to GitHub from here does not work until credentials are fixed.
- Taste-skill registers a Stop hook that runs a gate script; it only fires when the skill is active.
