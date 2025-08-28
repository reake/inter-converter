import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('secured-loan-calculator', 'finance', 'Secured Loan Calculator');

export const metadata: Metadata = {
  title: 'Secured Loan Calculator - Collateral Loan Payment Calculator | InterConverter',
  description: 'Calculate secured loan payments with collateral. Compare secured vs unsecured loan rates and terms with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Secured Loan Calculator - Collateral Loan Payment Calculator',
    description: 'Professional secured loan calculator with collateral analysis. Calculate payments and compare loan options.',
    type: 'website',
    images: [
      {
        url: '/images/og-secured-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Secured Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/secured-loan-calculator'
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

export default function SecuredLoanCalculatorPage() {
  const faqs = getFAQsByToolId('secured-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Secured Loan Calculator"
      description="Calculate secured loan payments with collateral analysis and instant calculations."
      keywords={keywords}
      toolId="secured-loan-calculator"
      category="finance"
      emoji="🔒"
      customHowToUse={[
        "Enter desired loan amount",
        "Set collateral asset value",
        "Input annual interest rate",
        "Choose loan term length",
        "Calculate monthly payments",
        "Compare with unsecured options"
      ]}
      customFeatures={[
        "Secured loan payment calculations",
        "Collateral value assessment tools",
        "Lower interest rate benefit analysis",
        "Comprehensive risk assessment",
        "Loan-to-value ratio calculations",
        "Secured vs unsecured loan comparison"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
