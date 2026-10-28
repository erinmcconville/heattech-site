# Site layout: design

Oct 28, 2026 · agreed with Erin through phone mockups in session. Decisions are logged in `decisions.md` (rows dated 2026-10-28). This replaces the page structure in `docs/build-plan.md` and builds on `docs/visitor-questions.md`.

## Intent

The current site reads as text-heavy, cluttered and generic. The aim is a site where, in the first few seconds, a visitor knows it's **relevant** (my job, my area), **legit** (registered, a real company) and **good** (real people rate it), shown through visuals and proof rather than claims. After that, it makes the service concrete with real, quick facts and examples that answer the visitor's unknowns, so they enquire with confidence.

The look is modest, clean and tidy, and reviews and visuals do the talking. Nothing is said twice; expertise can come through in a photo or in the questions the enquiry form asks.

This layout is also the first worked example for Erin's reusable small-business site skill, to be written once this site is done.

## Goals

1. Every section answers one question from `docs/visitor-questions.md`, and no question is answered twice.
2. Clear on a phone at a glance: short headings, one line under each item, one main action per section.
3. Findable: one page per service so each matches its own searches (research/06), and the business name always paired with the trade and place.
4. Easy to keep current without looking dated: job examples and reviews can be added at any time, and nothing carries a date.

## Non-goals

