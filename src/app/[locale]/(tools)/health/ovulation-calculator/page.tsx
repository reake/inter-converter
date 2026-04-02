import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import OvulationCalculator from '@/components/converters/health/OvulationCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/health/ovulation-calculator-en.json';
import zhTool from '@/data/tools/health/ovulation-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'ovulation-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Ovulation Calculator';
  const description: string = entry?.description ?? 'Calculate ovulation dates and fertile window for family planning. Track menstrual cycle and predict best conception times with instant calculations.';
  const baseKeywords = generateOptimizedKeywords('ovulation-calculator', 'health', 'Ovulation Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'health',
    toolId: 'ovulation-calculator',
    title,
    description,
    keywords,
    path: '/health/ovulation-calculator'
  });
}

export default async function OvulationCalculatorPage({
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

  const entry = getLocalizedToolEntry(l, 'ovulation-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Ovulation Calculator';
  const descriptionText: string = entry?.description || 'Predict ovulation dates and fertile windows based on menstrual cycle patterns for family planning.';
  const baseKeywords = generateOptimizedKeywords('ovulation-calculator', 'health', 'Ovulation Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="ovulation-calculator"
      category="health"
      locale={l}
      emoji="🌸"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <OvulationCalculator />
    </EnhancedToolLayout>
  );
}
