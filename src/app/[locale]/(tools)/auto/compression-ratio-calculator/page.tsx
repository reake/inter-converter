import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { CompressionRatioCalculator } from '@/components/converters/automotive/CompressionRatioCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/compression-ratio-calculator-en.json';
import zhTool from '@/data/tools/auto/compression-ratio-calculator-zh.json';
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
  const entry = getLocalizedToolEntry(l, 'compression-ratio-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Compression Ratio Calculator';
  const description: string = entry?.description ?? 'Calculate horsepower changes from compression ratio modifications';
  const baseKeywords = generateOptimizedKeywords('compression-ratio-calculator', 'auto', 'Compression Ratio Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'compression-ratio-calculator',
    title,
    description,
    keywords,
    path: '/auto/compression-ratio-calculator'
  });
}

export default async function CompressionRatioCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  
  const faqs = toolContent.faqs && toolContent.faqs.length > 0
    ? toolContent.faqs
    : getFAQsByToolId('compression-ratio-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'compression-ratio-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Compression Ratio Calculator';
  const descriptionText: string = entry?.description || 'Calculate horsepower changes from compression ratio modifications';
  const baseKeywords = generateOptimizedKeywords('compression-ratio-calculator', 'auto', 'Compression Ratio Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="compression-ratio-calculator"
      category="auto"
      locale={l}
      emoji="⚙️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <CompressionRatioCalculator />
    </EnhancedToolLayout>
  );
}