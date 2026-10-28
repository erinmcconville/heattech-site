# 06 — Search and AI answer check

**Date:** 28 October 2026. **Method:** Claude Code. (1) Google's public suggestion service (`suggestqueries.google.com`, `hl=en-GB`, `gl=uk`) for 20 target phrases; (2) Claude's web search for five queries, reading both the result list and the written answer it returned.

CAVEATS
- Suggestions show what people type, ranked by Google; they give no search volumes.
- Claude's web search runs from the US. It is not a Google results page, a Google Maps check or a local-pack ranking from Edinburgh.
- The written answers come from Claude's own search tool. They stand in for "what an AI tool says", but ChatGPT, Perplexity and Google AI Overviews were **not tested**. Results vary by tool, place and day.
- Google "People also ask" boxes were not captured.

## 1. What Google suggests

OBSERVED (top suggestions, in Google's order)

| Typed | Suggestions worth noting |
|---|---|
| boiler installation edinburgh | boiler replacement edinburgh · boiler fitting edinburgh · combi boiler installation edinburgh · gas boiler installation edinburgh |
| new boiler cost edinburgh | boiler replacement cost edinburgh · new boiler cost scotland |
| boiler repair edinburgh | boiler service edinburgh · boiler service edinburgh cost · boiler service edinburgh reddit · emergency boiler repair edinburgh |
| emergency plumber edinburgh | emergency plumber edinburgh cost · … open now · emergency heating engineer edinburgh · 24 hour plumber edinburgh |
| gas engineer edinburgh | gas safe edinburgh · gas safe engineer edinburgh · central heating engineer edinburgh |
| gas safety certificate edinburgh | gas safety certificate edinburgh cost · landlord gas safety certificate edinburgh · what is a gas safety certificate |
| boiler service edinburgh | boiler service edinburgh cost · annual boiler service edinburgh |
| replace storage heaters with | … electric radiators · … heat pump · … central heating · cost to replace storage heaters with gas · what should i replace storage heaters with |
| electric to gas central heating | convert electric to gas central heating · cost of converting electric to gas central heating · electric vs gas central heating cost |
| storage heaters to gas | changing from storage heaters to gas · storage heaters vs gas |
| can i get gas central heating in a flat | can you have gas central heating in a flat |
| boiler grants scotland | boiler grants scotland 2026 · heating grants scotland · gas boiler grants scotland |
| how much does a new boiler cost | … with installation · … for a house · how much is a new boiler on average |
| plumber portobello | plumber portobello edinburgh |
| heattech | heattech uniqlo · heattech ultra warm · heattech socks · heattech leggings (all clothing) |
| heattech edinburgh | is heattech really warm · does heattech work · heattech near me (clothing) |
| heat tech edinburgh | heat tech meaning · edinburgh heating reviews |
| tenement flat boiler · gas engineer portobello | no suggestions |

## 2. Searching for the business by name

OBSERVED
- "heattech gas services edinburgh": the only result about the business is its company record ([Bringo](https://bringo.co.uk/company/196868)). The written answer said no website, services or reviews were found, and pointed to [Heat Tech Scotland](https://www.myjobquote.co.uk/t/heat-tech-scotland-ltd) and Edinburgh Gas & Renewables as similar names.
- "heattech edinburgh boiler": the written answer said it "didn't turn up a business called 'HeatTech' based in Edinburgh" and suggested Heat Tech Scotland, a Hertfordshire firm called Heat Tech Services Ltd ([Which?](https://trustedtraders.which.co.uk/businesses/heat-tech-services-ltd)) and The Edinburgh Boiler Company.
- Google's suggestions for "heattech" are all for Uniqlo's Heattech clothing range.

## 3. What an AI-style answer recommends

OBSERVED
- "gas engineer Portobello Edinburgh" and "who to call for a boiler repair in Portobello Edinburgh": both answers were built almost entirely from [Edinburgh Trusted Trader](https://www.trustedtrader.scot/services/Portobello/Boiler-Repairs) listings, quoting each firm's star rating and review count. Heattech was not mentioned.
- "replace storage heaters with gas central heating flat Edinburgh": the answer drew on forums and general guides. It found nothing specific to Edinburgh flats and ended with "check whether the flat has a gas connection already".

## What this means

INTERPRETED
- **The name is the biggest findability problem, and it's bigger than `01-plumber.md` thought.** "Heattech" is also a well-known Uniqlo clothing line, and it sits next to Heat Tech Scotland and Heat Tech Services. Search and AI tools currently can't find the business by name. The site, Google profile and directory listings should always pair the name with the trade and the place ("Heattech Gas Services, Edinburgh"), never "Heattech" on its own.
- **AI answers cite directories with ratings.** In both local questions, the answer was assembled from Trusted Trader ratings. Ryan's 74 Google reviews don't reach those answers. An Edinburgh Trusted Trader listing is probably the quickest way into them.
- **People search for cost first.** "Cost" appears in suggestions for new boilers, replacements, servicing, gas safety certificates, emergency plumbers and conversions. Visitors want to know what drives the price, even where the site doesn't publish prices.
- **Converting storage heaters is an open question for searchers.** Suggestions put gas next to electric radiators and heat pumps ("what should i replace storage heaters with"), and the AI answer found nothing local. A plain Edinburgh-specific answer would have little competition.
- **Landlords search for certificates by name and cost:** "landlord gas safety certificate edinburgh", "... cost", "what is a gas safety certificate".
- **"Reddit" appears in boiler service suggestions:** people look for peer opinion, not just company sites.
