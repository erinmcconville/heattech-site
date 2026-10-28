# Site layout rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Heattech site to the approved layout: a new homepage, five service pages from one template, Examples of our work with a page per job, and simpler About, Contact and Reviews pages.

**Architecture:** Static Astro. `services.yaml` becomes one record per service page and drives the homepage rows, the service pages (`src/pages/[service].astro` via `getStaticPaths`) and the form's job list. Job pages come from the existing `work` collection. Tests are `node:test` files reading built `dist/` HTML, run by `npm test`.

**Tech Stack:** Astro 7 (static), Node 24, `node:test`. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-28-site-layout-design.md`. Read it, `CLAUDE.md` and `decisions.md` before starting.

**Branch:** continue on `research-led-content` (it holds the launch check, name setting, tests and helpers this plan reuses). Commit the uncommitted research and design files in Task 1.

## Global Constraints

- All CLAUDE.md guardrails, banned phrases and wording rules; the spec's 11 design rules.
- "Based in Edinburgh"; no "Portobello", "recent" or "urgent" in built text outside customers' own words.
- No copy implying an immediate reply to an enquiry. Reviews mentioning speed are allowed.
- Reviews with `complete: false` never render; excerpts are exact words with "…" for cuts (enforced by `getReviews`).
- A job renders only when `published && permission_recorded`.
- Official facts: link plus "Last checked 27 October 2026" in one small line at the end of the section.
- Anything Ryan must confirm is `[CONFIRM: …]` or `[PLACEHOLDER: …]` through `<Text>`; the launch check blocks live builds on them.
- Reuse existing CSS variables, `.button`, `.photo-slot`, `Icon` (add icons as SVG files in `src/icons/` only if needed: `trending-up`, `chevron-right`, `phone`, `menu`, `check`).

## Review Focus

1. **A service with no `includes`, `price_factors` or `example`:** those blocks must not render at all, no empty heading. Test in Task 4 (Boiler repairs has none).
2. **A review id listed for a service is cut off or missing:** it's skipped, and the page still builds. Test in Task 1.
3. **`?job=<service-id>` on Contact:** the dropdown preselects that service; choosing the gas option shows the emergency warning. Test in Task 3 (built HTML) and Task 9 (browser).
4. **The menu on a phone with no JavaScript:** all links still reachable (use `<details>`). Test in Task 2.
5. **A customer quote containing "urgent" or "recently":** the banned-words test must not fail on it. Test in Task 8.

---

### Task 1: Data for the new layout

**Files:**
- Modify: `src/content/services.yaml` (rewrite), `src/content.config.ts` (`services` schema), `src/content/site.yaml`, `src/content/reviews.yaml` (`order`/`excerpt` only), `src/lib/site.ts`
- Create: `tests/data.test.mjs`
- Commit first: `research/05-heattech-reviews.md`, `research/06-search-check.md`, `docs/visitor-questions.md`, `docs/superpowers/specs/2026-10-28-site-layout-design.md`, this plan, `decisions.md`, `CLAUDE.md`

**Interfaces:**
- Produces: `services` entries with id = URL slug (`boiler-repairs`, `new-boilers`, `heating-upgrades`, `servicing-and-certificates`, `leaks-taps-and-drains`) and data:
  `{ order: number, title: string, line: string, icon: string, summary: string, includes?: string[], includes_check?: string, price_title?: string, price_factors?: {label: string, text: string}[], price_check?: string, sources?: {text: string, href: string}[], last_checked?: string, notes?: string[], reviews: string[], example?: string, jobs: {id: string, label: string, emergency?: boolean}[] }`
- Produces in `src/lib/site.ts`: `getReviewsByIds(ids: string[]): Promise<CollectionEntry<'reviews'>[]>` (complete only, order kept, unknown ids skipped); `getLiveWork(id?: string)` (published + permission).

- [ ] **Step 1: Commit the design-session files** listed above: `git add … && git commit -m "Research gaps, visitor questions and the layout design"`.
- [ ] **Step 2: Write the failing tests** in `tests/data.test.mjs` (read the yaml with a small regex/line parser, or build and read `dist/` in later tasks; here assert on source):
  - `five services in order`: ids in the order above.
  - `every service has title, line and two reviews`.
  - `service reviews are complete`: every id in each `reviews:` exists in `reviews.yaml` without `complete: false`.
  - `based in Edinburgh`: `site.yaml` has `based_in: Edinburgh` and `colleague_name: Brett Duncan`.

  (Review Focus 2, a missing review id, is tested on the built page in Task 4.)
- [ ] **Step 3: Run** `node --test tests/data.test.mjs` → FAIL.
- [ ] **Step 4: Rewrite `services.yaml`** with these values (copy exactly; keep `[CONFIRM]` items):

  | id | title | line | icon | summary | reviews | example |
  |---|---|---|---|---|---|---|
  | boiler-repairs | Boiler repairs | No heating, no hot water, fault codes | flame | Finding and fixing boiler faults. | lena-bruning, dawid-granacki | — |
  | new-boilers | New boilers | Replacing an old or broken boiler | tool | Replacing an old or broken boiler. | matt-inglis, stewart-hunter | boiler-replacement-flat |
  | heating-upgrades | Heating upgrades | Electric to gas, smart controls, radiators | trending-up | Electric to gas central heating, smart controls and extra radiators. | stephen-wotherspoon, kyrsta-macdonald-scott | stockbridge-gas-central-heating |
  | servicing-and-certificates | Servicing and certificates | Annual service, landlord and pre-sale checks | clipboard-check | Annual boiler services and gas safety certificates. | r, gregor-fortune | — |
  | leaks-taps-and-drains | Leaks, taps and drains | Smaller plumbing jobs | droplet | Leaks, taps, toilets and blocked drains. | jenna-mccosh, stephanie-kirkham | — |

  - new-boilers: `includes` = System flush; Magnetic filter; Smart controls; The manufacturer's warranty. `includes_check` and `price_check` = the existing `[CONFIRM]` wording. `price_title: What can change the price`; `price_factors`: {The gas pipe, Older pipes can be too small for a new boiler.}, {The drain pipe, It sometimes needs changing to suit the new boiler.}
  - heating-upgrades: `price_title: What decides whether electric to gas can be done`; `price_factors`: {A gas supply, SGN checks for free whether the building has one. Flats on the second floor or above can need a separate connection quote.}, {The flue, Where it can leave the building. Listed buildings and conservation areas have extra rules.}, {Pipe routes, Through the roof space or under the floors.}, {Where the boiler goes, A cupboard, the hall or the kitchen.}; `notes`: [Home Energy Scotland's standard grant and loan doesn't cover gas boilers. Warmer Homes Scotland can help some households with central heating.]; `sources`: the five links from the old Electric to gas page; `last_checked: 27 October 2026`.
  - servicing-and-certificates: `includes` = Annual boiler service; Landlord gas safety certificate; Gas safety check before selling; Several properties and letting agents. `notes`: ["Servicing keeps most manufacturer warranties valid. [CONFIRM: wording]", "[CONFIRM: how certificates are sent, and whether you send reminders when they're due]"]; `sources`: HSE landlord page; `last_checked: 27 October 2026`.
  - leaks-taps-and-drains: `notes`: ["[CONFIRM: which plumbing jobs you take on]"].
  - `jobs` (form options): one per service, `{id: <service id>, label: <title>}`; boiler-repairs also has `{id: gas-smell, label: Smell of gas or carbon monoxide alarm, emergency: true}`.
- [ ] **Step 5: Update the schema** in `content.config.ts` to the shape above (all new fields optional except `order`, `title`, `line`, `icon`, `summary`, `reviews`, `jobs`). `site.yaml`: `based_in: Edinburgh`, `colleague_name: Brett Duncan`, add under `business` a `football: { line: "We sponsor a local youth football group.", photos: ["[PHOTO: club photo, with the club's permission, no identifiable children]", "[PHOTO: club photo]"] }`. `reviews.yaml`: home `order` 1 mayur-lalithraj (excerpt "…got the boiler up and running within 5 hours of me calling him."), 2 stephen-wotherspoon, 3 steve-mcqueen (excerpt "Clean and tidy throughout the whole fitting of my new boiler."); remove other `order` lines. Add `getReviewsByIds` and `getLiveWork` to `src/lib/site.ts`.
- [ ] **Step 6: Run** `npm run build` (must succeed) and `node --test tests/data.test.mjs` → PASS. The old pages that read the removed fields (`services/index.astro`, `landlords`, `electric-to-gas`, `index.astro`) will break the build: delete `src/pages/services/`, `src/pages/electric-to-gas/`, `src/pages/landlords/`, `src/components/WorkedExample.astro` and their tests (`services`, `electric-to-gas`, `landlords`, `worked-example` test files) in this task; stub `src/pages/index.astro` to an H1 only until Task 6.
- [ ] **Step 7: Commit** `git add -A && git commit -m "Reshape content for one page per service"`.

### Task 2: Header, footer and menu

**Files:** Modify `src/components/Header.astro`, `src/components/Footer.astro`. Create `tests/chrome.test.mjs`.

- [ ] **Step 1: Failing tests:**
  - `menu works without JavaScript`: `dist/about/index.html` header contains a `<details` whose content links to all five service URLs, `/work/`, `/reviews/`, `/about/`, `/contact/`.
  - `header call button`: header has `href="tel:+447506042175"`.
  - `footer facts`: footer contains `0800 111 999`, `Gas Safe`, `661231`, `SC690576`, `6 Hoffmann Place`, `/privacy/`; no `Portobello`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement.** Header: logo, "Call" button (tel link, always visible), menu as `<details class="menu"><summary>Menu</summary><ul>…</ul></details>` (service links from `getServices()`); on ≥60rem the list shows inline and the summary hides. Footer: emergency band ("Smell gas? Call 0800 111 999"), then legal name, Gas Safe number linked to the register with the logo, company number, registered address, Privacy link. Remove the footer links to `/electric-to-gas/` and `/landlords/`.
- [ ] **Step 4:** `npm test` → chrome tests PASS.
- [ ] **Step 5: Commit** "Header menu and footer for the new layout".

### Task 3: Enquiry form

**Files:** Modify `src/components/EnquiryForm.astro`. Create `tests/form.test.mjs`.

**Interfaces:** Props become `{ emergencyNumber: string; emergencyLink: string; phone: string; full?: boolean }`. Field `name`s: `job`, `property`, `postcode`, `boiler`, `name`, `phone`; with `full`: also `message`, `photo1..3`.

- [ ] **Step 1: Failing tests** on `dist/contact/index.html` (full) and `dist/index.html` (short, after Task 6; mark `{ todo: 'Task 6' }` until then):
  - `job options`: options with `data-id` = the five service ids plus `gas-smell` and `not-sure`.
  - `property options`: House; Flat, ground floor; Flat, first floor; Flat, second floor; Flat, third floor or higher.
  - `labels`: "Job", "House or flat", "Postcode", "Boiler make and age", "Name", "Phone", button "Send enquiry". No email field.
  - `full only on contact`: contact has `name="message"` and `name="photo1"`; homepage has neither.
  - `netlify`: `data-netlify="true"` and the honeypot remain.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement.** Job select lists each service's `jobs` (flat, no optgroups) then "Not sure"; keep the `?job=` preselect and gas warning script (it keys on `data-id="gas-smell"`). Keep photo shrinking for `full`. Subject line: `[job] – [postcode] – [name]` (rename `area` → `postcode` in the script). Labels with "(optional)" on Boiler, What's happening, Photos.
- [ ] **Step 4:** `npm test` → PASS (homepage test still todo).
- [ ] **Step 5: Commit** "Shorter enquiry form with property and boiler questions".

### Task 4: Service page template

**Files:** Create `src/pages/[service].astro`, `src/components/ReviewList.astro` (renders `ReviewCard` for each entry). Create `tests/service-pages.test.mjs`.

**Interfaces:** Consumes `services` (Task 1), `getReviewsByIds`, `getLiveWork`, `EnquiryForm` job ids (Task 3). Produces `WorkCard.astro` props `{ id: string }` — create it here (photo slot, title, `summary`, "See the job →" to `/work/<id>/`), reused in Tasks 5 and 6.

- [ ] **Step 1: Failing tests:**
  - `five pages exist`: each `dist/<id>/index.html` has one H1 `<title> in Edinburgh` and `<title>` starting with the same.
  - `ask button`: each page has `href="/contact/?job=<id>"` twice and the text "Ask about".
  - `blocks only when filled` (Review Focus 1): boiler-repairs has no "What's included", no "What can change the price", no `class="work-card"`; new-boilers has all of "System flush", "What can change the price", "The gas pipe".
  - `two complete reviews`: each page has exactly two `review on Google` captions.
  - `heating upgrades sources`: contains the five source URLs and "Last checked 27 October 2026", and a work card linking `/work/stockbridge-gas-central-heating/`.
  - `missing review id skipped` (Review Focus 2): `withEdit` on `services.yaml` adding `    - not-a-review` under boiler-repairs' reviews → build succeeds and still two captions.
  - `service record`: each page has `"@type":"Service"`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement** per the spec's Service template: label "Services", H1, `line` as the lede, button "Ask about <title, lower-cased first letter>"; one `.photo-slot` naming the shot; "What's included" ticks; `price_title` + factors (bold label, plain sentence); `notes` through `<Text>`; sources line; "What customers say" with `ReviewList`; "Example of our work" with `WorkCard` only if `getLiveWork(example)` returns it; button again. Title: `${title} in Edinburgh | ${trading_name}`; description from `summary`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** "One page per service from a shared template".

### Task 5: Examples of our work

**Files:** Create `src/pages/work/index.astro`, `src/pages/work/[slug].astro`. Modify `src/content.config.ts` (`work`: add `tags: string[]`, `challenge: string`, `service: string`; make `problem` the "Before" text), `src/content/work/stockbridge-gas-central-heating.md`. Create `tests/work.test.mjs`.

- [ ] **Step 1: Failing tests:**
  - `list shows only live jobs`: `dist/work/index.html` has one `work-card` (Stockbridge).
  - `job page`: `dist/work/stockbridge-gas-central-heating/index.html` has H1 "Gas central heating in a Stockbridge period flat", tags "Electric to gas", "No floors lifted", "About 3 days", headings "Before", "The challenge", "What we did", the quote "…he knows how Edinburgh flats work.", a link to `/heating-upgrades/`, and "Ask about a job like this" linking `/contact/?job=heating-upgrades`.
  - `no page for unpublished jobs`: no `dist/work/leith-gas-safety-check/`.
  - `no dates or money`: the job page has no `£` and no four-digit year.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement.** Stockbridge entry: `title: Gas central heating in a Stockbridge period flat`; `tags: [Electric to gas, No floors lifted, About 3 days]`; `challenge: Original wooden floors, no cupboards, and no wish to have the boiler on show.`; `what_ryan_did: "A flue through the roof, pipes brought down from the roof space, and the boiler fitted in the hall. Smart controls [PLACEHOLDER: thermostat model] so the heating can be run between guests."`; `service: heating-upgrades`; first quote `"…he knows how Edinburgh flats work."` (keep the others after it); photos: three (boiler in the hall, roof flue, original floors). Job page per spec; `getStaticPaths` from `getLiveWork()`. `ryan_check` and `gas_supply_already_there` shown small through `<Text>` under "What we did".
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** "Examples of our work and job pages".

### Task 6: Homepage

**Files:** Rewrite `src/pages/index.astro`. Create `tests/home.test.mjs`; remove the `todo` from the homepage form test.

- [ ] **Step 1: Failing tests:**
  - `hero`: H1 "Gas, heating and plumbing in Edinburgh"; line "Heattech Gas Services · Edinburgh and the Lothians"; "Send an enquiry" and "Call 07506 042175"; `data-hero-actions` kept for the mobile bar.
  - `proof strip`: "5.0 from 74 Google reviews" and "Gas Safe registered".
  - `five rows in order`: "What we do" followed by the five titles and their lines, each linking its page.
  - `examples`: heading "Examples of our work" and one work card.
  - `reviews`: heading "What customers say", exactly three captions, Mayur first, "Read all 74 reviews" linking `/reviews/`.
  - `form`: heading "Send an enquiry" and the short form.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement** per the spec's Home template, in that order. Hero: full-width `.photo-slot`-style background naming "the van on an Edinburgh street", heading over it. Rows: one bordered panel, `Icon`, title, line, chevron. Examples: horizontal scroll of `WorkCard`s, section omitted if none. Title unchanged; description says "Edinburgh and the Lothians".
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** "New homepage".

### Task 7: About, Contact, Reviews, enquiry sent

**Files:** Rewrite `src/pages/about/index.astro`, `src/pages/contact/index.astro`; modify `src/pages/reviews/index.astro`, `src/pages/contact/thanks.astro`. Create `tests/pages.test.mjs`.

- [ ] **Step 1: Failing tests:**
  - `about`: H1 "About us"; "based in Edinburgh, covering Edinburgh and the Lothians"; "Ryan Duncan" and "Brett Duncan"; facts table with "661231", "SC690576", "Insurance", "Based in"; a football heading, the line, two photo slots; links to Google, Facebook, MyBuilder.
  - `contact`: H1 "Contact"; phone and email links; the full form; "Smell gas? Don't send a form. Call 0800 111 999."; no "urgent".
  - `reviews`: one caption per complete review (count `complete` entries in `reviews.yaml`).
  - `thanks`: no "urgent"; still shows the phone number.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement** per the spec. Thanks page line becomes "You can also call <phone>." Contact: phone and email as large tap targets (no line under the phone), form `full`, `promises.after_enquiry` through `<Text>`, the warning band.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** "About, Contact and Reviews for the new layout".

### Task 8: Sitemap and site-wide wording checks

**Files:** Modify `src/pages/sitemap.xml.ts`, `tests/links.test.mjs`. Create `tests/wording.test.mjs`.

- [ ] **Step 1: Failing tests:**
  - `sitemap`: `/`, the five service URLs, `/work/`, `/work/stockbridge-gas-central-heating/`, `/reviews/`, `/about/`, `/contact/`, `/privacy/`; none of `/services/`, `/electric-to-gas/`, `/landlords/`.
  - `ask links match form jobs` (existing test, updated to read job ids from the new `jobs` lists).
  - `banned words outside quotes` (Review Focus 5): for every built page, strip `<blockquote>…</blockquote>` and `<figure class="review…">…</figure>`, then assert no `Portobello`, `recent`, `urgent` (case-insensitive) and none of CLAUDE.md's banned phrases.
- [ ] **Step 2:** Run → FAIL on sitemap.
- [ ] **Step 3: Implement.** Sitemap from `getServices()` and `getLiveWork()` plus the fixed pages.
- [ ] **Step 4:** `npm test` → all PASS; `npm run check:launch` fails listing only expected `[CONFIRM]`/`[PLACEHOLDER]` items.
- [ ] **Step 5: Commit** "Sitemap and site-wide wording checks".

### Task 9: Check in the browser

- [ ] **Step 1:** Start `heattech-dev` with the preview tool.
- [ ] **Step 2:** At 375px and desktop, open every page in the site map. Check: no sideways scroll; the menu opens and every link works; `/contact/?job=new-boilers` preselects New boilers; choosing the gas option shows the warning; the mobile bar hides while the hero buttons are on screen.
- [ ] **Step 3:** Read every new line of copy against the design rules; fix anything that fails, with a test where it's checkable.
- [ ] **Step 4:** Screenshot Home, one service page, the job page, About and Contact at 375px for Erin.
- [ ] **Step 5:** Commit any fixes.
