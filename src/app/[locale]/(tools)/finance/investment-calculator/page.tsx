import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('investment-calculator', 'finance', 'Investment Calculator');

export const metadata: Metadata = {
  title: 'Investment Calculator - Portfolio Growth & Returns | InterConverter',
  description: 'Calculate investment returns and growth over time. Plan your investment strategy with compound returns and regular contributions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Investment Calculator - Portfolio Growth & Returns',
    description: 'Professional investment calculator for portfolio planning. Calculate investment growth and returns with compound interest and regular contributions.',
    type: 'website',
    images: [
      {
        url: '/images/og-investment-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Investment Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/investment-calculator'
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

export default function InvestmentCalculatorPage() {
  const faqs = getFAQsByToolId('investment-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Investment Calculator"
      description="Calculate investment returns and portfolio growth projections with instant calculations."
      keywords={keywords}
      toolId="investment-calculator"
      category="finance"
      emoji="💹"
      customHowToUse={[
        "Enter initial investment amount to start",
        "Set expected annual return rate percentage",
        "Choose investment time horizon in years",
        "Add regular monthly contributions (optional)",
        "Calculate future value and total returns",
        "Analyze different investment scenarios"
      ]}
      customFeatures={[
        "Investment growth calculation with compound interest",
        "Compound return analysis over time",
        "Regular contribution support and planning",
        "Multiple scenario comparison tools",
        "Risk-adjusted return calculations",
        "Portfolio diversification insights and tips"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
