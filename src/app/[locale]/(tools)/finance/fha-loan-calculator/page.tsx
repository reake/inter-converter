import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('fha-loan-calculator', 'finance', 'FHA Loan Calculator');

export const metadata: Metadata = {
  title: 'FHA Loan Calculator - Government Mortgage Calculator | InterConverter',
  description: 'Calculate FHA loan payments with mortgage insurance premiums. FHA calculator with low down payment options and government loan benefits.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'FHA Loan Calculator - Government Mortgage Calculator',
    description: 'Professional FHA loan calculator for government-backed mortgages. Calculate payments with low down payment options.',
    type: 'website',
    images: [
      {
        url: '/images/og-fha-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'FHA Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/fha-loan-calculator'
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

export default function FHALoanCalculatorPage() {
  const faqs = getFAQsByToolId('fha-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="FHA Loan Calculator"
      description="Calculate FHA loan payments with low down payment options and government backing."
      keywords={keywords}
      toolId="fha-loan-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter home purchase price or loan amount",
        "Set FHA down payment (3.5% minimum required)",
        "Input FHA interest rate from lender",
        "Add mortgage insurance premiums (MIP)",
        "Calculate monthly payment with all costs",
        "Review FHA loan benefits and requirements"
      ]}
      customFeatures={[
        "FHA loan payment calculation with MIP",
        "Low down payment options (3.5% minimum)",
        "Mortgage insurance premium calculations",
        "Government-backed loan benefits analysis",
        "First-time buyer advantages and programs",
        "Credit score flexibility and requirements"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
