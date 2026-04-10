import React from 'react';
import { Metadata } from 'next';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return generateSEOMetadata({
    title: isZh ? '服务条款 | InterConverter' : 'Terms of Service | InterConverter',
    description: isZh
      ? '查看 InterConverter 当前公开工具站的使用条款、可用性边界与结果验证责任。'
      : 'Review the terms for using the current InterConverter public tool site, including availability limits and verification responsibilities.',
    locale,
    pathname: '/terms',
    keywords: isZh
      ? ['服务条款', '工具站条款', 'InterConverter']
      : ['terms of service', 'tool site terms', 'InterConverter'],
  });
}

export const dynamic = 'force-static';

const lastUpdated = 'March 31, 2026';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{isZh ? '服务条款' : 'Terms of Service'}</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          {isZh
            ? '这些条款适用于 InterConverter 当前公开站点的使用，包括工具页面、支持渠道以及站点信息的适用边界。'
            : 'These terms cover use of the public InterConverter site, including featured tool pages, support channels, and the limits of the information presented on the site.'}
        </p>
        <Badge variant="secondary" className="mt-4">
          {isZh ? '最近更新：' : 'Last updated: '} {lastUpdated}
        </Badge>
      </div>

      <Alert className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          {isZh ? (
            <><strong>简要说明：</strong>你可以免费使用公开工具，但在依据重要结果采取行动前，仍需自行复核。</>
          ) : (
            <><strong>Short version:</strong> you may use the public tools freely, but you are responsible for verifying important results before acting on them.</>
          )}
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              {isZh ? '可接受的使用方式' : 'Acceptable use'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '你可以将公开工具页面用于个人、教育或商业参考场景，但不得滥用服务、干扰站点运行，或以违反适用法律的方式使用本站。'
                : 'You may use the public tool pages for personal, educational, or commercial reference work so long as you do not abuse the service, interfere with the site, or use the site in violation of applicable law.'}
            </p>
            <p>
              {isZh
                ? '你可以直接链接到工具页面并分享结果，但不得将本站结果表述为认证建议，也不得声称 InterConverter 的结果足以替代法律、医疗、税务、安全或专业签署。'
                : 'You may link directly to tool pages and share outputs, but you may not misrepresent the site as certified advice or claim that an InterConverter result is guaranteed to be sufficient for legal, medical, tax, safety, or professional sign-off.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '准确性与独立复核' : 'Accuracy and independent verification'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '本站致力于提供实用的计算结果与说明，但不保证所有输出都完整、实时或适用于每一种场景。有些工具带有教学性质，另一些则会简化现实中的边界情况。'
                : 'The site aims to provide useful calculations and explanations, but it does not warrant that every output is complete, current, or suitable for every use case. Some tools are educational by nature. Others simplify real-world edge cases.'}
            </p>
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                {isZh
                  ? '在金融、法律、医疗、工程或其他高风险决策中使用结果前，请务必独立复核。'
                  : 'Always verify results independently before using them in financial, legal, medical, engineering, or other high-stakes decisions.'}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '可用性与变更' : 'Availability and changes'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? 'InterConverter 可能随时新增、移除、隐藏或调整工具与公开页面。公开工具集合会随着页面审核与更新而变化。'
                : 'InterConverter may add, remove, hide, or revise tools and public pages at any time. The featured set is intentionally curated and can change as pages are reviewed and updated.'}
            </p>
            <p>
              {isZh
                ? '本站按“现状”提供。我们不保证持续可用、不间断访问，或在所有浏览器和环境中都完全兼容。'
                : 'The site is provided on an as-is basis. We do not guarantee continuous availability, uninterrupted access, or compatibility with every browser or environment.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '自动化访问与滥用' : 'Automated access and misuse'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '请勿通过滥用型自动化方式给站点带来过载，不要尝试未授权访问，也不要以影响其他访问者使用的方式操作本站。'
                : 'Do not overload the site with abusive automation, attempt unauthorized access, or use the site in a way that disrupts service for other visitors.'}
            </p>
            <p>
              {isZh
                ? '公开站点允许合理抓取与正常浏览，但不允许具有敌意、欺骗性或破坏性的使用方式。'
                : 'Reasonable indexing and normal browsing are expected on a public site, but hostile or deceptive use is not permitted.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '联系方式' : 'Contact'}</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            {isZh
              ? <>如对本条款有疑问，请发送邮件至 <strong>legal@interconverter.com</strong>。</>
              : <>Questions about these terms can be sent to <strong>legal@interconverter.com</strong>.</>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
