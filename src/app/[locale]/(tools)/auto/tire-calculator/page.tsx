import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TireCalculator } from '@/components/converters/automotive/TireCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('tire-calculator', 'auto', 'Tire Calculator');

export const metadata: Metadata = {
  title: 'Tire Calculator - Size Comparison & Performance Impact | InterConverter',
  description: 'Calculate how tire diameter changes affect vehicle speed, RPM, and performance. Professional tire size comparison calculator with accurate results.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Tire Calculator - Size Comparison & Performance Impact',
    description: 'Professional tire calculator for automotive performance. Compare tire sizes and analyze their impact on speed, RPM, and vehicle performance.',
    type: 'website',
    images: [
      {
        url: '/images/og-tire-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Tire Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/tire-calculator'
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

export default function TireCalculatorPage() {
  const faqs = getFAQsByToolId('tire-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Tire Calculator"
      description="Calculate how tire diameter changes affect vehicle speed, RPM, and performance. Essential for tire upgrades and performance tuning."
      keywords={keywords}
      toolId="tire-calculator"
      category="auto"
      emoji="🛖"
      customHowToUse={[
        "Enter original tire size (width/aspect/rim)",
        "Input new tire size for comparison",
        "View speed and RPM differences",
        "Analyze performance impact and make informed decisions"
      ]}
      customFeatures={[
        "Tire size comparison",
        "Speed difference calculation",
        "RPM change analysis",
        "Performance impact assessment",
        "Professional tire upgrade guidance"
      ]}
      faqs={faqs}
    >
      <TireCalculator />
    </EnhancedToolLayout>
  );
}
