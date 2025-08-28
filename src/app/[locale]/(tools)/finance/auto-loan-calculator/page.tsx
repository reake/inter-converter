import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import AutoLoanCalculator from '@/components/converters/finance/AutoLoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('auto-loan-calculator', 'finance', 'Auto Loan Calculator');

export const metadata: Metadata = {
  title: 'Auto Loan Calculator - Car Payment & Financing | InterConverter',
  description: 'Calculate car loan payments, interest costs, and total vehicle financing costs. Compare auto loan terms and rates with our professional calculator.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Auto Loan Calculator - Car Payment & Financing',
    description: 'Professional auto loan calculator for vehicle financing. Calculate car loan payments, interest costs, and compare financing options.',
    type: 'website',
    images: [
      {
        url: '/images/og-auto-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Auto Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/auto-loan-calculator'
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

export default function AutoLoanCalculatorPage() {
  const faqs = getFAQsByToolId('auto-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Auto Loan Calculator"
      description="Calculate auto loan payments and compare car financing options with instant calculations."
      keywords={keywords}
      toolId="auto-loan-calculator"
      category="finance"
      emoji="🚗"
      customHowToUse={[
        "Enter vehicle price or loan amount",
        "Set down payment amount and trade-in value",
        "Input interest rate (APR) from lender",
        "Choose loan term in months or years",
        "Calculate monthly payment instantly",
        "Review total interest cost and financing details"
      ]}
      customFeatures={[
        "Auto loan payment calculation with taxes",
        "Down payment impact analysis",
        "Interest rate comparison tools",
        "Loan term optimization",
        "Total cost of financing breakdown",
        "Payment affordability assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
