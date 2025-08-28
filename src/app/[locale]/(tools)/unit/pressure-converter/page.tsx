import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { PressureConverter } from '@/components/converters/unit/PressureConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('pressure-converter', 'unit', 'Pressure Converter');

export const metadata: Metadata = {
  title: 'Pressure Converter - Pascal, Bar, PSI & More | InterConverter',
  description: 'Convert between Pascal, Bar, PSI, atm, and other pressure units. Professional pressure conversion calculator for engineering applications.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Pressure Converter - Universal Pressure Calculator',
    description: 'Professional pressure converter supporting all major units. Convert Pascal, Bar, PSI, atm with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-pressure-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Pressure Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/pressure-converter'
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

export default function PressureConverterPage() {
  const faqs = getFAQsByToolId('pressure-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Pressure Converter"
      description="Convert between Pascal, Bar, PSI, atm, and other pressure units with precision and instant calculations."
      keywords={keywords}
      toolId="pressure-converter"
      category="unit"
      emoji="🔧"
      customHowToUse={[
        "Select the source pressure unit from the dropdown",
        "Enter the pressure value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major pressure units",
        "Engineering and scientific applications",
        "High precision calculations",
        "Common pressure reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <PressureConverter />
    </EnhancedToolLayout>
  );
}
