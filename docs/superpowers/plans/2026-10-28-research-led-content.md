# Research-led content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Electric to gas and Landlords and short-lets pages, a "what a new boiler includes" list, one business name read from one setting, hidden-until-ready worked examples, and a launch guard that stops unconfirmed copy going live.

**Architecture:** Static Astro site. Page copy lives in `.astro` pages (as About and Services do today); lists Ryan may change live in `src/content/services.yaml`. Tests are Node's built-in `node:test` files that read the built `dist/` HTML, so no new dependencies.

**Tech Stack:** Astro 7 (static), Node 24, `node:test`.

**Spec:** `docs/superpowers/specs/2026-10-28-research-led-content-design.md`. Also read `CLAUDE.md` and `decisions.md` before starting.

## Global Constraints

- All CLAUDE.md guardrails, wording rules and banned phrases. Written as the company ("we"). No exclamation marks, puns or rhetorical questions; headings are statements.
- Anything Ryan must confirm is written as `[CONFIRM: what's needed]` and wrapped in the existing `<Text value=…/>` component so it shows highlighted.
- Official facts link to their source with "Last checked 27 October 2026". No £ figures, grant amounts, warranty lengths or restated regulations.
- Nothing dated: no job dates, no "recent", no savings forecasts.
- Stockbridge is named by area and property type only.
- Reviews with `complete: false` never render.
- A worked example renders only when its entry has `published: true` **and** `permission_recorded: true`; otherwise nothing renders (no empty box).
- No new npm dependencies. Reuse existing components and CSS variables.
- Launch guard: production build fails on `[PLACEHOLDER` or `[CONFIRM` in built HTML (comments stripped, `/content-check/` skipped) or while the name isn't confirmed. `[PHOTO` never fails it.

## Review Focus

1. **A cut-off review gets its full text pasted in** (`complete: true`): it should appear on the Landlords page with no code change. Test in Task 6.
2. **A story is published but permission isn't recorded** (the Leith write-up today is the reverse case): nothing renders. Test in Task 3.
3. **`[CONFIRM` sits only in an HTML comment, or only in JSON-LD**: the comment must not fail the guard; JSON-LD must. Tests in Task 1.
4. **An "Ask about this" link on a new page uses a job id the form doesn't know**: the form would open with nothing selected. Test in Task 7.
5. **A phone screen (375px)**: new pages must not scroll sideways, and long link text must wrap. Checked in Task 8.

---

### Task 1: Test setup and launch guard

**Files:**
- Create: `scripts/launch-check.mjs`
- Create: `tests/launch-check.test.mjs`
- Modify: `astro.config.mjs`
- Modify: `package.json` (scripts)
- Modify: `src/content/site.yaml` (business block)

**Interfaces:**
- Produces: `findPending(distDir: string): Promise<{ file: string, match: string }[]>` and `nameConfirmed(siteYamlText: string): boolean`, both exported from `scripts/launch-check.mjs`.
- Produces: `npm test` = `astro build && node --test tests/`. Later tasks add test files to `tests/` and read `dist/`.
- Produces: `site.yaml` `business.trading_name: Heattech Gas Services` and `business.trading_name_confirmed: false`.

- [ ] **Step 1: Write the failing tests** in `tests/launch-check.test.mjs`, each building a temp dir with `fs.mkdtemp`:
  - `finds CONFIRM in page text`: `a/index.html` = `<p>[CONFIRM: x]</p>` → one result, `file` ends with `a/index.html`.
  - `finds PLACEHOLDER in JSON-LD`: `<script type="application/ld+json">{"n":"[PLACEHOLDER: y]"}</script>` → one result.
  - `ignores HTML comments`: `<!-- [PLACEHOLDER: logo] --><p>ok</p>` → `[]`.
  - `ignores PHOTO`: `<div>[PHOTO: van]</div>` → `[]`.
  - `skips content-check`: `content-check/index.html` containing `[CONFIRM: x]` → `[]`.
  - `nameConfirmed`: `"  trading_name_confirmed: true"` → `true`; `"  trading_name_confirmed: false"` → `false`; text without the key → `false`.

- [ ] **Step 2: Run, expect failure:** `node --test tests/launch-check.test.mjs` → FAIL, cannot find module `scripts/launch-check.mjs`.

- [ ] **Step 3: Implement** `findPending` (walk `distDir` for `*.html`, skip any path containing `content-check`, strip `<!--…-->`, match `/\[(PLACEHOLDER|CONFIRM)[^\]]*\]/g`) and `nameConfirmed` (regex on the yaml text; no yaml dependency).

