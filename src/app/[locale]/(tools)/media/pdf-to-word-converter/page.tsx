import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/media/pdf-to-word-converter-en.json';
import zhTool from '@/data/tools/media/pdf-to-word-converter-zh.json';
import mediaEn from '@/data/tools/media.json';
import mediaZh from '@/data/tools/media-zh.json';
import { normalizeToolContent } from '@/utils/normalize-tool-content';
import { buildToolPageMetadata } from '@/lib/seo/tool-page-metadata';
import { getLocalizedToolEntry, type ToolCatalogEntry } from '@/lib/tool-page-catalog';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const entry = getLocalizedToolEntry(l, 'pdf-to-word-converter', mediaEn as ToolCatalogEntry[], mediaZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'PDF to Word Converter';
  const description: string = entry?.description ?? 'Review notes for a PDF to Word workflow, including document-handling limits and current public availability status.';
  const baseKeywords = generateOptimizedKeywords('pdf-to-word-converter', 'media', 'PDF to Word Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'media',
    toolId: 'pdf-to-word-converter',
    title,
    description,
    keywords,
    path: '/media/pdf-to-word-converter'
  });
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
  const entry = getLocalizedToolEntry(l, 'pdf-to-word-converter', mediaEn as ToolCatalogEntry[], mediaZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'PDF to Word Converter';
  const description: string = entry?.description ?? 'This page explains PDF to Word workflow considerations and why the interactive version is not currently part of the featured public surface.';
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
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-semibold mb-4">Under review</h2>
        <p className="text-muted-foreground mb-6">
          This page is currently limited to workflow notes and document-handling guidance. The
          interactive PDF to Word tool is not part of the featured public surface until its
          implementation, scope limits, and policy wording are reviewed together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium">Document limits</div>
            <div className="text-sm text-muted-foreground">Complex layouts and scanned pages need extra scrutiny</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium">Expectation setting</div>
            <div className="text-sm text-muted-foreground">This page explains where conversion results usually need manual review</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-medium">Verification first</div>
            <div className="text-sm text-muted-foreground">Confirm formatting and extracted text independently before use</div>
          </div>
        </div>
      </div>
    </EnhancedToolLayout>
  );
}
