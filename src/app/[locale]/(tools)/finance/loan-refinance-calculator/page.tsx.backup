import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('loan-refinance-calculator', 'finance', 'Loan Refinance Calculator');

export const metadata: Metadata = {
  title: 'Loan Refinance Calculator - Refinancing Savings Analysis | InterConverter',
  description: 'Calculate loan refinancing savings and break-even analysis. Compare current vs new loan terms with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Loan Refinance Calculator - Refinancing Savings Analysis',
    description: 'Professional loan refinance calculator for savings analysis. Calculate break-even points and compare loan terms.',
    type: 'website',
    images: [
      {
        url: '/images/og-loan-refinance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Loan Refinance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/loan-refinance-calculator'
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

export default function LoanRefinanceCalculatorPage() {
  const faqs = getFAQsByToolId('loan-refinance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Loan Refinance Calculator"
      description="Calculate loan refinancing savings and break-even analysis with instant calculations."
      keywords={keywords}
      toolId="loan-refinance-calculator"
      category="finance"
      emoji="🔄"
      customHowToUse={[
        "Enter current loan balance and terms",
        "Input new loan interest rate and terms",
        "Set total refinancing closing costs",
        "Calculate monthly payment savings",
        "Analyze break-even point timeline",
        "Compare total interest costs"
      ]}
      customFeatures={[
        "Refinance savings calculation with fees",
        "Break-even analysis and timeline",
        "Side-by-side loan cost comparison",
        "Monthly payment reduction analysis",
        "Total interest savings tracking",
        "Closing cost impact assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
