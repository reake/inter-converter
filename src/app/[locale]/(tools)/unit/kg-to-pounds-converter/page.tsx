import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import KgToPoundsConverter from '@/components/converters/unit/KgToPoundsConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('kg-to-pounds-converter', 'unit', 'Kg to Pounds Converter');

export const metadata: Metadata = {
  title: 'Kg to Pounds Converter - Kilograms to lbs Calculator | InterConverter',
  description: 'Convert kilograms to pounds instantly with our accurate weight conversion calculator. Free online tool for kg to lbs conversion with formula and examples.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Kg to Pounds Converter - Kilograms to lbs Calculator',
    description: 'Professional weight converter for kilograms to pounds conversion. Instant calculations with formulas and reference tables for fitness and shipping.',
    type: 'website',
    images: [
      {
        url: '/images/og-kg-to-pounds-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Kg to Pounds Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/kg-to-pounds-converter'
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

export default function KgToPoundsConverterPage() {
  const faqs = getFAQsByToolId('kg-to-pounds-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Kg to Pounds Converter"
      description="Convert kilograms to pounds instantly with accurate weight conversion calculations."
      keywords={keywords}
      toolId="kg-to-pounds-converter"
      category="unit"
      emoji="⚖️"
      customHowToUse={[
        'Enter the weight in kilograms in the input field',
        'The equivalent weight in pounds will be calculated automatically',
        'Use the swap button to convert pounds to kilograms instead',
        'Copy the result or use it for your calculations',
        'Reference common weight values for quick conversions'
      ]}
      customFeatures={[
        'Instant kg to pounds conversion',
        'Bidirectional conversion (kg ↔ lbs)',
        'High precision calculations (lbs = kg × 2.205)',
        'Common weight reference values',
        'Copy results to clipboard',
        'Mobile-friendly interface',
        'Real-time calculation as you type'
      ]}
      faqs={faqs}
    >
      <KgToPoundsConverter />
    </EnhancedToolLayout>
  );
}
