import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AreaConverter } from '@/components/converters/unit/AreaConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('area-converter', 'unit', 'Area Converter');

export const metadata: Metadata = {
  title: 'Area Converter - Square Meters, Feet, Acres & More | InterConverter',
  description: 'Convert area units including square meters, square feet, acres, hectares. Professional area conversion calculator for land and property measurements.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Area Converter - Universal Area & Land Calculator',
    description: 'Professional area converter supporting all major units. Convert square meters, square feet, acres, hectares with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-area-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Area Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/area-converter'
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

export default function AreaConverterPage() {
  const faqs = getFAQsByToolId('area-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Area Converter"
      description="Convert area units including square meters, square feet, acres, hectares with precision and instant calculations."
      keywords={keywords}
      toolId="area-converter"
      category="unit"
      emoji="🏞️"
      customHowToUse={[
        "Select the source area unit from the dropdown",
        "Enter the area value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major area units",
        "Land and property measurement conversions",
        "High precision calculations",
        "Common area reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <AreaConverter />
    </EnhancedToolLayout>
  );
}
