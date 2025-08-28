import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('rv-loan-calculator', 'finance', 'RV Loan Calculator');

export const metadata: Metadata = {
  title: 'RV Loan Calculator - Recreational Vehicle Financing Calculator | InterConverter',
  description: 'Calculate RV loan payments and financing options. Compare recreational vehicle loan rates and terms with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'RV Loan Calculator - Recreational Vehicle Financing Calculator',
    description: 'Professional RV loan calculator for recreational vehicles. Calculate payments and compare financing options.',
    type: 'website',
    images: [
      {
        url: '/images/og-rv-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'RV Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/rv-loan-calculator'
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

export default function RVLoanCalculatorPage() {
  const faqs = getFAQsByToolId('rv-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="RV Loan Calculator"
      description="Calculate RV loan payments and financing options with instant calculations."
      keywords={keywords}
      toolId="rv-loan-calculator"
      category="finance"
      emoji="🚙"
      customHowToUse={[
        "Enter RV purchase price",
        "Set down payment amount",
        "Input annual interest rate",
        "Choose loan term length",
        "Calculate monthly payments",
        "Compare financing options"
      ]}
      customFeatures={[
        "RV loan payment calculations",
        "Down payment impact analysis",
        "Loan term length comparison",
        "Interest rate effect assessment",
        "Total cost breakdown analysis",
        "Financing option comparison tools"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
