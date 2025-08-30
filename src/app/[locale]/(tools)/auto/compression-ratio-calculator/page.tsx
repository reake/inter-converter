import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { CompressionRatioCalculator } from '@/components/converters/automotive/CompressionRatioCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/compression-ratio-calculator-en.json';
import zhTool from '@/data/tools/auto/compression-ratio-calculator-zh.json';
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

  // Localized catalog and helper
  const catalogs: Record<string, any[]> = {
    en: autoEn as any[],
    zh: (autoZh as any[]) || (autoEn as any[])
  };
  const getEntry = (id: string) => {
    const list = catalogs[l] || catalogs.en;
    return list.find((it) => it.id === id) || catalogs.en.find((it) => it.id === id);
  };
  const entry = getEntry('compression-ratio-calculator');

  const toolName: string = entry?.name ?? 'Compression Ratio Calculator';
  const description: string = entry?.description ?? 'Calculate horsepower changes from compression ratio modifications';
  const baseKeywords = generateOptimizedKeywords('compression-ratio-calculator', 'auto', 'Compression Ratio Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/auto/compression-ratio-calculator`;

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
          url: '/images/og-compression-ratio-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/auto/compression-ratio-calculator',
        zh: '/zh/auto/compression-ratio-calculator'
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

export default async function CompressionRatioCalculatorPage({
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
    : getFAQsByToolId('compression-ratio-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogs: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'compression-ratio-calculator') || (autoEn as any[]).find((it) => it.id === 'compression-ratio-calculator');

  const toolName: string = entry?.name || 'Compression Ratio Calculator';
  const descriptionText: string = entry?.description || 'Calculate horsepower changes from compression ratio modifications';
  const baseKeywords = generateOptimizedKeywords('compression-ratio-calculator', 'auto', 'Compression Ratio Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="compression-ratio-calculator"
      category="auto"
      locale={l}
      emoji="⚙️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <CompressionRatioCalculator />
    </EnhancedToolLayout>
  );
}