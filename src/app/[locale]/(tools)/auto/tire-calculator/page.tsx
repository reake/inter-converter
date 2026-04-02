import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TireCalculator } from '@/components/converters/automotive/TireCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/tire-calculator-en.json';
import zhTool from '@/data/tools/auto/tire-calculator-zh.json';
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

  // Localized catalog and helper
  const entry = getLocalizedToolEntry(l, 'tire-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Tire Calculator';
  const description: string = entry?.description ?? 'Calculate how tire diameter changes affect vehicle speed, RPM, and performance.';
  const baseKeywords = generateOptimizedKeywords('tire-calculator', 'auto', 'Tire Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'tire-calculator',
    title,
    description,
    keywords,
    path: '/auto/tire-calculator'
  });
}

export default async function TireCalculatorPage({
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
    : getFAQsByToolId('tire-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'tire-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Tire Calculator';
  const descriptionText: string = entry?.description || 'Calculate how tire diameter changes affect vehicle speed, RPM, and performance.';
  const baseKeywords = generateOptimizedKeywords('tire-calculator', 'auto', 'Tire Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="tire-calculator"
      category="auto"
      locale={l}
      emoji="🛞"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <TireCalculator />
    </EnhancedToolLayout>
  );
}
