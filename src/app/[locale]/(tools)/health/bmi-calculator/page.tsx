import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('bmi-calculator', 'health', 'BMI Calculator');

export const metadata: Metadata = {
  title: 'BMI Calculator - Body Mass Index Calculator | InterConverter',
  description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories, ideal weight ranges & personalized recommendations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'BMI Calculator - Body Mass Index Calculator',
    description: 'Professional BMI calculator with health categories and personalized recommendations. Calculate your Body Mass Index instantly.',
    type: 'website',
    images: [
      {
        url: '/images/og-bmi-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/bmi-calculator'
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

export default function BMICalculatorPage() {
  const faqs = getFAQsByToolId('bmi-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and get personalized health recommendations with instant calculations."
      keywords={keywords}
      toolId="bmi-calculator"
      category="health"
      emoji="⚖️"
      customHowToUse={[
        "Enter your height in feet/inches or centimeters",
        "Enter your weight in pounds or kilograms",
        "View your BMI result and health category instantly",
        "Get personalized recommendations for your BMI range",
        "Compare with healthy BMI ranges for your age"
      ]}
      customFeatures={[
        "Instant BMI calculation with health categories",
        "Support for metric and imperial units",
        "Ideal weight range recommendations",
        "Personalized health insights and tips",
        "BMI chart with color-coded categories",
        "Age and gender considerations"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}