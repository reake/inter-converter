import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('personal-loan-calculator', 'finance', 'Personal Loan Calculator');

export const metadata: Metadata = {
  title: 'Personal Loan Calculator - Monthly Payment & Interest | InterConverter',
  description: 'Calculate personal loan payments, interest costs, and amortization schedules. Compare loan terms and find the best personal loan options.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Personal Loan Calculator - Monthly Payment & Interest',
    description: 'Professional personal loan calculator for payment planning. Calculate monthly payments, interest costs, and amortization schedules.',
    type: 'website',
    images: [
      {
        url: '/images/og-personal-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/personal-loan-calculator'
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

export default function PersonalLoanCalculatorPage() {
  const faqs = getFAQsByToolId('personal-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Personal Loan Calculator"
      description="Calculate personal loan payments and analyze unsecured loan options with instant calculations."
      keywords={keywords}
      toolId="personal-loan-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter loan amount needed for personal use",
        "Set interest rate (APR) from lender",
        "Choose repayment term in months or years",
        "Calculate monthly payment instantly",
        "Review total cost and interest paid",
        "Compare different loan offers and terms"
      ]}
      customFeatures={[
        "Personal loan payment calculation with fees",
        "Unsecured loan analysis and qualification",
        "Interest cost projections over loan term",
        "Complete repayment schedule generation",
        "Loan comparison tools and analysis",
        "Credit score impact assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
