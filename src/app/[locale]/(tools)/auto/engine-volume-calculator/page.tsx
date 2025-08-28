import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { EngineVolumeCalculator } from '@/components/converters/automotive/EngineVolumeCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('engine-volume-calculator', 'auto', 'Engine Volume Calculator');

export const metadata: Metadata = {
  title: 'Engine Volume Calculator - Bore & Stroke to Displacement | InterConverter',
  description: 'Calculate engine volume and displacement from bore and stroke measurements. Free engine volume calculator for automotive applications with CI and liter results.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Engine Volume Calculator - Bore & Stroke to Displacement',
    description: 'Professional engine volume calculator for automotive applications. Calculate total displacement from bore, stroke, and cylinder count.',
    type: 'website',
    images: [
      {
        url: '/images/og-engine-volume-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Engine Volume Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/engine-volume-calculator'
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

export default function EngineVolumeCalculatorPage() {
  const faqs = getFAQsByToolId('engine-volume-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Engine Volume Calculator"
      description="Calculate engine volume and displacement from bore and stroke measurements. Essential tool for engine building and performance planning."
      keywords={keywords}
      toolId="engine-volume-calculator"
      category="auto"
      emoji="📐"
      customHowToUse={[
        "Enter cylinder bore diameter in inches",
        "Input stroke length in inches",
        "Specify number of cylinders",
        "View calculated engine volume in CI and liters",
        "Use for engine planning and identification"
      ]}
      customFeatures={[
        "Accurate volume calculations",
        "Multiple unit support (CI/Liters)",
        "Professional automotive tool",
        "Engine building applications",
        "Real-time calculation updates"
      ]}
      faqs={faqs}
    >
      <EngineVolumeCalculator />
    </EnhancedToolLayout>
  );
}
