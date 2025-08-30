import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RgbToHexConverter from '@/components/converters/color/RgbToHexConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/color/rgb-to-hex-converter-en.json';
import zhTool from '@/data/tools/color/rgb-to-hex-converter-zh.json';
import colorEn from '@/data/tools/color.json';
import colorZh from '@/data/tools/color-zh.json';
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
    en: colorEn as any[],
    zh: (colorZh as any[]) || (colorEn as any[])
  };
  const getEntry = (id: string) => {
    const list = catalogs[l] || catalogs.en;
    return list.find((it) => it.id === id) || catalogs.en.find((it) => it.id === id);
  };
  const entry = getEntry('rgb-to-hex-converter');

  const toolName: string = entry?.name ?? 'RGB to HEX Color Converter';
  const description: string = entry?.description ?? 'Convert RGB to HEX color codes instantly. Free color converter with preview, common colors, web-safe palette, and CSS code generation for web design and development.';
  const baseKeywords = generateOptimizedKeywords('rgb-to-hex-converter', 'color', 'RGB to HEX Color Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  const canonicalPath = `/${l}/color/rgb-to-hex-converter`;

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
          url: '/images/og-rgb-to-hex-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/color/rgb-to-hex-converter',
        zh: '/zh/color/rgb-to-hex-converter'
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

export default async function RgbToHexConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load tool-specific content from JSON files
  const toolContents: Record<string, ToolContent> = {
    en: enTool as ToolContent,
    zh: zhTool as ToolContent
  };
  const toolContent = toolContents[l] || toolContents.en;

  const faqs = getFAQsByToolId('rgb-to-hex-converter', 'color');

  const catalogs: Record<string, any[]> = { en: colorEn as any[], zh: (colorZh as any[]) || (colorEn as any[]) };
  const catalog = catalogs[l] || catalogs.en;
  const entry = catalog.find((it) => it.id === 'rgb-to-hex-converter') || (colorEn as any[]).find((it) => it.id === 'rgb-to-hex-converter');

  const toolName: string = entry?.name || 'RGB to HEX Color Converter';
  const descriptionText: string = entry?.description || 'Convert RGB color values to HEX codes with real-time preview and instant calculations.';
  const baseKeywords = generateOptimizedKeywords('rgb-to-hex-converter', 'color', 'RGB to HEX Color Converter');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="rgb-to-hex-converter"
      category="color"
      locale={l}
      emoji="🎨"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <RgbToHexConverter />
    </EnhancedToolLayout>
  );
}
