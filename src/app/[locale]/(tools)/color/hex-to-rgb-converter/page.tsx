import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import HexToRgbConverter from '@/components/converters/color/HexToRgbConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/hex-to-rgb-converter-en.json';
import zhTool from '@/data/tools/color/hex-to-rgb-converter-zh.json';
import colorEn from '@/data/tools/color.json';
import colorZh from '@/data/tools/color-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'hex-to-rgb-converter', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'HEX to RGB Converter';
  const description: string = entry?.description ?? 'Convert HEX color codes to RGB values and vice versa. Free color converter with color picker and preview for web designers and developers.';
  const baseKeywords = generateOptimizedKeywords('hex-to-rgb-converter', 'color', 'HEX to RGB Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'color',
    toolId: 'hex-to-rgb-converter',
    title,
    description,
    keywords,
    path: '/color/hex-to-rgb-converter'
  });
}

export default async function HexToRgbConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'hex-to-rgb-converter', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'HEX to RGB Converter';
  const descriptionText: string = entry?.description || 'Convert HEX color codes to RGB values and vice versa with precision and instant calculations.';
  const baseKeywords = generateOptimizedKeywords('hex-to-rgb-converter', 'color', 'HEX to RGB Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="hex-to-rgb-converter"
      category="color"
      locale={l}
      emoji="🎨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <HexToRgbConverter />
    </EnhancedToolLayout>
  );
}