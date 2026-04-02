import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/health/bmi-calculator-en.json';
import zhTool from '@/data/tools/health/bmi-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'bmi-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'BMI Calculator';
  const description: string = entry?.description ?? 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories, ideal weight ranges & personalized recommendations.';
  const baseKeywords = generateOptimizedKeywords('bmi-calculator', 'health', 'BMI Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'health',
    toolId: 'bmi-calculator',
    title,
    description,
    keywords,
    path: '/health/bmi-calculator'
  });
}

export default async function BMICalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const entry = getLocalizedToolEntry(l, 'bmi-calculator', healthEn as ToolCatalogEntry[], healthZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'BMI Calculator';
  const descriptionText: string = entry?.description || 'Calculate your Body Mass Index (BMI) and get personalized health recommendations with instant calculations.';
  const baseKeywords = generateOptimizedKeywords('bmi-calculator', 'health', 'BMI Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="bmi-calculator"
      category="health"
      locale={l}
      emoji="⚖️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}