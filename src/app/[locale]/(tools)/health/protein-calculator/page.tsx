import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('protein-calculator', 'health', 'Protein Calculator');

export const metadata: Metadata = {
  title: 'Protein Calculator - Daily Protein Intake Calculator | InterConverter',
  description: 'Calculate daily protein requirements based on body weight, activity level, and fitness goals for optimal muscle building and recovery.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Protein Calculator - Daily Protein Intake Calculator',
    description: 'Professional protein calculator for optimal muscle building and recovery. Calculate daily protein requirements based on your fitness goals.',
    type: 'website',
    images: [
      {
        url: '/images/og-protein-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Protein Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/protein-calculator'
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

export default function ProteinCalculatorPage() {
  const faqs = getFAQsByToolId('protein-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Protein Calculator"
      description="Calculate optimal daily protein intake for muscle building, weight loss, and general health based on your goals with instant calculations."
      keywords={keywords}
      toolId="protein-calculator"
      category="health"
      emoji="🥩"
      customHowToUse={[
        "Enter weight and height information",
        "Select activity level and fitness goals",
        "Set weight goals (muscle gain, fat loss, maintain)",
        "Calculate daily protein requirements",
        "View per-meal protein distribution recommendations",
        "Get protein food source recommendations"
      ]}
      customFeatures={[
        "Personalized protein requirement calculations",
        "Multiple fitness goal support",
        "Activity level adjustments",
        "Per-meal distribution recommendations",
        "Food source recommendations",
        "Nutrition timing guidance"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
