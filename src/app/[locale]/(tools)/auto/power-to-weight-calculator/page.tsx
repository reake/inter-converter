import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PowerToWeightCalculator from '@/components/converters/automotive/PowerToWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';

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
  const entry = getEntry('power-to-weight-calculator');

  const toolName: string = entry?.name ?? 'Power to Weight Calculator';
  const description: string = entry?.description ?? 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential with professional accuracy.';
  const baseKeywords = generateOptimizedKeywords('power-to-weight-calculator', 'auto', 'Power to Weight Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/auto/power-to-weight-calculator`;

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
          url: '/images/og-power-to-weight-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/auto/power-to-weight-calculator',
        zh: '/zh/auto/power-to-weight-calculator'
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

export default async function PowerToWeightCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const faqs = getFAQsByToolId('power-to-weight-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogs: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'power-to-weight-calculator') || (autoEn as any[]).find((it) => it.id === 'power-to-weight-calculator');

  const toolName: string = entry?.name || 'Power to Weight Calculator';
  const descriptionText: string = entry?.description || 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential for any vehicle.';
  const baseKeywords = generateOptimizedKeywords('power-to-weight-calculator', 'auto', 'Power to Weight Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="power-to-weight-calculator"
      category="auto"
      locale={l}
      emoji="⚡"
      customHowToUse={[
        "Enter vehicle horsepower (HP)",
        "Input vehicle weight in pounds or kilograms",
        "View power-to-weight ratio calculations instantly",
        "Compare results with performance benchmarks",
        "Use for acceleration and performance analysis"
      ]}
      customFeatures={[
        "HP per pound calculation",
        "Pounds per HP calculation",
        "Multiple unit support (lbs/kg)",
        "Performance comparison metrics",
        "Real-time calculation updates"
      ]}
      faqs={faqs}
    >
      <PowerToWeightCalculator />
    </EnhancedToolLayout>
  );
}
