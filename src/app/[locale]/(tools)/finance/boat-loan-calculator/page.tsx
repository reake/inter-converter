import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('boat-loan-calculator', 'finance', 'Boat Loan Calculator');

export const metadata: Metadata = {
  title: 'Boat Loan Calculator - Marine Financing Calculator | InterConverter',
  description: 'Calculate boat loan payments, interest costs, and financing options for marine vessel purchases with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Boat Loan Calculator - Marine Financing Calculator',
    description: 'Professional boat loan calculator for marine financing. Calculate payments and interest costs for watercraft purchases.',
    type: 'website',
    images: [
      {
        url: '/images/og-boat-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Boat Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/boat-loan-calculator'
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

export default function BoatLoanCalculatorPage() {
  const faqs = getFAQsByToolId('boat-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Boat Loan Calculator"
      description="Calculate boat loan payments and marine financing options with instant calculations."
      keywords={keywords}
      toolId="boat-loan-calculator"
      category="finance"
      emoji="⛵"
      customHowToUse={[
        "Enter boat purchase price or loan amount",
        "Set down payment amount and percentage",
        "Input interest rate from marine lender",
        "Choose loan term in years",
        "Calculate monthly payment instantly",
        "Review total financing costs and options"
      ]}
      customFeatures={[
        "Boat loan payment calculation with taxes",
        "Marine financing options and rates",
        "Down payment impact analysis",
        "Interest rate comparison tools",
        "Loan term optimization strategies",
        "Total cost analysis including insurance"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
