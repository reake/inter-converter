import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import DataConverter from '@/components/converters/unit/DataConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/unit/data-converter-en.json';
import zhTool from '@/data/tools/unit/data-converter-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'data-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'DataConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('data-converter', 'unit', 'DataConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'unit',
    toolId: 'data-converter',
    title,
    description,
    keywords,
    path: '/unit/data-converter'
  });
}

export default async function DataConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'data-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'DataConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('data-converter', 'unit', 'DataConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="data-converter"
      category="unit"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <DataConverter />
    </EnhancedToolLayout>
  );
}
