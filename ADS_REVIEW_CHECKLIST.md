# ADS REVIEW CHECKLIST

## Completed changes
- Removed media tools from the review-approved public surface in `src/config/tools-loader.ts`.
- Media category page now explains review status and is set to `noindex` in `src/app/[locale]/(tools)/media/page.tsx`.
- Placeholder media tool pages now present themselves as review notes instead of launched products:
  - `src/app/[locale]/(tools)/media/jpg-to-png-converter/page.tsx`
  - `src/app/[locale]/(tools)/media/pdf-to-word-converter/page.tsx`
- Rewrote misleading placeholder content JSON to match the current non-public state:
  - `src/data/tools/media/jpg-to-png-converter-en.json`
  - `src/data/tools/media/jpg-to-png-converter-zh.json`
  - `src/data/tools/media/pdf-to-word-converter-en.json`
  - `src/data/tools/media/pdf-to-word-converter-zh.json`
- Removed unsafe shared claims from `src/components/tools/EnhancedToolLayout.tsx`.
- Softened promotional structured data and manifest copy:
  - `src/components/tools/StructuredData.tsx`
  - `src/components/seo/JsonLd.tsx`
  - `public/manifest.json`
- Expanded privacy policy to explicitly disclose analytics, advertising, cookies, and ad-personalization controls in `src/app/[locale]/(pages)/privacy/page.tsx`.
- Replaced remaining high-risk “all tools run locally / privacy protected / professional-grade” style strings in shared content:
  - `src/messages/en.json`
  - `src/messages/zh.json`
  - `src/hooks/useTranslation.ts`
  - `src/config/content-templates.ts`
  - `src/config/seo.ts`

## Public pages currently safest for review
- Homepage: `/`
- Featured tools index: `/tools`
- About: `/about`
- Privacy: `/privacy`
- Terms: `/terms`
- Contact: `/contact`
- Review-approved tool categories and pages under:
  - `/unit/*` for approved tools only
  - `/time/*` for approved tools only
  - `/color/*` for approved tools only

## Pages intentionally excluded or de-emphasized
- Media category: `/media` is informational only and should remain `noindex`.
- Media tool placeholders are not part of the featured public surface:
  - `/media/jpg-to-png-converter`
  - `/media/pdf-to-word-converter`
- Any page that is incomplete, thin, inconsistent with implementation, or still under review should stay out of:
  - review-approved tool lists
  - homepage promotion
  - featured category promotion
  - sitemap-driven public exposure

## Policy consistency checks
- If `GoogleAnalytics` or `GoogleAdsense` loads in `src/app/layout.tsx`, do not claim:
  - no tracking
  - no ads
  - no cookies
  - complete anonymity
  - all processing stays local for the entire page
- Client-side tool logic may be described narrowly only when true for that specific workflow.
- Avoid “professional-grade”, “leading provider”, fake trust signals, or unverifiable superlatives on public review surfaces.
- Do not present placeholder tools as if upload, processing, OCR, batch conversion, privacy guarantees, or output quality are already live.

## Remaining follow-up checks
- Re-scan the repo for old marketing or privacy-overclaim strings before release.
- Verify sitemap output no longer includes media pages through the review-approved filter.
- Verify placeholder pages return `noindex` through metadata.
- Confirm contact emails shown publicly are all real and monitored.
- Review Chinese and English copy together after future content edits to avoid policy drift.

## Release gate
Before using a page for ads or major public promotion, confirm all of the following:
- The page reflects the real implementation state.
- Metadata, structured data, and visible copy say the same thing.
- Privacy wording matches actual analytics / ad-tech loading.
- The page is not thin, misleading, or still effectively “coming soon”.
- Any important outputs include natural verification framing where appropriate.
