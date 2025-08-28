import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mutual-fund-calculator', 'finance', 'Mutual Fund Calculator');

export const metadata: Metadata = {
  title: 'Mutual Fund Calculator - Investment Return Analysis | InterConverter',
  description: 'Calculate mutual fund returns and investment growth. Analyze expense ratios and fund performance with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mutual Fund Calculator - Investment Return Analysis',
    description: 'Professional mutual fund calculator for investment analysis. Calculate returns and analyze fund performance.',
    type: 'website',
    images: [
      {
        url: '/images/og-mutual-fund-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mutual Fund Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mutual-fund-calculator'
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

export default function MutualFundCalculatorPage() {
  const faqs = getFAQsByToolId('mutual-fund-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mutual Fund Calculator"
      description="Calculate mutual fund returns and investment growth with instant calculations."
      keywords={keywords}
      toolId="mutual-fund-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter initial investment amount",
        "Set expected annual return rate",
        "Input fund expense ratio percentage",
        "Choose investment time period",
        "Calculate total returns and growth",
        "Analyze fund performance metrics"
      ]}
      customFeatures={[
        "Mutual fund return calculation with fees",
        "Expense ratio impact analysis on returns",
        "Investment growth projection over time",
        "Fund performance comparison tools",
        "Cost analysis and fee impact assessment",
        "Return optimization and strategy planning"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
