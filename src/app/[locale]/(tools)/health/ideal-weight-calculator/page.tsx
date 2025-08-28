import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('ideal-weight-calculator', 'health', 'Ideal Weight Calculator');

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator - Healthy Weight Calculator | InterConverter',
  description: 'Calculate your ideal weight based on height, age, gender, and body frame using multiple scientific formulas. Find your optimal weight range.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Ideal Weight Calculator - Healthy Weight Calculator',
    description: 'Professional ideal weight calculator using multiple scientific formulas. Calculate your optimal weight based on height, age, and body frame.',
    type: 'website',
    images: [
      {
        url: '/images/og-ideal-weight-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ideal Weight Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/ideal-weight-calculator'
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

export default function IdealWeightCalculatorPage() {
  const faqs = getFAQsByToolId('ideal-weight-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal weight using multiple scientific formulas based on height, age, gender, and body frame with instant calculations."
      keywords={keywords}
      toolId="ideal-weight-calculator"
      category="health"
      emoji="🎯"
      customHowToUse={[
        "Enter your height in centimeters or feet/inches",
        "Select your gender and age",
        "Choose your body frame size (small, medium, large)",
        "View multiple formula calculation results",
        "Compare ideal weight ranges from different methods",
        "Set personal weight goals based on results"
      ]}
      customFeatures={[
        "Multiple scientific calculation formulas",
        "Body frame size adjustments",
        "Age and gender factors",
        "Healthy weight range analysis",
        "Goal setting tools",
        "Personalized recommendations"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
