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

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-950">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          This page explains what InterConverter does with site-level data, what happens in the
          browser when you use a featured tool, and where the limits of that privacy model are.
        </p>
        <Badge variant="secondary" className="mt-4">
          Last updated: {lastUpdated}
        </Badge>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Summary:</strong> many featured conversions run in the browser, but the site also
          uses standard site infrastructure such as analytics and advertising scripts. This policy
          describes those differences clearly.
        </AlertDescription>
      </Alert>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Tool inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            Many featured calculators and converters perform their core logic locally in the browser.
            When that is the case, the values you enter are processed on your device rather than
            being sent to a custom server endpoint for conversion.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Site measurement
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            The site may load standard analytics and advertising scripts for traffic measurement,
            funding, and review operations. Those scripts are separate from the calculator logic and
            should be understood as part of normal site operation.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              Contact requests
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            If you contact us by email, the information you provide in that message is used only to
            review and respond to the request, including bug reports, policy questions, and support
            follow-up.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Local preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            The site may store limited browser-side preferences such as theme or locale choices so
            pages render more consistently on return visits.
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>What this site does not promise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              InterConverter does not promise complete anonymity or a zero-script environment. The
              site is not presented as a privacy utility. It is a public tool site that tries to
              keep the featured conversion workflows straightforward and to avoid unnecessary form
              submission for basic calculations.
            </p>
            <p>
              If you need guarantees beyond a typical public web application, do not rely on this
              site for that purpose.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser-side processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              Where a featured tool is implemented entirely in client-side code, the calculation is
              performed in the browser after the page has loaded. That design reduces friction and
              often avoids sending raw calculator inputs to a custom backend service.
            </p>
            <p>
              That does not mean every page is offline-only or free of all network requests. Page
              assets, analytics tags, advertising scripts, and other site resources may still load.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email and support records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              If you send us an email, we may retain the message long enough to review the issue,
              reply, and keep a record of decisions related to support, bug reports, or policy
              questions.
            </p>
            <p>
              Do not send sensitive personal, legal, medical, or financial information that is not
              necessary for the request.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            For privacy questions or policy-related requests, email <strong>legal@interconverter.com</strong>.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
