import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutoWeightConverter } from '@/components/converters/automotive/AutoWeightConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/auto-weight-converter-en.json';
import zhTool from '@/data/tools/auto/auto-weight-converter-zh.json';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';
import { ToolContent } from '@/types/tool-content';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const catalogs: Record<string, any[]> = {
    en: autoEn as any[],
    zh: (autoZh as any[]) || (autoEn as any[])
  };
  const getEntry = (id: string) => {
    const list = catalogs[l] || catalogs.en;
    return list.find((it) => it.id === id) || catalogs.en.find((it) => it.id === id);
  };
  const entry = getEntry('auto-weight-converter');

  const toolName: string = entry?.name ?? 'Automotive Weight Converter';
  const description: string = entry?.description ?? 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('auto-weight-converter', 'auto', 'Automotive Weight Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/auto/auto-weight-converter`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: l === 'zh' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: '/images/og-auto-weight-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/auto/auto-weight-converter',
        zh: '/zh/auto/auto-weight-converter'
      }
    },
    authors: [{ name: 'InterConverter Team' }],
    creator: 'InterConverter',
    publisher: 'InterConverter',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function AutoWeightConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const toolContent: ToolContent = l === 'zh' ? (zhTool as ToolContent) : (enTool as ToolContent);

  const faqsFromJson = Array.isArray(toolContent.faqs) ? toolContent.faqs : [];
  const faqs = faqsFromJson.length > 0
    ? faqsFromJson
    : getFAQsByToolId('auto-weight-converter', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogMap: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogMap[l] || (autoEn as any[]);
  const entry = catalog.find((it) => it.id === 'auto-weight-converter') || (autoEn as any[]).find((it) => it.id === 'auto-weight-converter');

  const toolName: string = entry?.name || 'Automotive Weight Converter';
  const descriptionText: string = entry?.description || 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations.';
  const baseKeywords = generateOptimizedKeywords('auto-weight-converter', 'auto', 'Automotive Weight Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="auto-weight-converter"
      category="auto"
      locale={l}
      emoji="⚖️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <AutoWeightConverter />
    </EnhancedToolLayout>
  );
}
