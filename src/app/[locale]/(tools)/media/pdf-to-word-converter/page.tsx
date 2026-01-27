import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/media/pdf-to-word-converter-en.json';
import zhTool from '@/data/tools/media/pdf-to-word-converter-zh.json';
import mediaEn from '@/data/tools/media.json';
import mediaZh from '@/data/tools/media-zh.json';
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
    en: mediaEn as any[],
    zh: (mediaZh as any[]) || (mediaEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'pdf-to-word-converter') || catalogs.en.find((it) => it.id === 'pdf-to-word-converter');

  const toolName: string = entry?.name ?? 'PDF to Word Converter';
  const description: string = entry?.description ?? 'Convert PDF files to editable Word documents. Free online PDF to Word converter with high-quality conversion, OCR support, and layout preservation.';
  const baseKeywords = generateOptimizedKeywords('pdf-to-word-converter', 'media', 'PDF to Word Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `${l === "en" ? "" : "/" + l}/media/pdf-to-word-converter`;

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
          url: '/images/og-pdf-to-word-converter.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/media/pdf-to-word-converter',
        zh: '/zh/media/pdf-to-word-converter'
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

export default async function PdfToWordConverterPage({
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
    en: mediaEn as any[],
    zh: (mediaZh as any[]) || (mediaEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === 'pdf-to-word-converter') || catalogs.en.find((it) => it.id === 'pdf-to-word-converter');

  const toolName: string = entry?.name ?? 'PDF to Word Converter';
  const description: string = entry?.description ?? 'Convert PDF files to editable Word documents with instant processing and layout preservation.';
  const baseKeywords = generateOptimizedKeywords('pdf-to-word-converter', 'media', 'PDF to Word Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="pdf-to-word-converter"
      category="media"
      emoji="📄"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <div className="text-center py-12 bg-muted rounded-lg">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          We're working on bringing you the best PDF to Word conversion experience. 
          This tool will feature advanced OCR, layout preservation, and batch processing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">High Accuracy</div>
            <div className="text-sm text-muted-foreground">Preserve formatting and layout</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-medium">Secure</div>
            <div className="text-sm text-muted-foreground">Files processed locally</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-medium">Fast</div>
            <div className="text-sm text-muted-foreground">Quick conversion process</div>
          </div>
        </div>
      </div>
    </EnhancedToolLayout>
  );
}