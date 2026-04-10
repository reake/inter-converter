import Head from 'next/head';
import { ToolLayoutProps } from '@/types/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolFAQs, FAQ } from './ToolFAQs';
import { RelatedTools } from './RelatedTools';
import { ToolConfig } from '@/types/tools';

interface EnhancedToolLayoutProps extends ToolLayoutProps {
  children: React.ReactNode;
  emoji?: string;
  includeStructuredData?: boolean;
  customHowToUse?: string[];
  customFeatures?: string[];
  faqs?: FAQ[];
  relatedTools?: ToolConfig[];
  aboutContent?: string | string[];
  detailsContent?: string[];
  sectionTitles?: {
    howToUse?: string;
    features?: string;
    faq?: string;
    faqSubtitleTemplate?: string;
    about?: string;
    details?: string;
  };
}

export function EnhancedToolLayout({
  title,
  description,
  children,
  toolId,
  category = '',
  emoji,
  includeStructuredData = true,
  customHowToUse,
  customFeatures,
  faqs = [],
  relatedTools = [],
  aboutContent,
  detailsContent,
  sectionTitles,
  locale
}: EnhancedToolLayoutProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const l = (locale || 'en').toLowerCase();
  const defaultHowToUse = l === 'zh'
    ? [
        '在对应输入框中填写内容',
        '查看页面内即时更新的结果',
        '复制或继续在你的工作流中使用输出结果',
        '重要结果在使用前请独立复核'
      ]
    : [
        'Enter your input in the designated field',
        'Review the result as it updates on the page',
        'Copy or reuse the output in your workflow',
        'Verify important results independently before relying on them'
      ];

  const defaultFeatures = l === 'zh'
    ? [
        '清晰的浏览器端流程',
        '页面内即时显示结果',
        '精选工具无需注册',
        '适配移动端界面'
      ]
    : [
        'Clear, browser-based workflow',
        'Immediate on-page results',
        'No account required for featured tools',
        'Mobile-friendly interface'
      ];

  const howToUseSteps = customHowToUse || defaultHowToUse;
  const features = customFeatures || defaultFeatures;
  const normalizedFaqs = faqs || [];
  const structuredData = includeStructuredData
    ? generateEnhancedStructuredData(baseUrl, title, description, toolId, category, l, normalizedFaqs, howToUseSteps)
    : null;
  
  const toolsToShow = relatedTools;

  // Localized section titles
  const defaultTitles = l === 'zh'
  ? {
      about: `关于${title}`,
      howToUse: `如何使用${title}`,
      features: `${title}的功能特点`,
      faq: `${title}常见问题`,
      faqSubtitleTemplate: `关于 {{tool}} 的常见问题`,
    }
  : {
      about: `About ${title}`,
      howToUse: `How to Use ${title}`,
      features: `Features of ${title}`,
      faq: `${title} FAQs`,
      faqSubtitleTemplate: `Common questions about ${title}`,
    };
  const mergedTitles = { ...defaultTitles, ...sectionTitles };

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/* Additional image meta could be injected dynamically via page metadata */}
      </Head>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbStructuredData(baseUrl, title, category, toolId, l)),
        }}
      />
      {/* x-default hreflang */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${category}/${toolId}`} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            {emoji && <span className="text-5xl">{emoji}</span>}
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Tool Content */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>

        {/* About Section */}
        {aboutContent && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{emoji}</span>
                {mergedTitles.about}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(aboutContent) ? (
                aboutContent.map((p, idx) => (
                  <p key={idx} className="mb-3 text-gray-700 dark:text-gray-300">
                    {p}
                  </p>
                ))
              ) : (
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  {aboutContent}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* How to Use and Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* How to Use */}
          <Card>
            <CardHeader>
              <CardTitle>{mergedTitles.howToUse}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {howToUseSteps.map((step, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>{mergedTitles.features}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        {detailsContent && detailsContent.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{mergedTitles.details}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailsContent.map((detail, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300">
                    {detail}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQs */}
        {normalizedFaqs.length > 0 && (
          <ToolFAQs 
            faqs={normalizedFaqs} 
            title={mergedTitles.faq}
            toolName={title}
          />
        )}

        {/* Related Tools */}
        {toolsToShow && toolsToShow.length > 0 && (
          <RelatedTools tools={toolsToShow} currentToolId={toolId} category={category} locale={l} />
        )}
      </div>
    </>
  );
}

// Generate enhanced structured data for SEO
function generateEnhancedStructuredData(
  baseUrl: string,
  title: string,
  description: string,
  toolId: string,
  category: string,
  locale: string,
  faqs: FAQ[],
  howToUse?: string[]
) {
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const isZh = locale === 'zh';
  const toolUrl = `${baseUrl}${localePrefix}/${category}/${toolId}`;
  const featureList = isZh
    ? ['免费使用', '无需注册', '浏览器端流程', '页面内即时显示结果']
    : ['Free to use', 'No registration required', 'Browser-based workflow', 'Immediate on-page results'];
  const howToName = isZh ? `${title} 使用方法` : `How to Use ${title}`;
  const howToDescription = isZh ? `${title} 的分步使用说明` : `Step-by-step guide for using ${title}`;
  const stepPrefix = isZh ? '步骤' : 'Step';

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": toolUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "permissions": "No special permissions required",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": featureList,
    "brand": {
      "@type": "Brand",
      "name": "InterConverter"
    },
    "publisher": {
      "@type": "Organization",
      "name": "InterConverter",
      "url": baseUrl
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": locale
  };

  // Add FAQ structured data if available
  if (faqs.length > 0) {
    structuredData.mainEntity = {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // HowTo schema for step-by-step guides
  if (howToUse && howToUse.length > 0) {
    const howToData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": howToName,
      "description": howToDescription,
      "totalTime": "PT1M",
      "step": howToUse.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `${stepPrefix} ${index + 1}`,
        "text": step,
        "url": `${toolUrl}#how-to-use`
      }))
    };
    
    return {
      ...structuredData,
      "@graph": [
        structuredData,
        howToData
      ]
    };
  }

  return structuredData;
}

// Breadcrumb structured data generator
function generateBreadcrumbStructuredData(
  baseUrl: string,
  title: string,
  category: string,
  toolId: string,
  locale: string,
) {
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const isZh = locale === 'zh';
  const breadcrumbCategoryName = isZh
    ? ({ unit: '单位', time: '时间', color: '颜色', auto: '汽车', media: '文件', finance: '金融', health: '健康' }[category] || category)
    : category.charAt(0).toUpperCase() + category.slice(1);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": breadcrumbCategoryName,
        "item": `${baseUrl}${localePrefix}/${category}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `${baseUrl}${localePrefix}/${category}/${toolId}`
      }
    ]
  };
}
