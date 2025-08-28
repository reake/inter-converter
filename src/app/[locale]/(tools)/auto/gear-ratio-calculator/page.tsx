import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GearRatioCalculator } from '@/components/converters/automotive/GearRatioCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('gear-ratio-calculator', 'auto', 'Gear Ratio Calculator');

export const metadata: Metadata = {
  title: 'Gear Ratio Calculator - Ring & Pinion Ratios | InterConverter',
  description: 'Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance. Free automotive gear ratio calculator with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Gear Ratio Calculator - Ring & Pinion Ratios',
    description: 'Professional gear ratio calculator for automotive performance. Calculate ring and pinion ratios for optimal drivetrain performance.',
    type: 'website',
    images: [
      {
        url: '/images/og-gear-ratio-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Gear Ratio Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/gear-ratio-calculator'
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

export default function GearRatioCalculatorPage() {
  const faqs = getFAQsByToolId('gear-ratio-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Gear Ratio Calculator"
      description="Calculate gear ratios from ring and pinion teeth, find optimal ratios for performance tuning and drivetrain optimization."
      keywords={keywords}
      toolId="gear-ratio-calculator"
      category="auto"
      emoji="⚙️"
      customHowToUse={[
        "Enter number of ring gear teeth",
        "Input number of pinion gear teeth",
        "View calculated gear ratio automatically",
        "Compare different ratio options for performance optimization"
      ]}
      customFeatures={[
        "Ring and pinion calculations",
        "Performance ratio analysis",
        "Differential gear ratios",
        "Drivetrain optimization",
        "Professional automotive calculations"
      ]}
      faqs={faqs}
    >
      <GearRatioCalculator />
    </EnhancedToolLayout>
  );
}
