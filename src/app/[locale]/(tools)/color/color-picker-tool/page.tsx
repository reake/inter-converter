import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import ColorPickerTool from '@/components/converters/color/ColorPickerTool';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/color-picker-tool-en.json';
import zhTool from '@/data/tools/color/color-picker-tool-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'color-picker-tool', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Online Color Picker Tool';
  const description: string = entry?.description ?? 'Professional color picker with HSL controls, color palettes, and history. Generate RGB, HEX, and HSL color codes for web design, graphic design, and development projects.';
  const baseKeywords = generateOptimizedKeywords('color-picker-tool', 'color', 'Online Color Picker Tool');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'color',
    toolId: 'color-picker-tool',
    title,
    description,
    keywords,
    path: '/color/color-picker-tool'
  });
}

export default async function ColorPickerToolPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const entry = getLocalizedToolEntry(l, 'color-picker-tool', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Online Color Picker Tool';
  const descriptionText: string = entry?.description || 'Professional color picker with HSL sliders, preset palettes, and color history with instant calculations.';
  const baseKeywords = generateOptimizedKeywords('color-picker-tool', 'color', 'Online Color Picker Tool');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="color-picker-tool"
      category="color"
      locale={l}
      emoji="🌈"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <ColorPickerTool />
    </EnhancedToolLayout>
  );
}
