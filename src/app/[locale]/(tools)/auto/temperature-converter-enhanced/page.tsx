import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/converters/automotive/AutomotiveTemperatureConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/temperature-converter-enhanced-en.json';
import zhTool from '@/data/tools/auto/temperature-converter-enhanced-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'temperature-converter-enhanced', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Automotive Temperature Converter';
  const description: string = entry?.description ?? 'Convert engine temperatures between Fahrenheit and Celsius. Free automotive temperature converter for coolant, oil, and engine diagnostics with normal operating ranges.';
  const baseKeywords = generateOptimizedKeywords('temperature-converter-enhanced', 'auto', 'Automotive Temperature Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'temperature-converter-enhanced',
    title,
    description,
    keywords,
    path: '/auto/temperature-converter-enhanced'
  });
}

export default async function AutomotiveTemperatureConverterPage({
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
    : getFAQsByToolId('temperature-converter-enhanced', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'temperature-converter-enhanced', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Automotive Temperature Converter';
  const descriptionText: string = entry?.description || 'Convert between Fahrenheit and Celsius for automotive applications. Perfect for engine diagnostics, coolant temperature monitoring, and maintenance.';
  const baseKeywords = generateOptimizedKeywords('temperature-converter-enhanced', 'auto', 'Automotive Temperature Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="temperature-converter-enhanced"
      category="auto"
      locale={l}
      emoji="🌡️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <AutomotiveTemperatureConverter />
    </EnhancedToolLayout>
  );
}
