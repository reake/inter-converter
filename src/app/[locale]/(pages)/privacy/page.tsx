import React from 'react';
import { Metadata } from 'next';
import { Shield, Database, Eye, Lock, CheckCircle } from 'lucide-react';
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
    title: isZh ? '隐私政策 | InterConverter' : 'Privacy Policy | InterConverter',
    description: isZh
      ? '了解 InterConverter 目前如何处理站点数据、浏览器端计算、分析脚本与联系请求。'
      : 'Learn how InterConverter currently handles site data, browser-based calculations, analytics scripts, and contact requests.',
    locale,
    pathname: '/privacy',
    keywords: isZh
      ? ['隐私政策', '数据处理', '浏览器计算', 'InterConverter']
      : ['privacy policy', 'data handling', 'browser-based tools', 'InterConverter'],
  });
}

export const dynamic = 'force-static';

const lastUpdated = 'March 31, 2026';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-950">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{isZh ? '隐私政策' : 'Privacy Policy'}</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          {isZh
            ? '本页说明 InterConverter 目前如何处理站点级数据、浏览器端计算、分析脚本以及联系请求。'
            : 'This page explains what InterConverter does with site-level data, what happens in the browser when you use a featured tool, and where the limits of that privacy model are.'}
        </p>
        <Badge variant="secondary" className="mt-4">
          {isZh ? '最近更新：' : 'Last updated: '} {lastUpdated}
        </Badge>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          {isZh ? (
            <><strong>摘要：</strong>许多工具会在浏览器内完成核心计算，但站点仍可能加载分析与广告脚本。本政策会明确说明这些差异。</>
          ) : (
            <><strong>Summary:</strong> many featured conversions run in the browser, but the site also uses standard site infrastructure such as analytics and advertising scripts. This policy describes those differences clearly.</>
          )}
        </AlertDescription>
      </Alert>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              {isZh ? '工具输入' : 'Tool inputs'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '许多转换器和计算器会在浏览器内完成核心逻辑。若属于这种情况，你输入的值会在你的设备上处理，而不是发送到自定义服务器端点。'
              : 'Many featured calculators and converters perform their core logic locally in the browser. When that is the case, the values you enter are processed on your device rather than being sent to a custom server endpoint for conversion.'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              {isZh ? '站点测量' : 'Site measurement'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '站点可能会加载标准分析与广告脚本，用于流量统计、站点运营和审核相关需求。这些脚本独立于计算逻辑，应被理解为站点正常运行的一部分。'
              : 'The site may load standard analytics and advertising scripts for traffic measurement, funding, and review operations. Those scripts are separate from the calculator logic and should be understood as part of normal site operation.'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              {isZh ? '联系请求' : 'Contact requests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '如果你通过邮件联系我们，你在消息中提供的信息只会用于审查和回复该请求，包括错误报告、政策问题和支持跟进。'
              : 'If you contact us by email, the information you provide in that message is used only to review and respond to the request, including bug reports, policy questions, and support follow-up.'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              {isZh ? '本地偏好设置' : 'Local preferences'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '站点可能会在浏览器中存储有限的偏好设置，例如主题或语言选择，以便你下次访问时页面显示更加一致。'
              : 'The site may store limited browser-side preferences such as theme or locale choices so pages render more consistently on return visits.'}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '本网站不承诺什么' : 'What this site does not promise'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? 'InterConverter 不承诺完全匿名、零 Cookie 环境，或完全没有第三方脚本的页面。它是一个公开工具站点，而不是隐私工具或安全文件处理服务。'
                : 'InterConverter does not promise complete anonymity, a zero-cookie environment, or a page with no third-party scripts. It is a public tool site, not a privacy utility or a secure file-processing guarantee.'}
            </p>
            <p>
              {isZh
                ? '如果你需要比普通公共 Web 应用更强的保障，请不要依赖本站满足该目的。'
                : 'If you need stronger assurances than a normal public web application can provide, do not rely on this site for that purpose.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '分析、广告与 Cookie' : 'Analytics, advertising, and cookies'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '站点可能会加载分析和广告服务，包括 Google Analytics 与 Google AdSense。这些服务可能设置或读取 Cookie、使用浏览器存储、收集设备或浏览器信息，并衡量访问、页面使用、来源信息及广告互动。'
                : 'The site may load analytics and advertising services, including Google Analytics and Google AdSense. Those services may set or read cookies, use browser storage, collect device or browser information, and measure visits, page usage, referral information, and ad interactions.'}
            </p>
            <p>
              {isZh
                ? '广告供应商（包括 Google）可能会根据你此前访问本站或其他站点的记录展示广告。如果你的地区或浏览器环境启用了个性化广告，广告展示可能会反映这些访问历史。'
                : 'Advertising vendors, including Google, may use cookies to serve ads based on prior visits to this site or other sites. If personalized advertising is active in your region or browser context, ad delivery may reflect those prior visits.'}
            </p>
            <p>
              {isZh
                ? '你可以通过 Google Ads Settings 进一步了解 Google 在广告中的信息使用方式，并调整个性化广告设置。'
                : 'You can learn more about how Google uses information in advertising and adjust ad personalization controls through Google Ads Settings.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '浏览器端处理' : 'Browser-side processing'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '如果某个工具完全由客户端代码实现，那么计算会在页面加载后于浏览器中执行。这种设计可以减少将原始输入发送到自定义后端服务的需要。'
                : 'Where a featured tool is implemented entirely in client-side code, the calculation is performed in the browser after the page has loaded. That design can reduce the need to send raw calculator inputs to a custom backend service.'}
            </p>
            <p>
              {isZh
                ? '但这并不意味着每个页面都完全离线，或不会发生任何网络请求。页面资源、分析标签、广告脚本和其他站点资源仍可能加载。'
                : 'That does not mean every page is offline-only or free of all network requests. Page assets, analytics tags, advertising scripts, and other site resources may still load.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '邮件与支持记录' : 'Email and support records'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              {isZh
                ? '如果你向我们发送邮件，我们可能会在合理期限内保留该消息，以便审查问题、进行回复，并保存与支持、错误反馈或政策问题相关的处理记录。'
                : 'If you send us an email, we may retain the message long enough to review the issue, reply, and keep a record of decisions related to support, bug reports, or policy questions.'}
            </p>
            <p>
              {isZh
                ? '请不要发送与请求无关的敏感个人、法律、医疗或金融信息。'
                : 'Do not send sensitive personal, legal, medical, or financial information that is not necessary for the request.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '联系方式' : 'Contact'}</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            {isZh
              ? <>如有隐私或政策相关问题，请发送邮件至 <strong>support@interconverter.com</strong>。</>
              : <>For privacy questions or policy-related requests, email <strong>support@interconverter.com</strong>.</>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
