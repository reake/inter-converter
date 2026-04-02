import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/finance/high-yield-savings-calculator-en.json';
import zhTool from '@/data/tools/finance/high-yield-savings-calculator-zh.json';
import financeEn from '@/data/tools/finance.json';
import financeZh from '@/data/tools/finance-zh.json';
import { normalizeToolContent } from '@/utils/normalize-tool-content';
import { buildToolPageMetadata, resolveToolPageDescription } from '@/lib/seo/tool-page-metadata';
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

  const entry = getLocalizedToolEntry(l, 'high-yield-savings-calculator', financeEn as ToolCatalogEntry[], financeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'SavingsCalculator';
  const description: string = resolveToolPageDescription(entry?.description, 'finance');
  const baseKeywords = generateOptimizedKeywords('high-yield-savings-calculator', 'finance', 'SavingsCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'finance',
    toolId: 'high-yield-savings-calculator',
    title,
    description,
    keywords,
    path: '/finance/high-yield-savings-calculator'
  });
}

export default async function SavingsCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const fallbackContent = normalizeToolContent(enTool);

  const about = toolContent.about?.length ? toolContent.about : fallbackContent.about;
  const howToUse = toolContent.howToUse?.length ? toolContent.howToUse : fallbackContent.howToUse;
  const features = toolContent.features?.length ? toolContent.features : fallbackContent.features;
  const faqs = toolContent.faqs?.length ? toolContent.faqs : fallbackContent.faqs;

  const entry = getLocalizedToolEntry(l, 'high-yield-savings-calculator', financeEn as ToolCatalogEntry[], financeZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'SavingsCalculator';
  const descriptionText: string = resolveToolPageDescription(entry?.description, 'finance');
  const baseKeywords = generateOptimizedKeywords('high-yield-savings-calculator', 'finance', 'SavingsCalculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="high-yield-savings-calculator"
      category="finance"
      locale={l}
      emoji="💰"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
