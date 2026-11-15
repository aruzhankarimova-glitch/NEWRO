# NEWRO — First 10-minute career simulation

**UX specification · proposed design, not implemented**  
**Case:** AI Marketing Specialist / `SIM-MKT-01`  
**Language:** Russian design rationale; all end-user interface copy in English.  
**Sources:** supplied NEWRO-mvp.zip (`PRODUCT.md`, `DESIGN.md`, `README.md`, screens and simulation logic) and the 22 mobile lesson screenshots supplied as a reference.  
**Important:** Existing NEWRO MVP is a different **Product Manager / Friday Release** case for the fictional brand Harbor. The following is an additional proposed marketing simulation, not a description of already implemented NEWRO functionality. The relationship between NEWRO and the broader B2C career-training concept remains a product hypothesis in the existing `PRODUCT.md`.

## 1. The product job

**Visitor intent:** “I may want a marketing career, but I don't know what the day-to-day work feels like. Don't sell me a long course before I try it.”

**Promise of the free try-out:** In roughly 10 minutes, make a few real marketing decisions for a fictional subscription-reminder app, work with an AI assistant without letting it decide everything, and leave with a concrete one-page campaign brief plus a transparent review of the reasoning demonstrated.

**Do not promise:** employment, certification, professional competence, real campaign performance, or a reliable career-suitability score after one session.

**Primary product outcome:** user completes a first assignment and can decide whether they want to continue learning this profession.

**Secondary product outcome:** show the value of a mentor that challenges reasoning, checks claims, and supports iteration, rather than producing generic marketing copy.

**Fictional exercise fixture:** Harbor, an app that displays subscription renewals and helps people notice upcoming charges. All customer quotes, budget figures and scenario details are simulated exercise data, not research findings or existing NEWRO customer metrics.

## 2. Visual and interaction principles

Borrow interaction conventions from supplied mobile references, not their distinctive assets: white canvas, clear title, one task per screen, a compact progress indicator, lavender explanation panels, large answer cards, a full-width green bottom action, immediate explanatory feedback, repeatable tasks, optional audio, and an end-of-lesson accomplishment moment. Avoid copying illustrations, mascots, wording, branding and specific iconography.

Honor the existing MVP `DESIGN.md` unless deliberately revised:

- Canvas `#ffffff`; ink `#17171f`; informational panel `#f3f1fe`; selection/progress `#4b3fd8`; primary action `#18803e`.
- Self-hosted Inter, sentence case, restrained animation; 640px maximum player width.
- Fixed/always-visible header: close with saved-progress explanation, 10-step progress, accessibility type-size control. Optional sound control only if speech is actually implemented.
- Sticky bottom primary action; on mobile safe-area padding. Tap targets ≥44px, no horizontal scrolling at 390px.
- One piece of consequential interaction per screen; AI mentor is a small inline coaching panel and never an intrusive chat popup.
- Users can change answers, revisit steps and inspect why feedback was given.

## 3. The 10-minute path

Times are **design targets**, not automatic cutoffs or real-world performance claims. Reading speed varies. No forced timer. Show `About 10 min` before starting and progress by completed stages, not artificial percentage of career competence.

| Time | Screen | User action | Output |
|---|---|---|---|
| 00:00–00:30 | S0 Welcome / role preview | Tap `Try this role` | Free session begins, no signup |
| 00:30–01:15 | S1 First client brief | Read condensed scenario | Understand project and constraints |
| 01:15–02:05 | S2 Read the signals | Pick most relevant customer evidence | Evidence selection |
| 02:05–03:05 | S3 Choose an audience | Select audience, give one reason | Audience hypothesis |
| 03:05–04:10 | S4 Choose a value claim | Pick a defensible claim | Message hypothesis |
| 04:10–05:25 | S5 Direct the AI | Choose target, tone and constraint; optionally edit prompt | Prompt brief |
| 05:25–06:30 | S6 Edit AI output | Compare draft options; improve one | Draft marketing message |
| 06:30–07:35 | S7 Design a test | Choose channel and relevant metric under constraints | Experiment plan |
| 07:35–08:50 | S8 Mentor challenge | Answer a challenge; revise one choice | Reasoned decision |
| 08:50–09:40 | S9 Debrief | Examine evidence-backed rubric | Skill observations, not aptitude diagnosis |
| 09:40–10:00 | S10 Decision card / next step | Save brief; explore continued learning | Shareable artifact + optional next action |

