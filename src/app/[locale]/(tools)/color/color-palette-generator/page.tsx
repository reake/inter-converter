import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ColorPaletteGenerator } from '@/components/converters/color/ColorPaletteGenerator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/color-palette-generator-en.json';
import zhTool from '@/data/tools/color/color-palette-generator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'color-palette-generator', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Color Palette Generator';
  const description: string = entry?.description ?? 'Generate beautiful color palettes using color theory. Create monochromatic, complementary, triadic and other color schemes instantly for web design and branding.';
  const baseKeywords = generateOptimizedKeywords('color-palette-generator', 'color', 'Color Palette Generator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'color',
    toolId: 'color-palette-generator',
    title,
    description,
    keywords,
    path: '/color/color-palette-generator'
  });
}

export default async function ColorPaletteGeneratorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const entry = getLocalizedToolEntry(l, 'color-palette-generator', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Color Palette Generator';
  const descriptionText: string = entry?.description || 'Generate beautiful color palettes using color theory with instant calculations and harmonious color schemes.';
  const baseKeywords = generateOptimizedKeywords('color-palette-generator', 'color', 'Color Palette Generator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="color-palette-generator"
      category="color"
      locale={l}
      emoji="🎨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <ColorPaletteGenerator />
    </EnhancedToolLayout>
  );
}
