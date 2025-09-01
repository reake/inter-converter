import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/finance/retirement-calculator-en.json';
import zhTool from '@/data/tools/finance/retirement-calculator-zh.json';
import financeEn from '@/data/tools/finance.json';
import financeZh from '@/data/tools/finance-zh.json';
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
    en: financeEn as any[],
    zh: (financeZh as any[]) || (financeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'retirement-calculator') || catalogs.en.find((it) => it.id === 'retirement-calculator');

  const toolName: string = entry?.name ?? 'Retirement Calculator';
  const description: string = entry?.description ?? 'Calculate retirement savings needs and timeline. Plan your retirement contributions and estimate required savings for financial independence.';
  const baseKeywords = generateOptimizedKeywords('retirement-calculator', 'finance', 'Retirement Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/finance/retirement-calculator`;

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
          url: '/images/og-retirement-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/finance/retirement-calculator',
        zh: '/zh/finance/retirement-calculator'
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

export default async function RetirementCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const fallbackContent = normalizeToolContent(enTool);

  const about = toolContent.about?.length ? toolContent.about : fallbackContent.about;
  const howToUse = toolContent.howToUse?.length ? toolContent.howToUse : fallbackContent.howToUse;
  const features = toolContent.features?.length ? toolContent.features : fallbackContent.features;
  const faqs = toolContent.faqs?.length ? toolContent.faqs : fallbackContent.faqs;

  const catalogs: Record<string, any[]> = { en: financeEn as any[], zh: (financeZh as any[]) || (financeEn as any[]) };
  const entry = catalogs[l]?.find((it) => it.id === 'retirement-calculator') || catalogs.en.find((it) => it.id === 'retirement-calculator');

  const toolName: string = entry?.name || 'Retirement Calculator';
  const descriptionText: string = entry?.description || 'Calculate retirement savings needs and timeline. Plan your retirement contributions and estimate required savings for financial independence.';
  const baseKeywords = generateOptimizedKeywords('retirement-calculator', 'finance', 'Retirement Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="retirement-calculator"
      category="finance"
      locale={l}
      emoji="🏖️"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
