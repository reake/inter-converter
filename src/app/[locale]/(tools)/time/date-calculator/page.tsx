import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { DateCalculator } from '@/components/converters/time/DateCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/date-calculator-en.json';
import zhTool from '@/data/tools/time/date-calculator-zh.json';
import timeEn from '@/data/tools/time.json';
import timeZh from '@/data/tools/time-zh.json';
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
    en: timeEn as any[],
    zh: (timeZh as any[]) || (timeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'date-calculator') || catalogs.en.find((it) => it.id === 'date-calculator');

  const toolName: string = entry?.name ?? 'DateCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('date-calculator', 'time', 'DateCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/time/date-calculator`;

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
          url: '/images/og-date-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/time/date-calculator',
        zh: '/zh/time/date-calculator'
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

export default async function DateCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const catalogs: Record<string, any[]> = {
    en: timeEn as any[],
    zh: (timeZh as any[]) || (timeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'date-calculator') || catalogs.en.find((it) => it.id === 'date-calculator');

  const toolName: string = entry?.name ?? 'DateCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('date-calculator', 'time', 'DateCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="date-calculator"
      category="time"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <DateCalculator />
    </EnhancedToolLayout>
  );
}