- [ ] **Step 4: Wire it in.** In `astro.config.mjs` add an inline integration `launch-check` with an `astro:build:done` hook (`{ dir }`, convert with `fileURLToPath`). It runs only when `process.env.CONTEXT === 'production'` (set by Netlify for live deploys; previews and local builds are untouched). If `findPending` returns anything, or `nameConfirmed` is false for `src/content/site.yaml`, log each file and match plus "Not ready to go live" and `throw`. Add to `site.yaml` under `business`, replacing the placeholder `trading_name` line:
  ```yaml
  trading_name: Heattech Gas Services
  # Ryan picks "Heattech" or "HeatTech". Set to true once he has; the live site won't build until then.
  trading_name_confirmed: false
  ```
  Add `"test": "astro build && node --test tests/"` and `"check:launch": "CONTEXT=production astro build"` to `package.json`.

- [ ] **Step 5: Run:** `npm test` → all launch-check tests PASS. `npm run check:launch` → FAILS listing current placeholders (expected today). `npm run build` → succeeds.

- [ ] **Step 6: Commit** (include `decisions.md` and `docs/superpowers/`, which are uncommitted from the design session)
  ```bash
  git add scripts tests astro.config.mjs package.json src/content/site.yaml decisions.md docs/superpowers
  git commit -m "Add launch check: live builds stop while placeholders remain"
  ```

### Task 2: One name everywhere

**Files:**
- Modify: `src/layouts/Base.astro:20` (JSON-LD `name`)
- Modify: `src/components/Header.astro:20`, `src/components/Footer.astro:18` (logo alt)
- Modify: page titles and descriptions in `src/pages/index.astro`, `services/index.astro`, `about/index.astro` (also its H1), `contact/index.astro`, `contact/thanks.astro`, `privacy/index.astro`, `reviews/index.astro`
- Create: `tests/name.test.mjs`

**Interfaces:**
- Consumes: `site.business.trading_name` (Task 1).

- [ ] **Step 1: Write the failing tests** in `tests/name.test.mjs`:
  - `no hard-coded name in templates`: scanning `src/pages`, `src/components`, `src/layouts` (skip `src/pages/content-check/`), no file contains `Heattech Gas Services` or `HeatTech`.
  - `titles use the trading name`: read `trading_name` from `src/content/site.yaml` by regex; every `dist/**/index.html` except content-check has a `<title>` containing it.

- [ ] **Step 2: Run** `npm test` → FAIL listing the files above.

- [ ] **Step 3: Implement.** Replace each hard-coded name with `business.trading_name` (Header/Footer get it from the `site` prop they already receive; logo alt becomes `` `${business.trading_name} Ltd, home` `` and `` `${business.trading_name} Ltd` ``). Keep `legalName: business.legal_name` as is.

- [ ] **Step 4: Run** `npm test` → PASS. Spot-check `dist/index.html` title is unchanged: `Heattech Gas Services | Boilers, heating and plumbing in Edinburgh`.

- [ ] **Step 5: Commit** `git commit -am "Read the business name from site.yaml everywhere"`

### Task 3: Worked example component and the Stockbridge entry

**Files:**
- Create: `src/components/WorkedExample.astro`
- Modify: `src/content/work/stockbridge-gas-central-heating.md`
- Create: `tests/worked-example.test.mjs` (assertions run against pages built in Tasks 4–6; write them now, they fail until then)

**Interfaces:**
- Produces: `withEdit(...)` in `tests/helpers.mjs` (signature in Step 2), used again in Task 6.
- Produces: `<WorkedExample id="stockbridge-gas-central-heating" />`. Props: `{ id: string }`. Looks up the `work` entry with `getEntry('work', id)`; renders nothing unless `published && permission_recorded`. Renders `<section id="example" aria-labelledby="example-title">` with: H2 = entry `title`; "Before" = `problem`; "What others suggested" = `usual_approach` (if set); "What was done" = `what_ryan_did`; "Gas supply" = `gas_supply_already_there` (if set); quotes as `<blockquote>` + "The owner"; photo slots from `photos` using the existing `.photo-slot` class; `ryan_check` through `<Text>` when set. No dates, no `result` field.

- [ ] **Step 1: Edit the Stockbridge entry.** Set `published: true`. Replace `problem` with: `The flat had electric heating and an old hot water cylinder. Bills were high, and heating was the main guest complaint.` Delete the `result` line (decision: no forecasts). Reorder `quotes` to: "He really took his time to walk me through everything.", the "…he knows how Edinburgh flats work." quote, then "I feel so much more in control with renting out my property." Delete "I really didn't want to do that." (makes no sense on its own). Leave `ryan_check`, `gas_supply_already_there` and the thermostat placeholder as they are.