- No blog, news or "recent" feed.
- No prices (Ryan's call later), and no FAQ block.
- No reply-time promises, or anything implying an immediate answer to an enquiry.

## Anti-goals (would be a failure even if it works)

- Clutter: a link on every line, several layers per section, boxes on everything.
- Unclear labels: "Plumbing", overlapping categories, questions used as headings.
- Copy that claims or reassures instead of showing proof.
- Unfinished-looking pages at launch (yellow placeholders; photo slots are allowed but kept few).

## Constraints

- All CLAUDE.md guardrails, banned phrases and wording rules.
- All `decisions.md` rows, including from 28 Oct: based in Edinburgh (no Portobello in copy); Brett Duncan; no "recent" labels; no copy implying an immediate reply; reviews that mention coming quickly are wanted.
- Reviews with `complete: false` never render. Review excerpts are exact words, with "…" marking cuts.
- Official facts link to their source with a "Last checked" date, in a small line at the end of the section.
- No identifiable customer details, and no identifiable children in football photos without the club's permission.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| A | Tidy the existing pages one at a time | Quick, but keeps the patchwork structure that caused the clutter |
| **B (chosen)** | Rebuild the structure from the visitor-questions list, with one template per page type | More work up front; every page is consistent and each section has a reason to exist |

Erin chose B ("the entire site layout needs a review").

## Design rules (apply to every page)

These rules also go into the reusable skill.

1. **One question per section, answered once.** Check each new section against `docs/visitor-questions.md`.
2. **Sort by the visitor's need, not who they are.** Never two entries for the same need under different names.
3. **Name things with nouns.** Headings and labels are short nouns ("What we do", "Boiler repairs"), never questions.
4. **One line under each item,** in the customer's words, saying what's behind it.
5. **Buttons say exactly what happens:** "Send enquiry", "Call 07506 042175", "Read all 74 reviews", "Ask about a new boiler".
6. **One main button per section.** Lists use rows with a chevron, not a link on every line.
7. **Credentials as plain facts:** "5.0 from 74 Google reviews", "Gas Safe registered".
8. **Proof before copy.** A photo, a review or a fact beats a sentence. Copy never reassures.
9. **Sources sit in one small line at the end** of the section that uses them, with the "Last checked" date.
10. **Nothing dated:** no "recent", no job dates, no forecasts.
11. **Form labels are the shortest clear wording,** with one field per question.

## Visual direction

Keep the existing brand: charcoal header and footer, copper for main buttons and small accents, Montserrat for headings, the existing body font, and the warm off-white background. Changes:

- Fewer boxes: list rows inside one bordered panel, not a card per item.
- Generous spacing between sections. Section headings around 18px on phones.
- The homepage hero is a full-width photo with the heading over it.
- Photo slots stay grey boxes naming the shot until real photos arrive, kept to as few per page as the template allows.

## Site map

| Page | URL | Template |
|---|---|---|
| Home | `/` | Home |
| Boiler repairs | `/boiler-repairs/` | Service |
| New boilers | `/new-boilers/` | Service |
| Heating upgrades | `/heating-upgrades/` | Service |
| Servicing and certificates | `/servicing-and-certificates/` | Service |
| Leaks, taps and drains | `/leaks-taps-and-drains/` | Service |
| Examples of our work | `/work/` | Work list |
| One page per job | `/work/<slug>/` | Job |
| Reviews | `/reviews/` | Reviews |
| About | `/about/` | About |
| Contact | `/contact/` | Contact |
| Privacy, enquiry sent | `/privacy/`, `/contact/thanks/` | Unchanged except wording rules |

The old `/services/`, `/electric-to-gas/` and `/landlords/` URLs aren't linked anywhere yet (nothing is live), so no redirects are needed.

**Menu (phone):** Call button and a menu icon in the header. The menu lists the five services, Examples of our work, Reviews, About and Contact.

## Shared parts

- **Header:** logo, "Call" button, menu.
- **Footer:** "Smell gas? Call 0800 111 999" (the national gas emergency line); Heattech Gas Services Ltd; Gas Safe 661231 (linked to the register); company SC690576; registered address; links to Privacy.
- **Enquiry form** (homepage and Contact): Job (dropdown of the service rows plus "Not sure"), House or flat and floor (dropdown), Postcode, Boiler make and age (optional), Name, Phone, Send enquiry. Contact adds "What's happening" (optional) and photos (optional). Below the button: what happens next, in Ryan's words (`[CONFIRM]`). Choosing a gas smell shows the gas emergency warning (existing behaviour). Email stays an option if the current form needs it for replies (builder checks the Netlify setup).
- **Mobile bottom bar:** Enquire and Call, shown after scrolling past the hero (existing behaviour).

## Page templates

### Home

Top to bottom. The question each section answers is in brackets (numbers from `docs/visitor-questions.md`).

1. **Hero** (Q5, Q2): full-width photo of the van on an Edinburgh street; H1 "Gas, heating and plumbing in Edinburgh"; line "Heattech Gas Services · Edinburgh and the Lothians"; buttons "Send an enquiry" and "Call 07506 042175".
2. **Proof strip** (Q3, Q2): Google "G" with "5.0 from 74 Google reviews"; Gas Safe logo with "Gas Safe registered".
3. **What we do** (Q5): one panel of five rows, each with an icon, a name, one line and a chevron, linking to its service page:
   - Boiler repairs: No heating, no hot water, fault codes
   - New boilers: Replacing an old or broken boiler
   - Heating upgrades: Electric to gas, smart controls, radiators
   - Servicing and certificates: Annual service, landlord and pre-sale checks
   - Leaks, taps and drains: Smaller plumbing jobs
4. **Examples of our work** (Q7, Q9, Q12): horizontally scrolling cards (photo, title, place and one detail, "See the job"). At launch: Stockbridge. Hidden entirely if no job is published.
5. **What customers say** (Q1, Q6, Q8, Q13): three review excerpts, chosen to cover coming quickly, reliability and tidiness. Starting set: Mayur ("…got the boiler up and running within 5 hours of me calling him."), Stephen, Steve. "Read all 74 reviews".
6. **Send an enquiry** (Q10, Q9, Q12): the form.
7. **Footer.**

### Service page (all five)

1. Small "Services" label, H1 "<Service> in Edinburgh", one line, button "Ask about <service>" (opens the form with the job chosen).
2. One photo.
3. **What's included:** up to four short items with ticks.
4. **What can change the price:** up to three items, each a bold noun and one plain sentence.
5. **What customers say:** two review excerpts about this service.
6. **Example of our work:** one job card, hidden if none is published.
7. The button again.

A block with no content for that service is left out, never filled with filler. The page title and description pair the service with Edinburgh.

**Content for each page:**

| Page | Included | Price factors | Reviews (starting set) | Example | Notes |
|---|---|---|---|---|---|
| Boiler repairs | — | — | Lena B, Dawid | — | Gas smell line shows the emergency number, as now |
| New boilers | System flush, magnetic filter, smart controls, manufacturer's warranty (`[CONFIRM]`) | Gas pipe too small; drain (condensate) pipe needs changing (`[CONFIRM]`) | Matt, Stewart (Kate once her full text is in) | Tenement boiler, when Ryan supplies it | No warranty lengths |
| Heating upgrades | — | What decides it: gas supply, flue position, pipe routes, boiler position, each one line; sources line (SGN, City of Edinburgh Council, Home Energy Scotland, Warmer Homes Scotland, last checked 27 October 2026) | Stephen (full install in a flat), Kyrsta | Stockbridge | Absorbs the Electric to gas page. No savings claims. |
| Servicing and certificates | Annual service; landlord gas safety certificate; check before selling; several properties | — | R, Gregor | — | Landlord content lives here unless Erin decides on a separate page (open). Servicing-and-warranty line `[CONFIRM]`. HSE link in the sources line. |
| Leaks, taps and drains | — | — | Jenna, Stephanie | — | Exact job list `[CONFIRM]` |

### Examples of our work

- **List page:** H1 "Examples of our work"; one card per published job (photo, title, place and one detail). No dates, no counts.
- **Job page:** title with the job and place; three tags; three photos (one large, two small); "Before", "The challenge", "What we did" (one or two sentences each, past tense); one customer quote (an exact excerpt with "…" for cuts); a link to the related service; button "Ask about a job like this". Only shown when `published` and `permission_recorded` are both true (existing rule).
- **At launch:** Stockbridge. Ryan is asked for two more: the short-let gas leak (Anya) and a tenement boiler replacement.

### Reviews

H1 "Reviews"; the Google rating line; every complete review, word for word, first name and "on Google"; one link to the Google profile.

### About

1. H1 "About us"; the entity sentence, updated: "Heattech Gas Services Ltd is a Gas Safe registered gas, heating and plumbing company based in Edinburgh, covering Edinburgh and the Lothians."
2. Photo of Ryan and Brett.
3. **Ryan Duncan** and **Brett Duncan**: one or two lines each in Ryan's words (`[PLACEHOLDER]`). No relationship stated.
4. **Facts table:** Gas Safe 661231 with "Check →"; Company number SC690576; Insurance (`[PLACEHOLDER]`); Based in Edinburgh.
5. **Football section:** a small heading, two or three photos and one line about sponsoring a local youth football group. Photos only with the club's permission, and no identifiable children without it.
6. Links: Google · Facebook · MyBuilder.

### Contact

1. H1 "Contact".
2. Phone and email as two large tap targets, with no line under the phone number.
3. The full enquiry form.
4. What happens next (`[CONFIRM]`); "Edinburgh and the Lothians".
5. Warning band: "Smell gas? Don't send a form. Call 0800 111 999."

## Reuse from the research-led-content branch

That branch isn't merged. The rebuild should start from it and keep:

- The launch check, `trading_name` setting, tests and test helpers.
- `WorkedExample` logic (published + permission), reshaped into the job template.
- The `includes` / price-factor data in `services.yaml`, the tidied Stockbridge entry, and the electric-to-gas facts and sources.
- The Landlords page content, folded into Servicing and certificates.

Retire: the single `/services/` page, `/electric-to-gas/`, `/landlords/` and their tests, replaced by tests for the new pages.

`site.yaml`: `based_in` becomes Edinburgh; add Brett's surname.

## Left to the builder

- Exact spacing, icon choices (from the existing icon set) and how the menu opens.
- How service pages are generated (one template from `services.yaml` is expected).
- Which three reviews per section, within the starting sets above, if a better exact excerpt exists.
- Tests: each page has its H1 and title; no `complete: false` review renders; no unpublished job renders; every "Ask about" link matches a form job; no "Portobello", "recent" or "urgent" in built page text outside customers' own words (Gregor's review says "recently", and quotes stay word for word).

## Open (Erin)

- Landlords: a separate page, or a section of Servicing and certificates (default: section).
- Football photos and the club's permission.

## Open (Ryan, via his report)

Everything already in the report, plus: Brett's role, the reply-time wording, the service rows' exact scope (especially leaks, taps and drains), and photos, with the van on an Edinburgh street first.
