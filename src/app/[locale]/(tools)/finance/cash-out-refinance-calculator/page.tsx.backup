import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('cash-out-refinance-calculator', 'finance', 'Cash-Out Refinance Calculator');

export const metadata: Metadata = {
  title: 'Cash-Out Refinance Calculator - Home Equity Calculator | InterConverter',
  description: 'Calculate cash-out refinance payments, equity withdrawal, and new mortgage terms for home refinancing with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Cash-Out Refinance Calculator - Home Equity Calculator',
    description: 'Professional cash-out refinance calculator for home equity withdrawal. Calculate new payments and equity access.',
    type: 'website',
    images: [
      {
        url: '/images/og-cash-out-refinance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Cash-Out Refinance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/cash-out-refinance-calculator'
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

export default function CashOutRefinanceCalculatorPage() {
  const faqs = getFAQsByToolId('cash-out-refinance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Cash-Out Refinance Calculator"
      description="Calculate cash-out refinance payments and equity withdrawal options with instant calculations."
      keywords={keywords}
      toolId="cash-out-refinance-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter current home market value",
        "Input remaining mortgage balance",
        "Set desired cash-out amount",
        "Choose new refinance interest rate",
        "Calculate new monthly payment",
        "Review equity and LTV requirements"
      ]}
      customFeatures={[
        "Cash-out refinance payment calculation",
        "Home equity withdrawal analysis",
        "New payment estimation with cash-out",
        "Loan-to-value ratio compliance check",
        "Closing cost analysis and impact",
        "Break-even calculation and timeline"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
