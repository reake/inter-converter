import { Metadata } from 'next';
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
    faqSubtitleTemplate?: string; // e.g., "Common questions about {{tool}}"
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
  const structuredData = includeStructuredData ? generateEnhancedStructuredData(title, description, toolId, category, faqs) : null;

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
  
  // Use provided related tools or empty array to avoid SSR issues
  const toolsToShow = relatedTools;

  // Localized section titles (defaults), override by incoming sectionTitles
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
        faqSubtitleTemplate: `Common questions about {{tool}}`,
      };
  const mergedTitles = { ...defaultTitles, ...(sectionTitles || {}) };

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tool Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {emoji && `${emoji} `}{title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">{mergedTitles.about}</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(aboutContent) ? (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {aboutContent.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <div className="prose max-w-none text-sm text-muted-foreground">
                    <p>{aboutContent}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* How to Use and Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{mergedTitles.howToUse}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {howToUseSteps.map((step, index) => (
                    <p key={index}>{index + 1}. {step}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{mergedTitles.features}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <p key={index}>✓ {feature}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQs Section */}
          {faqs.length > 0 && (
            <div className="mb-8">
              <ToolFAQs 
                faqs={faqs} 
                toolName={title}
                title={mergedTitles.faq}
                subtitle={mergedTitles.faqSubtitleTemplate ? mergedTitles.faqSubtitleTemplate.replace('{{tool}}', title) : undefined}
              />
            </div>
          )}

          {/* Related Tools */}
          <RelatedTools 
            tools={toolsToShow} 
            currentToolId={toolId} 
            category={category}
          />
        </div>
      </div>
    </>
  );
}

// Enhanced structured data generation with FAQs
function generateEnhancedStructuredData(
  title: string,
  description: string,
  toolId: string,
  category: string = '',
  faqs: FAQ[] = []
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://interconverter.com';
  const categoryPath = category ? `/${category}` : '';
  const url = `${baseUrl}${categoryPath}/${toolId}`;
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    permissions: 'browser',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    provider: {
      '@type': 'Organization',
      name: 'InterConverter',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  };

  // Add FAQPage structured data if FAQs exist
  if (faqs.length > 0) {
    return [
      baseStructuredData,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ];
  }

  return baseStructuredData;
}
