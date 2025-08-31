import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('etf-calculator', 'finance', 'ETF Calculator');

export const metadata: Metadata = {
  title: 'ETF Calculator - Exchange-Traded Fund Returns | InterConverter',
  description: 'Calculate ETF investment returns and analyze expense ratios. Compare exchange-traded funds and plan portfolio diversification.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'ETF Calculator - Exchange-Traded Fund Returns',
    description: 'Professional ETF calculator for investment planning. Calculate returns, analyze expense ratios, and optimize portfolio diversification.',
    type: 'website',
    images: [
      {
        url: '/images/og-etf-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'ETF Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/etf-calculator'
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

export default function ETFCalculatorPage() {
  const faqs = getFAQsByToolId('etf-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="ETF Calculator"
      description="Calculate ETF investment returns and analyze the impact of low expense ratios on long-term portfolio growth."
      keywords={keywords}
      toolId="etf-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter ETF investment amount",
        "Input expected annual return",
        "Set expense ratio (typically 0.03-0.75%)",
        "Choose investment timeline",
        "Calculate net returns after fees",
        "Compare with mutual funds and individual stocks"
      ]}
      customFeatures={[
        "Low expense ratio benefits",
        "Diversification analysis",
        "Index tracking performance",
        "Tax efficiency calculations",
        "Liquidity considerations",
        "Portfolio allocation tools"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
