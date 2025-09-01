import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/converters/automotive/AutomotiveTemperatureConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/temperature-converter-en.json';
import zhTool from '@/data/tools/auto/temperature-converter-zh.json';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';
import { ToolContent } from '@/types/tool-content';
import { normalizeToolContent } from '@/utils/normalize-tool-content';

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
  const entry = getEntry('temperature-converter');

  const toolName: string = entry?.name ?? 'Automotive Temperature Converter';
  const description: string = entry?.description ?? 'Convert engine temperatures between Fahrenheit and Celsius. Free automotive temperature converter for coolant, oil, and engine diagnostics with normal operating ranges.';
  const baseKeywords = generateOptimizedKeywords('temperature-converter', 'auto', 'Automotive Temperature Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/auto/temperature-converter`;

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
          url: '/images/og-automotive-temperature-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/auto/temperature-converter',
        zh: '/zh/auto/temperature-converter'
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

export default async function AutomotiveTemperatureConverterPage({
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
    : getFAQsByToolId('temperature-converter', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogMap: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogMap[l] || (autoEn as any[]);
  const entry = catalog.find((it) => it.id === 'temperature-converter') || (autoEn as any[]).find((it) => it.id === 'temperature-converter');

  const toolName: string = entry?.name || 'Automotive Temperature Converter';
  const descriptionText: string = entry?.description || 'Convert between Fahrenheit and Celsius for automotive applications. Perfect for engine diagnostics, coolant temperature monitoring, and maintenance.';
  const baseKeywords = generateOptimizedKeywords('temperature-converter', 'auto', 'Automotive Temperature Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="temperature-converter"
      category="auto"
      locale={l}
      emoji="🌡️"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <AutomotiveTemperatureConverter />
    </EnhancedToolLayout>
  );
}
