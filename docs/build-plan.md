# Heattech website — build plan for Claude Code

Oct 27, 2026 · @erin

## What the site must do

The site connects trust Ryan already has (74 five-star Google reviews, no website) to search, and answers the questions people ask before they commit, in plain words. Every page is built from the research in the project files, not from templates.

**Questions the first screen answers (search stage):**

- A. Do you do my kind of job, where I live?
- B. Can you help me soon?
- C. Are you legitimate?
- D. Roughly what will it cost? Answered by a promise of a written quote before any work, not published prices.

**Questions the rest of the page answers (deciding stage):**

- 1. Will you reply and turn up?
- 2. Will you be honest, or try to sell me a new boiler?
- 4. Will you make a mess of my home?
- 5. If something goes wrong afterwards, will you come back?
- 6. Can my electric-heated flat have gas central heating? Covered on Services and in Erin's story only. The evidence is weak, so it doesn't drive the homepage.

### Rules every page follows

1. **Every claim sits next to its proof:** a review, a job detail or a photo. No proof, no claim.
2. **Nothing that dates.** No prices, grant amounts, reply-time numbers, years or restated regulations. Facts set by someone else link to the official source instead. The only exceptions live in one file Ryan edits (an availability notice and an optional call-out fee).
3. **Plain voice.** First person from Ryan ("I"). Short sentences, no exclamation marks, no puns. Draft copy is replaced with his own phrases once he's recorded a voice note.
4. **Banned phrases:** "no job too small", "peace of mind", "look no further", "your trusted local…", "passionate about", "second to none", "we pride ourselves", "hassle-free", "one-stop shop", and any heating pun.
5. **Never publish other firms' reviews, and never name or criticise other plumbers.**
6. **Placeholders are written as `[PLACEHOLDER: …]`.** The build refuses to publish while any remain (see Build order).

## Tech stack, hosting and editing

I recommend a static site built with Astro, with its content kept in plain files in a GitHub repository. It would be hosted on Netlify's free tier and edited by Ryan through a simple browser editor that works on his phone. The only running cost is the domain renewal, which Ryan already pays if he owns heattechgas.co.uk.

| Part | Choice | Why |
| --- | --- | --- |
| Site | Astro, static output | Fast, nothing to break or patch, and Claude Code handles it well |
| Content | Markdown and YAML files in the repo | Ryan's edits and Claude Code's edits go to the same place |
| Hosting | Netlify free tier | Free, and Netlify Forms handles the enquiry form, photo uploads and email alerts without a server |
| Ryan's editor | Pages CMS (browser-based, connects to GitHub) | Forms on a phone screen. He only sees the fields he's allowed to change. |
| Analytics | Cloudflare Web Analytics (free, cookie-free) | Page views without needing a cookie banner. The form itself counts enquiries. |

**What Ryan can edit:** the availability notice (for example "Booked up until \[date\], but emergencies still covered"), an optional call-out fee, reviews, stories and photos.

**What Ryan can't edit:** page structure, layout and the services list. You change those through Claude Code.

**Flag:** free-tier limits and pricing for Netlify, Netlify Forms and Pages CMS change over time. Check them on each provider's own pages before building. If Netlify's form limits no longer fit, the fallback is Cloudflare Pages with a small form function that emails Ryan.

## Site structure

The site has five main pages plus a privacy page. The privacy page is there because the form collects personal details. Services is a single broad page with four sections, so nothing important sits two clicks away.

| Page | URL | Job of the page | Answers |
| --- | --- | --- | --- |
| Home | `/` | Who he is, what he does, where he works, proof, and the route to enquire | A, B, C, D, then 1, 2, 4, 5 |
| Services | `/services/` | Every job in the customer's own words, in four sections: Something's not working · Everyday plumbing · Replacing or upgrading · Servicing and safety checks | A, D, 6 |
| Real stories | `/stories/` and `/stories/[slug]/` | Real jobs told the same way every time | 1, 2, 4, 5, 6 |
| About | `/about/` | Ryan (and Brett), the company, credentials, and Portobello roots | C |
| Contact | `/contact/` | The enquiry form, phone number, email and the area he covers | B |
| Privacy | `/privacy/` | What the form collects and where it goes | — |

Each section of the Services page has its own anchor link (for example `/services#not-working`), so the homepage and Google can link straight to it. Each job line has an "Ask about this" link that opens the form with that job already selected: `/contact/?job=new-boiler`.

At launch there are two published stories: Erin's Stockbridge flat and an emergency call-out. The Northwood and repair-first stories are ready as templates, hidden until permission comes in.

