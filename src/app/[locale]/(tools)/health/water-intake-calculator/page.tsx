import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import WaterIntakeCalculator from '@/components/converters/health/WaterIntakeCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('water-intake-calculator', 'health', 'Water Intake Calculator');

export const metadata: Metadata = {
  title: 'Water Intake Calculator - Daily Hydration Calculator | InterConverter',
  description: 'Calculate daily water intake requirements based on body weight, activity level, and climate conditions with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Water Intake Calculator - Daily Hydration Calculator',
    description: 'Professional water intake calculator for optimal hydration. Calculate daily water requirements based on personal factors.',
    type: 'website',
    images: [
      {
        url: '/images/og-water-intake-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Intake Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/water-intake-calculator'
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

export default function WaterIntakeCalculatorPage() {
  const faqs = getFAQsByToolId('water-intake-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Water Intake Calculator"
      description="Calculate personalized daily water intake requirements for optimal hydration with instant calculations."
      keywords={keywords}
      toolId="water-intake-calculator"
      category="health"
      emoji="💧"
      customHowToUse={[
        "Enter body weight and height",
        "Select activity level intensity",
        "Set climate conditions",
        "Calculate daily water intake",
        "View hydration recommendations",
        "Create personalized hydration plan"
      ]}
      customFeatures={[
        "Personalized water intake calculation",
        "Activity level adjustments",
        "Climate factor considerations",
        "Hydration balance assessment",
        "Water reminder scheduling",
        "Comprehensive hydration health guidance"
      ]}
      faqs={faqs}
    >
      <WaterIntakeCalculator />
    </EnhancedToolLayout>
  );
}
