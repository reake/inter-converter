import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TireSpeedCalculator } from '@/components/converters/automotive/TireSpeedCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/tire-speed-calculator-en.json';
import zhTool from '@/data/tools/auto/tire-speed-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'tire-speed-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Tire Speed Calculator';
  const description: string = entry?.description ?? 'Calculate vehicle speed based on tire diameter, gear ratio, and RPM. Essential tool for performance tuning and gear selection with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('tire-speed-calculator', 'auto', 'Tire Speed Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'tire-speed-calculator',
    title,
    description,
    keywords,
    path: '/auto/tire-speed-calculator'
  });
}

export default async function TireSpeedCalculatorPage({
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
    : getFAQsByToolId('tire-speed-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'tire-speed-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Tire Speed Calculator';
  const descriptionText: string = entry?.description || 'Calculate vehicle speed based on tire diameter, gear ratio, and RPM. Essential tool for performance tuning and optimal gear selection.';
  const baseKeywords = generateOptimizedKeywords('tire-speed-calculator', 'auto', 'Tire Speed Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="tire-speed-calculator"
      category="auto"
      locale={l}
      emoji="🏁"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <TireSpeedCalculator />
    </EnhancedToolLayout>
  );
}
