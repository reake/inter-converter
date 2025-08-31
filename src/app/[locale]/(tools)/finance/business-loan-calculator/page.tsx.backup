import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('business-loan-calculator', 'finance', 'Business Loan Calculator');

export const metadata: Metadata = {
  title: 'Business Loan Calculator - Commercial Financing | InterConverter',
  description: 'Calculate business loan payments and financing costs. Compare SBA loans, term loans, and lines of credit for business funding.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Business Loan Calculator - Commercial Financing',
    description: 'Professional business loan calculator for commercial financing. Calculate payments, analyze cash flow impact, and compare loan options.',
    type: 'website',
    images: [
      {
        url: '/images/og-business-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Business Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/business-loan-calculator'
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

export default function BusinessLoanCalculatorPage() {
  const faqs = getFAQsByToolId('business-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Business Loan Calculator"
      description="Calculate business loan payments and analyze commercial financing options with instant calculations."
      keywords={keywords}
      toolId="business-loan-calculator"
      category="finance"
      emoji="🏢"
      customHowToUse={[
        "Enter loan amount needed for business",
        "Set interest rate (APR) from lender",
        "Choose loan term in months or years",
        "Calculate monthly payment and total cost",
        "Analyze cash flow impact on business",
        "Compare different financing options"
      ]}
      customFeatures={[
        "Business loan payment calculation with fees",
        "Cash flow impact analysis and planning",
        "SBA loan terms and qualification rates",
        "Commercial financing options comparison",
        "Interest cost projections over loan life",
        "Loan affordability and debt service assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
