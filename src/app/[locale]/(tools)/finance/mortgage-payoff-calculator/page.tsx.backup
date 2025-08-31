import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mortgage-payoff-calculator', 'finance', 'Mortgage Payoff Calculator');

export const metadata: Metadata = {
  title: 'Mortgage Payoff Calculator - Extra Payment Calculator | InterConverter',
  description: 'Calculate mortgage payoff time with extra payments. See how additional payments reduce loan term with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mortgage Payoff Calculator - Extra Payment Calculator',
    description: 'Professional mortgage payoff calculator for extra payments. Calculate time reduction and interest savings.',
    type: 'website',
    images: [
      {
        url: '/images/og-mortgage-payoff-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage Payoff Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mortgage-payoff-calculator'
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

export default function MortgagePayoffCalculatorPage() {
  const faqs = getFAQsByToolId('mortgage-payoff-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mortgage Payoff Calculator"
      description="Calculate mortgage payoff time with extra payments with instant calculations."
      keywords={keywords}
      toolId="mortgage-payoff-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter current loan details and balance",
        "Set extra payment amount per month",
        "Choose payment frequency options",
        "Calculate new payoff time",
        "View total interest savings",
        "Compare different payment strategies"
      ]}
      customFeatures={[
        "Extra payment impact calculation",
        "Loan payoff time reduction analysis",
        "Total interest savings calculation",
        "Payment strategy comparison tools",
        "Updated amortization schedule",
        "Early payoff benefits analysis"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
