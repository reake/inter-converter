import { Metadata } from "next";
import { EnhancedToolLayout } from "@/components/tools/EnhancedToolLayout";
import LoanCalculator from "@/components/converters/finance/LoanCalculator";
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('loan-calculator', 'finance', 'Loan Calculator');

export const metadata: Metadata = {
  title: 'Loan Calculator - Monthly Payment & Amortization Schedule | InterConverter',
  description: 'Calculate monthly payments, total interest, and amortization schedules for loans and mortgages. Free loan payment calculator with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Loan Calculator - Monthly Payment & Amortization Schedule',
    description: 'Professional loan calculator for all loan types. Calculate monthly payments, total interest, and view detailed amortization schedules.',
    type: 'website',
    images: [
      {
        url: '/images/og-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/loan-calculator'
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

export default function LoanCalculatorPage() {
  const faqs = getFAQsByToolId('loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Loan Calculator"
      description="Calculate loan payments and analyze financing options with instant calculations."
      keywords={keywords}
      toolId="loan-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter loan amount you need to borrow",
        "Set interest rate (APR) from lender",
        "Choose loan term in months or years",
        "Calculate monthly payment instantly",
        "Review detailed amortization schedule",
        "Compare different loan options and terms"
      ]}
      customFeatures={[
        "Monthly payment calculation with principal and interest",
        "Total interest cost analysis over loan life",
        "Complete amortization schedule generation",
        "Early payoff scenarios and savings",
        "Loan comparison tools and analysis",
        "Payment affordability and debt-to-income assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
