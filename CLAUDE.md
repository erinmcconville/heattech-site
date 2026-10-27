# Heattech Gas Services website

A small static website for Heattech Gas Services Ltd, a Gas Safe heating and plumbing company in Portobello, Edinburgh, run by Ryan Duncan.

The full plan is in `docs/build-plan.md`. The research behind it is in `docs/`:
- `00-customer-research.md`: what Edinburgh customers praise and fear
- `01-plumber.md`: the business facts
- `02b-empathy-maps.md`, `02c-my-case-study.md`, `03-search-landscape.md`

Read `docs/build-plan.md` before any task. Check facts against the research files rather than guessing.

**Where this file and `docs/build-plan.md` disagree, this file wins.** In particular, the plan's first-person voice and promise-style lines (such as "I text when I'm on my way") are out of date. Follow the voice rules below instead.

## Stack
- Astro, static output
- Hosted on Netlify (free tier); the enquiry form uses Netlify Forms
- Content lives in `site.yaml`, `services.yaml`, `reviews.yaml` and `stories/*.md`
- Ryan edits content through Pages CMS

## Voice: quiet, reliable confidence
- Written as the company: Heattech Gas Services, "we". Never first person.
- Ryan is named on the About page and in stories. He is not the voice of the site.
- State how the work is done as plain facts, not promises or reassurances.
  - Right: "Every job gets a written quote before work starts."
  - Wrong: "We'll keep you updated every step of the way."
- Let reviews and stories do the persuading. Copy never pleads, over-explains or tries to win the reader over.
- No exclamation marks, no puns, no rhetorical questions.
- Shorter is better. If a line can be cut without losing a fact, cut it.
- Customer quotes in reviews and stories stay in the customer's own words.

## Banned phrases
"no job too small", "peace of mind", "look no further", "your trusted local", "passionate about", "second to none", "we pride ourselves", "hassle-free", "one-stop shop", "you can count on us", "we'll keep you updated", "your satisfaction", "we go the extra mile", "don't hesitate to", and any heating pun.

## Content rules
1. **Never invent** facts, prices, reviews, quotes, credentials or commitments. If the plan or research doesn't give it, write `[PLACEHOLDER: what's needed]`.
2. Commitments only Ryan can make use a neutral placeholder, for example `[CONFIRM WITH RYAN: how enquiries are handled]`. Don't draft the promise itself.
3. **Nothing that dates.** No prices, grant amounts, reply-time numbers, years or restated regulations. Link to the official source instead.
4. Every claim sits next to its proof: a review, a job detail or a photo.
5. Never use other firms' reviews. Never name or criticise other plumbers.
6. Keep the gas emergency line in the footer: "Smell gas? Call the Gas Emergency number, 0800 111 999."

## Design rules
- Plain and solid. Keep the existing HeatTech logo; the palette comes from it.
- No stock photos, carousels, animations, popups or chat widgets.
- Photo slots are grey boxes labelled with the shot needed.
- Mobile first. Body text 18px or larger. WCAG AA contrast.

## How to work with me
- I'm not a developer. Explain what you're doing in plain English and keep summaries short.
- Work one build step at a time (see "Build order" in the plan). Stop and show me the preview after each step.
- Ask before adding any paid service, new dependency or third-party script.