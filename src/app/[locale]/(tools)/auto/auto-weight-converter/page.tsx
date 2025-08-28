import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AutoWeightConverter } from '@/components/converters/automotive/AutoWeightConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('auto-weight-converter', 'auto', 'Automotive Weight Converter');

export const metadata: Metadata = {
  title: 'Automotive Weight Converter - Pounds, Kilograms & More | InterConverter',
  description: 'Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Automotive Weight Converter - Pounds, Kilograms & More',
    description: 'Professional automotive weight converter. Convert between pounds, kilograms, ounces, and grams for vehicle performance and weight reduction calculations.',
    type: 'website',
    images: [
      {
        url: '/images/og-auto-weight-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Automotive Weight Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/auto-weight-converter'
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

export default function AutoWeightConverterPage() {
  const faqs = getFAQsByToolId('auto-weight-converter', 'auto');

  return (
    <EnhancedToolLayout
      title="Automotive Weight Converter"
      description="Convert between pounds, kilograms, ounces, and grams for automotive applications. Essential for weight reduction and performance calculations."
      keywords={keywords}
      toolId="auto-weight-converter"
      category="auto"
      emoji="⚖️"
      customHowToUse={[
        "Enter weight value in any supported unit",
        "Select source and target weight units",
        "View instant conversion results",
        "Use for automotive weight calculations and performance tuning"
      ]}
      customFeatures={[
        "Multiple weight unit support",
        "Pounds to kilograms conversion",
        "Ounces to grams conversion",
        "Automotive weight calculations",
        "Performance optimization support"
      ]}
      faqs={faqs}
    >
      <AutoWeightConverter />
    </EnhancedToolLayout>
  );
}
