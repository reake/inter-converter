import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('30-year-fixed-mortgage-calculator', 'finance', '30-Year Fixed Mortgage Calculator');

export const metadata: Metadata = {
  title: '30-Year Fixed Mortgage Calculator - Traditional Mortgage Calculator | InterConverter',
  description: 'Calculate 30-year fixed mortgage payments with lowest monthly payments. Traditional long-term mortgage calculator for maximum affordability.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '30-Year Fixed Mortgage Calculator - Traditional Mortgage Calculator',
    description: 'Professional 30-year mortgage calculator for lowest monthly payments and maximum affordability. Traditional long-term mortgage planning.',
    type: 'website',
    images: [
      {
        url: '/images/og-30-year-fixed-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '30-Year Fixed Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/30-year-fixed-mortgage-calculator'
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

export default function ThirtyYearFixedMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('30-year-fixed-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="30-Year Fixed Mortgage Calculator"
      description="Calculate 30-year fixed mortgage payments for lowest monthly payments and maximum affordability with instant calculations."
      keywords={keywords}
      toolId="30-year-fixed-mortgage-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter the loan amount for your mortgage",
        "Set the 30-year fixed interest rate",
        "Add property taxes and insurance estimates",
        "Review monthly payment breakdown",
        "Analyze the complete 30-year amortization schedule"
      ]}
      customFeatures={[
        "30-year fixed-rate payment calculation",
        "Complete 360-payment amortization schedule",
        "Total interest cost over 30 years",
        "Principal vs interest breakdown by year",
        "Loan balance progression chart",
        "Tax and insurance escrow calculations"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
