import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WorkingDaysCalculator } from '@/components/converters/time/WorkingDaysCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/time/working-days-calculator-en.json';
import zhTool from '@/data/tools/time/working-days-calculator-zh.json';
import timeEn from '@/data/tools/time.json';
import timeZh from '@/data/tools/time-zh.json';
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
    en: timeEn as any[],
    zh: (timeZh as any[]) || (timeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'working-days-calculator') || catalogs.en.find((it) => it.id === 'working-days-calculator');

  const toolName: string = entry?.name ?? 'WorkingDaysCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('working-days-calculator', 'time', 'WorkingDaysCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `${l === "en" ? "" : "/" + l}/time/working-days-calculator`;

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
          url: '/icons/icon-512x512.png',
          width: 512,
          height: 512,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/time/working-days-calculator',
        zh: '/zh/time/working-days-calculator'
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

export default async function WorkingDaysCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const catalogs: Record<string, any[]> = {
    en: timeEn as any[],
    zh: (timeZh as any[]) || (timeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'working-days-calculator') || catalogs.en.find((it) => it.id === 'working-days-calculator');

  const toolName: string = entry?.name ?? 'WorkingDaysCalculator';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('working-days-calculator', 'time', 'WorkingDaysCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="working-days-calculator"
      category="time"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <WorkingDaysCalculator />
    </EnhancedToolLayout>
  );
}
