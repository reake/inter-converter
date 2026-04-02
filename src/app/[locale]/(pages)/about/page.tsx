import React from 'react';
import Link from 'next/link';
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

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-14 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">About InterConverter</h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          InterConverter is a practical collection of online conversion and calculation tools.
          The current public site focuses on a smaller set of frequently used tools so each page
          can be clearer, easier to review, and more useful in real workflows.
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              Curated Scope
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            We currently highlight a focused set of tools in measurement, time, color, and file
            conversion. That keeps the public site easier to maintain and easier for users to scan.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Clear Boundaries
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            Featured tools are written to explain what they do, when to use them, and where users
            should verify results independently before relying on them in important decisions.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Ongoing Review
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            Tool pages, FAQs, and supporting copy are reviewed and updated over time. Feedback,
            bug reports, and correction requests help determine what gets improved next.
          </CardContent>
        </Card>
      </div>

      <div className="mb-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>What the site is built for</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              The goal is not to publish the largest possible directory. The goal is to make common
              conversion tasks easier to complete without forcing users through unnecessary friction,
              extra account steps, or vague explanations.
            </p>
            <p>
              The public site currently prioritizes tools that are broadly useful, low-friction to
              understand, and straightforward to validate. That is why the featured set is narrower
              than the full internal tool inventory.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How featured pages are maintained</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              Each featured tool should do more than output a number. Public pages are being expanded
              with workflow guidance, formula context, common mistakes, and examples so the result is
              easier to interpret.
            </p>
            <p>
              When a tool is still experimental, too thin, or not yet explained well enough, it can
              remain implemented in the codebase without being part of the public featured surface.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What users should expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              InterConverter aims to provide quick, readable tools with sensible defaults. It does
              not replace professional advice in high-stakes contexts such as legal, medical, tax,
              or engineering sign-off.
            </p>
            <p>
              If you see an unclear explanation, an inaccurate example, or a tool that needs better
              validation notes, contact us. Those reports are part of how the public site improves.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 px-8 py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Need help or want to report an issue?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          The fastest way to reach us is by email. Use the contact page for support questions, bug
          reports, and requests for clarification on featured tools.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tools">View featured tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
