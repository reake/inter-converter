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

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Terms of Service</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          These terms cover use of the public InterConverter site, including featured tool pages,
          support channels, and the limits of the information presented on the site.
        </p>
        <Badge variant="secondary" className="mt-4">
          Last updated: {lastUpdated}
        </Badge>
      </div>

      <Alert className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Short version:</strong> you may use the public tools freely, but you are
          responsible for verifying important results before acting on them.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Acceptable use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              You may use the public tool pages for personal, educational, or commercial reference
              work so long as you do not abuse the service, interfere with the site, or use the site
              in violation of applicable law.
            </p>
            <p>
              You may link directly to tool pages and share outputs, but you may not misrepresent
              the site as certified advice or claim that an InterConverter result is guaranteed to be
              sufficient for legal, medical, tax, safety, or professional sign-off.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy and independent verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              The site aims to provide useful calculations and explanations, but it does not warrant
              that every output is complete, current, or suitable for every use case. Some tools are
              educational by nature. Others simplify real-world edge cases.
            </p>
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                Always verify results independently before using them in financial, legal, medical,
                engineering, or other high-stakes decisions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability and changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              InterConverter may add, remove, hide, or revise tools and public pages at any time.
              The featured set is intentionally curated and can change as pages are reviewed and
              updated.
            </p>
            <p>
              The site is provided on an as-is basis. We do not guarantee continuous availability,
              uninterrupted access, or compatibility with every browser or environment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automated access and misuse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              Do not overload the site with abusive automation, attempt unauthorized access, or use
              the site in a way that disrupts service for other visitors.
            </p>
            <p>
              Reasonable indexing and normal browsing are expected on a public site, but hostile or
              deceptive use is not permitted.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Questions about these terms can be sent to <strong>legal@interconverter.com</strong>.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
