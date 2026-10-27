# CLAUDE.md — Heattech Gas Services website

## Project
A small website for Heattech Gas Services Ltd, a Gas Safe gas and heating business in Edinburgh (Ryan Duncan). The owner's goals: simple and cheap to run, editable by the owner, findable in local search and AI answer engines, and turning visitors into enquiries.

## How to use the research
- `research/` holds **evidence only**: facts, sources, caveats and unknowns. It contains no requirements.
- **Don't infer design, page structure, copy, tone or priorities from the research.** All build decisions come from me during the session.
- Read a research file when a task needs its facts. Don't summarise research into the site unless I ask.
- Labels in research files: **OBSERVED** = what a source says. **CAVEAT** = a limit on that evidence. **ASSUMPTION** = not verified. **OUT OF DATE** = may no longer be true.

| File | Contents |
|---|---|
| `research/01-plumber.md` | Business facts, credentials, online presence, team, job types, unknowns |
| `research/02-customer-reviews.md` | About 80 Edinburgh heating reviews: themes, complaints, verbatim phrases, Edinburgh rules |
| `research/02b-empathy-maps.md` | Customer evidence grouped by property type, evidenced questions, unverified regulatory areas |
| `research/02c-owner-case-study.md` | The site owner's own customer experience with Ryan (one account) |
| `research/03-search-landscape.md` | Competitors, search queries, official funding/law/flue/gas-supply facts |
| `research/04-facebook-posts.md` | Ryan's Facebook job posts 2022–2025, and technical term definitions |

## Decisions
- `decisions.md` records decisions I've made. It overrides anything in `research/`.
- When I confirm a decision in a session, add it to `decisions.md` with the date. Don't add decisions I haven't stated.
- If a task needs a decision that isn't in `decisions.md`, ask me. Don't fill the gap from the research.

## Guardrails (always apply)
1. **Never present other firms' reviews or customers' words as Ryan's.** Verbatim phrases in `research/02-customer-reviews.md` are about other businesses.
2. **No unconfirmed commitments.** Prices, warranty lengths, reply or arrival times, offers, guarantees and service promises appear only if confirmed in `decisions.md`. Otherwise use a visible placeholder: `[CONFIRM: what's needed]`.
3. **Never publish figures marked OUT OF DATE** (for example the 2013–2019 forum prices).
4. **Funding, legal and regulatory statements** must cite their official source and show a "last checked" date.
5. **Never name or criticise other businesses or boiler brands** in site copy.
6. **Don't state anything marked ASSUMPTION or unconfirmed as fact.** This includes the Gas Safe number's type, brand approvals, insurance, Brett's role and ServiceM8.
7. **No identifiable customer details:** no names, addresses or photos that show house numbers or people, unless `decisions.md` says permission exists.

## Banned phrases
"no job too small", "peace of mind", "look no further", "your trusted local", "passionate about", "second to none", "we pride ourselves", "hassle-free", "one-stop shop", "you can count on us", "we'll keep you updated", "your satisfaction", "we go the extra mile", "don't hesitate to", and any heating pun.

Wording rules (carried over from the previous CLAUDE.md):
- Written as the company: Heattech Gas Services, "we". Never first person.
- Ryan is named on the About page and in stories. He is not the voice of the site.
- State how the work is done as plain facts, not promises or reassurances.
  - Right: "Boiler fitted in the hall. No floors lifted."
  - Wrong: "We'll keep you updated every step of the way."
- Let reviews and stories do the persuading. Copy never pleads, over-explains or tries to win the reader over.
- No exclamation marks, no puns, no rhetorical questions.
- Shorter is better. If a line can be cut without losing a fact, cut it.
- Customer quotes in reviews and stories stay in the customer's own words.
