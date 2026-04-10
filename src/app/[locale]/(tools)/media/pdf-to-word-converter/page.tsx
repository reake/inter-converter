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
        <h2 className="text-2xl font-semibold mb-4">{l === 'zh' ? '审核中' : 'Under review'}</h2>
        <p className="text-muted-foreground mb-6">
          {l === 'zh'
            ? '当前页面主要提供工作流说明与文档处理建议。交互式 PDF 转 Word 工具在实现细节、适用边界和政策文案完成联合审核前，暂不作为公开精选功能展示。'
            : 'This page is currently limited to workflow notes and document-handling guidance. The interactive PDF to Word tool is not part of the featured public surface until its implementation, scope limits, and policy wording are reviewed together.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium">{l === 'zh' ? '文档限制' : 'Document limits'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? '复杂排版与扫描页通常需要额外复核' : 'Complex layouts and scanned pages need extra scrutiny'}</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium">{l === 'zh' ? '预期说明' : 'Expectation setting'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? '本页会说明哪些转换结果通常需要人工检查' : 'This page explains where conversion results usually need manual review'}</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-medium">{l === 'zh' ? '先复核再使用' : 'Verification first'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? '使用前请独立确认格式与提取文本是否符合需求' : 'Confirm formatting and extracted text independently before use'}</div>
          </div>
        </div>
      </div>
    </EnhancedToolLayout>
  );
}
