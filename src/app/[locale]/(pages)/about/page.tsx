import React from 'react';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { Target, Shield, Wrench, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return generateSEOMetadata({
    title: isZh ? '关于 InterConverter' : 'About InterConverter',
    description: isZh
      ? '了解 InterConverter 当前重点维护的工具范围、内容原则，以及我们如何持续改进工具页面。'
      : 'Learn what InterConverter focuses on today, how featured tools are maintained, and what users should expect from the site.',
    locale,
    pathname: '/about',
    keywords: isZh
      ? ['关于 InterConverter', '工具维护', '转换工具', '站点说明']
      : ['about InterConverter', 'tool maintenance', 'converter tools', 'site policies'],
  });
}

export const dynamic = 'force-static';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-14 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">{isZh ? '关于 InterConverter' : 'About InterConverter'}</h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          {isZh
            ? 'InterConverter 是一个实用的在线转换与计算工具集合。当前公开站点优先展示更常用的工具，便于让每个页面都更清晰、更易复核，也更适合真实工作流。'
            : 'InterConverter is a practical collection of online conversion and calculation tools. The current public site focuses on a smaller set of frequently used tools so each page can be clearer, easier to review, and more useful in real workflows.'}
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              {isZh ? '聚焦范围' : 'Curated Scope'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '当前公开站点重点展示单位、时间、颜色、文件等更常用的工具。这让页面更容易维护，也更方便用户快速浏览。'
              : 'We currently highlight a focused set of tools in measurement, time, color, and file conversion. That keeps the public site easier to maintain and easier for users to scan.'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {isZh ? '清晰边界' : 'Clear Boundaries'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '公开工具会尽量说明它能做什么、适合何时使用，以及哪些结果需要用户在重要决策前独立复核。'
              : 'Featured tools are written to explain what they do, when to use them, and where users should verify results independently before relying on them in important decisions.'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              {isZh ? '持续审查' : 'Ongoing Review'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '工具页面、FAQ 和辅助文案会持续更新。用户反馈、错误报告和修正建议会帮助我们决定下一步的改进重点。'
              : 'Tool pages, FAQs, and supporting copy are reviewed and updated over time. Feedback, bug reports, and correction requests help determine what gets improved next.'}
          </CardContent>
        </Card>
      </div>

      <div className="mb-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '这个站点是为了解决什么问题而建立的' : 'What the site is built for'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '我们的目标不是堆出一个尽可能庞大的目录，而是让常见的换算与计算任务更容易完成，不必让用户面对多余步骤、强制注册或含糊解释。'
                : 'The goal is not to publish the largest possible directory. The goal is to make common conversion tasks easier to complete without forcing users through unnecessary friction, extra account steps, or vague explanations.'}
            </p>
            <p>
              {isZh
                ? '当前公开站点优先维护那些更常用、理解门槛更低、也更容易复核的工具。这也是为什么公开范围会比内部完整工具库存更窄。'
                : 'The public site currently prioritizes tools that are broadly useful, low-friction to understand, and straightforward to validate. That is why the featured set is narrower than the full internal tool inventory.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '公开页面如何维护' : 'How featured pages are maintained'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '每个公开工具不应只给出一个数字结果。页面会逐步补充工作流说明、公式背景、常见误区和示例，让结果更容易理解。'
                : 'Each featured tool should do more than output a number. Public pages are being expanded with workflow guidance, formula context, common mistakes, and examples so the result is easier to interpret.'}
            </p>
            <p>
              {isZh
                ? '如果某个工具仍处于实验阶段、内容过薄，或说明还不够清楚，它可以继续保留在代码库中，但暂时不进入公开展示范围。'
                : 'When a tool is still experimental, too thin, or not yet explained well enough, it can remain implemented in the codebase without being part of the public featured surface.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '用户可以期待什么' : 'What users should expect'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? 'InterConverter 希望提供快速、易读、默认设置合理的在线工具。但它不能替代法律、医疗、税务或工程签署等高风险场景中的专业意见。'
                : 'InterConverter aims to provide quick, readable tools with sensible defaults. It does not replace professional advice in high-stakes contexts such as legal, medical, tax, or engineering sign-off.'}
            </p>
            <p>
              {isZh
                ? '如果你发现说明不清、示例不准确，或某个工具需要更明确的验证提示，欢迎联系我们。这些反馈正是公开站点持续改进的一部分。'
                : 'If you see an unclear explanation, an inaccurate example, or a tool that needs better validation notes, contact us. Those reports are part of how the public site improves.'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 px-8 py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{isZh ? '需要帮助或想反馈问题？' : 'Need help or want to report an issue?'}</h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          {isZh
            ? '通过邮件联系我们通常最快。你可以在联系页面提交支持问题、错误反馈，或对工具说明提出建议。'
            : 'The fastest way to reach us is by email. Use the contact page for support questions, bug reports, and requests for clarification on featured tools.'}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">{isZh ? '联系支持' : 'Contact us'}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tools">{isZh ? '查看工具' : 'View featured tools'}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
