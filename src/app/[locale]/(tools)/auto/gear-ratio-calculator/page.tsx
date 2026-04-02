import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/gear-ratio-calculator-en.json';
import zhTool from '@/data/tools/auto/gear-ratio-calculator-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'gear-ratio-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'Gear Ratio Calculator';
  const description: string = entry?.description ?? 'Calculate gear ratios from ring and pinion teeth and optimize drivetrain performance. Professional, fast, and free gear ratio calculator for automotive use.';
  const baseKeywords = generateOptimizedKeywords('gear-ratio-calculator', 'auto', 'Gear Ratio Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'gear-ratio-calculator',
    title,
    description,
    keywords,
    path: '/auto/gear-ratio-calculator'
  });
}

export default async function GearRatioCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'gear-ratio-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'Gear Ratio Calculator';
  const descriptionText: string = entry?.description || 'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance tuning and drivetrain optimization.';
  const baseKeywords = generateOptimizedKeywords('gear-ratio-calculator', 'auto', 'Gear Ratio Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="gear-ratio-calculator"
      category="auto"
      locale={l}
      emoji="⚙️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <GearRatioCalculator />
    </EnhancedToolLayout>
  );
}
