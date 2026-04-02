import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { RamAirCalculator } from '@/components/converters/automotive/RamAirCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/ram-air-calculator-en.json';
import zhTool from '@/data/tools/auto/ram-air-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'ram-air-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Ram Air Calculator';
  const description: string = entry?.description ?? 'Calculate ram air effect and dynamic pressure from vehicle speed. Free ram air calculator for automotive intake systems with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('ram-air-calculator', 'auto', 'Ram Air Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'ram-air-calculator',
    title,
    description,
    keywords,
    path: '/auto/ram-air-calculator'
  });
}

export default async function RamAirCalculatorPage({
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
    : getFAQsByToolId('ram-air-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'ram-air-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Ram Air Calculator';
  const descriptionText: string = entry?.description || 'Calculate ram air effect and dynamic pressure from vehicle speed. Essential for intake system design and performance analysis.';
  const baseKeywords = generateOptimizedKeywords('ram-air-calculator', 'auto', 'Ram Air Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="ram-air-calculator"
      category="auto"
      locale={l}
      emoji="💨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <RamAirCalculator />
    </EnhancedToolLayout>
  );
}