## Page-by-page brief

Every page opens by stating plainly what it covers. Proof sits beside each promise. Copy marked `[CONFIRM WITH RYAN]` is a promise only he can make, so it stays a placeholder until he agrees to it.

### Home

1. **First screen.**
   - Logo, then one descriptive line, not a slogan: "Gas Safe heating engineer and plumber in Edinburgh and the Lothians."
   - "Ryan Duncan, Heattech Gas Services, based in Portobello."
   - The "Send an enquiry" button, plus a smaller "Urgent? Call" with the phone number.
   - A link to his Google reviews, and his Gas Safe number linked to the register check.
2. **What I do.** The four Services sections as four plain links, each with three or four example jobs underneath.
3. **How I work.** Four short promises, each paired with one real Google review that proves it:
   - Reply and turn up: `[CONFIRM WITH RYAN: what happens after an enquiry, e.g. "I text when I'm on my way"]`
   - Repair first, with an honest opinion on whether to replace
   - Your home left tidy
   - Back if anything's not right: `[CONFIRM WITH RYAN: guarantee or aftercare wording]`
4. **One story.** Erin's Stockbridge flat as a short card, linking to the full story.
5. **Reviews.** Six to eight hand-picked Google reviews, each with the first name as shown on Google and a link to the full profile.
6. **Where I work.** Edinburgh and the Lothians, based in Portobello. Name neighbourhoods only where there are real jobs to point to.
7. **Enquiry prompt**, with a link to the form.

**Footer** (every page): Heattech Gas Services Ltd, 6 Hoffmann Place, Edinburgh EH15 3FD. 07506 042175 · info@heattechgas.co.uk. Gas Safe `[PLACEHOLDER: verified number]` · Company SC690576. Plus: "Smell gas? Call the Gas Emergency number, 0800 111 999."

### Services

The page opens with: "Every job gets a written quote before any work starts." After that come the four sections. Each job is one plain line with an "Ask about this" link.

- **Something's not working:**
  - No heating or hot water
  - Boiler cutting out or showing a fault code
  - Radiators cold, noisy or won't switch off
  - Smell of gas or carbon monoxide alarm. This line says to call 0800 111 999 first; Ryan follows up once the emergency service has made it safe.
- **Everyday plumbing:**
  - Leaks, taps, toilets and pipework `[CONFIRM WITH RYAN: scope]`
- **Replacing or upgrading:**
  - Repair or replace? An honest opinion first
  - New boiler
  - Electric or storage heaters to gas central heating
  - Thermostats and smart controls
  - Gas hobs and cookers
  - Gas fires serviced or safely disconnected
- **Servicing and safety checks:**
  - Annual boiler service
  - Landlord gas safety certificate
  - Gas safety check before selling
  - Several properties? Letting agents and short-let hosts

**Electric to gas** gets a short expanding block, because it's the one complex decision on the page. It covers what decides whether a conversion is possible: an existing gas supply, pipe routes, flue position and funding. Each point links to its official source, with no figures restated:

