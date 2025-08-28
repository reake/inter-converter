import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('motorcycle-loan-calculator', 'finance', 'Motorcycle Loan Calculator');

export const metadata: Metadata = {
  title: 'Motorcycle Loan Calculator - Bike Financing Calculator | InterConverter',
  description: 'Calculate motorcycle loan payments and financing options for bike purchases with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Motorcycle Loan Calculator - Bike Financing Calculator',
    description: 'Professional motorcycle loan calculator for bike financing. Calculate payments and compare loan options.',
    type: 'website',
    images: [
      {
        url: '/images/og-motorcycle-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Motorcycle Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/motorcycle-loan-calculator'
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

export default function MotorcycleLoanCalculatorPage() {
  const faqs = getFAQsByToolId('motorcycle-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Motorcycle Loan Calculator"
      description="Calculate motorcycle loan payments and financing options with instant calculations."
      keywords={keywords}
      toolId="motorcycle-loan-calculator"
      category="finance"
      emoji="🏍️"
      customHowToUse={[
        "Enter motorcycle purchase price",
        "Set down payment amount",
        "Input loan interest rate",
        "Choose loan term in years",
        "Calculate monthly payment",
        "Review total financing costs"
      ]}
      customFeatures={[
        "Motorcycle loan payment calculation",
        "Bike financing options analysis",
        "Down payment impact on payments",
        "Interest rate comparison tools",
        "Loan term optimization strategies",
        "Total cost analysis with insurance"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
