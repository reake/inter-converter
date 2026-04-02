# Google Ads Review Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Narrow the public site to a curated, review-ready tool set and strengthen trust/content quality so `interconverter.com` is more likely to pass a Google Ads review for low-value content.

**Architecture:** Keep the existing Next.js app and use the current JSON-backed tool registry plus the existing `EnhancedToolLayout`. Introduce a centralized "review-approved" visibility layer, update sitemap and robots behavior to match it, then rewrite the brand pages and the 12 approved tool content JSON files so the public site reads like a maintained product rather than a mass-produced directory.

**Tech Stack:** Next.js App Router, TypeScript, `next-intl`, JSON-backed tool catalogs, existing SEO helpers, shadcn/ui components

---

## Preconditions

- Work only in the current Next.js codebase.
- Do not migrate routes to TanStack Start during this work.
- Preserve unrelated user changes already present in the worktree.
- Favor `pnpm lint` over full builds for routine validation.

### Task 1: Add a Central Review-Approved Visibility Layer

**Files:**
- Modify: `src/config/tools-loader.ts`
- Modify: `src/types/tools.ts`
- Optional create if it keeps the loader readable: `src/config/review-surface.ts`

**Step 1: Define the approved public tool IDs**

Create one centralized allowlist for the 12 review-approved tools:

```ts
const REVIEW_APPROVED_TOOL_IDS = new Set([
  'temperature-converter',
  'length-converter',
  'weight-converter',
  'volume-converter',
  'timestamp-converter',
  'timezone-converter',
  'date-difference-calculator',
  'rgb-to-hex-converter',
  'hex-to-rgb-converter',
  'color-picker-tool',
  'contrast-checker',
  'jpg-to-png-converter',
]);
```

**Step 2: Distinguish "implemented", "active", and "review-approved"**

Add helper functions instead of scattering whitelist checks:

```ts
export const isReviewApprovedTool = (tool: ToolConfig) => REVIEW_APPROVED_TOOL_IDS.has(tool.id);
export const getReviewApprovedTools = (locale = 'en') =>
  getToolsByLocale(locale).filter((tool) => tool.isActive && isReviewApprovedTool(tool));
```

If needed, extend `ToolConfig` with a derived field or keep it helper-based. Avoid writing `tool.id === ...` checks across pages.

**Step 3: Add category helpers for the review surface**

Add helpers for filtered categories:

```ts
export const getReviewApprovedToolsByCategory = (category: ToolCategory, locale = 'en') =>
  getReviewApprovedTools(locale).filter((tool) => tool.category === category);
```

Use this for homepage, `/tools`, and category pages.

**Step 4: Keep non-core tools routable**

Do not delete tool routes or JSON files. This task is only about adding a central visibility model.

**Step 5: Verify the helper layer**

Run:

```bash
rg -n "REVIEW_APPROVED_TOOL_IDS|getReviewApprovedTools|isReviewApprovedTool" src/config src/types
```

Expected: one central visibility definition and helper usage points.

**Step 6: Commit**

```bash
git add src/config/tools-loader.ts src/types/tools.ts src/config/review-surface.ts
git commit -m "feat: add review-approved tool visibility helpers"
```

If no new file is created, remove it from the command.