### S0 · Welcome / role preview (00:00–00:30)

**Screen copy:**

- Title: `Could you enjoy working in AI marketing?`
- Body: `Try a real kind of assignment. Make the calls. Use AI as your assistant, not your replacement.`
- Three compact facts: `~10 minutes` · `No account required` · `A sample project to keep`
- Primary: `Try this role`
- Quiet secondary: `What's this like?` reveals a plain explanation of the fictional case, without extra page navigation.

**Design:** no stock-photo hero or animated chatbot; simple image of a fictional brief or artifact only if it clarifies the exercise.

**Flow:** begin anonymous local session; `simulation_started`.

### S1 · First client brief (00:30–01:15)

**Screen copy:**

- Title: `Your first client brief`
- Body: `Harbor helps people see their upcoming subscription renewals. The team wants to test a message that makes people care.`
- Highlighted brief: `Your job: choose who to speak to, what to say, and how to test whether the message works.`
- Constraint chips: `7-day test` · `Illustrative $600 test budget` · `No promises we can't verify`
- Note: `Harbor and all exercise data are fictional.`
- Primary: `Open the customer notes`

**Mentor:** `I'll give you the context. You make the decisions.`

**Logic:** short brief first; optional `More context` accordion; do not require reading long text before participation.

### S2 · Read the signals (01:15–02:05)

Show three compact, explicitly **fictional** customer notes:

1. `I forget when my free trials turn into paid plans.`
2. `I already track my investments in a spreadsheet.`
3. `I want better student discounts on streaming.`

**Task:** `Which signal best matches Harbor's current feature?`

Choose a note. Correct-by-brief answer is #1; alternatives aren't framed as personal failure. After checking: selected-state, feedback, a one-sentence explanation of why an evidence-fit matters.

**Mentor when wrong:** `That audience may be interesting later. What does Harbor actually help them do today?`

**Primary:** `Use this insight` (becomes enabled on selection).

**Track:** `evidence_selected`, source id, whether revised, hint usage.

### S3 · Choose an audience (02:05–03:05)

**Task:** `Who would you target first?`

Three audience cards:

- `People juggling free trials and recurring subscriptions` — closest to the provided notes.
- `Investment hobbyists looking for advanced financial analytics` — plausible people, weak product fit.
- `Students primarily shopping for subscription discounts` — adjacent need, feature not shown.

Below selection, a single optional/short reason field: `Why this group?` with sentence starter `Because their main problem is…`

**Mentor:** if unsupported choice, ask for the connection to the brief. If well supported, avoid empty praise; say `This group has a clear problem Harbor can address. Now turn it into a claim.`

**Rubric:** observable alignment with provided product evidence, not demographic stereotyping or inferred personal attributes.

### S4 · Choose a value claim (03:05–04:10)

**Task:** `Pick a promise you could defend.`

Cards:

A. `Never pay for a subscription again.` — misleading guarantee.

B. `See upcoming subscription renewals before you're charged.` — aligned with fictional product description, contingent on actually delivering the feature.

C. `The world's smartest AI finance platform.` — vague superlative and unsupported AI claim.

**Feedback:** show concise comparison. Do not simply green-check B and move on: explain credible claims versus unjustified guarantees.

**Mentor:** `A good claim doesn't need hype. It needs to be true and useful.`

**Option:** `Rewrite my own` opens short text field; evaluator checks unsupported superlatives/guarantees and offers a human-readable warning, not silent correction.

### S5 · Direct the AI (04:10–05:25)

**Task:** `Brief your AI teammate.`

Three small selectable/filled fields:

- Audience: chosen in S3, editable.
- Tone: `Clear and calm` / `Urgent` / `Playful`.
- Guardrail: selected by default `Do not claim Harbor saves money or guarantees cancellation.`

Show a live, editable prompt preview:

`Write two short campaign headlines for [audience]. The product helps people see upcoming subscription renewals. Be [tone]. Avoid guarantees, unverifiable claims, and generic AI buzzwords. State the benefit plainly.`

