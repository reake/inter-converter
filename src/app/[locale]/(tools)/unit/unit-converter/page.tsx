import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { UnitConverter } from '@/components/converters/unit/UnitConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('unit-converter', 'unit', 'Unit Converter');

export const metadata: Metadata = {
  title: 'Unit Converter - Universal Measurement Calculator | InterConverter',
  description: 'Convert units of measurement instantly. Free online unit converter for length, weight, temperature, volume, area, and more. Accurate conversions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Unit Converter - Universal Measurement Calculator',
    description: 'Professional unit converter supporting all major measurement categories. Convert length, weight, temperature, volume, area with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-unit-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Unit Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/unit-converter'
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

export default function UnitConverterPage() {
  const faqs = getFAQsByToolId('unit-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement including length, weight, temperature, area, volume, and more with precision and instant calculations."
      keywords={keywords}
      toolId="unit-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Select the category of units you want to convert",
        "Choose the source unit (what you have)",
        "Choose the target unit (what you want)",
        "Enter the value to convert and view results",
        "Copy results or switch between unit categories"
      ]}
      customFeatures={[
        "Convert between metric and imperial units",
        "Real-time conversion as you type",
        "High precision calculations",
        "Support for scientific notation",
        "Multiple unit categories support",
        "Bidirectional conversion support"
      ]}
      faqs={faqs}
    >
      <UnitConverter />
    </EnhancedToolLayout>
  );
}