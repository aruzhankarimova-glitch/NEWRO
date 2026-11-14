# NEWRO — Business Cup 2.0 hackathon audit and demo runbook

**Release reviewed:** 15 November 2026 · **Track: SKILLS** · **Product type: functional browser-based prototype**.

## 1. Ground truth: the hackathon brief

Source: [Business Cup 2.0 — From Zero to Product, Canva](https://www.canva.com/design/DAHa0haVbpw/6GF64XaZTkomHXIUkrxSjw/watch).
Its seven-page presentation identifies three possible territories of pain: MONEY, ENTERTAINMENT and **SKILLS**. The key instruction is **"Narrow it down to one user and one pain"**; the track itself is not a product. The flow is: select a case, build a working product in **24 hours** on **14–15 November at Nazarbayev University**, submit **deck + product link + repository**, then give a **5-minute pitch and 2-minute Q&A**. The top ten finalists compete for the stated ₸5,000,000 prize. The accessible brief **does not specify a numeric judging rubric**. Do not invent one.

## 2. One user, one problem, one promise

- **Track:** SKILLS.
- **Hypothesis persona, not yet validated:** English-speaking adult considering a career change; current example is AI Marketing Specialist. No demographic, conversion or willingness-to-pay claim is proven.
- **Pain:** Before committing to lengthy or costly learning, people cannot easily experience the decisions a role involves.
- **Promise:** "Try the job before you retrain."
- **Entry point:** Free short practice assignment with a fictional client brief.
- **Proof of experience inside the demo:** user chooses a signal/audience/message/metric and receives a transparent **rules-based** exercise review and a downloadable work sample.
- **Continuation:** optional local profile → next guided exercise → saved work sample portfolio.
- **Secondary path:** Product Manager. Do not pitch two unrelated products; present it as proof that the same engine can host a different role.

### What is NOT proven
The product does not currently establish whether a career is suitable for someone, replace a human mentor, test professional aptitude, deliver AI-generated individualized grading, or validate demand for a paid subscription. Treat those as future hypotheses.

## 3. UX audit (observed against current GitHub implementation and browser screenshots)

| Severity | Area | Finding / risk | Action / status |
|---|---|---|---|
| P0 | Positioning | "Find your next big thing" did not name a pain or outcome. | **Changed:** explicit try-before-retrain value proposition, one flagship simulation. |
| P0 | Trust | AI-mentor language could imply live model inference; all evaluations are deterministic. | **Changed:** label rule-based feedback prominently. **Open:** real secure model integration. |
| P0 | Delivery | Judges require working product URL and repository, not just a deck. | **In place:** GitHub Pages deployment and CI browser tests; verify live status just before pitch. |
| P0 | Demo continuity | At end of simulation user needs a clear next step and access to their artifact. | **In place:** free try-out → local onboarding → dashboard → guided project → portfolio/export. |
| P1 | Cursor animation | A busy swarm that lingers around the primary CTA hides the product. | **Changed:** parallel cursors descend offscreen and disappear; Replay, Skip, reduced motion remain. |
| P1 | Mobile interaction | Buttons had visual states but no haptic/native sharing enhancement. | **Changed:** optional short vibration where available; user setting, native Share and install prompt with fallbacks. |
| P1 | Visual slop | Fake percent in preview, generic slogans, decorative stars/orbits, excessive gradients, unnecessary motion. | **Changed:** content-led copy, example not fake progress, fewer decorative elements, restrained styles, short one-shot success animation. |
| P1 | State safety | Exiting a lesson should preserve unfinished progress without an unrelated visual interstitial. | **Changed:** exit returns to the homepage with resume action. |
| P1 | Data durability | Work is only stored in browser localStorage. It can disappear if browser data is cleared. | **Mitigated:** explicit copy, TXT/JSON export and disclaimer. **Open:** user accounts and cloud storage. |
| P1 | Learner feedback | Minimum-character checks and keyword heuristics are not a fair or reliable rubric. | **Open:** human review and validated assessment rubric; never claim career-fit score. |
| P1 | Pricing | No checkout, payment or price experiment has been implemented. | **Open:** do not show an invented price, customer count, revenue or retention metric. |
| P2 | Motion files | Looping GIF decoration can hurt accessibility, loading and clarity. | **Decision:** no stock GIFs; a short, original CSS success animation serves the progress confirmation. |
| P2 | Accessibility | Need real-device testing for iOS Safari, Android Chrome, keyboard/VoiceOver/TalkBack and focus. | **Open:** manual physical-device audit; automated smoke tests alone are not sufficient. |
| P2 | Internationalization | Product is English-only and the sample brief uses hypothetical US-facing career content. | **Accept for prototype**, document target as a hypothesis and validate with users. |

## 4. Functional acceptance criteria

- [ ] Home states the single pain, flagship action, fictional practice scenario and no-payment requirement.
- [ ] Mobile at 360/390px has no horizontal overflow, legible body copy, visible primary CTA, 44px-ish interactive targets.
- [ ] Cursor builders animate in parallel then **exit past the lower edge**; Replay/Skip work.
- [ ] Animation does not run under \`prefers-reduced-motion: reduce\`; no invisible content after Skip.
- [ ] Tap, choice and completion feedback use \`navigator.vibrate\` only when supported and user-enabled. No automatic haptics.
- [ ] Unsupported iOS browsers show a truthful "Unavailable" haptic state and continue to function.
- [ ] Native Share works when exposed; otherwise copy or download remains usable.
- [ ] Both try-out paths can reach an exportable work sample.
- [ ] Guided project auto-saves answers and validates steps without pretending to score skill.
- [ ] Portfolio and preferences persist after reload on the same browser.
- [ ] No runtime exceptions in browsers exercised by CI.
- [ ] GitHub Pages workflow **success** on the current main commit.
- [ ] Final presentation, link and repository are all ready for submission.

Use CI to verify the automatable items, and complete the human-only checks on actual demo devices before the event.

## 5. 5-minute pitch/demo script

**0:00–0:40 — Pain.** State the one career-changing user's problem: courses are a costly way to discover that you dislike the work. Do not assert unverified market statistics. Position NEWRO as a fast work sample, not a psychometric test.

**0:40–1:15 — Solution.** Show the homepage with its single flagship action. Explain that the task is a fictional simulation based on authentic job decisions and constraints.

**1:15–3:10 — Live product.** Start the AI Marketing Specialist exercise. Briefly show customer evidence → audience selection → credible claim → sample AI draft editing → campaign metric. Choose a real option on-screen; point to rules-based feedback and progress.

**3:10–3:55 — Output.** Show the work sample and the transition to the dashboard/project. Demonstrate a real saved entry and a TXT download. If a full ten-minute run is too long on stage, show a pre-existing **clearly labeled example session on a separate demo device/browser**, never represent it as a real customer's result.

**3:55–4:35 — Differentiation.** Contrast a role preview grounded in decisions with passive watching, quizzes or certificates. Product Manager is a second example of the same pattern, not a different pitch.

**4:35–5:00 — Next experiment.** State the unproven hypothesis: after one free role trial, will users return for a linked project and pay for higher-quality feedback? Describe planned tests, not results that do not exist.

### 2-minute Q&A — short, factual answers

- **How is this different from courses?** The entry point is a simulated task and a saved work sample before committing to a course. Differentiation needs customer validation.
- **Does it really use AI?** The demo includes writing an AI brief and editing prepared output. The current mentor feedback is rules-based, not a live LLM. Future live reviews require backend security and evaluation.
- **Can it tell me what profession to pick?** No. One assignment informs exploration; it is not a valid career-fit diagnosis.
- **How do you make money?** B2C subscription is a hypothesis. No paying customers or revenue are demonstrated by this prototype.
- **Where is user data?** Stored locally in that browser, with TXT/JSON export and a reset action. No cloud accounts.
- **What will you measure first?** Start-to-completion rate, work-sample export/return rate, qualitative task usefulness, willingness to continue or pay. Baselines are not yet collected.

## 6. Judge-device preflight

1. Open https://aruzhankarimova-glitch.github.io/NEWRO/ in a fresh window and a backup browser.
2. Verify the latest commit's Pages workflow is successful and that all illustrations load.
3. Run the flagship task on the primary demo device; prepare a separate backup with **sample** (not fabricated real-user) progress.
4. Test external screen, phone orientation, local audio/Do Not Disturb, Wi-Fi connection, browser zoom and network recovery.
5. On Android, confirm haptic toggle and button feedback if hardware/browser supports it. On iOS Safari, do **not** promise vibration.
6. Check the 5-minute pitch against a stopwatch and rehearse the 2-minute Q&A.
7. Keep the GitHub URL, GitHub Pages URL and deck link in one short submission note, and make sure you can open all three.

## 7. Competitive reality (checked against official product pages, 15 Nov 2026)

- **[Forage](https://www.theforage.com/):** Free employer-designed job simulations with practical assignments, model answers and certificates. Its catalog also contains **[under-15-minute Shorts](https://www.theforage.com/simulations)**. Therefore neither "free job simulation" nor "short job preview" is a unique invention of NEWRO.
- **[Coursiv](https://support.coursiv.io/en/support/solutions/articles/73000619521-what-is-coursiv-):** AI-skills guides, daily challenges, progress tracking, practice and AI tools. An attractive mobile UI and daily exercises are not enough to establish differentiation.
- **Proposed NEWRO edge — a hypothesis to test:** a career sampler leads immediately to **several linked role-specific projects**, with reasoning review and reusable portfolio artifacts. The present prototype demonstrates the navigation and project-artifact path, but not high-quality LLM review or proven paid retention.
- **Pitch phrasing:** "We're testing whether a work-first, connected learning journey makes career decisions easier," not "We're the first to let people try a job."
- **Validation:** compare NEWRO with a comparable Forage or Coursiv experience in moderated user sessions. Ask whether the output, feedback and next step are genuinely more useful.

## 8. Follow-up roadmap after the hackathon

**P0 research:** five or more observed usability sessions with potential career changers; measure where people drop out and whether the task genuinely helps decision-making. Avoid treating any arbitrary sample size as validation.

**P0 product:** rigorous competency rubric, real mentorship safeguards, secure server-side LLM calls, user consent and privacy policies.

**P1 platform:** authentication, cross-device saved projects, permissions, course-authoring framework, real project evaluation, export formats.

**P1 business:** test willingness to pay for a deeper linked three-project sequence and explain unit economics. No invented conversion, pricing or retention figures.

**P2 polish:** localization, motion tuning on older phones, controlled A/B copy tests when there are enough users.

## Source and scope notes

This audit uses the user's linked seven-page Canva event presentation, the NEWRO repository sources and browser QA screenshots. The Canva document provides the track and event format; it does **not** establish NEWRO market demand, pricing or grading criteria. Visual-review judgments and priorities in this document are design assessments, not statements from the event organizer.
