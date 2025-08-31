import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('student-loan-calculator', 'finance', 'Student Loan Calculator');

export const metadata: Metadata = {
  title: 'Student Loan Calculator - Education Loan Calculator | InterConverter',
  description: 'Calculate student loan payments, interest costs, and repayment strategies for education financing with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Student Loan Calculator - Education Loan Calculator',
    description: 'Professional student loan calculator for education financing. Calculate payments and repayment strategies.',
    type: 'website',
    images: [
      {
        url: '/images/og-student-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Student Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/student-loan-calculator'
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

export default function StudentLoanCalculatorPage() {
  const faqs = getFAQsByToolId('student-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Student Loan Calculator"
      description="Calculate student loan payments and repayment strategies with instant calculations."
      keywords={keywords}
      toolId="student-loan-calculator"
      category="finance"
      emoji="🎓"
      customHowToUse={[
        "Enter total student loan amount borrowed",
        "Set interest rate from loan servicer",
        "Choose repayment term and plan type",
        "Calculate monthly payment amount",
        "Explore different repayment options",
        "Plan optimal debt payoff strategy"
      ]}
      customFeatures={[
        "Student loan payment calculation with fees",
        "Multiple repayment plan options and comparison",
        "Interest capitalization analysis during deferment",
        "Loan forgiveness scenarios and eligibility",
        "Income-driven repayment plans (IDR)",
        "Refinancing vs federal loan comparison"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