**User action:** chooses tone and edits one line, then `Generate two drafts`. If the system uses an actual LLM, label it `AI-generated`; if it uses prewritten variations in the MVP, label it `Sample drafts`, never claim to have called AI.

**Mentor:** `You set the goal and the constraints. AI can offer options; you still judge them.`

**Learning evidence:** explicit prompt constraints and choice of audience, not a generic “used AI” badge.

### S6 · Edit AI output (05:25–06:30)

Two deliberately contrasting candidate headlines (example fixture, not live model output):

- `Take control of your financial future with revolutionary AI!` (generic, vague, unsupported)
- `Know which subscriptions renew next.` (specific, within brief)

**Task:** `Choose one, then make it better.`

Short edit field prefilled with chosen option. Minimum interaction: change at least one word, or explicitly choose `Keep as is` and provide a reason. No gratuitous character-count barrier. Inline rubric helper: `Specific? True to the product? Understandable?`

**Mentor feedback:** quote the exact phrase that needs work (`revolutionary AI`) and explain why; show one suggestion, not an automatic rewrite that steals ownership.

**Primary:** `Use this message`.

### S7 · Design a test (06:30–07:35)

**Task:** `How will you tell if your message works?`

Part 1: pick one channel, each with a trade-off:

- `Email to an existing interested list` — relevant audience, limited reach; only available if the fictional company has such a list (state assumption explicitly).
- `Small paid social experiment` — more reach but budget and targeting uncertainty.
- `Organic social post` — inexpensive but weak control over exposure.

Part 2: pick primary metric:

- `Landing-page signup rate` — closer to intent; requires valid visit and signup tracking.
- `Likes` — engagement but weak evidence of signup intent.
- `Impressions` — visibility but not action.

**Mentor:** `Choose the metric that tells you whether people took the next step — not only whether they saw the post.`

**Scoring:** evaluate coherence among chosen audience, channel, message, measurement and constraints. Accept multiple reasonable plans when a rationale is provided. Do not predict campaign outcomes from fictional inputs.

### S8 · Mentor challenge and revision (07:35–08:50)

Reveal one issue selected by transparent rule precedence:

1. Unsupported promise → `You wrote “[exact phrase]”. Can Harbor prove that?`.
2. Audience mismatch → `Your target is [audience], but the customer note says [signal]. What's the connection?`.
3. Weak metric → `Likes may rise without a signup. What would you measure instead?`.
4. If no substantive issue → `What would you do if people clicked but didn't sign up?`.

**Interaction:** answer with 1–2 sentences OR choose a suggested action (`Revise message`, `Revise metric`, `Explain trade-off`). The feedback stays specific to the user's choice.

**Mentor states:** `thinking` (≤ a few seconds, non-deceptive), `feedback ready`, `couldn't review` (rule-based fallback identified honestly). If LLM output is uncertain, do not invent evidence or a numeric score. Keep original draft and revisions for comparison.

**Primary:** `Update my plan` or `Finish my review`.

### S9 · Debrief (08:50–09:40)

**Title:** `Here's how you approached the work.`

Show 4–5 capability observations from the current session, each with a text label and exact evidence:

- `Customer evidence` — alignment of audience and note.
- `Honest messaging` — whether claims are supported.
- `AI direction` — explicit audience/tone/guardrails in the prompt.
- `Experiment thinking` — relation of goal, channel and metric.
- `Revision` — whether the user examined feedback and made or defended a change.

Use labels `Demonstrated`, `Developing`, `Not observed` rather than `You are 87% suited to marketing` or fake predictive scores. Any 0–2 rubric point is internal and explained if displayed.

**Mentor:** `You made a decision, tested the reasoning, and improved a real artifact. That's part of the job. Ten minutes isn't enough to decide your career — but it's enough to see whether this kind of work interests you.`

User question: `Would you want to do more work like this?` → `Yes` / `Maybe` / `Not for me`. This is **self-reported interest**, separate from performance.

### S10 · Decision card and next step (09:40–10:00)

Provide a reusable one-page **Campaign Decision Card**:

- Client: Harbor (fictional)
- Audience + supporting evidence
- Core message + revision history
- AI prompt constraint(s)
- Channel and metric
- Biggest trade-off and reason
- Mentor feedback + user's decision
- `Practice simulation · Not a professional credential`

