import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PowerToWeightCalculator from '@/components/converters/automotive/PowerToWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/power-to-weight-ratio-en.json';
import zhTool from '@/data/tools/auto/power-to-weight-ratio-zh.json';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';
import { normalizeToolContent } from '@/utils/normalize-tool-content';
import { buildToolPageMetadata } from '@/lib/seo/tool-page-metadata';
import { getLocalizedToolEntry, type ToolCatalogEntry } from '@/lib/tool-page-catalog';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const entry = getLocalizedToolEntry(l, 'power-to-weight-ratio', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Power to Weight Ratio Calculator';
  const description: string = entry?.description ?? 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('power-to-weight-ratio', 'auto', 'Power to Weight Ratio Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'power-to-weight-ratio',
    title,
    description,
    keywords,
    path: '/auto/power-to-weight-ratio'
  });
}

export default async function PowerToWeightRatioPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const faqsFromJson = Array.isArray(toolContent.faqs) ? toolContent.faqs : [];
  const faqs = faqsFromJson.length > 0
    ? faqsFromJson
    : getFAQsByToolId('power-to-weight-ratio', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'power-to-weight-ratio', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Power to Weight Ratio Calculator';
  const descriptionText: string = entry?.description || 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential for any vehicle.';
  const baseKeywords = generateOptimizedKeywords('power-to-weight-ratio', 'auto', 'Power to Weight Ratio Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="power-to-weight-ratio"
      category="auto"
      locale={l}
      emoji="⚡"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <PowerToWeightCalculator />
    </EnhancedToolLayout>
  );
}
