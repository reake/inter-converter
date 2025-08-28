import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SleepCalculator from '@/components/converters/health/SleepCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('sleep-calculator', 'health', 'Sleep Calculator');

export const metadata: Metadata = {
  title: 'Sleep Calculator - Optimal Sleep & Wake Time Calculator | InterConverter',
  description: 'Calculate optimal sleep and wake times based on sleep cycles. Improve sleep quality with personalized sleep schedules and instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Sleep Calculator - Optimal Sleep & Wake Time Calculator',
    description: 'Professional sleep calculator for better rest. Calculate optimal bedtime and wake times based on sleep cycles.',
    type: 'website',
    images: [
      {
        url: '/images/og-sleep-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/health/sleep-calculator'
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

export default function SleepCalculatorPage() {
  const faqs = getFAQsByToolId('sleep-calculator', 'health');

  return (
    <EnhancedToolLayout
      title="Sleep Calculator"
      description="Calculate optimal sleep and wake times based on natural sleep cycles with instant calculations."
      keywords={keywords}
      toolId="sleep-calculator"
      category="health"
      emoji="😴"
      customHowToUse={[
        "Enter desired wake-up time",
        "Or input preferred bedtime",
        "Select sleep cycle duration",
        "Calculate optimal sleep schedule",
        "View sleep quality recommendations",
        "Create personalized sleep plan"
      ]}
      customFeatures={[
        "Sleep cycle optimization",
        "Optimal bedtime calculation",
        "Wake-up time recommendations",
        "Sleep quality assessment",
        "Rest and recovery planning",
        "Comprehensive sleep health guidance"
      ]}
      faqs={faqs}
    >
      <SleepCalculator />
    </EnhancedToolLayout>
  );
}
