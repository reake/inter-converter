import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { VolumeConverter } from '@/components/converters/unit/VolumeConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('volume-converter', 'unit', 'Volume Converter');

export const metadata: Metadata = {
  title: 'Volume Converter - Liters, Gallons, Cubic Meters | InterConverter',
  description: 'Convert volume units between liters, gallons, cubic meters, milliliters and more. Accurate liquid volume conversion calculator.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Volume Converter - Universal Volume & Liquid Calculator',
    description: 'Professional volume converter supporting all major units. Convert liters, gallons, cubic meters, milliliters with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-volume-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Volume Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/volume-converter'
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

export default function VolumeConverterPage() {
  const faqs = getFAQsByToolId('volume-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Volume Converter"
      description="Convert volume units between liters, gallons, cubic meters and more with precision and instant calculations."
      keywords={keywords}
      toolId="volume-converter"
      category="unit"
      emoji="🧪"
      customHowToUse={[
        "Select the source volume unit from the dropdown",
        "Enter the volume value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major volume units",
        "Metric and imperial system conversions",
        "High precision calculations",
        "Common volume reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <VolumeConverter />
    </EnhancedToolLayout>
  );
}
