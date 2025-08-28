import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CmToInchesConverter from '@/components/converters/unit/CmToInchesConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('cm-to-inches-converter', 'unit', 'CM to Inches Converter');

export const metadata: Metadata = {
  title: 'CM to Inches Converter - Centimeters to in Calculator | InterConverter',
  description: 'Convert centimeters to inches instantly with our accurate length conversion calculator. Free online tool for cm to inches conversion with formula and examples.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'CM to Inches Converter - Centimeters to in Calculator',
    description: 'Professional length converter for centimeters to inches conversion. Instant calculations with formulas and reference tables for design and manufacturing.',
    type: 'website',
    images: [
      {
        url: '/images/og-cm-to-inches-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'CM to Inches Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/cm-to-inches-converter'
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

export default function CmToInchesConverterPage() {
  const faqs = getFAQsByToolId('cm-to-inches-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="CM to Inches Converter"
      description="Convert centimeters to inches instantly with accurate length conversion calculations."
      keywords={keywords}
      toolId="cm-to-inches-converter"
      category="unit"
      emoji="📐"
      customHowToUse={[
        'Enter the length in centimeters in the input field',
        'The equivalent length in inches will be calculated automatically',
        'Use the swap button to convert inches to centimeters instead',
        'Copy the result or use it for your measurements',
        'Reference common length values for quick conversions'
      ]}
      customFeatures={[
        'Instant cm to inches conversion',
        'Bidirectional conversion (cm ↔ inches)',
        'High precision calculations (in = cm ÷ 2.54)',
        'Common length reference values',
        'Copy results to clipboard',
        'Mobile-friendly interface',
        'Real-time calculation as you type'
      ]}
      faqs={faqs}
    >
      <CmToInchesConverter />
    </EnhancedToolLayout>
  );
}
