import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('body-fat-calculator', 'health', 'Body Fat Calculator');

export const metadata: Metadata = {
  title: 'Body Fat Calculator - Body Fat Percentage Calculator | InterConverter',
  description: 'Calculate body fat percentage using various methods including skinfold, bioelectrical impedance, and body measurements. Track your body composition progress.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Body Fat Calculator - Body Fat Percentage Calculator',
    description: 'Professional body fat calculator with multiple calculation methods. Track your body composition and lean body mass.',
    type: 'website',
    images: [
      {
        url: '/images/og-body-fat-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/body-fat-calculator'
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

export default function BodyFatCalculatorPage() {
  const faqs = getFAQsByToolId('body-fat-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using multiple methods and track your body composition progress with instant calculations."
      keywords={keywords}
      toolId="body-fat-calculator"
      category="health"
      emoji="📏"
      customHowToUse={[
        "Choose calculation method (skinfold, bioelectrical impedance, etc.)",
        "Enter your height, weight, and age",
        "Measure and input relevant body part dimensions",
        "Calculate body fat percentage instantly",
        "Compare with healthy ranges for your demographics",
        "Track body composition changes over time"
      ]}
      customFeatures={[
        "Multiple calculation methods support",
        "Gender and age adjustments",
        "Healthy range references",
        "Lean body mass calculation",
        "Progress tracking tools",
        "Personalized recommendations"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