### Task 2: Reduce the Public Sitemap and Public Category Surface

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/i18n/routing.ts`
- Modify: `src/app/[locale]/tools/page.tsx`
- Modify: `src/app/[locale]/(tools)/unit/page.tsx`
- Modify: `src/app/[locale]/(tools)/time/page.tsx`
- Modify: `src/app/[locale]/(tools)/color/page.tsx`
- Modify: `src/app/[locale]/(tools)/media/page.tsx`
- Modify: `src/app/[locale]/(tools)/auto/page.tsx`
- Modify: `src/app/[locale]/(tools)/finance/page.tsx`
- Modify: `src/app/[locale]/(tools)/health/page.tsx`

**Step 1: Restrict sitemap tool entries**

Update `src/app/sitemap.ts` so tool URLs come from `getReviewApprovedTools()` rather than the full `TOOLS_CONFIG.filter(tool => tool.isActive)`.

Also change the category set to the categories that still have review-approved tools:

```ts
const reviewCategories = ['unit', 'time', 'color', 'media'];
```

Do not emit `finance`, `health`, or `auto` category URLs in the sitemap for this pass.

**Step 2: Keep `routing.ts` broad enough for existing routes**

Leave route support intact. Do not remove pathnames for non-core tools because the app still serves them. This file only needs changes if the new helper import or category path generation becomes cleaner when based on the review-approved helpers.

**Step 3: Change `/tools` to use the curated layer**

In `src/app/[locale]/tools/page.tsx`:

- Replace `getToolsByAllCategories(8, locale)` with the review-approved category helper.
- Replace `getPopularTools(6, locale)` with the review-approved tools sorted by search volume.
- Remove copy that implies a large all-tools directory.

**Step 4: Restrict category pages to the curated layer**

For `unit`, `time`, `color`, and `media`, swap category data sources from the generic helpers to the review-approved category helper.

For `auto`, `finance`, and `health`, choose one of these implementation patterns:

- mark them `noindex` and present them as not currently featured, or
- remove them from homepage and `/tools` but leave the route reachable with a low-profile message.

Do not leave them as fully promoted category hubs.

**Step 5: Verify sitemap output logic statically**

Run:

```bash
rg -n "reviewCategories|getReviewApprovedTools|getReviewApprovedToolsByCategory" src/app/sitemap.ts src/app/[locale]/tools/page.tsx src/app/[locale]/(tools)
```

Expected: sitemap and directory pages use the curated helper layer.

**Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/[locale]/tools/page.tsx src/app/[locale]/(tools)/unit/page.tsx src/app/[locale]/(tools)/time/page.tsx src/app/[locale]/(tools)/color/page.tsx src/app/[locale]/(tools)/media/page.tsx src/app/[locale]/(tools)/auto/page.tsx src/app/[locale]/(tools)/finance/page.tsx src/app/[locale]/(tools)/health/page.tsx src/i18n/routing.ts
git commit -m "feat: narrow sitemap and directory pages to the review-approved tool set"
```

### Task 3: Add Noindex Behavior for Non-Core Tool Detail Pages

**Files:**
- Create: `src/lib/seo/tool-page-metadata.ts`
- Modify: every tool route metadata file under `src/app/[locale]/(tools)/**/page.tsx`

**Step 1: Create a shared tool metadata helper**

Create a helper that receives the catalog entry and returns a metadata object with the correct robots setting:

```ts
export function buildToolPageMetadata(args: {
  locale: string;
  category: ToolCategory;
  toolId: string;
  title: string;
  description: string;
  titleSuffix?: string;
  keywords: string[];
  isIndexable: boolean;
}): Metadata {
  return {
    // existing fields...
    robots: args.isIndexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }
      : { index: false, follow: true, googleBot: { index: false, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}
```

**Step 2: Derive indexability from the central review helper**

In the helper, or just before calling it, determine:

```ts
const isIndexable = entry?.isActive === true && isReviewApprovedTool(entry);
```

**Step 3: Bulk update tool route metadata**

Replace the inline `robots: { index: true ... }` blocks in every tool detail page under:

- `src/app/[locale]/(tools)/unit`
- `src/app/[locale]/(tools)/time`
- `src/app/[locale]/(tools)/color`
- `src/app/[locale]/(tools)/media`
- `src/app/[locale]/(tools)/auto`
- `src/app/[locale]/(tools)/finance`
- `src/app/[locale]/(tools)/health`

The 12 approved tools should resolve to `index: true`.
All other tool pages should resolve to `index: false`.

**Step 4: Keep route rendering unchanged**

Do not rewrite the converter UI in this task. This task only aligns metadata robots behavior with the new public review surface.

**Step 5: Verify the metadata sweep**

Run:

```bash
rg -n "robots: \\{|buildToolPageMetadata|isIndexable" src/app/[locale]/\(tools\) src/lib/seo/tool-page-metadata.ts
```

Expected: tool pages rely on the shared helper or at minimum derive robots from the central allowlist.

**Step 6: Commit**

```bash
git add src/lib/seo/tool-page-metadata.ts src/app/[locale]/(tools)
git commit -m "feat: noindex non-core tool detail pages for ads review"
```

