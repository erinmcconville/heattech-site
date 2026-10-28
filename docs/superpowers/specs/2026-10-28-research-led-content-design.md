# Research-led content: design

Oct 28, 2026 · agreed with Erin in session. Decisions are recorded in `decisions.md` (rows dated 2026-10-28).

## Intent

The site works, but it reads as a generic plumber's site. The research shows what is actually different about Heattech, and almost none of it is on the site yet. This change puts it there, without making the site bigger than it needs to be.

What is different, from the evidence:

- **Edinburgh flats.** A real job (Stockbridge, 02c) where a period flat went from electric heating to gas with no floors lifted, a roof flue and the boiler in the hall. "He knows how Edinburgh flats work" is the owner's phrase.
- **Electric to gas** is a real search query (03) with no reliable answer from competitors, and the official facts are already gathered (SGN, City of Edinburgh Council, Home Energy Scotland).
- **What a new boiler includes.** Ryan's own Facebook posts (04) list the same steps on every replacement, and name the two things that can add cost.
- **Landlords and short-let hosts.** A small but clear group in his reviews: a letting agency, two short-let hosts, a guest-reported gas leak, plus the Stockbridge owner.

## Goals

1. Show the Edinburgh-flats strength through one real job, not a claim.
2. Give search and AI answer engines specific, quotable facts: place, property type, what was done.
3. Answer "what will a new boiler cost me and what do I get" without publishing prices.
4. Give landlords and short-let hosts a page that speaks to their situation.
5. Fix the identity problem: one name, used consistently, so searches don't land on Heat Tech Scotland.

## Non-goals

- No new homepage sections. The homepage stays broad (decision 2026-10-28).
- No blog, news, Recent work feed or anything that needs regular posting.
- No prices, no FAQ / Q&A block (decision 2026-10-27).
- "Repair first" is not a theme.

## Anti-goals (would be a failure even if it works)

- Anything that dates: job dates, "recent" labels, savings forecasts, grant amounts, restated regulations.
- Filler: any line that can be cut without losing a fact.
- Copy that claims, reassures or pleads. Proof does the persuading (CLAUDE.md).
- A promise Ryan hasn't confirmed appearing on the live site.

## Constraints

- All CLAUDE.md guardrails, wording rules and banned phrases apply. Written as the company ("we"), no rhetorical questions, so headings are statements.
- Official facts link to their source, with a visible "Last checked" date (guardrail 4). Figures are not restated.
- Reviews marked `complete: false` stay off the site (decision 2026-10-27).
- No identifiable customer details: the Stockbridge job is named by area and property type only.
- Ryan edits only `site.yaml`, reviews and photos; page structure is changed through Claude Code.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| **A (chosen)** | Build now from research and official sources, with `[CONFIRM: …]` where Ryan must confirm. Ryan reviews finished pages once, with a short question list. | Some wording may change after his review. |
| B | Ask Ryan first, build from his answers. | His phrasing from the start, but nothing moves until he replies. |
| C | Small fixes now, new pages later. | Safe, but the most valuable part waits longest. |

Erin chose A, because a finished page gets better answers from Ryan than abstract questions.

**Correction found while designing:** the build plan's step 8 (production build fails while placeholders remain) was never built. Approach A depends on it, so it is part of this work.

## What gets built

### 1. Electric to gas page — `/electric-to-gas/`

The one in-depth page on the site.

- **Title:** "Electric heating to gas central heating in Edinburgh | Heattech Gas Services".
- **H1:** "Electric heating to gas central heating". One plain opening line saying it covers flats with electric or storage heaters.
- **What decides whether it can be done.** Short statements, each linking to its source:
  - Gas supply to the building. SGN checks for free; flats on the second floor or above can need a separate connection quote from SGN. Link only, no £ figure.
  - Where the flue goes. On listed buildings and in conservation areas the Council's guidance applies. Links to the CEC listed-buildings page.
  - How pipes get to the rooms: through the roof space or under floors.
  - Where the boiler goes: a cupboard, the hall, the kitchen.
  - Funding: Home Energy Scotland's standard grant and loan doesn't cover gas boilers; Warmer Homes Scotland may help eligible households. Links only.
  - "Last checked [date]" under the list.
- **Worked example: a Stockbridge period flat.** Undated. Problem (electric heating, an old cylinder, high bills, guest complaints: no £ figures), what others had suggested (lift the floors, boiler on show), what was done (roof flue, pipes down from the roof space, boiler in the hall, smart controls), about three days. One or two of the owner's quotes. Grey photo slots naming the shots. `[CONFIRM]` on the technical description.
- **Action:** "Ask about this" → `/contact/?job=electric-to-gas`.
- **Structured data:** a `Service` linked to the business record.
- **Services page:** the electric-to-gas job line links here; the collapsed explainer block on Services is removed (its content moves here).

### 2. Landlords and short-lets page — `/landlords/`

- **Title:** "Gas safety and heating for landlords and short-lets in Edinburgh | Heattech Gas Services".
- **H1:** "Landlords, letting agents and short-let hosts".
- **What we do for let properties**, as a plain list with "Ask about this" links: landlord gas safety certificate (link to HSE for what the law requires, last-checked date), boiler servicing, repairs and gas emergencies at let properties, smart controls managed remotely between stays, several properties and letting agents. `[CONFIRM]` on anything that is a service promise (e.g. dealing with guests or tenants directly, how certificates are sent).
- **Proof:** Gregor's review (letting agency, complete). Anya's, ailsa's and Atelier Twenty Three's reviews once their full text is pasted in (they are `complete: false` today and stay hidden until then). The Stockbridge owner's "I feel so much more in control with renting out my property", linking to the worked example.
- **Structured data:** a `Service` linked to the business record.
- **Services page:** the "Several properties" job line links here.

