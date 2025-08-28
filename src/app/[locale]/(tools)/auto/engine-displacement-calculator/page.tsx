import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { EngineDisplacementCalculator } from '@/components/converters/automotive/EngineDisplacementCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('engine-displacement-calculator', 'auto', 'Engine Displacement Calculator');

export const metadata: Metadata = {
  title: 'Engine Displacement Calculator - Bore & Stroke to CI/Liters | InterConverter',
  description: 'Calculate engine displacement from bore and stroke measurements. Free engine displacement calculator with cubic inch and liter conversions for automotive applications.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Engine Displacement Calculator - Bore & Stroke to CI/Liters',
    description: 'Professional engine displacement calculator. Calculate total engine volume from bore, stroke, and cylinder count with CI and liter results.',
    type: 'website',
    images: [
      {
        url: '/images/og-engine-displacement-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Engine Displacement Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/engine-displacement-calculator'
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

export default function EngineDisplacementCalculatorPage() {
  const faqs = getFAQsByToolId('engine-displacement-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Engine Displacement Calculator"
      description="Calculate engine displacement from bore and stroke measurements. Get accurate results in both cubic inches and liters for any engine configuration."
      keywords={keywords}
      toolId="engine-displacement-calculator"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter cylinder bore diameter in inches",
        "Input stroke length in inches",
        "Specify number of cylinders",
        "View calculated displacement in CI and liters",
        "Use results for engine identification and planning"
      ]}
      customFeatures={[
        "Accurate displacement calculations",
        "Cubic inch and liter results",
        "Support for any cylinder count",
        "Professional automotive tool",
        "Instant bore/stroke to displacement conversion"
      ]}
      faqs={faqs}
    >
      <EngineDisplacementCalculator />
    </EnhancedToolLayout>
  );
}