import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { RamAirCalculator } from '@/components/converters/automotive/RamAirCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('ram-air-calculator', 'auto', 'Ram Air Calculator');

export const metadata: Metadata = {
  title: 'Ram Air Calculator - Dynamic Pressure & Intake Analysis | InterConverter',
  description: 'Calculate ram air effect and dynamic pressure from vehicle speed. Free ram air calculator for automotive intake systems with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Ram Air Calculator - Dynamic Pressure & Intake Analysis',
    description: 'Professional ram air calculator for automotive intake systems. Calculate dynamic pressure effects and ram air benefits from vehicle speed.',
    type: 'website',
    images: [
      {
        url: '/images/og-ram-air-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ram Air Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/ram-air-calculator'
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

export default function RamAirCalculatorPage() {
  const faqs = getFAQsByToolId('ram-air-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Ram Air Calculator"
      description="Calculate ram air effect and dynamic pressure from vehicle speed. Essential for intake system design and performance analysis."
      keywords={keywords}
      toolId="ram-air-calculator"
      category="auto"
      emoji="💨"
      customHowToUse={[
        "Enter vehicle speed in MPH or KPH",
        "View calculated ram air pressure",
        "Analyze dynamic pressure effects",
        "Use for intake system design and optimization",
        "Compare different speed scenarios"
      ]}
      customFeatures={[
        "Ram air pressure calculations",
        "Dynamic pressure analysis",
        "Speed to pressure conversion",
        "Intake system optimization",
        "Professional automotive accuracy"
      ]}
      faqs={faqs}
    >
      <RamAirCalculator />
    </EnhancedToolLayout>
  );
}
