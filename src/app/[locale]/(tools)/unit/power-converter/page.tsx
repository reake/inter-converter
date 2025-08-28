import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { PowerConverter } from '@/components/converters/unit/PowerConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('power-converter', 'unit', 'Power Converter');

export const metadata: Metadata = {
  title: 'Power Converter - Watts, Kilowatts, Horsepower | InterConverter',
  description: 'Convert between watts, kilowatts, horsepower and other power units. Professional power conversion calculator for electrical and mechanical applications.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Power Converter - Universal Power Calculator',
    description: 'Professional power converter supporting all major units. Convert watts, kilowatts, horsepower with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-power-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Power Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/power-converter'
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

export default function PowerConverterPage() {
  const faqs = getFAQsByToolId('power-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Power Converter"
      description="Convert between watts, kilowatts, horsepower and other power units with precision and instant calculations."
      keywords={keywords}
      toolId="power-converter"
      category="unit"
      emoji="⚡"
      customHowToUse={[
        "Select the source power unit from the dropdown",
        "Enter the power value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major power units",
        "Electrical and mechanical applications",
        "High precision calculations",
        "Common power reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <PowerConverter />
    </EnhancedToolLayout>
  );
}
