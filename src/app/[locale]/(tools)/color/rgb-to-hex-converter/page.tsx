import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RgbToHexConverter from '@/components/converters/color/RgbToHexConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/rgb-to-hex-converter-en.json';
import zhTool from '@/data/tools/color/rgb-to-hex-converter-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'rgb-to-hex-converter', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'RGB to HEX Color Converter';
  const description: string = entry?.description ?? 'Convert RGB to HEX color codes with preview, common colors, a web-safe palette, and CSS code generation for web design and development.';
  const baseKeywords = generateOptimizedKeywords('rgb-to-hex-converter', 'color', 'RGB to HEX Color Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'color',
    toolId: 'rgb-to-hex-converter',
    title,
    description,
    keywords,
    path: '/color/rgb-to-hex-converter'
  });
}

export default async function RgbToHexConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const entry = getLocalizedToolEntry(l, 'rgb-to-hex-converter', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'RGB to HEX Color Converter';
  const descriptionText: string = entry?.description || 'Convert RGB color values to HEX codes with real-time preview.';
  const baseKeywords = generateOptimizedKeywords('rgb-to-hex-converter', 'color', 'RGB to HEX Color Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="rgb-to-hex-converter"
      category="color"
      locale={l}
      emoji="🎨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <RgbToHexConverter />
    </EnhancedToolLayout>
  );
}