- [ ] **Step 2: Write the tests** in `tests/worked-example.test.mjs`:
  - `stockbridge shows on electric to gas`: `dist/electric-to-gas/index.html` contains `id="example"` and `Stockbridge period flat`.
  - `no money or forecast figures in the example`: that file contains no `£` and no `35–50`.
  - `unpublished stories never render`: `dist/landlords/index.html` and `dist/services/index.html` contain no `id="example"`.
  - `published without permission stays hidden` (Review Focus 2): using `withEdit`, set `published: false` → `published: true` in `src/content/work/boiler-replacement-flat.md` (its `permission_recorded` is false); `dist/services/index.html` still has no `id="example"`.

  Also create `tests/helpers.mjs` exporting `withEdit(file: string, from: string, to: string, fn: () => void | Promise<void>)`: backs the file up, replaces `from` with `to` (throws if `from` isn't found), runs `astro build` with `execSync`, runs `fn`, and always restores the file and rebuilds in `finally`. Tests using it get `{ timeout: 180000 }`.

- [ ] **Step 3: Implement** `WorkedExample.astro`, styled like existing `.card` blocks, max width `46rem` to match Services.

- [ ] **Step 4:** Tests stay red until Task 4. Commit: `git add -A src/components/WorkedExample.astro src/content/work tests && git commit -m "Add WorkedExample; tidy the Stockbridge write-up"`

### Task 4: Electric to gas page

**Files:**
- Create: `src/pages/electric-to-gas/index.astro`
- Modify: `src/content/services.yaml` (remove `explainer` from `replacing-upgrading`; add `page: /electric-to-gas/` to job `electric-to-gas`)
- Modify: `src/content.config.ts` (remove `explainer`; add `page: z.string().optional()` to `job`)
- Modify: `src/pages/services/index.astro` (remove the `explainer` block and its `getEntry('work')` lookup and `.explainer` styles; when `j.page` is set, the job label becomes a link to it)
- Create: `tests/electric-to-gas.test.mjs`

**Interfaces:**
- Consumes: `WorkedExample` (Task 3), `business.trading_name` (Task 2).
- Produces: job field `page` (used again in Task 5).

- [ ] **Step 1: Write the failing tests:**
  - `page exists with title and h1`: `<title>` = `Electric heating to gas central heating in Edinburgh | ${trading_name}`; one `<h1>` = `Electric heating to gas central heating`.
  - `links its sources`: contains all of `sgn.co.uk/gas-connections/household-customers/find-out-if-you-have-gas-supply`, `sgn.co.uk/gas-connections/household-customers/apply-new-gas-connection0`, `edinburgh.gov.uk/conservation-2/listed-buildings`, `homeenergyscotland.org/find-funding`, `mygov.scot/energy-saving-funding/warmer-homes-scotland-scheme`, and `Last checked 27 October 2026`.
  - `ask link`: contains `href="/contact/?job=electric-to-gas"`.
  - `services links here and the old block is gone`: `dist/services/index.html` contains `href="/electric-to-gas/"` and not `class="explainer`.
  - `has a Service record`: page contains `"@type":"Service"` and `"name":"Electric heating to gas central heating"`.

- [ ] **Step 2: Run** `npm test` → FAIL (page missing).

- [ ] **Step 3: Write the page.** `Base` with the title above, description `Converting an Edinburgh flat from electric or storage heaters to gas central heating: what decides whether it can be done, and a worked example in a Stockbridge period flat.`, and `jsonLd` = one `Service` (same shape as Services' records, `url` `/electric-to-gas/`). Content, in order:
  1. H1, then one line: `For flats with electric or storage heaters.`
  2. H2 `What decides whether it can be done`, a list of short statements, each with its link:
     - Gas supply: the building needs one. SGN checks for free. Flats on the second floor or above can need a separate connection quote from SGN. (two SGN links)
     - The flue: where it can leave the building. On listed buildings and in conservation areas, the Council's guidance applies. (CEC link)
     - Pipe routes: through the roof space or under the floors.
     - Where the boiler goes: a cupboard, the hall or the kitchen.
     - Funding: Home Energy Scotland's standard grant and loan doesn't cover gas boilers. Warmer Homes Scotland can help some households with central heating. (HES and mygov links)
     - `Last checked 27 October 2026` in the existing `.small`/muted style.
  3. `<WorkedExample id="stockbridge-gas-central-heating" />`
  4. A button `Ask about this` → `/contact/?job=electric-to-gas`.

  Copy must pass CLAUDE.md: no reassurance, no questions, cut any line that loses no fact.

- [ ] **Step 4: Run** `npm test` → electric-to-gas and worked-example "stockbridge shows" tests PASS.

- [ ] **Step 5: Commit** `git add -A && git commit -m "Add the Electric to gas page; move the explainer off Services"`

### Task 5: Services: what a new boiler includes

**Files:**
- Modify: `src/content/services.yaml` (`replacing-upgrading`: add `includes`; `servicing-safety`: add `section_note`; job `several-properties`: add `page: /landlords/`)
- Modify: `src/content.config.ts` (section fields `includes` and `section_note`)
- Modify: `src/pages/services/index.astro`
- Create: `tests/services.test.mjs`

**Interfaces:**
- Produces: section field `includes: { title: string, items: string[], extra_title: string, extra: string[], check: string }` and `section_note: string` (both optional).

- [ ] **Step 1: Write the failing tests:**
  - `new boiler list`: `dist/services/index.html` contains `Every new boiler includes`, `System flush`, `Magnetic filter`, `Smart heating controls`, `What can add cost`, `gas pipe`, `condensate`.
  - `no warranty length`: the `#replacing-upgrading` section text has no `/\d+[- ]year/`.
  - `servicing note`: contains `Servicing keeps most manufacturer warranties valid`.
  - `landlords link`: contains `href="/landlords/"`.

- [ ] **Step 2: Run** `npm test` → FAIL.

- [ ] **Step 3: Add the content** to `services.yaml`:
  ```yaml
  includes:
    title: Every new boiler includes
    items:
      - System flush
      - Magnetic filter
      - Smart heating controls
      - The manufacturer's warranty (the length depends on the boiler)
    extra_title: What can add cost
    extra:
      - A gas pipe too small for the new boiler
      - A condensate (drain) pipe that needs changing
    check: "[CONFIRM: this is what every replacement includes, and these are the two things that add cost]"
  ```
  and on `servicing-safety`: `section_note: "Servicing keeps most manufacturer warranties valid. [CONFIRM: wording]"`. Render `includes` as two short lists in a `.card` under the job list, with `check` through `<Text>`; render `section_note` through `<Text>` under that section's job list.

- [ ] **Step 4: Run** `npm test` → services tests PASS.

- [ ] **Step 5: Commit** `git commit -am "Services: what every new boiler includes and what can add cost"`

### Task 6: Landlords and short-lets page

**Files:**
- Create: `src/pages/landlords/index.astro`
- Create: `tests/landlords.test.mjs`

**Interfaces:**
- Consumes: `WorkedExample` (Task 3), `ReviewCard`, `getEntry('reviews', id)`, `getEntry('work', 'stockbridge-gas-central-heating')`.

- [ ] **Step 1: Write the failing tests:**
  - `title and h1`: `<title>` = `Gas safety and heating for landlords and short-lets in Edinburgh | ${trading_name}`; `<h1>` = `Landlords, letting agents and short-let hosts`.
  - `services with ask links`: contains `?job=landlord-certificate`, `?job=boiler-service`, `?job=no-heating`, `?job=controls`, `?job=several-properties`.
  - `HSE source`: contains `hse.gov.uk/gas/landlords/safetycheckswhocan.htm` and `Last checked 27 October 2026`.
  - `proof`: contains `Gregor, review on Google` and `I feel so much more in control with renting out my property` and `href="/electric-to-gas/#example"`.
  - `cut-off reviews stay hidden`: does not contain `Anya, review on Google`, `ailsa, review on Google`, `Atelier Twenty Three, review on Google`.
  - `a completed review appears without code changes` (Review Focus 1): with `withEdit` (Task 3) on `src/content/reviews.yaml`, replace `name: Anya\n  complete: false` with `name: Anya\n  complete: true`; assert `Anya, review on Google` appears on the Landlords page.
  - `has a Service record`: `"@type":"Service"`.

- [ ] **Step 2: Run** `npm test` → FAIL.

- [ ] **Step 3: Write the page.** `Base` with the title above, description `Landlord gas safety certificates, servicing, repairs and heating controls for let and short-let properties in Edinburgh and the Lothians.`, and one `Service` JSON-LD record. Content, in order:
  1. H1.
  2. H2 `What we do for let properties`: a job list styled like Services (`.jobs`, `.ask` links), each linking `/contact/?job=<id>`:
     - Landlord gas safety certificate (`landlord-certificate`), with a small line: `What the law requires:` + HSE link + `Last checked 27 October 2026`.
     - Boiler servicing (`boiler-service`).
     - Repairs and gas emergencies at let properties (`no-heating`), small line `<Text value="[CONFIRM: emergency cover for let properties, and whether you deal with guests or tenants directly]" />`.
     - Heating controls you can manage between stays (`controls`).
     - Several properties and letting agents (`several-properties`), small line `<Text value="[CONFIRM: how certificates are sent, and whether you send reminders when they're due]" />`.
  3. Proof: `ReviewCard` for `gregor-fortune`, then `anya-bell`, `ailsa-rollo`, `atelier-twenty-three`, each only if the entry exists and `data.complete`. Then the Stockbridge owner's quote (find it in `quotes` by `startsWith('I feel so much more in control')`) as a `blockquote`, attributed `The owner of a Stockbridge short-let flat`, linking `/electric-to-gas/#example`.
  4. `<WorkedExample id="emergency-gas-leak-short-let" />` (hidden today).
  5. Button `Send an enquiry` → `/contact/?job=several-properties`.

- [ ] **Step 4: Also on Services:** add `<WorkedExample id="boiler-replacement-flat" />` after the `includes` card in the `replacing-upgrading` section (hidden today).

- [ ] **Step 5: Run** `npm test` → landlords and worked-example tests PASS.

- [ ] **Step 6: Commit** `git add -A && git commit -m "Add the Landlords and short-lets page"`

### Task 7: Footer, sitemap and job links

**Files:**
- Modify: `src/components/Footer.astro` (links beside Privacy)
- Modify: `src/pages/sitemap.xml.ts` (`paths`)
- Create: `tests/links.test.mjs`

- [ ] **Step 1: Write the failing tests:**
  - `sitemap lists the new pages`: `dist/sitemap.xml` contains `/electric-to-gas/` and `/landlords/`.
  - `footer links`: `dist/index.html` footer contains `href="/electric-to-gas/"` and `href="/landlords/"`.
  - `every ask link matches a form job` (Review Focus 4): collect every `?job=([a-z-]+)` across `dist/**/*.html`; each must appear as an `id:` under `jobs:` in `src/content/services.yaml`.

- [ ] **Step 2: Run** → FAIL on sitemap and footer.

- [ ] **Step 3: Implement.** Footer: under "Company", a line `Electric to gas · Landlords and short-lets · Privacy`. Sitemap: add `'/electric-to-gas/'` and `'/landlords/'` to `paths`.

- [ ] **Step 4: Run** `npm test` → all PASS.

- [ ] **Step 5: Commit** `git commit -am "Footer and sitemap: link the two new pages"`

### Task 8: Check in the browser

- [ ] **Step 1:** Start the dev server with the preview tool (add a `.claude/launch.json` entry `npm run dev`, port 4321, if none exists).
- [ ] **Step 2:** At 375px wide and at desktop width, open `/electric-to-gas/`, `/landlords/`, `/services/`. Check: no sideways scroll (`document.documentElement.scrollWidth <= innerWidth`), placeholders highlighted, no empty example boxes on Landlords or Services, the "Ask about this" link on Electric to gas opens the form with "Electric or storage heaters to gas central heating" selected.
- [ ] **Step 3:** Read every new line of copy against the CLAUDE.md banned phrases and wording rules; fix anything that fails.
- [ ] **Step 4:** `npm test` → all PASS; `npm run check:launch` → fails, listing only expected placeholders. Screenshot both new pages for Erin.
- [ ] **Step 5:** Commit any fixes.

### Task 9: Report for Ryan

Not code. Made after Tasks 1–8 so it describes the real site.

- [ ] **Step 1:** Collect every `[CONFIRM` and `[PLACEHOLDER` from `npm run check:launch` output and the `site.yaml` / work entries, plus `trading_name_confirmed`, Google manager access and the review link, the photo shot list, and the two jobs in the spec's story table.
- [ ] **Step 2:** Create it as a shareable doc (Claude Docs) with the four parts in spec §8: why each page exists (one line each), the target searches from `research/03-search-landscape.md` §1 with the page that answers each (no ranking promises), what's been done to help him be found, and a checklist where each item says what's needed, why, and the easiest way to give it (yes/no, a text, a photo, a short voice note). Plain words, readable on a phone.
- [ ] **Step 3:** Give Erin the link.
