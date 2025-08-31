import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/finance/money-market-calculator-en.json';
import zhTool from '@/data/tools/finance/money-market-calculator-zh.json';
import financeEn from '@/data/tools/finance.json';
import financeZh from '@/data/tools/finance-zh.json';
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
    en: financeEn as any[],
    zh: (financeZh as any[]) || (financeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'money-market-calculator') || catalogs.en.find((it) => it.id === 'money-market-calculator');

  const toolName: string = entry?.name ?? 'SavingsCalculator';
  const description: string = entry?.description ?? 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('money-market-calculator', 'finance', 'SavingsCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/finance/money-market-calculator`;

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
          url: '/images/og-money-market-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/finance/money-market-calculator',
        zh: '/zh/finance/money-market-calculator'
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

export default async function SavingsCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const fallbackContent: ToolContent = enTool;

  const about = toolContent.about?.length ? toolContent.about : fallbackContent.about;
  const howToUse = toolContent.howToUse?.length ? toolContent.howToUse : fallbackContent.howToUse;
  const features = toolContent.features?.length ? toolContent.features : fallbackContent.features;
  const faqs = toolContent.faqs?.length ? toolContent.faqs : fallbackContent.faqs;

  const catalogs: Record<string, any[]> = { en: financeEn as any[], zh: (financeZh as any[]) || (financeEn as any[]) };
  const entry = catalogs[l]?.find((it) => it.id === 'money-market-calculator') || catalogs.en.find((it) => it.id === 'money-market-calculator');

  const toolName: string = entry?.name || 'SavingsCalculator';
  const descriptionText: string = entry?.description || 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('money-market-calculator', 'finance', 'SavingsCalculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="money-market-calculator"
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
