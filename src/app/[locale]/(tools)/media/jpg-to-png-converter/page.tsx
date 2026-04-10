import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/media/jpg-to-png-converter-en.json';
import zhTool from '@/data/tools/media/jpg-to-png-converter-zh.json';
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

  const entry = getLocalizedToolEntry(l, 'jpg-to-png-converter', mediaEn as ToolCatalogEntry[], mediaZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'JPG to PNG Converter';
  const description: string = entry?.description ?? 'Review notes for a JPG to PNG workflow, including format tradeoffs, transparency limits, and public availability status.';
  const baseKeywords = generateOptimizedKeywords('jpg-to-png-converter', 'media', 'JPG to PNG Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;

  return buildToolPageMetadata({
    locale: l,
    category: 'media',
    toolId: 'jpg-to-png-converter',
    title,
    description,
    keywords,
    path: '/media/jpg-to-png-converter'
  });
}

export default async function JpgToPngConverterPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const rawContent = l === 'zh' ? zhTool : enTool;
  const toolContent = normalizeToolContent(rawContent);
  const entry = getLocalizedToolEntry(l, 'jpg-to-png-converter', mediaEn as ToolCatalogEntry[], mediaZh as ToolCatalogEntry[]);

  const toolName: string = entry?.name ?? 'JPG to PNG Converter';
  const description: string = entry?.description ?? 'This page explains JPG to PNG workflow considerations and why the interactive version is not currently part of the featured public surface.';
  const baseKeywords = generateOptimizedKeywords('jpg-to-png-converter', 'media', 'JPG to PNG Converter');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      locale={l}
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="jpg-to-png-converter"
      category="media"
      emoji="🖼️"
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
            ? '当前页面主要提供格式说明与工作流建议。交互式 JPG 转 PNG 工具在实现细节、适用边界和政策文案完成联合审核前，暂不作为公开精选功能展示。'
            : 'This page is currently limited to format notes and workflow guidance. The interactive JPG to PNG tool is not part of the featured public surface until its implementation, limitations, and policy wording are reviewed together.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="font-medium">{l === 'zh' ? '格式取舍' : 'Format tradeoffs'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? 'JPG 压缩与 PNG 导出各有优劣' : 'JPG compression and PNG export have different strengths'}</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">🧭</div>
            <div className="font-medium">{l === 'zh' ? '适用范围说明' : 'Scope notes'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? '本页帮助你判断 PNG 是否真的是合适的目标格式' : 'Use this page to judge whether PNG is actually the right target'}</div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-medium">{l === 'zh' ? '先复核再使用' : 'Verification first'}</div>
            <div className="text-sm text-muted-foreground">{l === 'zh' ? '请独立检查透明度与输出预期是否符合需求' : 'Check transparency and output expectations independently'}</div>
          </div>
        </div>
      </div>
    </EnhancedToolLayout>
  );
}
