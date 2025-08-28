import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mortgage-calculator', 'finance', 'Mortgage Calculator');

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Monthly Payment & Amortization | InterConverter',
  description: 'Calculate monthly mortgage payments, total interest, and amortization schedule. Free mortgage payment calculator with taxes, insurance, and PMI.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mortgage Calculator - Monthly Payment & Amortization',
    type: 'website',
    images: [
      {
        url: '/images/og-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mortgage-calculator'
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

export default function MortgageCalculatorPage() {
  const faqs = getFAQsByToolId('mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mortgage Calculator"
      description="Calculate mortgage payments and analyze home loan options with instant calculations."
      keywords={keywords}
      toolId="mortgage-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter home price or loan amount",
        "Set down payment amount and percentage",
        "Input interest rate from lender",
        "Choose loan term (15, 20, or 30 years)",
        "Add property taxes and insurance estimates",
        "Calculate total monthly payment instantly"
      ]}
      customFeatures={[
        "Monthly payment calculation with PITI",
        "Principal and interest breakdown by year",
        "Property tax and insurance estimates",
        "Complete amortization schedule",
        "Total interest cost analysis over loan life",
        "Refinancing comparison and savings analysis"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
