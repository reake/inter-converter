import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { RPMCalculator } from '@/components/converters/automotive/RPMCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/rpm-calculator-en.json';
import zhTool from '@/data/tools/auto/rpm-calculator-zh.json';
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

  // Localized catalog and helper
  const entry = getLocalizedToolEntry(l, 'rpm-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'RPM Calculator';
  const description: string = entry?.description ?? 'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter.';
  const baseKeywords = generateOptimizedKeywords('rpm-calculator', 'auto', 'RPM Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;


  return buildToolPageMetadata({
    locale: l,
    category: 'auto',
    toolId: 'rpm-calculator',
    title,
    description,
    keywords,
    path: '/auto/rpm-calculator'
  });
}

export default async function RPMCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Tool-specific localized content (strongly typed)
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const faqsFromJson = Array.isArray(toolContent.faqs) ? toolContent.faqs : [];
  const faqs = faqsFromJson.length > 0
    ? faqsFromJson
    : getFAQsByToolId('rpm-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const entry = getLocalizedToolEntry(l, 'rpm-calculator', autoEn as ToolCatalogEntry[], autoZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name || 'RPM Calculator';
  const descriptionText: string = entry?.description || 'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter.';
  const baseKeywords = generateOptimizedKeywords('rpm-calculator', 'auto', 'RPM Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="rpm-calculator"
      category="auto"
      locale={l}
      emoji="🌀"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <RPMCalculator />
    </EnhancedToolLayout>
  );
}
