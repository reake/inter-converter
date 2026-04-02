import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WorldClock } from '@/components/converters/time/WorldClock';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/world-clock-en.json';
import zhTool from '@/data/tools/time/world-clock-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'world-clock', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'World Clock';
  const description: string = entry?.description ?? 'Track time across multiple time zones worldwide. Live world clock with popular cities and UTC reference time.';
  const baseKeywords = generateOptimizedKeywords('world-clock', 'time', 'World Clock');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'time',
    toolId: 'world-clock',
    title,
    description,
    keywords,
    path: '/time/world-clock'
  });
}

export default async function WorldClockPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'world-clock', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'World Clock';
  const description: string = entry?.description ?? 'Track time across multiple time zones worldwide with live updates and popular city times.';
  const baseKeywords = generateOptimizedKeywords('world-clock', 'time', 'World Clock');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="world-clock"
      category="time"
      emoji="🌍"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <WorldClock />
    </EnhancedToolLayout>
  );
}
