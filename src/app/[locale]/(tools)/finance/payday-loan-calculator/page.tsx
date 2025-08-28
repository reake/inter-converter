import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('payday-loan-calculator', 'finance', 'Payday Loan Calculator');

export const metadata: Metadata = {
  title: 'Payday Loan Calculator - Short Term Loan Cost Calculator | InterConverter',
  description: 'Calculate payday loan costs and APR. Understand the true cost of short-term payday loans with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Payday Loan Calculator - Short Term Loan Cost Calculator',
    description: 'Professional payday loan calculator for cost analysis. Calculate true APR and understand loan costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-payday-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Payday Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/payday-loan-calculator'
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

export default function PaydayLoanCalculatorPage() {
  const faqs = getFAQsByToolId('payday-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Payday Loan Calculator"
      description="Calculate payday loan costs and APR with instant calculations."
      keywords={keywords}
      toolId="payday-loan-calculator"
      category="finance"
      emoji="💸"
      customHowToUse={[
        "Enter desired loan amount",
        "Set loan term in days or weeks",
        "Input all fees charged by lender",
        "Calculate true annual percentage rate",
        "View total cost breakdown",
        "Compare with alternative loan options"
      ]}
      customFeatures={[
        "Payday loan cost calculation with fees",
        "True APR calculation and disclosure",
        "Fee impact analysis on total cost",
        "Cost comparison with alternatives",
        "Alternative loan option suggestions",
        "Financial education and warning resources"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
