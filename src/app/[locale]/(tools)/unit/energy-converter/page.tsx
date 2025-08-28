import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import EnergyConverter from '@/components/converters/unit/EnergyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('energy-converter', 'unit', 'Energy Converter');

export const metadata: Metadata = {
  title: 'Energy Converter - Calories, Kilojoules, kWh & More | InterConverter',
  description: 'Convert between calories, kilojoules, kilowatt-hours, BTU and other energy units. Professional energy conversion calculator.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Energy Converter - Universal Energy Calculator',
    description: 'Professional energy converter supporting all major units. Convert calories, kilojoules, kWh, BTU with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-energy-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Energy Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/energy-converter'
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

export default function EnergyConverterPage() {
  const faqs = getFAQsByToolId('energy-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Energy Converter"
      description="Convert between calories, kilojoules, kilowatt-hours, BTU and other energy units with precision and instant calculations."
      keywords={keywords}
      toolId="energy-converter"
      category="unit"
      emoji="⚡"
      customHowToUse={[
        "Select the source energy unit from the dropdown",
        "Enter the energy value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major energy units",
        "Nutritional and scientific applications",
        "High precision calculations",
        "Common energy reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <EnergyConverter />
    </EnhancedToolLayout>
  );
}