### Task 4: Rewrite Homepage Messaging Around Curation and Trust

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/messages/en.json`
- Modify: `src/messages/zh.json`

**Step 1: Replace scale-first positioning**

Remove copy that emphasizes total inventory or generic starter-site claims. Replace it with curated positioning such as:

- "Selected online converters and calculators"
- "Maintained tools with clearer explanations and practical workflows"
- "Focused on common developer, time, measurement, color, and file tasks"

**Step 2: Add a "How these tools are maintained" section**

Use existing cards or add a compact section in `src/app/[locale]/page.tsx` describing:

- browser-side processing where true
- formula-based conversions
- ongoing copy and accuracy review
- boundaries for results and verification

**Step 3: Restrict homepage cards to the review-approved set**

Use the new review helper for `popularTools` and `toolsByCategory`. Do not surface finance, health, or auto cards on the homepage in this review pass.

**Step 4: Align locale strings**

Update `src/messages/en.json` and `src/messages/zh.json` namespaces:

- `homepage`
- `toolsPage`
- `categoryPages.unit`
- `categoryPages.time`
- `categoryPages.color`
- `categoryPages.media`

Remove inflated phrases, fake trust markers, and count-heavy framing.

**Step 5: Verify homepage copy sources**

Run:

```bash
rg -n "\"homepage\"|\"toolsPage\"|\"categoryPages\"" src/messages/en.json src/messages/zh.json
```

Expected: copy reflects a curated public surface and trust-oriented language.

**Step 6: Commit**

```bash
git add src/app/[locale]/page.tsx src/messages/en.json src/messages/zh.json
git commit -m "feat: reposition homepage for ads review trust and curation"
```

### Task 5: Rewrite the Brand and Trust Pages

**Files:**
- Modify: `src/app/[locale]/(pages)/about/page.tsx`
- Modify: `src/app/[locale]/(pages)/contact/page.tsx`
- Modify: `src/app/[locale]/(pages)/privacy/page.tsx`
- Modify: `src/app/[locale]/(pages)/terms/page.tsx`

**Step 1: Rewrite About to sound like an operating product**

Remove template language like:

- "most comprehensive collection"
- unsupported tool counts
- generic starter-like feature claims
- wording mistakes like "Converters tools"

Replace with:

- what the site currently focuses on
- how tools are selected and maintained
- which kinds of tasks are prioritized
- what users should and should not rely on the site for

**Step 2: Rewrite Contact around real support pathways**

Keep or update the current support endpoints, but make the page explain:

- what belongs in bug reports
- what belongs in feature suggestions
- what response users should expect
- which categories are currently actively maintained

**Step 3: Rewrite Privacy and Terms for the actual current behavior**

Make these pages reflect:

- browser-side processing where true
- what telemetry or analytics are used
- ad review context without promising impossible guarantees
- realistic limitations and verification guidance

Avoid frozen old dates and overly generic placeholder legal language.

**Step 4: Verify metadata still matches page content**

Check the page-level metadata generation blocks in each file so titles and descriptions reflect the rewritten content.

**Step 5: Commit**

```bash
git add src/app/[locale]/(pages)/about/page.tsx src/app/[locale]/(pages)/contact/page.tsx src/app/[locale]/(pages)/privacy/page.tsx src/app/[locale]/(pages)/terms/page.tsx
git commit -m "feat: strengthen brand and trust pages for ads review"
```

### Task 6: Upgrade the 12 Review-Approved Tool Content Files

**Files:**
- Modify: `src/data/tools/unit/temperature-converter-en.json`
- Modify: `src/data/tools/unit/length-converter-en.json`
- Modify: `src/data/tools/unit/weight-converter-en.json`
- Modify: `src/data/tools/unit/volume-converter-en.json`
- Modify: `src/data/tools/time/timestamp-converter-en.json`
- Modify: `src/data/tools/time/timezone-converter-en.json`
- Modify: `src/data/tools/time/date-difference-calculator-en.json`
- Modify: `src/data/tools/color/rgb-to-hex-converter-en.json`
- Modify: `src/data/tools/color/hex-to-rgb-converter-en.json`
- Modify: `src/data/tools/color/color-picker-tool-en.json`
- Modify: `src/data/tools/color/contrast-checker-en.json`
- Modify: `src/data/tools/media/jpg-to-png-converter-en.json`
- Modify: the matching `-zh.json` files for the same 12 tools

**Step 1: Upgrade "about" content**

Ensure each file explains:

- what the tool solves
- who typically uses it
- what the output means
- where mistakes usually happen

**Step 2: Upgrade "how to" content**

Turn generic steps into workflow-specific actions. Example for timestamp conversion:

```json
{
  "title": "Check whether the input is in seconds or milliseconds",
  "description": "10-digit Unix values are usually seconds; 13-digit values are usually milliseconds."
}
```

**Step 3: Upgrade "features" content**

Avoid generic filler like "fast and accurate". Replace with features that explain real utility, such as:

- automatic second vs millisecond detection
- UTC vs local display handling
- WCAG ratio interpretation
- transparency limitation notes for image conversion

**Step 4: Rewrite FAQs to be tool-specific**

Every FAQ should answer a real edge case or interpretation issue. Do not keep keyword-stuffed or repetitive questions.

**Step 5: Add details where the existing layout benefits**

If a page needs result-interpretation paragraphs, extend `normalize-tool-content.ts` and `EnhancedToolLayout.tsx` so `details` from JSON are rendered consistently.

If the current layout is sufficient without details, skip this extension.

**Step 6: Verify file coverage**

Run:

```bash
find src/data/tools -type f | rg "(temperature-converter|length-converter|weight-converter|volume-converter|timestamp-converter|timezone-converter|date-difference-calculator|rgb-to-hex-converter|hex-to-rgb-converter|color-picker-tool|contrast-checker|jpg-to-png-converter)-(en|zh)\\.json$"
```

Expected: all 24 localized content files are present and updated.

**Step 7: Commit**

```bash
git add src/data/tools/unit src/data/tools/time src/data/tools/color src/data/tools/media src/components/tools/EnhancedToolLayout.tsx src/utils/normalize-tool-content.ts src/types/tool-content.ts
git commit -m "feat: deepen review-approved tool content"
```

Remove untouched files from the command before committing.

### Task 7: Final Review Readiness Pass

**Files:**
- Review only; modify as needed based on findings

**Step 1: Search for outdated scale claims and template wording**

Run:

```bash
rg -n "250\\+|most comprehensive|professional-grade|Converters tools|free forever|no data collected|24/7|thousands of professionals|works offline" src/app src/messages src/data/tools
```

Expected: only intentional, defensible claims remain.

**Step 2: Validate curated visibility**

Run:

```bash
rg -n "getPopularTools\\(|getToolsByAllCategories\\(|getToolsByCategory\\(" src/app/[locale]/page.tsx src/app/[locale]/tools/page.tsx src/app/[locale]/(tools)
```

Expected: public landing and category pages use the review-approved helpers where appropriate.

**Step 3: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS

**Step 4: Manual smoke-check pages**

Check these pages locally:

- `/`
- `/tools`
- `/unit`
- `/time`
- `/color`
- `/media`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- all 12 approved tool URLs

Confirm:

- only approved tools are promoted
- no broken internal links
- no empty sections
- no obviously machine-generated wording
- non-core categories are no longer promoted

**Step 5: Commit**

```bash
git add src
git commit -m "chore: finalize ads review optimization pass"
```

Remove unrelated files before committing.

### Task 8: Post-Deploy Review Submission Checklist

**Files:**
- Modify if needed: `docs/DEPLOYMENT_CHECKLIST.md`
- Optional create: `docs/ADS_REVIEW_CHECKLIST.md`

**Step 1: Record the operational checklist**

Document:

- deploy date
- sitemap verification date
- crawl/indexing spot-check date
- review request date
- the exact 12-tool public set for this cycle

**Step 2: Wait for crawl refresh**

After deploy, allow time for Google to recrawl the changed homepage, sitemap, and trust pages before requesting review again.

**Step 3: Commit**

```bash
git add docs/DEPLOYMENT_CHECKLIST.md docs/ADS_REVIEW_CHECKLIST.md
git commit -m "docs: add ads review submission checklist"
```

Only include files you actually changed.
