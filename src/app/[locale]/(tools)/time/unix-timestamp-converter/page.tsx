import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TimestampConverter } from '@/components/converters/time/TimestampConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/unix-timestamp-converter-en.json';
import zhTool from '@/data/tools/time/unix-timestamp-converter-zh.json';
import timeEn from '@/data/tools/time.json';
import timeZh from '@/data/tools/time-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'unix-timestamp-converter', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'UnixTimestampConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('unix-timestamp-converter', 'time', 'UnixTimestampConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'time',
    toolId: 'unix-timestamp-converter',
    title,
    description,
    keywords,
    path: '/time/unix-timestamp-converter'
  });
}

export default async function UnixTimestampConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'unix-timestamp-converter', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'UnixTimestampConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('unix-timestamp-converter', 'time', 'UnixTimestampConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="unix-timestamp-converter"
      category="time"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <TimestampConverter />
    </EnhancedToolLayout>
  );
}
