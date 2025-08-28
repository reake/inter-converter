import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('calorie-calculator', 'health', 'Calorie Calculator');

export const metadata: Metadata = {
  title: 'Calorie Calculator - Daily Calorie Needs Calculator | InterConverter',
  description: 'Calculate daily calorie needs based on age, gender, weight, height, and activity level. Plan your nutrition and weight management goals with TDEE calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Calorie Calculator - Daily Calorie Needs Calculator',
    description: 'Professional calorie calculator with BMR and TDEE calculations. Plan your nutrition and weight management goals.',
    type: 'website',
    images: [
      {
        url: '/images/og-calorie-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calorie Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/calorie-calculator'
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

export default function CalorieCalculatorPage() {
  const faqs = getFAQsByToolId('calorie-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on personal factors and activity level with instant calculations."
      keywords={keywords}
      toolId="calorie-calculator"
      category="health"
      emoji="🍎"
      customHowToUse={[
        "Enter your age, gender, weight, and height",
        "Select your activity level from sedentary to very active",
        "Choose your weight goal (maintain, lose, gain)",
        "Calculate daily calorie needs instantly",
        "Get personalized nutrition recommendations",
        "Track your calorie intake goals"
      ]}
      customFeatures={[
        "BMR and TDEE calculations",
        "Activity level adjustments",
        "Weight goal customization",
        "Macronutrient recommendations",
        "Calorie deficit/surplus planning",
        "Personalized nutrition guidance"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
