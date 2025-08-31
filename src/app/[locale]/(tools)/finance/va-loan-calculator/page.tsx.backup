import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('va-loan-calculator', 'finance', 'VA Loan Calculator');

export const metadata: Metadata = {
  title: 'VA Loan Calculator - Veterans Home Loan Calculator | InterConverter',
  description: 'Calculate VA loan payments with no down payment and no PMI for eligible veterans and service members with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'VA Loan Calculator - Veterans Home Loan Calculator',
    description: 'Professional VA loan calculator for veterans and military. Calculate payments with no down payment and no PMI.',
    type: 'website',
    images: [
      {
        url: '/images/og-va-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'VA Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/va-loan-calculator'
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

export default function VALoanCalculatorPage() {
  const faqs = getFAQsByToolId('va-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="VA Loan Calculator"
      description="Calculate VA loan payments for veterans and military members with instant calculations."
      keywords={keywords}
      toolId="va-loan-calculator"
      category="finance"
      emoji="🇺🇸"
      customHowToUse={[
        "Enter home purchase price or loan amount",
        "Set VA loan interest rate from lender",
        "Add VA funding fee (if applicable)",
        "Calculate monthly payment without PMI",
        "Review VA loan benefits and savings",
        "Compare with conventional loan options"
      ]}
      customFeatures={[
        "No down payment calculation (0% down)",
        "No PMI requirements or costs",
        "VA funding fee analysis and exemptions",
        "Veteran benefit optimization and savings",
        "Eligibility requirements and verification",
        "VA loan limit calculations by county"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
