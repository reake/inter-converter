import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('heart-rate-calculator', 'health', 'Heart Rate Calculator');

export const metadata: Metadata = {
  title: 'Heart Rate Calculator - Target Heart Rate Zone Calculator | InterConverter',
  description: 'Calculate target heart rate zones for exercise and fitness training. Determine maximum heart rate and optimal training zones for cardiovascular health.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Heart Rate Calculator - Target Heart Rate Zone Calculator',
    description: 'Professional heart rate calculator for optimal cardiovascular training. Calculate target heart rate zones and maximum heart rate.',
    type: 'website',
    images: [
      {
        url: '/images/og-heart-rate-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Heart Rate Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/heart-rate-calculator'
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

export default function HeartRateCalculatorPage() {
  const faqs = getFAQsByToolId('heart-rate-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Heart Rate Calculator"
      description="Calculate target heart rate zones for optimal cardiovascular training and fitness performance with instant calculations."
      keywords={keywords}
      toolId="heart-rate-calculator"
      category="health"
      emoji="❤️"
      customHowToUse={[
        "Enter your age and resting heart rate",
        "Select your fitness level and training goals",
        "Calculate maximum heart rate and heart rate reserve",
        "View different training intensity zones",
        "Create personalized heart rate training plan",
        "Monitor exercise intensity effectiveness"
      ]}
      customFeatures={[
        "Multiple heart rate formula calculations",
        "Training intensity zone breakdown",
        "Personalized goal setting",
        "Exercise type recommendations",
        "Progress tracking tools",
        "Safe training guidance"
      ]}
      faqs={faqs}
    >
      <BMICalculator />
    </EnhancedToolLayout>
  );
}
