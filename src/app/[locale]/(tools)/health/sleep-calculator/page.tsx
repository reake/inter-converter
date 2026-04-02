import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SleepCalculator from '@/components/converters/health/SleepCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/health/sleep-calculator-en.json';
import zhTool from '@/data/tools/health/sleep-calculator-zh.json';
import healthEn from '@/data/tools/health.json';
import healthZh from '@/data/tools/health-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'sleep-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Sleep Calculator';
  const description: string = entry?.description ?? 'Calculate optimal sleep and wake times based on sleep cycles. Improve sleep quality with personalized sleep schedules and instant calculations.';
  const baseKeywords = generateOptimizedKeywords('sleep-calculator', 'health', 'Sleep Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'health',
    toolId: 'sleep-calculator',
    title,
    description,
    keywords,
    path: '/health/sleep-calculator'
  });
}

export default async function SleepCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load localized content
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const fallbackContent = normalizeToolContent(enTool);

  const about = toolContent.about?.length ? toolContent.about : fallbackContent.about;
  const howToUse = toolContent.howToUse?.length ? toolContent.howToUse : fallbackContent.howToUse;
  const features = toolContent.features?.length ? toolContent.features : fallbackContent.features;
  const faqs = toolContent.faqs?.length ? toolContent.faqs : fallbackContent.faqs;

  const entry = getLocalizedToolEntry(l, 'sleep-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Sleep Calculator';
  const descriptionText: string = entry?.description || 'Calculate optimal bedtime and wake-up times based on sleep cycles for better rest and energy levels.';
  const baseKeywords = generateOptimizedKeywords('sleep-calculator', 'health', 'Sleep Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="sleep-calculator"
      category="health"
      locale={l}
      emoji="😴"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <SleepCalculator />
    </EnhancedToolLayout>
  );
}
