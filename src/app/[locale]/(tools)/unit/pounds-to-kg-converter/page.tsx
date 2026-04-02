import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PoundsToKgConverter from '@/components/converters/unit/PoundsToKgConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/unit/pounds-to-kg-converter-en.json';
import zhTool from '@/data/tools/unit/pounds-to-kg-converter-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'pounds-to-kg-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'PoundsToKgConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('pounds-to-kg-converter', 'unit', 'PoundsToKgConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'unit',
    toolId: 'pounds-to-kg-converter',
    title,
    description,
    keywords,
    path: '/unit/pounds-to-kg-converter'
  });
}

export default async function PoundsToKgConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'pounds-to-kg-converter', unitEn as ToolCatalogEntry[], unitZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'PoundsToKgConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('pounds-to-kg-converter', 'unit', 'PoundsToKgConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="pounds-to-kg-converter"
      category="unit"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <PoundsToKgConverter />
    </EnhancedToolLayout>
  );
}
