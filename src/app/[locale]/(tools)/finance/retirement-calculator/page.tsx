import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('retirement-calculator', 'finance', 'Retirement Calculator');

export const metadata: Metadata = {
  title: 'Retirement Calculator - Savings Planning & Timeline | InterConverter',
  description: 'Calculate retirement savings needs and timeline. Plan your retirement contributions and estimate required savings for financial independence.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Retirement Calculator - Savings Planning & Timeline',
    description: 'Professional retirement calculator for financial planning. Calculate savings needs, timeline, and create comprehensive retirement plans.',
    type: 'website',
    images: [
      {
        url: '/images/og-retirement-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/retirement-calculator'
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

export default function RetirementCalculatorPage() {
  const faqs = getFAQsByToolId('retirement-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Retirement Calculator"
      description="Calculate retirement savings needs and plan your financial future with instant calculations."
      keywords={keywords}
      toolId="retirement-calculator"
      category="finance"
      emoji="🏖️"
      customHowToUse={[
        "Enter current age and planned retirement age",
        "Input current retirement savings balance",
        "Set desired retirement income percentage",
        "Add monthly contribution amount",
        "Calculate total savings requirements",
        "Plan comprehensive retirement strategy"
      ]}
      customFeatures={[
        "Retirement savings calculation with inflation",
        "Monthly contribution planning and optimization",
        "Income replacement analysis and projections",
        "Social Security benefits integration",
        "Inflation adjustment and cost of living",
        "Retirement readiness assessment and gaps"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
