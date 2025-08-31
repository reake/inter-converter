import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('stock-calculator', 'finance', 'Stock Calculator');

export const metadata: Metadata = {
  title: 'Stock Calculator - Investment Return Analysis | InterConverter',
  description: 'Calculate stock investment returns, dividends, and portfolio performance with compound growth analysis and instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Stock Calculator - Investment Return Analysis',
    description: 'Professional stock calculator for investment analysis. Calculate returns, dividends, and portfolio performance.',
    type: 'website',
    images: [
      {
        url: '/images/og-stock-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Stock Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/stock-calculator'
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

export default function StockCalculatorPage() {
  const faqs = getFAQsByToolId('stock-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Stock Calculator"
      description="Calculate stock investment returns and portfolio performance with instant calculations."
      keywords={keywords}
      toolId="stock-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter stock purchase price per share",
        "Set total number of shares owned",
        "Input annual dividend yield percentage",
        "Choose investment time period",
        "Calculate total returns and gains",
        "Analyze comprehensive performance metrics"
      ]}
      customFeatures={[
        "Stock return calculation with fees",
        "Dividend yield analysis and projections",
        "Portfolio performance tracking tools",
        "Capital gains and loss calculation",
        "Total return analysis including dividends",
        "Investment growth projection modeling"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
