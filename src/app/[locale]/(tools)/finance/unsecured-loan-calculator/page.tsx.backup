import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('unsecured-loan-calculator', 'finance', 'Unsecured Loan Calculator');

export const metadata: Metadata = {
  title: 'Unsecured Loan Calculator - Personal Loan Payment Calculator | InterConverter',
  description: 'Calculate unsecured loan payments and interest costs. Compare personal loan options and rates with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Unsecured Loan Calculator - Personal Loan Payment Calculator',
    description: 'Professional unsecured loan calculator for personal loans. Calculate payments and compare loan options.',
    type: 'website',
    images: [
      {
        url: '/images/og-unsecured-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Unsecured Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/unsecured-loan-calculator'
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

export default function UnsecuredLoanCalculatorPage() {
  const faqs = getFAQsByToolId('unsecured-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Unsecured Loan Calculator"
      description="Calculate unsecured loan payments and interest costs with instant calculations."
      keywords={keywords}
      toolId="unsecured-loan-calculator"
      category="finance"
      emoji="💳"
      customHowToUse={[
        "Enter desired loan amount",
        "Set annual interest rate",
        "Choose loan term in months",
        "Calculate monthly payments",
        "Compare different loan options",
        "Review total interest cost"
      ]}
      customFeatures={[
        "Unsecured loan payment calculations",
        "Detailed payment schedule generation",
        "Total interest cost analysis",
        "Loan option comparison tools",
        "Interest rate impact assessment",
        "Loan affordability analysis"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