### 3. Services page: what a new boiler includes

In the "New boilers and upgrades" section, a short plain list:

- **Every replacement includes:** system flush, magnetic filter, smart heating controls, the manufacturer's warranty (length depends on the boiler; no number stated). Only items seen in Ryan's posts (04); nothing added from general trade knowledge. All `[CONFIRM]`.
- **What can add cost:** a gas pipe too small for the new boiler; a condensate (drain) pipe that needs changing. In Ryan's own words from 21 Aug 2025, `[CONFIRM]`.
- In the servicing section, one line: servicing keeps most manufacturer warranties valid. `[CONFIRM]`.

Content lives in `services.yaml` so it stays alongside the job list.

### 4. Identity

- Every place the business name appears (structured data, logo alt text, page titles, footer) reads from `site.yaml` `trading_name`, so Ryan's spelling choice is one edit.
- Structured data `sameAs` already lists Google, Facebook and MyBuilder; keep it.
- Off-site (in Ryan's question list): the same name, address and phone on Google, Facebook and MyBuilder; manager access to the Google profile; the one-tap review link.

### 5. Launch guard (build plan step 8)

- A production build fails if any page's visible text still contains `[PLACEHOLDER` or `[CONFIRM`. Preview builds still work.
- `[PHOTO` does not block launch: grey photo slots are allowed until real photos arrive (decision 2026-10-27).
- HTML comments and the `/content-check/` page are ignored.

### 6. Smaller pieces

- Sitemap: add the two new pages.
- Both new pages linked from Services and from the footer. Not added to the main menu (keeps the phone header to one row). *Claude's call.*
- Enquiry form: no new fields; the existing `?job=` links cover it.
- Availability notice: already built and off. Turning it on is a `site.yaml` edit; included in Ryan's notes.

### 7. Worked examples: one now, room for more

Stockbridge is the only job written up with permission, so one story would carry the whole site. To avoid that looking thin or forced:

- Each new page has a worked-example slot that **only appears when a story is published** (the existing `published` + `permission_recorded` switches). An empty slot shows nothing: no placeholder and no "coming soon".
- At launch: Stockbridge on Electric to gas. The Landlords page quotes the Stockbridge owner and links to it, and gets its own example once one comes in.
- New stories use the same fields as Stockbridge and stay undated.

**Rule (decision 2026-10-28):** a story is suggested only if the research shows it would help, and the reason can be stated. A job being interesting, or Ryan having done it, is not enough.

**Jobs worth asking Ryan about** (each needs his details and the customer's permission):

| Job | Why the research says it helps | Would go on |
|---|---|---|
| The guest-reported gas leak at a short-let (Anya's review: arrived "within less than an hour") | Speed is the most common thing Edinburgh customers praise (about 40% of reviews, 02), and in an emergency the first firm to reply got the job (02, §3). Guest issues were the short-let owner's main pain (02c). It is the only real job that proves the Landlords page's emergency line. | Landlords |
| A boiler replacement in an Edinburgh tenement or period flat | "boiler install tenement flat Edinburgh" and "boiler installation Edinburgh" are target searches (03). Damage to the home (02, §2) and the cost of pipework changes (04) are the documented worries, and a real job answers both with facts. Competitors that show up for these searches use local job detail (03); that's what they have in common, not a proven ranking factor. | Services, new boiler |

**Considered and left out:**
- Letting agency (Gregor): his review already says what a story would, and it's on the page.
- Commercial premises (Atelier Twenty Three), Airbnbs with boiler problems (ailsa): no target search or documented worry they answer that the two above don't.
- Leith gas-fire check: no search or customer evidence behind it.
- Loft and tank conversion, back boiler, unsafe flue (Facebook): nothing in the research shows customers searching for or worrying about these.
- A second electric-to-gas job: Stockbridge already covers it; a second one adds nothing the research can point to.
- Repair instead of replace: not a theme (decision 2026-10-28).

### 8. Report for Ryan

Replaces the separate question list. A short, plain-English report Erin can send him, made after the build so it describes the real site:

1. **Why the site is laid out this way:** one line per page on who it's for and what it does.
2. **The searches it's built for:** the target searches (03), shown as a list, with which page answers each. No ranking promises; the research hasn't measured rankings or search volume.
3. **What's been done to help it be found:** one name everywhere, business details for Google and AI tools, page titles with job and place, specific facts that AI tools can quote, the sitemap.
4. **What would help, from him:** a checklist where each item says what's needed, why, and the easiest way to give it (a yes/no, a text, a photo, a 5-minute voice note). It covers every `[CONFIRM]` on the site, the name spelling, Google manager access and the review link, photos, and the jobs table above.

Format: a shareable doc Erin can send as a link, readable on a phone. *Claude's call.*

## Left to the builder

- Exact copy wording, within the rules above.
- Page layout, reusing the existing components and styles (`ReviewCard`, job list, photo slots).
- How the launch guard is wired in (an Astro build hook or a script run by `npm run build`), and how it tells a production build from a preview (e.g. Netlify's `CONTEXT`).

## Settled with Erin

1. Stockbridge and Erin's quotes may appear on both new pages (decisions.md, 2026-10-28).
2. The cut-off Google reviews (12, including Anya, ailsa and Atelier Twenty Three) still need their full text from Google. Until then they stay hidden; the Landlords page launches with Gregor's review and the Stockbridge quote, and the others drop in once pasted.
3. Design approved by Erin, 2026-10-28.
