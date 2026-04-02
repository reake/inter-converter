import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import OnlineStopwatch from '@/components/converters/time/OnlineStopwatch';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/online-stopwatch-en.json';
import zhTool from '@/data/tools/time/online-stopwatch-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'online-stopwatch', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'OnlineStopwatch';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('online-stopwatch', 'time', 'OnlineStopwatch');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'time',
    toolId: 'online-stopwatch',
    title,
    description,
    keywords,
    path: '/time/online-stopwatch'
  });
}

export default async function OnlineStopwatchPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'online-stopwatch', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'OnlineStopwatch';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('online-stopwatch', 'time', 'OnlineStopwatch');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="online-stopwatch"
      category="time"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <OnlineStopwatch />
    </EnhancedToolLayout>
  );
}
