import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import DataConverter from '@/components/converters/unit/DataConverter';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/unit/data-converter-en.json';
import zhTool from '@/data/tools/unit/data-converter-zh.json';
import unitEn from '@/data/tools/unit.json';
import unitZh from '@/data/tools/unit-zh.json';
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
    en: unitEn as any[],
    zh: (unitZh as any[]) || (unitEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'data-converter') || catalogs.en.find((it) => it.id === 'data-converter');

  const toolName: string = entry?.name ?? 'DataConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('data-converter', 'unit', 'DataConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/unit/data-converter`;

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
          url: '/images/og-data-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/unit/data-converter',
        zh: '/zh/unit/data-converter'
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

export default async function DataConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const catalogs: Record<string, any[]> = {
    en: unitEn as any[],
    zh: (unitZh as any[]) || (unitEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'data-converter') || catalogs.en.find((it) => it.id === 'data-converter');

  const toolName: string = entry?.name ?? 'DataConverter';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('data-converter', 'unit', 'DataConverter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="data-converter"
      category="unit"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <DataConverter />
    </EnhancedToolLayout>
  );
}
