# NEWRO — Design contract for the standalone MVP

This is a prototype design system, not final branding. Refer to `PRODUCT.md` and Claude's direction-setting process before changing it.

- Canvas: #ffffff. Ink: #17171f. Body: #3a3a48. Muted: #5e5e6e.
- Borders: #e6e4f0; panels: #f3f1fe; selected/progress: #4b3fd8; primary action: #18803e.
- Typography: Inter / system sans, sentence case, restrained scale, no unsupported decorative effects.
- Learning app: centered max 640px, one question per screen, large choices, sticky action and progress.
- Landing: editorial heading, two distinct role cards, no fabricated claims or testimonials.
- Accessibility: visible focus, semantic buttons, pressed states, contrast, reduced motion, small-screen layout.
- Do not imply rule-based feedback is produced by a live LLM.
- The active prototype is `docs/index.html`. Apply the anti-slop audit to new UI and confirm with browser screenshots before calling changes production ready.

## Interactive landing and mobile app guidance

- NEWRO career studio palette: paper #f7f7f2, ink #15231e, green #c9fb83 and purple #6954dc. Purposeful contrast; avoid generic SaaS gradients.
- Desktop landing: typography-led editorial hero, original cursor swarm assembles key elements, interactive role selection and explanatory journey.
- Mobile: app-style bottom navigation (Explore, Try-outs, Resume), immediate content, touch-first cards and no blocking animations.
- User choices, practice progress and result downloads must remain accessible. No live AI or invented social proof.
- Animation supports Replay, Skip, reduced motion and is limited to desktop; never gate a CTA on an animation.
- Attribution: inspired by the **idea** of Dhvanil Patel's Swarm Rebuild / Joel Califa's Swarm; their code and art are not used because no open license is provided.
