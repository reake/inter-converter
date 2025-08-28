import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { LengthConverter } from '@/components/converters/unit/LengthConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('length-converter', 'unit', 'Length Converter');

export const metadata: Metadata = {
  title: 'Length Converter - Convert Meters, Feet, Inches & More | InterConverter',
  description: 'Free online length converter. Convert between meters, feet, inches, centimeters, miles, kilometers and more. Accurate metric to imperial conversion calculator.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Length Converter - Universal Distance & Length Calculator',
    description: 'Professional length converter supporting all major units. Convert meters, feet, inches, centimeters, miles, kilometers with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-length-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Length Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/length-converter'
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

export default function LengthConverterPage() {
  const faqs = getFAQsByToolId('length-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Length Converter"
      description="Convert between different units of length and distance with precision and instant calculations."
      keywords={keywords}
      toolId="length-converter"
      category="unit"
      emoji="📏"
      customHowToUse={[
        "Select the source unit from the dropdown menu",
        "Enter the length value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major length units",
        "Metric and imperial system conversions",
        "High precision calculations",
        "Common length reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <LengthConverter />
    </EnhancedToolLayout>
  );
}
