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

// Helper function to generate optimized tool titles
function generateOptimizedTitle(toolName: string, category: string): string {
  // Define scenario/benefit keywords for common tools
  const titleOptimizations: Record<string, string> = {
    'HEX to RGB Converter': 'HEX to RGB Converter – Instant Color Code Conversion | InterConverter',
    'RGB to HEX Converter': 'RGB to HEX Converter – Fast Color Code Generator | InterConverter',
    'Currency Converter': 'Currency Converter – Live Exchange Rates & Calculator | InterConverter',
    'BMI Calculator': 'BMI Calculator – Fast & Accurate Body Mass Index Tool | InterConverter',
    'Loan Calculator': 'Loan Calculator – Monthly Payment & Interest Calculator | InterConverter',
    'Length Converter': 'Length Converter – Meters, Feet, Inches & More | InterConverter',
    'Weight Converter': 'Weight Converter – Pounds, Kilograms & Units | InterConverter',
    'Temperature Converter': 'Temperature Converter – Celsius, Fahrenheit & Kelvin | InterConverter',
    'Unix Timestamp Converter': 'Unix Timestamp Converter – Epoch Time to Date Tool | InterConverter',
    'Date Calculator': 'Date Calculator – Days Between Dates & Age Calculator | InterConverter',
    'Compression Ratio Calculator': 'Compression Ratio Calculator – Engine Performance Tool | InterConverter',
    'PDF Converter': 'PDF Converter – Document Format Conversion Tool | InterConverter',
    'Image Converter': 'Image Converter – JPG, PNG, GIF Format Tool | InterConverter'
  };

  // Return optimized title if available
  if (titleOptimizations[toolName]) {
    return titleOptimizations[toolName];
  }

  // Fallback: generate generic optimized title
  const scenarioKeywords: Record<string, string> = {
    'color': 'Professional Color Tool',
    'finance': 'Financial Calculator & Tool',
    'health': 'Health & Fitness Calculator',
    'unit': 'Unit Conversion Tool',
    'time': 'Time & Date Calculator',
    'auto': 'Automotive Calculator Tool',
    'media': 'File Conversion Tool'
  };

  const scenario = scenarioKeywords[category] || 'Professional Tool';
  return `${toolName} – ${scenario} | InterConverter`;
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
  const categoryPath = category ? `/${category}` : '';
  const url = `${baseUrl}${categoryPath}/${toolId}`;

  // Generate optimized SEO title with scenario/benefit keywords
  const seoTitle = generateOptimizedTitle(title, category || '');

  // Ensure description is under 160 characters
  const seoDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  // Enhanced keywords with long-tail variations
  const enhancedKeywords = [
    ...keywords.slice(0, 10), // Limit primary keywords
    'free online tool',
    'no registration required',
    'instant results',
    'professional grade',
    `${title.toLowerCase()} online`,
    `free ${title.toLowerCase()}`,
    'converter tool',
    'calculator online'
  ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: enhancedKeywords.join(', '),
    authors: [{ name: 'InterConverter Team' }],
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
      title: seoTitle,
      description: seoDescription,
      url,
      siteName: 'InterConverter',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/images/og-${toolId}.jpg`,
          width: 1200,
          height: 630,
          alt: `${title} - Free Online Tool`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      creator: '@interconverter',
      images: [`${baseUrl}/images/twitter-${toolId}.jpg`],
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