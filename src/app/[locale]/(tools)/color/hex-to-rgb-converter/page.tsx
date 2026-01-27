import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import HexToRgbConverter from '@/components/converters/color/HexToRgbConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/hex-to-rgb-converter-en.json';
import zhTool from '@/data/tools/color/hex-to-rgb-converter-zh.json';
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
  const entry = getEntry('hex-to-rgb-converter');

  const toolName: string = entry?.name ?? 'HEX to RGB Converter';
  const description: string = entry?.description ?? 'Convert HEX color codes to RGB values and vice versa. Free color converter with color picker and preview for web designers and developers.';
  const baseKeywords = generateOptimizedKeywords('hex-to-rgb-converter', 'color', 'HEX to RGB Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `${l === "en" ? "" : "/" + l}/color/hex-to-rgb-converter`;

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
          url: '/images/og-hex-to-rgb-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/color/hex-to-rgb-converter',
        zh: '/zh/color/hex-to-rgb-converter'
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

export default async function HexToRgbConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);

  const faqs = getFAQsByToolId('hex-to-rgb-converter', 'color');

  // Load catalog entry for this tool to source localized name/description/keywords
  const catalogs: Record<string, any[]> = { en: colorEn as any[], zh: (colorZh as any[]) || (colorEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'hex-to-rgb-converter') || (colorEn as any[]).find((it) => it.id === 'hex-to-rgb-converter');

  const toolName: string = entry?.name || 'HEX to RGB Converter';
  const descriptionText: string = entry?.description || 'Convert HEX color codes to RGB values and vice versa with precision and instant calculations.';
  const baseKeywords = generateOptimizedKeywords('hex-to-rgb-converter', 'color', 'HEX to RGB Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="hex-to-rgb-converter"
      category="color"
      locale={l}
      emoji="🎨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <HexToRgbConverter />
    </EnhancedToolLayout>
  );
}