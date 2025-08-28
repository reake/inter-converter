import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TorqueHorsepowerCalculator from '@/components/converters/automotive/TorqueHorsepowerCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('torque-horsepower-calculator', 'auto', 'Torque & Horsepower Calculator');

export const metadata: Metadata = {
  title: 'Torque & Horsepower Calculator - Engine Power Analysis | InterConverter',
  description: 'Convert between torque and horsepower at different RPMs. Calculate engine power and torque relationships with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Torque & Horsepower Calculator - Engine Power Analysis',
    description: 'Professional torque and horsepower calculator for automotive performance. Convert between engine power metrics at different RPM levels.',
    type: 'website',
    images: [
      {
        url: '/images/og-torque-horsepower-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Torque & Horsepower Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/torque-horsepower-calculator'
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

export default function TorqueHorsepowerCalculatorPage() {
  const faqs = getFAQsByToolId('torque-horsepower-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Torque & Horsepower Calculator"
      description="Convert between torque and horsepower at different RPMs. Essential for engine performance analysis and power calculations."
      keywords={keywords}
      toolId="torque-horsepower-calculator"
      category="auto"
      emoji="⚡"
      customHowToUse={[
        "Enter torque value in lb-ft or Nm",
        "Input RPM (revolutions per minute)",
        "View calculated horsepower automatically",
        "Switch between metric and imperial units for flexibility"
      ]}
      customFeatures={[
        "Torque to horsepower conversion",
        "Support for multiple unit systems",
        "Real-time RPM calculations",
        "Engine performance analysis",
        "Professional automotive calculations"
      ]}
      faqs={faqs}
    >
      <TorqueHorsepowerCalculator />
    </EnhancedToolLayout>
  );
}
