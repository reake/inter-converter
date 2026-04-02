import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getReviewApprovedToolsByCategory } from '@/config/tools';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd, generateWebsiteSchema } from '@/components/seo/JsonLd';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return generateSEOMetadata({
    title: isZh ? '精选文件转换工具与说明 | InterConverter' : 'Featured File Conversion Tools | InterConverter',
    description: isZh
      ? '当前公开维护的文件转换分类以 JPG 转 PNG 为主，并补充格式差异、处理边界、适用场景和后续工作流说明。'
      : 'The public file conversion category now centers on JPG to PNG, with clearer notes about format differences, usage limits, and workflow choices.',
    locale,
    pathname: '/media',
    keywords: isZh
      ? ['JPG 转 PNG', '图片格式转换', '文件转换工具', 'InterConverter']
      : ['jpg to png', 'image format conversion', 'file conversion tools', 'InterConverter'],
  });
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const [tool] = getReviewApprovedToolsByCategory('media', locale);

  return (
    <>
      <JsonLd data={generateWebsiteSchema(locale)} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white">
          <div className="container mx-auto max-w-5xl px-4 py-16 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl">
              🖼️
            </div>
            <h1 className="mb-6 text-5xl font-bold">
              {isZh ? '精选文件转换工具' : 'Featured file conversion tools'}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-indigo-100">
              {isZh
                ? '当前公开维护的文件转换分类聚焦在一个更容易解释和验证的图像格式场景上。'
                : 'The current public file conversion category is intentionally focused on one image-format workflow that is easier to explain and verify clearly.'}
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 py-12">
          {tool ? (
            <section className="mb-12">
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="mb-3 text-3xl">{tool.icon}</div>
                  <CardTitle className="text-2xl">{tool.name}</CardTitle>
                  <CardDescription className="text-base leading-7">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-6 text-gray-600">
                    {isZh
                      ? '这个页面当前重点补充 JPG 与 PNG 的常见使用场景、透明背景限制、压缩差异，以及什么时候应该改用其他图像工作流。'
                      : 'This page is currently where we are adding clearer guidance about JPG vs PNG use cases, transparency limits, compression tradeoffs, and when another image workflow would be more appropriate.'}
                  </p>
                  <Button asChild>
                    <Link href={tool.path}>{isZh ? '打开工具' : 'Open tool'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          ) : null}

          <section className="mb-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{isZh ? '当前维护重点' : 'Current maintenance focus'}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-gray-600">
                {isZh
                  ? '公开分类页目前不再展示大量格式列表，而是只围绕当前精选并已补充说明的工具。'
                  : 'The public category page no longer lists a wide spread of formats. It focuses only on the tools that are currently featured and receiving deeper guidance.'}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{isZh ? '处理边界' : 'Processing boundaries'}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-gray-600">
                {isZh
                  ? '文件类工具页会尽量说明格式损失、透明度支持、浏览器处理限制，以及你应该自己复核的地方。'
                  : 'File-tool pages aim to explain format loss, transparency support, browser-side limits, and the parts you should still verify yourself before relying on a result.'}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{isZh ? '如果你需要别的格式' : 'If you need another format'}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-gray-600">
                {isZh
                  ? '如果你希望某个文件工具重新回到公开精选范围，请通过联系页说明场景、样例文件类型和你最在意的输出要求。'
                  : 'If another file tool should return to the featured public surface, use the contact page and describe the workflow, sample file type, and output requirements that matter to you.'}
              </CardContent>
            </Card>
          </section>

          <section className="mb-12 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {isZh ? '什么时候更适合用 JPG 转 PNG' : 'When JPG to PNG is the right workflow'}
            </h2>
            <div className="space-y-4 text-sm leading-7 text-gray-600">
              <p>
                {isZh
                  ? '如果原图来自相机、聊天软件或旧素材库，JPG 往往已经带有有损压缩痕迹。把它转成 PNG 不会恢复丢失的细节，但在继续标注、裁切、排版或多次保存时，PNG 往往更适合作为后续编辑的中间格式。'
                  : 'If an image came from a camera, a chat export, or an older asset library, JPG often already contains lossy compression artifacts. Converting it to PNG will not recover lost detail, but PNG can still be a better working format when you plan to annotate, crop, composite, or resave the file several times.'}
              </p>
              <p>
                {isZh
                  ? '这个分类页当前重点解释几个常见误解：PNG 不是天然更清晰，JPG 转 PNG 也不会凭空得到透明背景。它真正的价值通常在于后续工作流更稳定、颜色边缘更容易检查，以及反复导出时更少继续损失。'
                  : 'This category now focuses on clarifying a few common misconceptions: PNG is not automatically sharper, and converting JPG to PNG will not create a transparent background by itself. The practical value is usually that later editing steps become more stable, color edges are easier to inspect, and repeated exports are less likely to introduce additional visible loss.'}
              </p>
              <p>
                {isZh
                  ? '如果你的目标是做网页图标、产品截图、说明图或带文字的图像，先判断是否真的需要 PNG。某些场景下 WebP 或 SVG 会更合适；而照片类内容如果只追求体积，保留 JPG 或改用 WebP 往往更省资源。这个页面的定位不是鼓励所有图片都转 PNG，而是帮助你判断什么时候值得这么做。'
                  : 'If you are preparing web graphics, screenshots, diagrams, or text-heavy assets, first decide whether PNG is really the format you need. In some cases WebP or SVG is a better destination, while photo-heavy content may be better left as JPG or moved to WebP for size reasons. The point of this page is not to push every image toward PNG, but to explain when that choice is actually useful.'}
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 px-8 py-10 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {isZh ? '继续浏览当前精选工具' : 'Continue with the current featured tools'}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              {isZh
                ? '如果你的任务不止是图片格式转换，也可以回到精选工具页，查看当前公开维护的单位、时间、颜色和文件工具。'
                : 'If your workflow goes beyond image conversion, return to the featured tools page to browse the unit, time, color, and file tools currently maintained on the public site.'}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/tools">{isZh ? '查看精选工具' : 'View featured tools'}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">{isZh ? '联系支持' : 'Contact support'}</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
