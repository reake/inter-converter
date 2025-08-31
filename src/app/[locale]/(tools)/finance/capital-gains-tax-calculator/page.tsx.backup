import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('capital-gains-tax-calculator', 'finance', 'Capital Gains Tax Calculator');

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator - Investment Tax Planning | InterConverter',
  description: 'Calculate capital gains tax on investment sales. Determine short-term vs long-term capital gains tax rates and liability.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Capital Gains Tax Calculator - Investment Tax Planning',
    description: 'Professional capital gains tax calculator for investment planning. Calculate tax liability on stock sales and optimize tax strategies.',
    type: 'website',
    images: [
      {
        url: '/images/og-capital-gains-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Capital Gains Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/capital-gains-tax-calculator'
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

export default function CapitalGainsTaxCalculatorPage() {
  const faqs = getFAQsByToolId('capital-gains-tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Capital Gains Tax Calculator"
      description="Calculate capital gains tax on investment sales with short-term and long-term rate distinctions."
      keywords={keywords}
      toolId="capital-gains-tax-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter purchase price and sale price",
        "Input holding period (short vs long-term)",
        "Select your income tax bracket",
        "Calculate capital gains amount",
        "Determine applicable tax rate",
        "Estimate total tax liability"
      ]}
      customFeatures={[
        "Short-term vs long-term rates",
        "Income bracket considerations",
        "Net investment income tax",
        "Tax loss harvesting analysis",
        "State capital gains taxes",
        "Tax planning strategies"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
