import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WorkingDaysCalculator } from '@/components/converters/time/WorkingDaysCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/working-days-calculator-en.json';
import zhTool from '@/data/tools/time/working-days-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'working-days-calculator', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'WorkingDaysCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('working-days-calculator', 'time', 'WorkingDaysCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'time',
    toolId: 'working-days-calculator',
    title,
    description,
    keywords,
    path: '/time/working-days-calculator'
  });
}

export default async function WorkingDaysCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'working-days-calculator', timeEn as ToolCatalogEntry[], timeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'WorkingDaysCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('working-days-calculator', 'time', 'WorkingDaysCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="working-days-calculator"
      category="time"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <WorkingDaysCalculator />
    </EnhancedToolLayout>
  );
}
