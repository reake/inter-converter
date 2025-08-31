import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InterestOnlyMortgageCalculator from '@/components/converters/finance/InterestOnlyMortgageCalculator';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/finance/interest-only-mortgage-calculator-en.json';
import zhTool from '@/data/tools/finance/interest-only-mortgage-calculator-zh.json';
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
  const entry = catalogs[l]?.find((it) => it.id === 'interest-only-mortgage-calculator') || catalogs.en.find((it) => it.id === 'interest-only-mortgage-calculator');

  const toolName: string = entry?.name ?? 'InterestOnlyMortgageCalculator';
  const description: string = entry?.description ?? 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('interest-only-mortgage-calculator', 'finance', 'InterestOnlyMortgageCalculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/finance/interest-only-mortgage-calculator`;

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
          url: '/images/og-interest-only-mortgage-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/finance/interest-only-mortgage-calculator',
        zh: '/zh/finance/interest-only-mortgage-calculator'
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

export default async function InterestOnlyMortgageCalculatorPage({
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
  const entry = catalogs[l]?.find((it) => it.id === 'interest-only-mortgage-calculator') || catalogs.en.find((it) => it.id === 'interest-only-mortgage-calculator');

  const toolName: string = entry?.name || 'InterestOnlyMortgageCalculator';
  const descriptionText: string = entry?.description || 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('interest-only-mortgage-calculator', 'finance', 'InterestOnlyMortgageCalculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="interest-only-mortgage-calculator"
      category="finance"
      locale={l}
      emoji="💰"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <InterestOnlyMortgageCalculator />
    </EnhancedToolLayout>
  );
}
