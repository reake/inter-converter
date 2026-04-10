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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  const contactMethods = [
    {
      icon: Mail,
      title: isZh ? '常规支持' : 'General support',
      description: isZh
        ? '用于咨询工具说明、页面文案不清，或结果理解相关问题。'
        : 'Questions about featured tools, unclear copy, or result interpretation.',
      contact: 'support@interconverter.com',
      responseTime: isZh ? '通常在 2 个工作日内回复' : 'Usually within 2 business days',
    },
    {
      icon: Bug,
      title: isZh ? '错误反馈' : 'Bug reports',
      description: isZh
        ? '适用于流程异常、结果错误，或浏览器相关问题。'
        : 'Use this for broken workflows, wrong outputs, or browser-specific issues.',
      contact: 'bugs@interconverter.com',
      responseTime: isZh ? '可复现问题通常在 1 个工作日内回复' : 'Usually within 1 business day for reproducible issues',
    },
    {
      icon: Lightbulb,
      title: isZh ? '工具建议' : 'Tool suggestions',
      description: isZh
        ? '建议新增计算器、补充示例，或优化工具说明。'
        : 'Suggest a new calculator, a missing example, or a better explanation.',
      contact: 'features@interconverter.com',
      responseTime: isZh ? '会在内容更新批次中统一评估' : 'Reviewed in batches during content updates',
    },
    {
      icon: Shield,
      title: isZh ? '隐私与条款' : 'Privacy and terms',
      description: isZh
        ? '用于政策问题、数据处理疑问或法律相关请求。'
        : 'Use this for policy questions, data handling concerns, or legal requests.',
      contact: 'legal@interconverter.com',
      responseTime: isZh ? '通常在 5 个工作日内回复' : 'Usually within 5 business days',
    },
  ];

  const faqItems = [
    {
      question: isZh ? '什么样的错误反馈最有帮助？' : 'What makes a bug report useful?',
      answer: isZh
        ? '请尽量提供工具页面地址、输入的具体数值、你期望的结果、实际得到的结果，以及浏览器或设备信息（如果问题与环境有关）。'
        : 'Include the tool URL, the exact values you entered, what result you expected, what you received instead, and your browser or device if the issue looks environment-specific.',
    },
    {
      question: isZh ? '可以申请某个工具重新公开吗？' : 'Can I ask for a tool to be added back to the public site?',
      answer: isZh
        ? '可以。如果某个工具已实现但当前未公开展示，你可以说明使用场景以及为什么它应该成为持续维护的一部分。'
        : 'Yes. If a tool is implemented but not currently featured, explain the use case and why it should become part of the maintained public set.',
    },
    {
      question: isZh ? '你们也会处理文案和解释问题吗？' : 'Do you review wording and explanation issues too?',
      answer: isZh
        ? '会。反馈不限于计算错误。标签含糊、示例不足或说明令人困惑，这些问题同样有价值。'
        : 'Yes. Feedback is not limited to math errors. Reports about ambiguous labels, weak examples, or confusing instructions are useful and reviewed.',
    },
    {
      question: isZh ? '紧急业务场景适合依赖邮件支持吗？' : 'Should I rely on email for urgent business deadlines?',
      answer: isZh
        ? '不建议。站点维护是异步进行的。如果某个计算结果对截止时间很重要，请先独立复核，而不是等待支持回复。'
        : 'No. The site is maintained asynchronously. If a calculation is important for a deadline, verify it independently instead of waiting on support.',
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">{isZh ? '联系 InterConverter' : 'Contact InterConverter'}</h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          {isZh
            ? '公开站点目前通过少量支持渠道维护。若要反馈问题、建议改进，或咨询某个工具的使用方式，邮件通常是最快的联系方式。'
            : 'The public site is maintained through a small number of support channels. Email is the best route for reporting issues, suggesting improvements, or asking about how a featured tool works.'}
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
          <CardTitle>{isZh ? '发送邮件前建议准备的信息' : 'Before you email'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-600">
          <p>
            {isZh
              ? '如果反馈足够具体，我们通常能更快定位问题。最有帮助的邮件通常会包含具体工具页面、输入值、预期结果，以及是否在多个浏览器或设备上都能复现。'
              : 'We can review calculation issues faster when the report is specific. The most helpful emails include the exact tool page, the values used, the expected outcome, and whether the issue appears on more than one browser or device.'}
          </p>
          <p>
            {isZh
              ? '如果你是在提建议，也请尽量说明背后的使用场景。比如某个页面是否需要更多示例、更明确的警告，或更适合的结果展示方式。'
              : 'Suggestions are also more useful when they explain the workflow behind the request. If a tool page needs more examples, a stronger warning, or a different result format, say what task you were trying to complete.'}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold text-gray-900">{isZh ? '常见问题' : 'Common questions'}</h2>
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
