import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import PowerToWeightCalculator from '@/components/converters/automotive/PowerToWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('power-to-weight-calculator', 'auto', 'Power to Weight Calculator');

export const metadata: Metadata = {
  title: 'Power to Weight Calculator - HP/LB Performance Analysis | InterConverter',
  description: 'Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Power to Weight Calculator - HP/LB Performance Analysis',
    description: 'Professional power-to-weight ratio calculator for automotive performance. Analyze acceleration potential and compare vehicle performance metrics.',
    type: 'website',
    images: [
      {
        url: '/images/og-power-to-weight-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Power to Weight Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/power-to-weight-calculator'
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

export default function PowerToWeightCalculatorPage() {
  const faqs = getFAQsByToolId('power-to-weight-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Power to Weight Calculator"
      description="Calculate power-to-weight ratio for automotive performance analysis. Compare horsepower per pound and acceleration potential for any vehicle."
      keywords={keywords}
      toolId="power-to-weight-calculator"
      category="auto"
      emoji="⚡"
      customHowToUse={[
        "Enter vehicle horsepower (HP)",
        "Input vehicle weight in pounds or kilograms",
        "View power-to-weight ratio calculations instantly",
        "Compare results with performance benchmarks",
        "Use for acceleration and performance analysis"
      ]}
      customFeatures={[
        "HP per pound calculation",
        "Pounds per HP calculation",
        "Multiple unit support (lbs/kg)",
        "Performance comparison metrics",
        "Real-time calculation updates"
      ]}
      faqs={faqs}
    >
      <PowerToWeightCalculator />
    </EnhancedToolLayout>
  );
}
