import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ContrastChecker } from '@/components/converters/color/ContrastChecker';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/contrast-checker-en.json';
import zhTool from '@/data/tools/color/contrast-checker-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'contrast-checker', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Color Contrast Checker';
  const description: string = entry?.description ?? 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure your designs meet accessibility standards with our contrast analyzer.';
  const baseKeywords = generateOptimizedKeywords('contrast-checker', 'color', 'Color Contrast Checker');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'color',
    toolId: 'contrast-checker',
    title,
    description,
    keywords,
    path: '/color/contrast-checker'
  });
}

export default async function ContrastCheckerPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const entry = getLocalizedToolEntry(l, 'contrast-checker', colorEn as ToolCatalogEntry[], colorZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Color Contrast Checker';
  const descriptionText: string = entry?.description || 'Check color contrast ratios for WCAG AA and AAA compliance with instant calculations and accessibility analysis.';
  const baseKeywords = generateOptimizedKeywords('contrast-checker', 'color', 'Color Contrast Checker');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="contrast-checker"
      category="color"
      locale={l}
      emoji="♿"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <ContrastChecker />
    </EnhancedToolLayout>
  );
}
