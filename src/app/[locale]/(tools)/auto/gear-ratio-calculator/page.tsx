import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/auto/gear-ratio-calculator-en.json';
import zhTool from '@/data/tools/auto/gear-ratio-calculator-zh.json';
import autoEn from '@/data/tools/auto.json';
import autoZh from '@/data/tools/auto-zh.json';
import { ToolContent, FAQItem } from '@/types/tool-content';

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

  const canonicalPath = `${l === "en" ? "" : "/" + l}/auto/gear-ratio-calculator`;

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

  // Normalize rich JSON structure to simple arrays
  function normalizeToolContent(rawContent: any): ToolContent {
    // Handle about - ensure it's always a string array
    let about: string[] = [];
    if (Array.isArray(rawContent.about)) {
      about = rawContent.about.filter((item: any) => typeof item === 'string');
    } else if (rawContent.about?.description) {
      if (Array.isArray(rawContent.about.description)) {
        about = rawContent.about.description.filter((item: any) => typeof item === 'string');
      } else if (typeof rawContent.about.description === 'string') {
        about = [rawContent.about.description];
      }
    } else if (typeof rawContent.about === 'string') {
      about = [rawContent.about];
    }
    
    // Handle howToUse - ensure it's always a string array
    let howToUse: string[] = [];
    if (Array.isArray(rawContent.howToUse)) {
      howToUse = rawContent.howToUse.filter((item: any) => typeof item === 'string');
    } else if (rawContent.howTo?.steps && Array.isArray(rawContent.howTo.steps)) {
      howToUse = rawContent.howTo.steps.map((s: any) => {
        const title = s.title?.trim();
        const desc = s.description?.trim();
        if (title && desc) return `${title}: ${desc}`;
        return title || desc || '';
      }).filter((item: string) => item.length > 0);
    }
    
    // Handle features - ensure it's always a string array
    let features: string[] = [];
    if (Array.isArray(rawContent.features)) {
      if (rawContent.features.length > 0 && typeof rawContent.features[0] === 'string') {
        features = rawContent.features;
      } else {
        features = rawContent.features.map((f: any) => {
          if (typeof f === 'string') return f;
          const title = f.title?.trim();
          const desc = f.description?.trim();
          if (title && desc) return `${title}: ${desc}`;
          return title || desc || '';
        }).filter((item: string) => item.length > 0);
      }
    }
    
    // Handle FAQs - ensure proper format
    const faqs = (rawContent.faqs ?? rawContent.faq ?? []).map((f: any) => 
      f.question ? f : { question: f.q || '', answer: f.a || '' }
    ).filter((f: any) => f.question && f.answer);
    
    return { about, howToUse, features, faqs };
  }

  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  
  const faqs = toolContent.faqs && toolContent.faqs.length > 0
    ? toolContent.faqs
    : getFAQsByToolId('gear-ratio-calculator', 'auto');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogMap: Record<string, any[]> = { en: autoEn as any[], zh: (autoZh as any[]) || (autoEn as any[]) };
  const catalog = catalogMap[l] || (autoEn as any[]);
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
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={faqs}
    >
      <GearRatioCalculator />
    </EnhancedToolLayout>
  );
}
