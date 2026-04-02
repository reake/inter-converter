import React from 'react';
import { Metadata } from 'next';
import { Mail, Bug, Lightbulb, Shield, Clock, HelpCircle } from 'lucide-react';
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
    title: isZh ? '联系 InterConverter' : 'Contact InterConverter',
    description: isZh
      ? '通过邮件联系 InterConverter，提交错误反馈、工具建议或隐私与条款相关问题。'
      : 'Contact InterConverter by email for bug reports, tool feedback, support questions, or privacy and terms requests.',
    locale,
    pathname: '/contact',
    keywords: isZh
      ? ['联系 InterConverter', '错误反馈', '工具建议', '支持']
      : ['contact InterConverter', 'bug report', 'tool feedback', 'support'],
  });
}

export const dynamic = 'force-static';

const contactMethods = [
  {
    icon: Mail,
    title: 'General support',
    description: 'Questions about featured tools, unclear copy, or result interpretation.',
    contact: 'support@interconverter.com',
    responseTime: 'Usually within 2 business days',
  },
  {
    icon: Bug,
    title: 'Bug reports',
    description: 'Use this for broken workflows, wrong outputs, or browser-specific issues.',
    contact: 'bugs@interconverter.com',
    responseTime: 'Usually within 1 business day for reproducible issues',
  },
  {
    icon: Lightbulb,
    title: 'Tool suggestions',
    description: 'Suggest a new calculator, a missing example, or a better explanation.',
    contact: 'features@interconverter.com',
    responseTime: 'Reviewed in batches during content updates',
  },
  {
    icon: Shield,
    title: 'Privacy and terms',
    description: 'Use this for policy questions, data handling concerns, or legal requests.',
    contact: 'legal@interconverter.com',
    responseTime: 'Usually within 5 business days',
  },
];

const faqItems = [
  {
    question: 'What makes a bug report useful?',
    answer:
      'Include the tool URL, the exact values you entered, what result you expected, what you received instead, and your browser or device if the issue looks environment-specific.',
  },
  {
    question: 'Can I ask for a tool to be added back to the public site?',
    answer:
      'Yes. If a tool is implemented but not currently featured, explain the use case and why it should become part of the maintained public set.',
  },
  {
    question: 'Do you review wording and explanation issues too?',
    answer:
      'Yes. Feedback is not limited to math errors. Reports about ambiguous labels, weak examples, or confusing instructions are useful and reviewed.',
  },
  {
    question: 'Should I rely on email for urgent business deadlines?',
    answer:
      'No. The site is maintained asynchronously. If a calculation is important for a deadline, verify it independently instead of waiting on support.',
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Contact InterConverter</h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          The public site is maintained through a small number of support channels. Email is the
          best route for reporting issues, suggesting improvements, or asking about how a featured
          tool works.
        </p>
      </div>

      <div className="mb-16 grid gap-6 md:grid-cols-2">
        {contactMethods.map((method) => {
          const Icon = method.icon;

          return (
            <Card key={method.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  {method.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-gray-600">{method.description}</p>
                <Button asChild variant="outline" className="w-full justify-center">
                  <a href={`mailto:${method.contact}`}>{method.contact}</a>
                </Button>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {method.responseTime}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-16">
        <CardHeader>
          <CardTitle>Before you email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-600">
          <p>
            We can review calculation issues faster when the report is specific. The most helpful
            emails include the exact tool page, the values used, the expected outcome, and whether
            the issue appears on more than one browser or device.
          </p>
          <p>
            Suggestions are also more useful when they explain the workflow behind the request. If
            a tool page needs more examples, a stronger warning, or a different result format, say
            what task you were trying to complete.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold text-gray-900">Common questions</h2>
        {faqItems.map((item) => (
          <Card key={item.question}>
            <CardHeader>
              <CardTitle className="flex items-start gap-2 text-lg">
                <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
