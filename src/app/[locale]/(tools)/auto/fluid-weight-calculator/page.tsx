import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { FluidWeightCalculator } from '@/components/converters/automotive/FluidWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/fluid-weight-calculator-en.json';
import zhTool from '@/data/tools/auto/fluid-weight-calculator-zh.json';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'fluid-weight-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Fluid Weight Calculator';
  const description: string = entry?.description ?? 'Calculate weight of automotive fluids including oil, coolant, and fuel. Free fluid weight calculator for automotive applications with accurate density calculations.';
  const baseKeywords = generateOptimizedKeywords('fluid-weight-calculator', 'auto', 'Fluid Weight Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'fluid-weight-calculator',
    title,
    description,
    keywords,
    path: '/auto/fluid-weight-calculator'
  });
}

export default async function FluidWeightCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const faqsFromJson = Array.isArray(toolContent.faqs) ? toolContent.faqs : [];
  const faqs = faqsFromJson.length > 0
    ? faqsFromJson
    : getFAQsByToolId('fluid-weight-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'fluid-weight-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Fluid Weight Calculator';
  const descriptionText: string = entry?.description || 'Calculate weight of automotive fluids including oil, coolant, and fuel. Essential for weight distribution and capacity planning.';
  const baseKeywords = generateOptimizedKeywords('fluid-weight-calculator', 'auto', 'Fluid Weight Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="fluid-weight-calculator"
      category="auto"
      locale={l}
      emoji="⚖️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <FluidWeightCalculator />
    </EnhancedToolLayout>
  );
}
