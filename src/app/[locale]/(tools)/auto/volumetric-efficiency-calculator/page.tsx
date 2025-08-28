import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { VolumetricEfficiencyCalculator } from '@/components/converters/automotive/VolumetricEfficiencyCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('volumetric-efficiency-calculator', 'auto', 'Volumetric Efficiency Calculator');

export const metadata: Metadata = {
  title: 'Volumetric Efficiency Calculator - Engine VE Analysis | InterConverter',
  description: 'Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Volumetric Efficiency Calculator - Engine VE Analysis',
    description: 'Professional volumetric efficiency calculator for engine tuning. Calculate VE percentage from horsepower, displacement, and RPM for optimal performance.',
    type: 'website',
    images: [
      {
        url: '/images/og-volumetric-efficiency-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Volumetric Efficiency Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/volumetric-efficiency-calculator'
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

export default function VolumetricEfficiencyCalculatorPage() {
  const faqs = getFAQsByToolId('volumetric-efficiency-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Volumetric Efficiency Calculator"
      description="Calculate engine volumetric efficiency (VE) from horsepower, displacement, and RPM. Essential for engine tuning and performance analysis."
      keywords={keywords}
      toolId="volumetric-efficiency-calculator"
      category="auto"
      emoji="📊"
      customHowToUse={[
        "Enter engine horsepower",
        "Input engine displacement in cubic inches",
        "Set engine RPM",
        "View calculated volumetric efficiency percentage",
        "Use results for engine tuning and optimization"
      ]}
      customFeatures={[
        "Volumetric efficiency calculations",
        "Engine breathing analysis",
        "Performance tuning metrics",
        "VE percentage calculations",
        "Professional engine analysis"
      ]}
      faqs={faqs}
    >
      <VolumetricEfficiencyCalculator />
    </EnhancedToolLayout>
  );
}