- [SGN's free gas supply check](https://www.sgn.co.uk/gas-connections/household-customers/find-out-if-you-have-gas-supply)
- [City of Edinburgh Council on listed buildings](https://www.edinburgh.gov.uk/conservation-2/listed-buildings)
- [Home Energy Scotland funding](https://www.homeenergyscotland.org/find-funding)

The block links to Erin's story.

**Footer line:** "Also small commercial premises." `[CONFIRM WITH RYAN]`

### Real stories

Every story uses the same fields: title (place and job), area, job type, the problem, what was usually suggested, what Ryan did, the result, customer quotes, photos, and a `published` switch. A story only appears once that switch is on and permission is recorded.

**Story 1 (publish): Gas central heating in a Stockbridge period flat, without lifting the floors.**

- **The problem:** a one-bedroom short-let flat had electric heating and an old hot water cylinder. Bills ran at £250–£350 a month, and heating was the main guest complaint.
- **What was usually suggested:** lift the original floors and put the boiler on show, in a flat with no cupboards.
- **What Ryan did:** a roof flue, pipes brought down from the roof space, the boiler in the hall, and smart controls `[PLACEHOLDER: model]`. Done in about three days with Brett, within one to two weeks of booking.
- **The result:** bills `[PLACEHOLDER: £X a month after first winter]`, guest complaints `[PLACEHOLDER]`.
- **A short note** on Ryan handling both flats' certificates and guest issues while Erin is in Boston.
- **Quotes:** use Erin's own from 02c.
- **Flag:** the 35–50% figure is a supplier forecast. If it's used at all, it must be labelled as a forecast.

**Story 2 (publish once permission is in): an emergency call-out.** For example, the guest-reported gas leak where he arrived "within less than an hour" (Anya's Google review). `[PLACEHOLDER: reviewer permission and photo]`

**Templates (hidden):** Northwood (letting agency compliance), repair not replace (Erin's other flat), and a boiler replacement in a flat.

### About

- Ryan's photo and a few lines in his voice `[PLACEHOLDER]`. Mention Brett `[CONFIRM WITH RYAN: role]`.
- Heattech Gas Services Ltd, set up in 2021, based in Portobello.
- Gas Safe number with the register link.
- Insurance and brand approvals `[PLACEHOLDER]`.
- Sponsors a local youth football group (from his Facebook page). This is a real local detail, so use it.

### Contact

The form (next section), then phone, email, area covered, and what happens after you send it: `[CONFIRM WITH RYAN]`.

## Enquiry form

The form asks for four basics, then three optional extras. It emails Ryan with a subject line he can triage from his inbox without opening the email.

| Field | Required | Notes |
| --- | --- | --- |
| Name | Yes |  |
| Email | Yes |  |
| Phone | Yes | So he can call back on urgent jobs |
| Postcode or area | Yes | Tells him at a glance whether the job is in his area |
| What's the job? | No | Dropdown: the same job list as Services, plus "Something else". Pre-filled from the `?job=` link. |
| What's happening? | No | Free text |
| Photos | No | Up to 3 images |

**Email to Ryan:**

- Subject: `[Job] – [Area] – [Name]`, for example "No heating – EH6 – Sarah".
- Body: every field, with photos attached.

**After sending:** a confirmation page saying what happens next `[CONFIRM WITH RYAN]`, plus "If it's urgent, call 07506 042175". For a gas smell, the page shows the emergency number instead.

**Behind the scenes:**

- A hidden honeypot field to catch spam, with no CAPTCHA.
- A consent line linking to the privacy page.
- Nothing stored on the site itself.

**Why the dropdown matters:** every enquiry records which job people actually want. After a few months that shows which services deserve more space on the site.

## Design direction

The look is plain and solid, like a well-kept van. The warmth comes from real photos and real stories, not from decoration.

**Brand.** Keep the existing "HeatTech" wordmark with the flame. The colour palette comes from the logo: `[PLACEHOLDER: logo file and exact colours]`. Use one neutral background and one accent colour, reserved for buttons.

**Type.**

- One clear sans-serif typeface.
- Body text at 18px or larger, with short line lengths.
- Strong contrast, meeting accessibility standards (WCAG AA).

**On mobile,** urgent visitors are most likely on a phone (an assumption until analytics show otherwise), so design for the phone first:

- A bar fixed to the bottom of the screen with "Enquire" and "Call".
- Pages readable one-handed.

**Leave out:**

- Stock photos.
- Carousels and sliders.
- Animations.
- Decorative icons on every line.
- Popups and chat widgets.

**Photo placeholders.** Grey boxes labelled with the exact shot needed, so they double as a shot list:

- [ ] Ryan's face, a clear head-and-shoulders shot (recommended in his report)
- [ ] Ryan and Brett together, if Brett stays visible
- [ ] The van with the logo
- [ ] 5–10 job photos: finished boilers, tidy work areas
- [ ] Stockbridge flat: before, the boiler in the hall, the roof flue from outside, the untouched floors, the thermostat

## Local SEO and AI answer setup

The biggest SEO task is identity, not keywords. Ryan's name must match exactly everywhere, or searches for him may land on Heat Tech Scotland, a competitor with a similar name (01).

1. **One identity everywhere.** The same name, spelling, address, phone and Gas Safe number on the site, his Google Business Profile, Facebook and MyBuilder: `[PLACEHOLDER: Heattech or HeatTech]`.
2. **Structured data on every page.** Add a `Plumber` business record with:
   - name, address, phone, email
   - `areaServed` set to Edinburgh and the Lothians
   - `sameAs` links to his Google profile, Facebook and MyBuilder

   Don't add self-written review stars. Google ignores them for local businesses, and the count goes out of date.
3. **Page titles state the job and the place.** For example "Boiler repairs, servicing and gas safety in Edinburgh | Heattech Gas Services".
4. **Write facts AI tools can quote.**
   - Each service line is a plain statement.
   - Each story names the area, the property type and what was done. "Stockbridge period flat, roof flue, no floors lifted" is the kind of specific detail an answer engine can cite. Generic claims aren't.
5. **Connect the Google profile.**
   - Add the website link to the profile.
   - Match its services list to the site's.
   - Set up a one-tap review link for Ryan to send after every job.
   - This needs manager access from Ryan.
6. **Get an independent listing.** Edinburgh Trusted Trader lists several Portobello competitors but not him (01). Applying gives both people and AI answers a trust source that isn't his own site.
7. **Basics.** A sitemap, fast pages, and correct headings.
8. **Test after launch.**
   - Search "heattech Edinburgh" from an Edinburgh location.
   - Ask two or three AI tools who to call for a boiler in Portobello.
   - Record the results to compare against later.

**Flag:** check the Gas Safe number on the [Gas Safe Register](https://www.gassaferegister.co.uk/) before publishing. The certificate prints the same number in both the business and engineer fields (01).

## Placeholders and what Ryan must confirm

The site can be fully built now. Launch waits on the eight items marked "Yes" below.

| Item | Who | Where it's used | Blocks launch |
| --- | --- | --- | --- |
| Heattech or HeatTech spelling | Ryan | Everywhere | Yes |
| Gas Safe number checked on the register | You | Footer, About, structured data | Yes |
| Domain access and DNS | Ryan | Hosting | Yes |
| What happens after an enquiry (reply and turn-up promise) | Ryan | Home, Contact, confirmation page | Yes |
| Aftercare or guarantee wording | Ryan | Home | Yes |
| Jobs he wants more of, or would drop | Ryan | Services list | Yes |
| Showing the phone number for urgent jobs | Ryan | Header, mobile bar | Yes |
| Logo file and colours | Ryan | Design | Yes |
| Brett's role and how to name him | Ryan | Home, About, stories | No |
| Everyday plumbing scope, commercial work | Ryan | Services | No |
| Insurance and brand approvals | Ryan | About | No |
| Google profile manager access | Ryan | Review link, profile updates | No |
| Photos (shot list in Design) | You and Ryan | Every page | No: grey placeholders until then |
| Stockbridge bills after first winter, guest complaints, thermostat model, whether a gas supply already existed | You | Story 1 | No: publish with the forecast labelled |
| Emergency story permission and photo | Ryan, with the customer | Story 2 | No: hidden until then |
| Northwood permission and quote | Ryan, with his contact | Template | No: hidden until then |

**Flag:** all copy is drafted without Ryan's own words. Once the site is live, a 15–20 minute voice note from him is the quickest way to replace the draft lines with his actual phrasing.

## Build order and how to brief Claude Code

Build in eight steps, checking a live preview after each one. Give Claude Code this plan and the five research files in a `/docs` folder, so it builds from the evidence and not from generic trade-site habits.

1. **Setup.** Create the Astro project and run it on your computer only. Connect GitHub and Netlify just before the form step (step 5), because Netlify Forms needs them.
2. **Content files.**
   - `site.yaml`: business details, availability notice, optional call-out fee
   - `services.yaml`: the four sections and their job lines; this also feeds the form dropdown
   - `reviews.yaml`
   - `stories/*.md`, using the story fields
3. **Layout and design.** Header, footer, the mobile bottom bar and the type scale.
4. **Pages.** Home, Services, Stories, About, Contact and Privacy, filled from the content files.
5. **Form.** Netlify Forms with photo upload, email to Ryan, the subject-line format and the confirmation page.
6. **SEO.** Structured data, page titles, sitemap, analytics.
7. **Ryan's editor.** Pages CMS, limited to the fields in `site.yaml`, reviews, stories and photos.
8. **Placeholder check.** The production build fails if any `[PLACEHOLDER` or `[CONFIRM WITH RYAN` text remains. Preview builds still work, so you can build freely and nothing unfinished can go live.

**First prompt for Claude Code:**

```
Read CLAUDE.md and every file in /docs before doing anything.
Do steps 1 and 2 of the build plan, but build locally only. Skip Netlify and GitHub for now.
Create the Astro project and the content files (site.yaml, services.yaml, reviews.yaml, stories/).
Fill them only from the plan and research, using placeholders for anything missing.
If my computer is missing anything you need (like Git or Node), explain in plain English how to install it.
When done, start a preview so I can see the site, and give me a 5-line summary of what you made.
```

**Launch checklist:**

- [ ] Every "Yes" item in the placeholder table is filled
- [ ] Production build passes the placeholder check
- [ ] Ryan points his domain at the site
- [ ] Website link added to his Google profile
- [ ] A test enquiry with a photo reaches Ryan's inbox
- [ ] Baseline search and AI tests recorded
