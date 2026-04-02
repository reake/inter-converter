import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutoWeightConverter } from '@/components/converters/automotive/AutoWeightConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/auto-weight-converter-en.json';
import zhTool from '@/data/tools/auto/auto-weight-converter-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'auto-weight-converter', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Automotive Weight Converter';
  const description: string = entry?.description ?? 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('auto-weight-converter', 'auto', 'Automotive Weight Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'auto-weight-converter',
    title,
    description,
    keywords,
    path: '/auto/auto-weight-converter'
  });
}

export default async function AutoWeightConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'auto-weight-converter', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Automotive Weight Converter';
  const descriptionText: string = entry?.description || 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations.';
  const baseKeywords = generateOptimizedKeywords('auto-weight-converter', 'auto', 'Automotive Weight Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="auto-weight-converter"
      category="auto"
      locale={l}
      emoji="⚖️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <AutoWeightConverter />
    </EnhancedToolLayout>
  );
}
