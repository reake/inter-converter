import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { CompressionRatioCalculator } from '@/components/converters/automotive/CompressionRatioCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

// SEO-optimized keywords
const keywords = generateOptimizedKeywords('compression-ratio-calculator', 'auto', 'Compression Ratio Calculator');

// Enhanced metadata with Google SEO best practices
export const metadata: Metadata = {
  title: 'Compression Ratio Calculator - Engine Performance Tool | InterConverter',
  description: 'Calculate engine compression ratio from bore, stroke, and combustion chamber volume. Free compression ratio calculator for engine building and performance tuning with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Compression Ratio Calculator - Engine Performance Tool',
    description: 'Professional compression ratio calculator for engine building. Calculate CR from bore, stroke, and combustion chamber volume for optimal performance tuning.',
    type: 'website',
    images: [
      {
        url: '/images/og-compression-ratio-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Compression Ratio Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/compression-ratio-calculator'
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

export default function CompressionRatioCalculatorPage() {
  const faqs = getFAQsByToolId('compression-ratio-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Compression Ratio Calculator"
      description="Calculate engine compression ratio from bore, stroke, and combustion chamber volume. Essential tool for engine building and performance tuning."
      keywords={keywords}
      toolId="compression-ratio-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter cylinder bore diameter in inches",
        "Input stroke length in inches",
        "Specify combustion chamber volume in CC",
        "Add deck height and head gasket thickness",
        "View calculated compression ratio instantly"
      ]}
      customFeatures={[
        "Accurate compression ratio calculations",
        "Support for custom engine builds",
        "Performance tuning guidance",
        "Professional engine building tool",
        "Handles complex engine geometries"
      ]}
      faqs={faqs}
    >
      <CompressionRatioCalculator />
    </EnhancedToolLayout>
  );
}