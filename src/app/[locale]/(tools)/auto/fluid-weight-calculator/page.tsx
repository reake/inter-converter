import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { FluidWeightCalculator } from '@/components/converters/automotive/FluidWeightCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('fluid-weight-calculator', 'auto', 'Fluid Weight Calculator');

export const metadata: Metadata = {
  title: 'Fluid Weight Calculator - Oil, Coolant & Fuel Weight | InterConverter',
  description: 'Calculate weight of automotive fluids including oil, coolant, and fuel. Free fluid weight calculator for automotive applications with accurate density calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Fluid Weight Calculator - Oil, Coolant & Fuel Weight',
    description: 'Professional fluid weight calculator for automotive applications. Calculate weight of oil, coolant, fuel, and other automotive fluids.',
    type: 'website',
    images: [
      {
        url: '/images/og-fluid-weight-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fluid Weight Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/fluid-weight-calculator'
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

export default function FluidWeightCalculatorPage() {
  const faqs = getFAQsByToolId('fluid-weight-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Fluid Weight Calculator"
      description="Calculate weight of automotive fluids including oil, coolant, and fuel. Essential for weight distribution and capacity planning."
      keywords={keywords}
      toolId="fluid-weight-calculator"
      category="auto"
      emoji="🛢️"
      customHowToUse={[
        "Select fluid type (oil, coolant, fuel, etc.)",
        "Enter fluid volume in gallons or liters",
        "View calculated weight in pounds or kilograms",
        "Use for weight distribution and capacity calculations",
        "Reference for automotive fluid planning"
      ]}
      customFeatures={[
        "Multiple fluid types supported",
        "Volume to weight conversion",
        "Imperial and metric units",
        "Automotive fluid database",
        "Accurate density calculations"
      ]}
      faqs={faqs}
    >
      <FluidWeightCalculator />
    </EnhancedToolLayout>
  );
}
