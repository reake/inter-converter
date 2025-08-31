import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import RewardsCalculator from '@/components/converters/finance/RewardsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('rewards-calculator', 'finance', 'Rewards Calculator');

export const metadata: Metadata = {
  title: 'Rewards Calculator - Credit Card Cashback & Points Calculator | InterConverter',
  description: 'Calculate credit card rewards and cashback earnings. Compare rewards programs and maximize benefits with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Rewards Calculator - Credit Card Cashback & Points Calculator',
    description: 'Professional rewards calculator for credit cards. Calculate cashback, points, and miles earnings.',
    type: 'website',
    images: [
      {
        url: '/images/og-rewards-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Rewards Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/rewards-calculator'
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

export default function RewardsCalculatorPage() {
  const faqs = getFAQsByToolId('rewards-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Rewards Calculator"
      description="Calculate credit card rewards and cashback earnings with instant calculations."
      keywords={keywords}
      toolId="rewards-calculator"
      category="finance"
      emoji="🎁"
      customHowToUse={[
        "Enter monthly spending amount",
        "Select reward type (cashback/points/miles)",
        "Input reward rate percentage",
        "Calculate annual earnings",
        "Compare different programs",
        "Maximize reward benefits"
      ]}
      customFeatures={[
        "Comprehensive rewards calculation",
        "Cashback earnings analysis",
        "Points valuation tools",
        "Miles earning calculations",
        "Rewards program comparison",
        "Optimization tips and strategies"
      ]}
      faqs={faqs}
    >
      <RewardsCalculator />
    </EnhancedToolLayout>
  );
}
