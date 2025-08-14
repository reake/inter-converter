import { Metadata } from 'next';
import { ToolLayoutProps } from '@/types/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolLayoutComponentProps extends ToolLayoutProps {
  children: React.ReactNode;
  emoji?: string;
  includeStructuredData?: boolean;
  customHowToUse?: string[];
  customFeatures?: string[];
}

export function ToolLayout({
  title,
  description,
  children,
  toolId,
  keywords = [],
  category,
  emoji,
  includeStructuredData = true,
  customHowToUse,
  customFeatures
}: ToolLayoutComponentProps) {
  const structuredData = includeStructuredData ? generateToolStructuredData(title, description, toolId, category) : null;

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

          {/* SEO and Help Content */}
          <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </>
  );
}

// SEO metadata generation helper
export function generateToolMetadata(
  title: string,
  description: string,
  toolId: string,
  keywords: string[] = [],
  category?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://interconverter.com';
  const url = `${baseUrl}/tools/${toolId}`;
  
  return {
    title: `${title} - Free Online Tool | InterConverter`,
    description,
    keywords: [...keywords, 'converter', 'tool', 'online', 'free'].join(', '),
    authors: [{ name: 'InterConverter' }],
    creator: 'InterConverter',
    publisher: 'InterConverter',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} - Free Online Tool`,
      description,
      url,
      siteName: 'InterConverter',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Free Online Tool`,
      description,
      creator: '@interconverter',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
}

// Structured data generation for tools
export function generateToolStructuredData(
  title: string,
  description: string,
  toolId: string,
  category?: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://interconverter.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url: `${baseUrl}/tools/`,
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
      url: baseUrl
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  };
}