Actions:

1. Primary: `Save my work` → copy text/download Markdown; no signup required.
2. Secondary: `Explore the AI Marketing track` → preview curriculum and a clearly labeled subscription/waitlist if actually available; no surprise payment, no invented pricing.
3. Quiet: `Try a different profession` → return to role picker when another simulation exists.

**Paid program teaser:** `Keep building real campaigns with feedback on your work.` Explain what actually unlocks: projects, evaluations, progress, revisions, portfolio artifacts. Only show pricing after it is confirmed.

## 4. Example mentor conversation

User selected a weak claim.

**NEWRO mentor:** `“Never pay again” is a guarantee. Harbor shows renewal dates; it cannot control every charge. What could you promise instead?`

**User:** `See renewals before payment happens.`

**NEWRO mentor:** `Better: this is closer to the described feature. I'd avoid implying that every reminder is delivered perfectly. Want to keep it as a working headline?`

User chooses a channel and vanity metric.

**NEWRO mentor:** `If your goal is to find interested people, impressions alone won't tell you whether they care. Which action would show intent?`

The mentor follows a **challenge → user decision → explanation → optional revision** loop. Never silently overwrites the user's work or floods the screen with generic encouragement.

## 5. Branches, edge cases and accessibility

- **User leaves midway:** Save after each meaningful choice to local storage, show `Continue your try-out` on return. If local storage unavailable, keep memory session and explain that resume may not work.
- **No answer selected:** Keep CTA disabled and show a precise reason next to it. Don't trap the user on an open-ended text field.
- **User chooses a weak answer:** Give evidence, allow continuation or retry; no punitive failure screen or hearts counter.
- **User chooses another defensible path:** AI/rules accept a defensible rationale; no single “correct marketer” personality.
- **Long AI response / timeout:** Show bounded loading and `We couldn't review this right now`; retry, or deterministic feedback labeled as such. Never fake an AI answer.
- **Off-topic or unsafe prompt:** Refocus on the case and avoid generation of deceptive claims or targeted sensitive-attribute advertising.
- **Mobile input:** Focus management, keyboard-safe sticky CTA, no content hidden behind the on-screen keyboard, 44px targets.
- **Accessibility:** AA text contrast; text resize; screen readers hear feedback; fully keyboard-operable card selection; optional audio always has readable text; `prefers-reduced-motion` honored; no color-only right/wrong indicators.
- **Data:** Don't ask for personal career history, salary or sensitive data to do this try-out; don't send entered responses to a third-party model without notice and appropriate consent; do not store secrets in frontend source.

## 6. Mentor implementation and evaluation model

**Recommendation for MVP:** deterministic assessment for structured selections; optional constrained LLM review for open-ended rationale. Do not treat the LLM as the only grader and do not assert it is running if it is not.

Evaluation rubric, each dimension scored 0 (not observed/unsupported), 1 (partially supported), 2 (well supported):

1. `evidence_alignment`
2. `claim_integrity`
3. `prompt_direction`
4. `experiment_logic`
5. `revision_reasoning`

The rubric is a **case performance measure**, never a career fit prediction. If displayed, show the evidence behind each judgment. Avoid using a single composite number in the primary UI.

Example structured return contract for an AI review:

```json
{
  "criterion": "claim_integrity",
  "level": "developing",
  "evidence_quote": "Never pay for a subscription again",
  "reason": "The claim guarantees an outcome the product description doesn't support.",
  "question": "What can Harbor truthfully promise?",
  "suggested_action": "revise_message",
  "confidence": "high"
}
```

Before rendering, validate enum values, length, evidence quote against the submitted work, and source-groundedness. On validation error, use deterministic feedback. Treat user text as data, not higher-priority instructions for the reviewer.

## 7. Tracking and learning progress

Suggested events and properties (all are design proposals, not currently verified in production):

