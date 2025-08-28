import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('macro-calculator', 'health', 'Macro Calculator');

export const metadata: Metadata = {
  title: 'Macro Calculator - Macronutrient Calculator | InterConverter',
  description: 'Calculate optimal macronutrient ratios (protein, carbs, fats) based on your fitness goals, activity level, and body composition for effective nutrition planning.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Macro Calculator - Macronutrient Calculator',
    description: 'Professional macronutrient calculator for optimal nutrition planning. Calculate protein, carbs, and fat ratios for your fitness goals.',
    type: 'website',
    images: [
      {
        url: '/images/og-macro-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Macro Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/macro-calculator'
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

export default function MacroCalculatorPage() {
  const faqs = getFAQsByToolId('macro-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Macro Calculator"
      description="Calculate optimal macronutrient distribution for your fitness and health goals with instant calculations."
      keywords={keywords}
      toolId="macro-calculator"
      category="health"
      emoji="🥗"
      customHowToUse={[
        "Enter basic information (age, gender, weight, height)",
        "Select activity level and fitness goals",
        "Set weight goals (fat loss, muscle gain, maintain)",
        "Calculate daily macronutrient requirements",
        "View protein, carbohydrate, and fat distribution",
        "Create personalized meal planning"
      ]}
      customFeatures={[
        "Personalized macronutrient calculations",
        "Multiple fitness goal support",
        "Activity level adjustments",
        "Nutrient grams and calorie breakdown",
        "Meal planning recommendations",
        "Progress tracking tools"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
