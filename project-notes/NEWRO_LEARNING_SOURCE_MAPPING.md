# NEWRO learning content — grounded source mapping

Date: 15 November 2026
Status: internal product notes, **not deployed** to GitHub Pages

## Source selection

The user provided two research documents:

1. `AI_EdTech_Academy_Full_Annotated_2026(1).html`, report v2.0, dated 14 November.
2. `Newro-Research-Business-Cup (1).html`, NEWRO-specific revised v2.1, 15 November.

For NEWRO product behavior, **v2.1 is the more specific source**. Its module IDs, outcomes and distinction between deployed versus planned are authoritative for this implementation. v2.0 describes a broader two-track EdTech platform and is used as a contrast, not silently substituted.

## Curriculum

- **AI Product Manager:** PM-M00 (diagnostic) and PM-M01 through PM-M06 (six-week hypothesis). Each has a competency topic, proposed work artifact and success criterion.
- **AI Marketer:** MKT-M00 and MKT-M01 through MKT-M06 (future specialization), not a currently published six-week course.
- **AI Skills Core:** CORE-01A-E fundamentals, including responsible LLM use, prompt workflows, privacy, selecting tools and portfolio evidence.
- **Capstone proposal:** one measurable AI feature with human controls, evaluation plan, prototype and rollout case, not just a slide deck.

The source describes a training concept. A program outline is not course delivery. The app must not claim its locked modules are complete or award a fictional qualification.

## Available learning experiences

- **SIM-PM-01**: fictional Friday-release product decision; remains fully playable.
- **LESSON-PM-01**: a short free primer on prioritizing features before release, with fictional hours and risks, a worked example, one decision and predefined feedback. This is implemented in `docs/assets/newro-free-lesson.js` with source-backed criteria.
- **SIM-MKT-01**: an existing brief AI Marketing practice experience.
- **MKT six-week program:** clearly labeled as planned; future lesson in the source is only a proposal.

## Feedback & learning evidence

Use criteria `COMPETENCY → DEMONSTRATION → CONTENT → PRACTICE → RUBRIC → FEEDBACK → RETRY → EVIDENCE`. Opening a lesson is not proof of skill. A rule-based review of predefined choices does not independently assess arbitrary written reasoning. The learner can save multiple attempts and deliberately feature selected results.

## UX decision: portfolio

Every saved exercise is initially placed in local **practice history**. The user opts into a **featured portfolio** by selecting `Add to portfolio`; the choice is reversible. No unfinished draft is published by default. Export remains accessible locally. The current demo does not provide a server-hosted public portfolio.

## Launch constraints

No fabricated paid checkout, fake six-week completion, employment guarantee, AI job-fit diagnosis or unverified external accreditation. A real pilot inquiry form and full AI tutoring need separate implementation and validation.
