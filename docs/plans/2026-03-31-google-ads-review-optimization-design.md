# Google Ads Review Optimization Design

**Date:** 2026-03-31

## Goal

Increase the likelihood that `interconverter.com` passes a Google Ads / AdSense review for "low-value content" without migrating away from the current Next.js codebase.

## Approved Direction

- Keep the current Next.js site and optimize the existing public experience.
- Do not spend time on a TanStack rewrite for this review cycle.
- Treat Google Ads review readiness as the only goal for this pass.
- Reduce the public review surface to a curated set of tools instead of exposing the current wide tool inventory.

## Public Review Surface

The public review set is limited to these 12 tools:

1. `/unit/temperature-converter`
2. `/unit/length-converter`
3. `/unit/weight-converter`
4. `/unit/volume-converter`
5. `/time/timestamp-converter`
6. `/time/timezone-converter`
7. `/time/date-difference-calculator`
8. `/color/rgb-to-hex-converter`
9. `/color/hex-to-rgb-converter`
10. `/color/color-picker-tool`
11. `/color/contrast-checker`
12. `/media/jpg-to-png-converter`

## Explicit Exclusions For This Review Cycle

- Do not lead with `finance` tools.
- Do not lead with `health` tools.
- Do not rely on `auto` tools in the review surface.
- Do not position the site as a "250+ tools" directory during this pass.
- Do not solve this by adding thin, generic AI-expanded copy.

## Visibility Strategy

Use a soft-hide strategy for non-core tools:

- Remove non-core tools from homepage recommendations.
- Remove non-core tools from `/tools` and category pages.
- Remove non-core tools from sitemap output.
- Add `noindex,follow` to non-core tool pages.
- Keep routes available in code so they can be reopened later.

This keeps risk low while narrowing the set of pages Google sees as the main product surface.

## Brand And Trust Requirements

The following pages must be rewritten to improve trust signals and reduce template-like language:

- `/`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

The rewritten pages must:

- Avoid exaggerated claims without evidence.
- Explain how the site is maintained and reviewed.
- Clarify what is calculated locally and what is not.
- Present the product as a curated, maintained toolset rather than a mass-produced directory.
- Use current review/update dates where dates are shown.

## Information Architecture Changes

### Homepage

- Replace quantity-based positioning with curated positioning.
- Promote the 12 review-approved tools only.
- Add a section explaining how the tools are built and maintained.
- Add a section explaining trust, privacy, and calculation boundaries.

### `/tools`

- Reframe from broad directory page to curated index page.
- Show only the review-approved set.
- Add editorial language about why these tools are currently featured.

### Category Pages

- Keep public focus on `unit`, `time`, `color`, and `media`.
- Restrict visible cards to the review-approved items in each category.
- Add short educational copy for when each category should be used.
- Avoid empty categories and inflated counts.

## Tool Page Content Model

Each review-approved tool page should be upgraded to include stronger non-template content via the existing JSON-backed layout:

- A clearer "about" section that explains what the tool solves.
- Better "how to use" steps that reflect real workflows.
- Better "features" that explain meaningful utility instead of generic marketing claims.
- Stronger FAQs that answer tool-specific edge cases.
- Optional detail paragraphs where a page needs formula or interpretation context.

The content should explicitly cover:

- What the tool does
- When to use it
- How the result is calculated or interpreted
- Common mistakes
- Examples or practical use cases
- Cautions or limits where appropriate

## Review Readiness Criteria

The implementation is ready for a new review request when:

- The 12-tool public surface is the only prominent inventory in navigation, landing, sitemap, and internal recommendation areas.
- Non-core tools are noindexed and removed from the public sitemap.
- The homepage and trust pages no longer read like starter-template content.
- The 12 core tools have stronger explanatory copy and more credible FAQs.
- The site no longer markets itself primarily by total tool count.
