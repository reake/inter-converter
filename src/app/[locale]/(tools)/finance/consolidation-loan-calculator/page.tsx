import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('consolidation-loan-calculator', 'finance', 'Consolidation Loan Calculator');

export const metadata: Metadata = {
  title: 'Consolidation Loan Calculator - Debt Consolidation | InterConverter',
  description: 'Calculate debt consolidation loan payments and savings. Compare consolidating multiple debts into one loan with lower rates.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Consolidation Loan Calculator - Debt Consolidation',
    description: 'Professional consolidation loan calculator for debt management. Simplify payments and save money by consolidating multiple debts.',
    type: 'website',
    images: [
      {
        url: '/images/og-consolidation-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Consolidation Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/consolidation-loan-calculator'
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

export default function ConsolidationLoanCalculatorPage() {
  const faqs = getFAQsByToolId('consolidation-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Consolidation Loan Calculator"
      description="Calculate potential savings from consolidating multiple debts into a single loan with simplified payments."
      keywords={keywords}
      toolId="consolidation-loan-calculator"
      category="finance"
      emoji="🔗"
      customHowToUse={[
        "Enter details of all current debts",
        "Input consolidation loan terms",
        "Compare total monthly payments",
        "Analyze interest rate savings",
        "Review simplified payment structure",
        "Calculate total cost benefits"
      ]}
      customFeatures={[
        "Multiple debt aggregation",
        "Payment simplification analysis",
        "Interest rate comparison",
        "Total cost savings calculation",
        "Cash flow improvement tracking",
        "Debt management optimization"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
