import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';
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
  const entry = getEntry('gear-ratio-calculator');

  const toolName: string = entry?.name ?? 'Gear Ratio Calculator';
  const description: string = entry?.description ?? 'Calculate gear ratios from ring and pinion teeth and optimize drivetrain performance. Professional, fast, and free gear ratio calculator for automotive use.';
  const baseKeywords = generateOptimizedKeywords('gear-ratio-calculator', 'auto', 'Gear Ratio Calculator');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/auto/gear-ratio-calculator`;

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
          url: '/images/og-gear-ratio-calculator.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/auto/gear-ratio-calculator',
        zh: '/zh/auto/gear-ratio-calculator'
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

export default async function GearRatioCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const faqs = getFAQsByToolId('gear-ratio-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogs: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'gear-ratio-calculator') || (autoEn as any[]).find((it) => it.id === 'gear-ratio-calculator');

  const toolName: string = entry?.name || 'Gear Ratio Calculator';
  const descriptionText: string = entry?.description || 'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance tuning and drivetrain optimization.';
  const baseKeywords = generateOptimizedKeywords('gear-ratio-calculator', 'auto', 'Gear Ratio Calculator');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="gear-ratio-calculator"
      category="auto"
      locale={l}
      emoji="⚙️"
      customHowToUse={[
        "Enter ring gear teeth count",
        "Enter pinion gear teeth count",
        "View calculated gear ratio instantly",
        "Compare with common ratio standards",
        "Use for drivetrain optimization"
      ]}
      customFeatures={[
        "Ring and pinion ratio calculation",
        "Common gear ratio comparisons",
        "Performance impact analysis",
        "Acceleration vs top speed trade-offs",
        "Real-time calculation updates"
      ]}
      faqs={faqs}
    >
      <GearRatioCalculator />
    </EnhancedToolLayout>
  );
}
