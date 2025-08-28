import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { SpeedConverter } from '@/components/converters/unit/SpeedConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('speed-converter', 'unit', 'Speed Converter');

export const metadata: Metadata = {
  title: 'Speed Converter - Convert km/h, mph, knots & more | InterConverter',
  description: 'Convert between km/h, mph, knots, m/s, and other speed units. Professional speed conversion calculator for all velocities.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Speed Converter - Universal Velocity Calculator',
    description: 'Professional speed converter supporting all major units. Convert km/h, mph, knots, m/s with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-speed-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Speed Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/speed-converter'
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

export default function SpeedConverterPage() {
  const faqs = getFAQsByToolId('speed-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Speed Converter"
      description="Convert between km/h, mph, knots, m/s, and other speed units with precision and instant calculations."
      keywords={keywords}
      toolId="speed-converter"
      category="unit"
      emoji="🏃"
      customHowToUse={[
        "Select the source speed unit from the dropdown",
        "Enter the speed value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major speed units",
        "Automotive and aviation applications",
        "High precision calculations",
        "Common speed reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <SpeedConverter />
    </EnhancedToolLayout>
  );
}
