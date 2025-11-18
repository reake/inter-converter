import { Metadata } from 'next';
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
  keywords = [],
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
  const defaultHowToUse = [
    "Enter your input in the designated field",
    "The conversion will happen automatically",
    "Copy the result or use it in your project",
    "All processing happens locally in your browser"
  ];

  const defaultFeatures = [
    "Fast and accurate conversions",
    "No data sent to servers",
    "Works offline",
    "Mobile-friendly interface"
  ];

  const howToUseSteps = customHowToUse || defaultHowToUse;
  const features = customFeatures || defaultFeatures;
  const normalizedFaqs = faqs || [];
  const structuredData = includeStructuredData
    ? generateEnhancedStructuredData(baseUrl, title, description, toolId, category, normalizedFaqs)
    : null;
  
  const toolsToShow = relatedTools;

  // Localized section titles
  const l = (locale || 'en').toLowerCase();
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
          __html: JSON.stringify(generateBreadcrumbStructuredData(baseUrl, title, category, toolId)),
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
          <RelatedTools tools={toolsToShow} currentToolId={toolId} category={category} />
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
  faqs: FAQ[]
) {
  const toolUrl = `${baseUrl}/${category}/${toolId}`;

  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": toolUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "permissions": "browser",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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

  return structuredData;
}

// Breadcrumb structured data generator
function generateBreadcrumbStructuredData(baseUrl: string, title: string, category: string, toolId: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": category.charAt(0).toUpperCase() + category.slice(1),
        "item": `${baseUrl}/${category}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `${baseUrl}/${category}/${toolId}`
      }
    ]
  };
}
