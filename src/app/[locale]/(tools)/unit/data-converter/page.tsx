import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import DataConverter from '@/components/converters/unit/DataConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('data-converter', 'unit', 'Data Storage Converter');

export const metadata: Metadata = {
  title: 'Data Storage Converter - KB, MB, GB, TB & More | InterConverter',
  description: 'Convert between KB, MB, GB, TB and other data storage units. Free file size conversion calculator for digital storage.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Data Storage Converter - Universal File Size Calculator',
    description: 'Professional data storage converter supporting all major units. Convert KB, MB, GB, TB with precision for digital storage.',
    type: 'website',
    images: [
      {
        url: '/images/og-data-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Data Storage Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/unit/data-converter'
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

export default function DataConverterPage() {
  const faqs = getFAQsByToolId('data-converter', 'unit');

  return (
    <EnhancedToolLayout
      title="Data Storage Converter"
      description="Convert between KB, MB, GB, TB and other data storage units with precision and instant calculations."
      keywords={keywords}
      toolId="data-converter"
      category="unit"
      emoji="💾"
      customHowToUse={[
        "Select the source data unit from the dropdown",
        "Enter the data size value in the input field",
        "Choose the target unit for conversion",
        "View instant conversion results",
        "Copy results or switch units as needed"
      ]}
      customFeatures={[
        "Support for all major data storage units",
        "Binary and decimal system conversions",
        "High precision calculations",
        "Common file size reference values",
        "Bidirectional conversion support",
        "Real-time calculation as you type"
      ]}
      faqs={faqs}
    >
      <DataConverter />
    </EnhancedToolLayout>
  );
}
