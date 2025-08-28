import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { EngineSizeConverter } from '@/components/converters/automotive/EngineSizeConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('engine-size-converter', 'auto', 'Engine Size Converter');

export const metadata: Metadata = {
  title: 'Engine Size Converter - CI to Liters & Liters to CI | InterConverter',
  description: 'Convert engine displacement between cubic inches and liters. Free engine size converter for automotive applications with accurate CI/L conversions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Engine Size Converter - CI to Liters & Liters to CI',
    description: 'Professional engine size converter for automotive applications. Convert between cubic inches and liters with precision.',
    type: 'website',
    images: [
      {
        url: '/images/og-engine-size-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Engine Size Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/engine-size-converter'
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

export default function EngineSizeConverterPage() {
  const faqs = getFAQsByToolId('engine-size-converter', 'auto');

  return (
    <EnhancedToolLayout
      title="Engine Size Converter"
      description="Convert engine displacement between cubic inches and liters. Perfect for engine identification, comparison, and automotive applications."
      keywords={keywords}
      toolId="engine-size-converter"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter engine size in cubic inches or liters",
        "View instant conversion to other unit",
        "Use for engine identification and comparison",
        "Reference common engine sizes and specifications"
      ]}
      customFeatures={[
        "Cubic inch to liter conversion",
        "Bidirectional conversion support",
        "Common engine size references",
        "Automotive applications",
        "Professional accuracy"
      ]}
      faqs={faqs}
    >
      <EngineSizeConverter />
    </EnhancedToolLayout>
  );
}