| Event | Properties | Question answered |
|---|---|---|
| `simulation_viewed` | `role_id`, `source` | Did visitors reach the try-out? |
| `simulation_started` | `role_id`, `session_id` | Did they decide to try? |
| `step_completed` | `step_id`, `elapsed_ms`, `retries`, `hint_used` | Where is friction? |
| `mentor_feedback_viewed` | `criterion`, `feedback_mode` | Does feedback get seen? |
| `revision_submitted` | `criterion`, `changed_field` | Do people improve after feedback? |
| `simulation_completed` | `total_elapsed_ms`, `artifact_created` | Do they reach a useful outcome? |
| `artifact_saved` | `format` | Is the result valuable enough to keep? |
| `career_interest_answered` | `interest` | Do they want more of this work? |
| `track_preview_opened` | `role_id` | Do completers explore the program? |

**Primary pilot metric:** `simulation_completed / simulation_started`, coupled with median completion time and artifact-save rate. Evaluate reported interest separately; don't infer it from scoring. Track opt-in and privacy requirements before shipping behavioral telemetry.

**Full-course progress model after signup:** three independent measures: lessons completed; competencies demonstrated from graded evidence; projects accepted. A try-out completion contributes a visible `Explored this role` activity, not a professional skill certification.

## 8. Technical handoff into the existing NEWRO MVP

Current supplied repository uses **React 19 + Vite + TypeScript + Tailwind 4**, a local-storage-based `store.ts`, deterministic rules in `sim.ts`, JSON-driven case copy and the sequence `Landing → Brief → Build → Debrief → Lesson → Exercise → Rationale → Card`. It already includes `Shell` with close/progress/type-scale and fixed CTA, plus downloadable decision card. Preserve this baseline rather than claiming it is an AI-backed mentor.

Suggested implementation approach:

1. Keep existing `SIM-PM-01` / Friday Release working and undisturbed; add a second scenario fixture `src/content/marketing-harbor.json` with its own version and `fictional: true`.
2. Introduce a role-agnostic step definition with `screen`, `data`, `validation`, `feedback`, `next` fields. Preserve older routes until migrated.
3. Reuse `Shell`, button/card tokens, save/resume storage and decision-card export. Build new screens: `CustomerSignal`, `AudienceChoice`, `ClaimChoice`, `AIBrief`, `DraftReview`, `ExperimentChoice`, `MentorChallenge`.
4. Add deterministic score functions and test fixtures for all option combinations; do not silently reject defensible alternatives.
5. Gate live LLM review behind an explicit server-side API and feature flag. Store keys only server-side. If not configured, surface `Guided feedback`, not `AI mentor reviewed your work`.
6. Implement event schema and privacy/consent before remote analytics; retain local-only demo counts if needed.
7. Test mobile viewport 390px plus 768/1280/1440, keyboard, saved resume, invalid/timeout feedback, error/empty/disabled/success states and screenshot review.
8. Do not commit or push without explicit instruction. Any visual redesign should follow existing `DESIGN.md` decision-control process.

## 9. Acceptance tests

- A new user can reach their first meaningful choice within 90 seconds, without creating an account.
- A user can finish on mobile and export a card even when no LLM is configured.
- A user can change an earlier answer and all downstream feedback and card content update consistently.
- One intentionally misleading claim and one irrelevant metric receive concrete, source-grounded feedback.
- A reasonable alternative plan with a defensible rationale is not incorrectly flagged as simply “wrong.”
- No screen falsely presents rule-based feedback as live AI output.
- No forced 10-minute timer, no surprise paywall, no unsupported employment/career-fit claims.
- All text and controls work with keyboard and screen reader; no overflow at 390px, no motion required to understand state.
- No invented live user statistics, brand proof, real customer quotes or subscription prices are surfaced.

## 10. Decisions still requiring product ownership

- Confirm NEWRO's scope and whether marketing is indeed the first profession; the existing case is Product Manager.
- Confirm onboarding target: landing → free try-out versus a profession picker.
- Confirm first free use: anonymous/no account and whether storing the card requires signup.
- Confirm first live AI capability and acceptable running cost (AI copy generation, review only, or neither for MVP).
- Confirm subscription contents and real pricing before displaying a plan.
- Confirm final brand direction; this spec borrows the supplied white/lavender/green interaction language without defining a new brand identity.

---

**Summary:** The free try-out is one workday-like decision chain, not a quiz disguised as a career test. The learner reads evidence, makes a marketing decision, directs AI, audits its answer, designs a test, defends a choice, and exports a useful artifact. The mentor challenges evidence and judgment instead of replacing them.