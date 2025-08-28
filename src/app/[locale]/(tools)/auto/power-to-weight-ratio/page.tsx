import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PowerToWeightCalculator from '@/components/converters/automotive/PowerToWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('power-to-weight-ratio', 'auto', 'Power to Weight Ratio Calculator');

export const metadata: Metadata = {
  title: 'Power to Weight Ratio Calculator - HP/LB Performance Analysis | InterConverter',
  description: 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Power to Weight Ratio Calculator - HP/LB Performance Analysis',
    description: 'Professional power-to-weight ratio calculator for automotive performance. Analyze acceleration potential and compare vehicle performance metrics.',
    type: 'website',
    images: [
      {
        url: '/images/og-power-to-weight-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Power to Weight Ratio Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/power-to-weight-ratio'
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

export default function PowerToWeightRatioPage() {
  const faqs = getFAQsByToolId('power-to-weight-ratio', 'auto');

  return (
    <EnhancedToolLayout
      title="Power to Weight Ratio Calculator"
      description="Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential for any vehicle."
      keywords={keywords}
      toolId="power-to-weight-ratio"
      category="auto"
      emoji="⚡"
      customHowToUse={[
        "Enter vehicle horsepower (HP)",
        "Input vehicle weight in pounds or kilograms",
        "View power-to-weight ratio calculations",
        "Compare with performance benchmarks",
        "Analyze acceleration potential"
      ]}
      customFeatures={[
        "HP per pound calculation",
        "Performance analysis",
        "Benchmark comparisons",
        "Multiple unit support",
        "Real-time calculations"
      ]}
      faqs={faqs}
    >
      <PowerToWeightCalculator />
    </EnhancedToolLayout>
  );
}
