# decisions.md

Decisions made during the build. This file overrides `research/`. Newest at the bottom.

| Date | Decision | Notes / reason |
|---|---|---|
| 2026-10-27 | Remove "Every job gets a written quote before work starts" everywhere, including as the wording example in CLAUDE.md. | Confusing, and implies the trade is something to be sceptical of. Ryan would cringe at it. |
| 2026-10-27 | Show, don't claim. No direct reassurance lines and no fears stated as questions; trust comes from real reviews, real job details and calm design. | From the UX interview. |
| 2026-10-27 | Wording is plain, concise and modest, with no jargon. Less prose. | Ryan is modest; visitors should get straight answers. |
| 2026-10-27 | Ryan stays in the background; the company name leads. Ryan and Brett appear briefly on the About page and in recent work. | |
| 2026-10-27 | Homepage, top to bottom: heading and two buttons (Enquire, Call with the number) with one quiet line "Gas Safe registered [number] · 74 reviews on Google"; four job tiles (customer phrase plus a small keyword line); reviews; recent work; a one-line close with one button. | Remove "What to expect", "Where we work", the Stockbridge card, "Run by Ryan Duncan" and most small copper labels. |
| 2026-10-27 | Reviews: lots of them. Heading "74 reviews on Google". First six chosen to quietly cover the main doubts, mixed lengths, one mentioning Brett; "Show more" reveals the rest. No stars on each card. No review dates. | The review count is stored in `site.yaml` and updated by hand. |
| 2026-10-27 | First names on Google reviews may be shown, with each review linking to Google. | Reviews are already public on Google under those names. |
| 2026-10-27 | Reviews cut off by Google ("… More") stay off the site until the full text is added. | |
| 2026-10-27 | "Stories" is renamed "Recent work" everywhere, at `/work/`. Cards are short and factual and link to the full write-up. | |
| 2026-10-27 | Erin gives permission to feature her Leith and Stockbridge jobs in Recent work. Ryan's sign-off on the technical details stays a visible placeholder. | Guardrail 7. |
| 2026-10-27 | Services stays one page: customer-phrase headings with a keyword line, no intro paragraph, one review per section, and a visible "Last checked" date on the electric-to-gas links. | Separate electric-to-gas or landlord pages: later. |
| 2026-10-27 | Enquiry form: example text in the description box and a "Not sure" option in the job list. Name, a way to reply and the area stay required. | |
| 2026-10-27 | The phone bar at the bottom stays hidden until the visitor scrolls past the top buttons. | Avoids the buttons appearing twice. |
| 2026-10-27 | About page carries one factual entity sentence: "Heattech Gas Services Ltd is a Gas Safe registered gas, heating and plumbing company based in Portobello, Edinburgh, covering Edinburgh and the Lothians." | For search and answer engines. |
| 2026-10-27 | SEO: page titles combine name, job and place; structured business data (no review-star markup); sitemap; one main heading per page; reviews in the page HTML; photo descriptions name job and place, never a house number. | |
| 2026-10-27 | No Q&A block. Prices: later (Ryan's call). Heattech or HeatTech: still Ryan's call. | |
| 2026-10-27 | Recent work is removed from the whole site: off the homepage and menu, pages switched off. The write-ups stay in `src/content/work/`, unpublished. | Supersedes the earlier "Recent work" rows and the Leith/Stockbridge Recent work permission row. |
| 2026-10-27 | Homepage, top to bottom (supersedes the earlier homepage row): charcoal top section with headline, short line, Send an enquiry and Call buttons, and a real photo; a credibility strip (Google rating and review count, Gas Safe registered, Edinburgh and the Lothians); "How we can help" tiles with small line icons; "What customers say"; a quiet "Get in touch" close with phone, email and one button. | From the approved mockup. |
| 2026-10-27 | On the homepage, reviews may be shortened to their strongest line, with "…" marking cuts. Words are never changed, and each excerpt links to the full review. | |
| 2026-10-27 | Photos must be real (from Ryan or Erin). Until then the photo slot is a grey box naming the shot needed. | |
| 2026-10-27 | Gas Safe Register logo only once Ryan supplies the official artwork; until then a plain "Gas Safe registered" label. | Only registered businesses may use it, under Gas Safe's rules. |
