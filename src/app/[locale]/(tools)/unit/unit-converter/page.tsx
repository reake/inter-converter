import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { UnitConverter } from '@/components/converters/unit/UnitConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/unit/unit-converter-en.json';
import zhTool from '@/data/tools/unit/unit-converter-zh.json';
import unitEn from '@/data/tools/unit.json';
import unitZh from '@/data/tools/unit-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'unit-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'UnitConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('unit-converter', 'unit', 'UnitConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'unit',
    toolId: 'unit-converter',
    title,
    description,
    keywords,
    path: '/unit/unit-converter'
  });
}

export default async function UnitConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'unit-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'UnitConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('unit-converter', 'unit', 'UnitConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="unit-converter"
      category="unit"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <UnitConverter />
    </EnhancedToolLayout>
  );
}
