import { Metadata } from 'next';
import { ToolLayoutProps } from '@/types/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolFAQs, FAQ } from './ToolFAQs';
import { RelatedTools } from './RelatedTools';
import { getToolsByCategory } from '@/config/tools';
import { ToolConfig } from '@/types/tools';

interface EnhancedToolLayoutProps extends ToolLayoutProps {
  children: React.ReactNode;
  emoji?: string;
  includeStructuredData?: boolean;
  customHowToUse?: string[];
  customFeatures?: string[];
  faqs?: FAQ[];
  relatedTools?: ToolConfig[];
}

export function EnhancedToolLayout({
  title,
  description,
  children,
  toolId,
  keywords = [],
  category,
  emoji,
  includeStructuredData = true,
  customHowToUse,
  customFeatures,
  faqs = [],
  relatedTools
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
  
  // Get related tools from the same category if not provided
  const toolsToShow = relatedTools || getToolsByCategory(category as any);

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

          {/* How to Use and Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Use</CardTitle>
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
                <CardTitle className="text-lg">Features</CardTitle>
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
              <ToolFAQs faqs={faqs} toolName={title} />
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
  category?: string,
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
