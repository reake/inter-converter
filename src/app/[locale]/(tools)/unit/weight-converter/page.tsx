import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WeightConverter } from '@/components/converters/unit/WeightConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('weight-converter', 'unit', 'Weight Converter');

export const metadata: Metadata = {
  title: 'Weight Converter - Convert Kg, Pounds, Grams & More | InterConverter',
  description: 'Free weight converter tool. Convert between kilograms, pounds, grams, ounces, stones and more. Accurate mass conversion calculator for all units.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Weight Converter - Universal Mass & Weight Calculator',
    description: 'Professional weight converter supporting all major units. Convert kilograms, pounds, grams, ounces, stones with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-weight-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Weight Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/weight-converter'
  },
  authors: [{ name: 'InterConverter Team' }],
  creator: 'InterConverter',
  publisher: 'InterConverter',
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
  }
};

export default function WeightConverterPage() {
  const faqs = getFAQsByToolId('weight-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Weight Converter"
      description="Convert between different units of weight and mass with precision and instant calculations."
      keywords={keywords}
      toolId="weight-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        "Select the source weight unit from the dropdown",
        "Enter the weight value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major weight units",
        "Metric and imperial system conversions",
        "High precision calculations",
        "Common weight reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <WeightConverter />
    </EnhancedToolLayout>
  );
}
