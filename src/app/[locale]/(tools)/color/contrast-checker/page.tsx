import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ContrastChecker } from '@/components/converters/color/ContrastChecker';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/contrast-checker-en.json';
import zhTool from '@/data/tools/color/contrast-checker-zh.json';
import colorEn from '@/data/tools/color.json';
import colorZh from '@/data/tools/color-zh.json';
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
    en: colorEn as any[],
    zh: (colorZh as any[]) || (colorEn as any[])
  };
  const getEntry = (id: string) => {
    const list = catalogs[l] || catalogs.en;
    return list.find((it) => it.id === id) || catalogs.en.find((it) => it.id === id);
  };
  const entry = getEntry('contrast-checker');

  const toolName: string = entry?.name ?? 'Color Contrast Checker';
  const description: string = entry?.description ?? 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure your designs meet accessibility standards with our contrast analyzer.';
  const baseKeywords = generateOptimizedKeywords('contrast-checker', 'color', 'Color Contrast Checker');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/color/contrast-checker`;

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
          url: '/images/og-contrast-checker.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/color/contrast-checker',
        zh: '/zh/color/contrast-checker'
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

export default async function ContrastCheckerPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const faqs = getFAQsByToolId('contrast-checker', 'color');

  const catalogs: Record<string, any[]> = { en: colorEn as any[], zh: (colorZh as any[]) || (colorEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'contrast-checker') || (colorEn as any[]).find((it) => it.id === 'contrast-checker');

  const toolName: string = entry?.name || 'Color Contrast Checker';
  const descriptionText: string = entry?.description || 'Check color contrast ratios for WCAG AA and AAA compliance with instant calculations and accessibility analysis.';
  const baseKeywords = generateOptimizedKeywords('contrast-checker', 'color', 'Color Contrast Checker');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="contrast-checker"
      category="color"
      locale={l}
      emoji="♿"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <ContrastChecker />
    </EnhancedToolLayout>
  );
}
